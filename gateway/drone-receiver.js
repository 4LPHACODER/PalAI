/**
 * PalAI experimental READ-ONLY camera receiver (Node.js ES module)
 * Reference packet layout: Y-dnh/E88-pro_opencv, an E88/RXDrone-family project.
 * THIS IS NOT A VERIFIED LYZRC L600 PRO PROTOCOL IMPLEMENTATION.
 * Sends NO packets or commands to the drone and cannot start its camera stream.
 *
 * UDP video listener: 0.0.0.0:2224 (only accepts packets from DRONE_IP)
 * Browser MJPEG: http://127.0.0.1:8090/stream
 * Diagnostics:   http://127.0.0.1:8090/health
 */
import dgram from 'node:dgram';
import http from 'node:http';

const DRONE_IP = process.env.PALAI_DRONE_IP || '192.168.80.1';
const UDP_PORT = Number(process.env.PALAI_VIDEO_PORT || '2224');
const WEB_PORT = Number(process.env.PALAI_RECEIVER_PORT || '8090');
const TEST_MODE = process.env.PALAI_ALLOW_LOCAL_TEST === '1';
const FRAME_LIMIT = 2_000_000; // Prevent excessive allocation from malformed data
const STALE_MS = 2000;
const frames = new Map();
const clients = new Set();
let lastImage = null;
let lastFrameTime = 0;
const metrics = { udpPackets: 0, candidateSegments: 0, completeJPEGs: 0, ignoredPackets: 0, rejectedFrames: 0, lastSender: null };

function emitJPEG(jpeg) {
  lastImage = jpeg;
  lastFrameTime = Date.now();
  metrics.completeJPEGs += 1;
  for (const res of clients) {
    if (res.destroyed || res.writableLength > 2_000_000) continue;
    res.write(`--frame\r\nContent-Type: image/jpeg\r\nContent-Length: ${jpeg.length}\r\n\r\n`);
    res.write(jpeg);
    res.write('\r\n');
  }
  if (metrics.completeJPEGs <= 3 || metrics.completeJPEGs % 50 === 0) {
    console.log(`[RECEIVER] JPEG frame ${metrics.completeJPEGs}: ${jpeg.length} bytes`);
  }
}

function receivePacket(packet) {
  // This parser is based on the E88 receiver, NOT a verified L600 Pro protocol.
  // The packet can contain more than one header/fragment pair.
  let p = 0;
  while (p + 20 <= packet.length) {
    const videoType = packet[p] & 0x7f;
    const fragmentLength = packet.readUInt16LE(p + 2);
    const frameId = packet.readUInt32LE(p + 4);
    const totalLength = packet.readUInt32LE(p + 8);
    const end = p + 20 + fragmentLength;
    if (end > packet.length || fragmentLength === 0) break;
    if (videoType === 2 && totalLength > 4 && totalLength <= FRAME_LIMIT && fragmentLength <= totalLength) {
      metrics.candidateSegments += 1;
      let frame = frames.get(frameId);
      if (!frame || frame.total !== totalLength) {
        frame = { total: totalLength, chunks: [], received: 0, updated: Date.now() };
        frames.set(frameId, frame);
      }
      if (frame.received + fragmentLength <= frame.total) {
        frame.chunks.push(packet.subarray(p + 20, end));
        frame.received += fragmentLength;
        frame.updated = Date.now();
        if (frame.received === frame.total) {
          const jpeg = Buffer.concat(frame.chunks, frame.total);
          frames.delete(frameId);
          // Verify JPEG start/end markers before announcing a frame.
          if (jpeg[0] === 0xff && jpeg[1] === 0xd8 && jpeg.at(-2) === 0xff && jpeg.at(-1) === 0xd9) {
            emitJPEG(jpeg);
          } else metrics.rejectedFrames += 1;
        }
      } else {
        frames.delete(frameId);
        metrics.rejectedFrames += 1;
      }
    }
    p = end;
  }
}

const udp = dgram.createSocket('udp4');
udp.on('message', (packet, remote) => {
  // Ignore untrusted sources. In test mode localhost is also allowed.
  if (remote.address !== DRONE_IP && !(TEST_MODE && remote.address === '127.0.0.1')) {
    metrics.ignoredPackets += 1;
    return;
  }
  metrics.udpPackets += 1;
  metrics.lastSender = remote.address;
  receivePacket(packet);
});
udp.on('error', (err) => {
  console.error('[RECEIVER] UDP error:', err.message);
  process.exitCode = 1;
  udp.close();
});
udp.bind(UDP_PORT, '0.0.0.0', () => {
  console.log(`[RECEIVER] Listening for candidate video packets on UDP :${UDP_PORT}`);
  console.log(`[RECEIVER] Allowed sender: ${DRONE_IP}${TEST_MODE ? ' or 127.0.0.1 (SYNTHETIC TEST MODE)' : ''}`);
  console.log('[RECEIVER] No control commands will be sent to the drone.');
});

setInterval(() => {
  const now = Date.now();
  for (const [id, frame] of frames) if (now - frame.updated > STALE_MS) frames.delete(id);
}, 500).unref();

const web = http.createServer((req, res) => {
  if (req.url === '/health') {
    const age = lastFrameTime ? Date.now() - lastFrameTime : null;
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': 'http://localhost:5173' });
    res.end(JSON.stringify({
      receiver: 'online', protocol: 'candidate E88-family fragmented JPEG, not verified for L600 Pro',
      testMode: TEST_MODE,
      videoState: !lastFrameTime ? 'NO_FRAMES' : age < 3000 ? (metrics.lastSender === '127.0.0.1' ? 'TEST_FRAMES' : 'FRAMES_RECEIVED') : 'STALE',
      lastFrameAgeMs: age, udpPort: UDP_PORT, ...metrics,
    }, null, 2));
    return;
  }
  if (req.url === '/snapshot') {
    if (!lastImage || Date.now() - lastFrameTime >= 3000) {
      res.writeHead(503, { 'Content-Type': 'text/plain' }); res.end('No recent JPEG frame'); return;
    }
    res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-store' });
    res.end(lastImage);
    return;
  }
  if (req.url === '/stream') {
    res.writeHead(200, {
      'Content-Type': 'multipart/x-mixed-replace; boundary=frame',
      'Cache-Control': 'no-cache, no-store',
      'Connection': 'keep-alive',
    });
    clients.add(res);
    res.on('close', () => clients.delete(res));
    return;
  }
  res.writeHead(404); res.end('Try /health, /stream, or /snapshot');
});
web.listen(WEB_PORT, '127.0.0.1', () => {
  console.log(`[RECEIVER] Status: http://127.0.0.1:${WEB_PORT}/health`);
  console.log(`[RECEIVER] MJPEG:  http://127.0.0.1:${WEB_PORT}/stream`);
});

function cleanup() { web.close(); udp.close(); }
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
