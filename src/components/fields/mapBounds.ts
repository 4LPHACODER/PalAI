/** Bounding box the demo map illustration represents (around Tandag City). */
export const MAP_BOUNDS = { north: 9.11, south: 9.04, west: 126.15, east: 126.23 };

export function mapPosition(lat: number | null, lng: number | null): {x: number;y: number;} | null {
  if (lat === null || lng === null) return null;
  const x = (lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west) * 100;
  const y = (MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south) * 100;
  if (x < 0 || x > 100 || y < 0 || y > 100) return null;
  return { x, y };
}

export function positionToCoords(x: number, y: number): {lat: number;lng: number;} {
  const cx = Math.min(100, Math.max(0, x));
  const cy = Math.min(100, Math.max(0, y));
  return {
    lat: Number((MAP_BOUNDS.north - cy / 100 * (MAP_BOUNDS.north - MAP_BOUNDS.south)).toFixed(5)),
    lng: Number((MAP_BOUNDS.west + cx / 100 * (MAP_BOUNDS.east - MAP_BOUNDS.west)).toFixed(5))
  };
}