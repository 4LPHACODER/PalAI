export type StreamProtocol =
  | 'mjpeg'
  | 'rtsp_gateway'
  | 'hls'
  | 'browser_camera'
  | 'custom_url';

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'connection_failed'
  | 'stream_unavailable';

export interface DroneConnectionConfig {
  ip: string;
  port: string;
  protocol: StreamProtocol;
  path: string;
  customUrl: string;
  gatewayUrl: string;
  autoReconnect: boolean;
}

export interface StreamDiagnostics {
  status: ConnectionStatus;
  measuredWidth: number;
  measuredHeight: number;
  fps: number;
  errorMessage?: string;
  connectedAt?: string;
}

export interface CapturedDroneFrame {
  id: string;
  dataUrl: string;
  timestamp: string;
  width: number;
  height: number;
  sizeBytes: number;
  filename: string;
}
