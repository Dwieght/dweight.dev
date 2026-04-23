export interface CursorNormalizedPoint {
  x: number;
  y: number;
}

export interface CursorViewportPoint {
  x: number;
  y: number;
}

export interface CursorGestureFrame {
  thumbTip: CursorNormalizedPoint;
  indexTip: CursorNormalizedPoint;
}

export interface ViewportSize {
  width: number;
  height: number;
}

const THUMB_TIP_INDEX = 4;
const INDEX_FINGER_TIP_INDEX = 8;
const HOVER_ATTRIBUTE = "data-gesture-hovered";
const INTERACTIVE_SELECTOR = [
  'a[href]',
  "button",
  '[role="button"]',
  'input:not([type="hidden"])',
  "select",
  "textarea",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function extractCursorGestureFrame(
  hands?: CursorNormalizedPoint[][]
): CursorGestureFrame | null {
  const hand = hands?.[0];

  if (!hand?.[THUMB_TIP_INDEX] || !hand?.[INDEX_FINGER_TIP_INDEX]) {
    return null;
  }

  return {
    thumbTip: hand[THUMB_TIP_INDEX],
    indexTip: hand[INDEX_FINGER_TIP_INDEX],
  };
}

export function mapNormalizedPointToViewport(
  point: CursorNormalizedPoint,
  viewport: ViewportSize,
  mirrorX = true
): CursorViewportPoint {
  const normalizedX = clamp(mirrorX ? 1 - point.x : point.x, 0, 1);
  const normalizedY = clamp(point.y, 0, 1);

  return {
    x: Math.round(normalizedX * viewport.width),
    y: Math.round(normalizedY * viewport.height),
  };
}

export function smoothCursorPoint(
  previous: CursorViewportPoint | null,
  next: CursorViewportPoint,
  smoothingFactor = 0.35
): CursorViewportPoint {
  if (!previous || smoothingFactor >= 1) {
    return next;
  }

  return {
    x: Math.round(previous.x + (next.x - previous.x) * smoothingFactor),
    y: Math.round(previous.y + (next.y - previous.y) * smoothingFactor),
  };
}

export function isPinchClosed(
  frame: CursorGestureFrame,
  threshold = 0.06
): boolean {
  const deltaX = frame.thumbTip.x - frame.indexTip.x;
  const deltaY = frame.thumbTip.y - frame.indexTip.y;

  return Math.hypot(deltaX, deltaY) <= threshold;
}

export function resolveInteractiveTarget(
  element: Element | null
): HTMLElement | null {
  if (!(element instanceof HTMLElement)) {
    return null;
  }

  return element.closest(INTERACTIVE_SELECTOR);
}

export function resolveInteractiveTargetAtPoint(
  root: Document,
  x: number,
  y: number
): HTMLElement | null {
  if (typeof root.elementsFromPoint === "function") {
    const stack = root.elementsFromPoint(x, y);

    for (const element of stack) {
      const target = resolveInteractiveTarget(element);

      if (target) {
        return target;
      }
    }

    return null;
  }

  return resolveInteractiveTarget(root.elementFromPoint(x, y));
}

export function getHoverLabel(element: Element | null): string | null {
  if (!(element instanceof HTMLElement)) {
    return null;
  }

  const ariaLabel = element.getAttribute("aria-label")?.trim();

  if (ariaLabel) {
    return ariaLabel;
  }

  const labelledBy = element.getAttribute("aria-labelledby")?.trim();

  if (labelledBy) {
    const label = labelledBy
      .split(/\s+/)
      .map((id) => element.ownerDocument.getElementById(id)?.textContent?.trim())
      .find(Boolean);

    if (label) {
      return label;
    }
  }

  const text = element.textContent?.replace(/\s+/g, " ").trim();

  return text || null;
}

export function syncGestureHoveredElement(
  previous: HTMLElement | null,
  next: HTMLElement | null
): HTMLElement | null {
  if (previous && previous !== next) {
    previous.removeAttribute(HOVER_ATTRIBUTE);
  }

  if (!next) {
    return null;
  }

  next.setAttribute(HOVER_ATTRIBUTE, "true");

  return next;
}

export function isTargetDisabled(target: HTMLElement | null): boolean {
  if (!target) {
    return true;
  }

  if (
    target instanceof HTMLButtonElement ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLOptGroupElement ||
    target instanceof HTMLOptionElement ||
    target instanceof HTMLFieldSetElement
  ) {
    return target.disabled;
  }

  return target.getAttribute("aria-disabled") === "true";
}
