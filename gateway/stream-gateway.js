/**
 * PalAI Drone RTSP Streaming Gateway
 * ----------------------------------
 * A lightweight, zero-dependency Node.js gateway that connects to the
 * LYZRC L600 Pro drone RTSP stream (over Wi-Fi) and transcodes it into a
 * browser-compatible HTTP multipart MJPEG stream for the PalAI Admin Dashboard.
 *
 * Usage:
 *   node gateway/stream-gateway.js
 *   or: npm run gateway
 *
 * Access in browser:
 *   http://localhost:8088/stream?url=rtsp://192.168.1.1:554/live/ch0
 */

import http from 'http';
import { spawn } from 'child_process';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';

const PORT = 8088;
const HOST = '127.0.0.1'; // Restrict to localhost only for security
const DEFAULT_RTSP_URL = process.env.DRONE_RTSP_URL || 'rtsp://192.168.1.1:554/live/ch0';

function getFfmpegPath() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  // Check WinGet default packages folder on Windows
  if (process.env.LOCALAPPDATA) {
    const wingetDir = path.join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages');
    if (fs.existsSync(wingetDir)) {
      try {
        const entries = fs.readdirSync(wingetDir);
        for (const entry of entries) {
          if (entry.toLowerCase().includes('ffmpeg')) {
            const candidateFolder = path.join(wingetDir, entry);
            // Search inside candidateFolder
            const subEntries = fs.readdirSync(candidateFolder);
            for (const sub of subEntries) {
              const binCandidate = path.join(candidateFolder, sub, 'bin', 'ffmpeg.exe');
              if (fs.existsSync(binCandidate)) return binCandidate;
              const directCandidate = path.join(candidateFolder, sub, 'ffmpeg.exe');
              if (fs.existsSync(directCandidate)) return directCandidate;
            }
            const directBin = path.join(candidateFolder, 'bin', 'ffmpeg.exe');
            if (fs.existsSync(directBin)) return directBin;
          }
        }
      } catch {
        // Fallback to standard PATH
      }
    }
  }
  return 'ffmpeg';
}

const server = http.createServer((req, res) => {
  // CORS Headers for PalAI Frontend (localhost:5173 / localhost)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host}`);

  // Health Check Endpoint
  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify(
        {
          service: 'PalAI Drone Video Gateway',
          status: 'online',
          targetDrone: 'LYZRC L600 Pro',
          defaultRtspUrl: DEFAULT_RTSP_URL,
          endpoints: {
            stream: '/stream?url=<rtsp_url>',
            health: '/health',
          },
        },
        null,
        2
      )
    );
    return;
  }

  // Transcoded Video Stream Endpoint
  if (parsedUrl.pathname === '/stream') {
    const targetRtsp = parsedUrl.searchParams.get('url') || DEFAULT_RTSP_URL;
    console.log(`[Gateway] Initiating stream proxy for target: ${targetRtsp}`);

    const transport = parsedUrl.searchParams.get('transport');
    const ffmpegArgs = [];
    if (transport) {
      ffmpegArgs.push('-rtsp_transport', transport);
    }
    ffmpegArgs.push(
      '-i', targetRtsp,
      '-f', 'mpjpeg',          // Output multipart MJPEG
      '-q:v', '3',              // High quality jpeg frames
      '-r', '25',               // 25 fps
      '-an',                    // Disable audio
      '-'                       // Output to stdout pipe
    );

    let ffmpegProcess;
    const ffmpegBin = getFfmpegPath();
    try {
      ffmpegProcess = spawn(ffmpegBin, ffmpegArgs);
    } catch (err) {
      console.error(`[Gateway] Failed to spawn ffmpeg from "${ffmpegBin}":`, err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error: FFmpeg is not available (${err.message}). Ensure FFmpeg is installed.`);
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'multipart/x-mixed-replace; boundary=ffmpeg',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Connection': 'close',
    });

    ffmpegProcess.stdout.pipe(res);

    ffmpegProcess.stderr.on('data', (data) => {
      // Log connection lines or errors
      const str = data.toString();
      if (str.includes('Error') || str.includes('failed') || str.includes('Connection refused')) {
        console.warn(`[FFmpeg] ${str.trim()}`);
      }
    });

    ffmpegProcess.on('error', (err) => {
      console.error('[Gateway] FFmpeg process error:', err.message);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`FFmpeg error: ${err.message}. Ensure FFmpeg is installed.`);
      }
    });

    // Cleanup when browser tab closes or disconnects
    res.on('close', () => {
      console.log('[Gateway] Video client disconnected.');

      if (ffmpegProcess && !ffmpegProcess.killed) {
        ffmpegProcess.kill();
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Endpoint not found. Use /stream or /health.');
});

server.listen(PORT, HOST, () => {
  const detectedFfmpeg = getFfmpegPath();
  console.log('====================================================');
  console.log(` PalAI Drone Video Gateway running on http://${HOST}:${PORT}`);
  console.log(` Target Drone: LYZRC L600 Pro (RX Drone GPS)`);
  console.log(` Video Stream: http://${HOST}:${PORT}/stream`);
  console.log(` FFmpeg Binary: ${detectedFfmpeg}`);
  console.log('====================================================');
  console.log(' Press Ctrl+C to stop the gateway.');
});
