/** Sends ONLY to 127.0.0.1 for offline parser tests. Never contacts drone. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dgram from 'node:dgram';
const ownDir = path.dirname(fileURLToPath(import.meta.url));
const jpeg = fs.readFileSync(path.join(ownDir, 'SYNTHETIC_TEST_ONLY.jpg'));
const udp = dgram.createSocket('udp4');
const port = Number(process.env.PALAI_VIDEO_PORT || '2224');
let frameId = 1;
function emit() {
  const id = frameId++;
  for (let start = 0; start < jpeg.length; start += 1100) {
    const chunk = jpeg.subarray(start, start + 1100);
    const packet = Buffer.allocUnsafe(20 + chunk.length);
    packet.fill(0, 0, 20);
    packet[0] = 2;
    packet.writeUInt16LE(chunk.length, 2);
    packet.writeUInt32LE(id, 4);
    packet.writeUInt32LE(jpeg.length, 8);
    chunk.copy(packet, 20);
    udp.send(packet, port, '127.0.0.1');
  }
}
console.log(`Sending synthetic JPEG frames to localhost UDP :${port} only. Ctrl+C to stop.`);
emit();
const timer = setInterval(emit, 500);
function stop() { clearInterval(timer); udp.close(); }
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
