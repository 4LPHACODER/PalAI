# PalAI Drone Video Streaming Gateway & Hardware Guide

This directory contains the lightweight local video gateway and comprehensive technical documentation for connecting the **LYZRC L600 Pro** drone (operated with the **RX Drone GPS** companion app) to the **PalAI Rice Health Monitoring Admin Dashboard**.

---

## 1. Network Topology & Hardware Connection (Windows)

The **LYZRC L600 Pro** is a consumer GPS survey drone. Like most drones in this class, it operates as a **Wi-Fi Access Point (AP)** rather than connecting to your home router.

### Step 1: Power On and Connect
1. Place the drone on a flat, level surface with **motors disarmed and propellers removed** for safety during network discovery.
2. Power on the drone battery. Wait 20–30 seconds for the internal Wi-Fi broadcast module to initialize.
3. On your Windows laptop:
   - Open Windows Wi-Fi settings.
   - Search for the drone's SSID (typically formatted as `RX_DRONE_5G_XXXX` or `L600_PRO_XXXX`).
   - Connect to the drone's Wi-Fi network. (No password is required on default factory units, or refer to your drone manual).

### Step 2: Determine the Drone's Real IP Address
Once connected, open **PowerShell** or Command Prompt and run:
```powershell
ipconfig
```
Locate the **Wireless LAN adapter Wi-Fi** section. Look for the **Default Gateway** address:
```text
Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . . . . . . : 192.168.1.102
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```
The **Default Gateway** (`192.168.1.1` or `192.168.0.1`) is the drone's internal Linux/RTOS IP address.

---

## 2. Protocol Identification

LYZRC L600 Pro production batches typically use one of two video broadcast formats:

| Format | Common Ports | Common URLs / Paths | How to View in PalAI |
| :--- | :--- | :--- | :--- |
| **HTTP MJPEG** | `8080`, `80` | `/mjpeg`, `/?action=stream`, `/videostream.cgi` | Direct in browser (select `HTTP MJPEG` protocol) |
| **RTSP / H.264** | `554`, `8554` | `/live/ch0`, `/ch0_unicast.264`, `/video0` | Transcoded via PalAI Local Gateway (`npm run gateway`) |
| **UVC / USB FPV** | Direct USB | UVC Video Receiver / HDMI Capture | Direct in browser (select `Browser Camera / UVC Video`) |

### Testing with VLC Media Player (Windows)
To verify which protocol your specific drone unit broadcasts before entering it into PalAI:
1. Open **VLC Media Player**.
2. Go to **Media → Open Network Stream** (`Ctrl+N`).
3. Test the following URLs:
   - `http://192.168.1.1:8080/mjpeg`
   - `http://192.168.1.1:8080/?action=stream`
   - `rtsp://192.168.1.1:554/live/ch0`
   - `rtsp://192.168.1.1:8554/video0`
4. When video appears in VLC, copy the exact working IP, port, and path into the PalAI dashboard connection modal.

---

## 3. Running the PalAI Local RTSP Gateway

Web browsers (Chrome, Edge, Firefox) cannot play raw `rtsp://` streams natively due to browser sandbox restrictions. If your drone uses RTSP:

### Prerequisites:
- **Node.js** (v18+)
- **FFmpeg** installed on Windows:
  ```powershell
  # Install via Windows Package Manager
  winget install Gyan.FFmpeg
  ```

### Start the Gateway:
In your PalAI project root:
```powershell
npm run gateway
```
The gateway will start on `http://127.0.0.1:8088`. It securely transcodes incoming RTSP video from the drone's Wi-Fi network and outputs standard multipart HTTP MJPEG on:
```text
http://localhost:8088/stream?url=rtsp://192.168.1.1:554/live/ch0
```

---

## 4. Configuring the PalAI Dashboard

1. Navigate to:
   `http://localhost:5173/drone-insights?from=hero&tab=monitoring`
2. Click **Connection Settings** (or the **Connect Drone** button).
3. Select your protocol:
   - **HTTP MJPEG**: Enter Drone IP `192.168.1.1`, Port `8080`, Path `/mjpeg`.
   - **RTSP via Local Gateway**: Set Gateway URL `http://localhost:8088/stream`.
   - **PC Camera / UVC Video**: Connect an external USB FPV receiver or use your laptop camera to test the frame capture pipeline.
4. Click **Save & Connect**.
5. Once valid frames are received, the status indicator turns **Live Camera Connected**.
6. Click **Capture Image** to grab a live frame, view its resolution and size, download it, or stage it directly for **AI Disease Detection**.

---

## 5. Mobile & iPhone Testing

When using an iPhone:
1. Power on the drone.
2. On the iPhone, join the drone's Wi-Fi network (`RX_DRONE_5G_XXXX`).
3. Open the **RX Drone GPS** companion app from the App Store to confirm the camera feed is operational.
4. If testing the PalAI web dashboard on your iPhone over local Wi-Fi:
   - The iPhone can access the stream directly if the drone provides HTTP MJPEG.
   - For RTSP, the iPhone browser requires the local gateway running on a host connected to the same subnet.

---

## 6. Safety & Field Inspection Rules

- **Pre-flight Bench Testing**: Always verify camera video, latency, and image capture while the drone is on the ground.
- **Fail-Safe Battery**: Ensure the drone battery has at least 50% charge before takeoff.
- **Propellers Off Indoors**: Keep propellers detached while diagnosing network IP settings.
- **Civil Aviation Compliance**: Maintain visual line-of-sight (VLOS) and comply with the 120m AGL altitude limit.
