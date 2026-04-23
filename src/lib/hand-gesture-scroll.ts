export type SwipeDirection = "up" | "down";

export interface GesturePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface HandLandmarkPoint {
  x: number;
  y: number;
}

export interface SwipeConfig {
  minSamples: number;
  minVerticalTravel: number;
  minVelocity: number;
  maxHorizontalTravel: number;
  cooldownMs: number;
}

export const DEFAULT_SWIPE_CONFIG: SwipeConfig = {
  minSamples: 3,
  minVerticalTravel: 0.14,
  minVelocity: 0.0008,
  maxHorizontalTravel: 0.08,
  cooldownMs: 900,
};

export function classifySwipe(
  history: GesturePoint[],
  lastGestureAt: number | null,
  config: SwipeConfig = DEFAULT_SWIPE_CONFIG
): SwipeDirection | null {
  if (history.length < config.minSamples) {
    return null;
  }

  const first = history[0];
  const last = history[history.length - 1];
  const elapsed = last.timestamp - first.timestamp;

  if (elapsed <= 0) {
    return null;
  }

  if (
    lastGestureAt !== null &&
    last.timestamp - lastGestureAt < config.cooldownMs
  ) {
    return null;
  }

  const verticalTravel = first.y - last.y;
  const horizontalTravel = Math.abs(last.x - first.x);
  const velocity = Math.abs(verticalTravel) / elapsed;

  if (Math.abs(verticalTravel) < config.minVerticalTravel) {
    return null;
  }

  if (horizontalTravel > config.maxHorizontalTravel) {
    return null;
  }

  if (velocity < config.minVelocity) {
    return null;
  }

  return verticalTravel > 0 ? "up" : "down";
}

export function trimGestureHistory(
  history: GesturePoint[],
  windowMs: number,
  now: number
): GesturePoint[] {
  return history.filter((point) => now - point.timestamp <= windowMs);
}

export function extractPrimaryHandPoint(
  hands?: HandLandmarkPoint[][]
): Omit<GesturePoint, "timestamp"> | null {
  const hand = hands?.[0];

  if (!hand || !hand[0] || !hand[5] || !hand[9]) {
    return null;
  }

  return {
    x: (hand[0].x + hand[5].x + hand[9].x) / 3,
    y: (hand[0].y + hand[5].y + hand[9].y) / 3,
  };
}
