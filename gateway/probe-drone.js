/**
 * PalAI Drone Hardware Probe & Stream Discoverer
 * ----------------------------------------------
 * Automatically scans and identifies open streaming ports, protocols,
 * and video endpoints on the connected drone Wi-Fi network (HF GPS / LYZRC L600 Pro).
 *
 * Usage:
 *   npm run probe
 *   or: node gateway/probe-drone.js
 */

import net from 'net';
import http from 'http';
import os from 'os';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

function getFfmpegPath() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  if (process.env.LOCALAPPDATA) {
    const wingetDir = path.join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages');
    if (fs.existsSync(wingetDir)) {
      try {
        const entries = fs.readdirSync(wingetDir);
        for (const entry of entries) {
          if (entry.toLowerCase().includes('ffmpeg')) {
            const candidateFolder = path.join(wingetDir, entry);
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
        // ignore
      }
    }
  }
  return 'ffmpeg';
}

function testTcpPort(host, port, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = false;

    socket.setTimeout(timeoutMs);

    socket.on('connect', () => {
      status = true;
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(port, host);
  });
}

function testHttpEndpoint(host, port, endpointPath, timeoutMs = 2000) {
  return new Promise((resolve) => {
    const req = http.get(
      {
        host,
        port,
        path: endpointPath,
        timeout: timeoutMs,
      },
      (res) => {
        const contentType = res.headers['content-type'] || '';
        resolve({
          statusCode: res.statusCode,
          contentType,
          isStream:
            contentType.includes('multipart') ||
            contentType.includes('image') ||
            contentType.includes('octet-stream') ||
            contentType.includes('video'),
        });
        res.resume(); // Discard data
      }
    );

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

function testRtspWithFfmpeg(rtspUrl, timeoutMs = 4000) {
  return new Promise((resolve) => {
    const ffmpegBin = getFfmpegPath();
    const args = ['-i', rtspUrl, '-t', '1', '-f', 'null', '-'];

    let child;
    try {
      child = spawn(ffmpegBin, args);
    } catch {
      resolve({ success: false, error: 'FFmpeg not found' });
      return;
    }

    let stderr = '';
    const timer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {}
      resolve({ success: false, error: 'Timeout probing RTSP stream' });
    }, timeoutMs);

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      if (stderr.includes('Stream #') || stderr.includes('Video:') || code === 0) {
        resolve({ success: true, details: stderr });
      } else {
        resolve({ success: false, details: stderr });
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ success: false, error: err.message });
    });
  });
}

async function runProbe() {
  console.log('=================================================================');
  console.log('       PalAI Drone Hardware Discovery & Network Prober           ');
  console.log('   Target Drone: LYZRC L600 Pro / HF GPS (HF GPS5G_84009788)     ');
  console.log('=================================================================\n');

  // Find local network IPs
  const interfaces = os.networkInterfaces();
  const localIps = [];

  for (const [ifaceName, ifaceDetails] of Object.entries(interfaces)) {
    for (const detail of ifaceDetails || []) {
      if (detail.family === 'IPv4' && !detail.internal) {
        localIps.push({ iface: ifaceName, ip: detail.address });
      }
    }
  }

  console.log('[1/4] Detecting Local Network Interfaces...');
  localIps.forEach((item) => {
    console.log(`  - Adapter "${item.iface}": Assigned IP ${item.ip}`);
  });

  // Candidate gateway IPs to test
  const candidateHosts = new Set(['192.168.80.1']);

  // Add gateway inferred from local IP
  localIps.forEach(({ ip }) => {
    const parts = ip.split('.');
    if (parts.length === 4) {
      candidateHosts.add(`${parts[0]}.${parts[1]}.${parts[2]}.1`);
    }
  });

  const portsToScan = [
    {
      port: 3333,
      desc: 'Reachable TCP service - protocol unknown'
    },
    {
      port: 554,
      desc: 'RTSP candidate'
    },
    {
      port: 8554,
      desc: 'Alternative RTSP candidate'
    },
    {
      port: 8080,
      desc: 'TCP service - video protocol unverified'
    },
    {
      port: 80,
      desc: 'HTTP candidate'
    }
  ];

  console.log('\n[2/4] Scanning Candidate Drone Gateways for Open Ports...');
  const discoveredEndpoints = [];

  for (const host of candidateHosts) {
    const openPortsOnHost = [];
    for (const { port, desc } of portsToScan) {
      const isOpen = await testTcpPort(host, port, 1200);
      if (isOpen) {
        openPortsOnHost.push({ port, desc });
        console.log(`  [+] FOUND OPEN PORT: ${host}:${port} (${desc})`);
      }
    }

    if (openPortsOnHost.length > 0) {
      discoveredEndpoints.push({ host, ports: openPortsOnHost });
    }
  }

  if (discoveredEndpoints.length === 0) {
    console.log('\n[!] No drone ports responded.');
    console.log('    Possible reasons:');
    console.log('    1. Windows is currently connected to office Wi-Fi instead of "HF GPS5G_84009788".');
    console.log('    2. The drone is in sleep mode or motors disarmed with camera radio standby.');
    console.log('    3. The drone assigns a non-standard IP subnet.');
    console.log('\nTip: Open Windows Wi-Fi menu, connect to "HF GPS5G_84009788", and re-run "npm run probe".');
    return;
  }

  console.log('\n[3/4] Probing Video Stream Protocol & Path...');
  for (const { host, ports } of discoveredEndpoints) {
    for (const { port } of ports) {
      // Test RTSP
      if (port === 554 || port === 8554) {
        const rtspPaths = ['/live/ch0', '/stream1', '/video', '/'];
        for (const rPath of rtspPaths) {
          const testUrl = `rtsp://${host}:${port}${rPath}`;
          process.stdout.write(`  - Testing ${testUrl}... `);
          const res = await testRtspWithFfmpeg(testUrl, 3000);
          if (res.success) {
            console.log('SUCCESS! Active Video Stream detected.');
            console.log('\n=============================================================');
            console.log('🎉 ACTIVE DRONE STREAM CONFIRMED!');
            console.log('Use these settings in PalAI "Connection Settings":');
            console.log('  Streaming Protocol: RTSP via Local Gateway');
            console.log(`  Drone IP Address:   ${host}`);
            console.log(`  Port:               ${port}`);
            console.log(`  Video Stream Path:  ${rPath}`);
            console.log('  Gateway URL:        http://localhost:8088/stream');
            console.log('=============================================================');
            return;
          } else {
            console.log('No signal');
          }
        }
      }

      // Test HTTP MJPEG
      if (port === 8080 || port === 80) {
        const httpPaths = ['/mjpeg', '/?action=stream', '/live.mjpg', '/video.mjpg', '/'];
        for (const hPath of httpPaths) {
          process.stdout.write(`  - Testing http://${host}:${port}${hPath}... `);
          const res = await testHttpEndpoint(host, port, hPath, 2000);
          if (res && res.statusCode === 200 && res.isStream) {
            console.log(`MATCH! (HTTP ${res.statusCode}, Content-Type: ${res.contentType})`);
            console.log('\n=============================================================');
            console.log('🎉 ACTIVE HTTP MJPEG STREAM CONFIRMED!');
            console.log('Use these settings in PalAI "Connection Settings":');
            console.log('  Streaming Protocol: HTTP MJPEG');
            console.log(`  Drone IP Address:   ${host}`);
            console.log(`  Port:               ${port}`);
            console.log(`  Video Stream Path:  ${hPath}`);
            console.log('=============================================================');
            return;
          } else {
            console.log(res ? `HTTP ${res.statusCode}` : 'No response');
          }
        }
      }
    }
  }

  console.log('\n[4/4] Summary: Open ports found, but no direct standard video URL responded.');
  console.log('If the drone streams via HF GPS proprietary UDP stream:');
  console.log('Ensure you start stream-gateway with: npm run gateway');
}

runProbe().catch((err) => console.error('Probe error:', err));
