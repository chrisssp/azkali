import {
  AbsoluteFill,
  Easing,
  Img,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type CursorKeyframe = {
  readonly frame: number;
  readonly x: number;
  readonly y: number;
  readonly click?: boolean;
};

export type CameraKeyframe = {
  readonly frame: number;
  readonly x: number;
  readonly y: number;
  readonly zoom: number;
  readonly padding: number;
};

export type ScreenStudioStyleProps = {
  readonly screenshotSrc?: string;
  readonly cursorPath?: readonly CursorKeyframe[];
  readonly cameraPath?: readonly CameraKeyframe[];
  readonly background?: string;
};

const EASE = Easing.bezier(0.22, 1, 0.36, 1);

const defaultCursorPath: readonly CursorKeyframe[] = [
  { frame: 0, x: 0.1, y: 0.25 },
  { frame: 45, x: 0.22, y: 0.3 },
  { frame: 85, x: 0.33, y: 0.48, click: true },
  { frame: 130, x: 0.5, y: 0.5 },
  { frame: 170, x: 0.72, y: 0.34, click: true },
  { frame: 220, x: 0.86, y: 0.62 },
  { frame: 269, x: 0.9, y: 0.72 },
];

const defaultCameraPath: readonly CameraKeyframe[] = [
  { frame: 0, x: 0.5, y: 0.5, zoom: 1, padding: 96 },
  { frame: 70, x: 0.32, y: 0.45, zoom: 1.3, padding: 76 },
  { frame: 130, x: 0.5, y: 0.5, zoom: 1.1, padding: 90 },
  { frame: 200, x: 0.74, y: 0.36, zoom: 1.48, padding: 62 },
  { frame: 269, x: 0.5, y: 0.52, zoom: 1, padding: 96 },
];

const placeholderImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="220" y="150" width="1480" height="780" rx="30" fill="#0b1222" stroke="#1f2937"/>
      <rect x="260" y="210" width="420" height="20" rx="10" fill="#334155"/>
      <rect x="260" y="250" width="1320" height="14" rx="7" fill="#1e293b"/>
      <rect x="260" y="285" width="1280" height="14" rx="7" fill="#1e293b"/>
      <rect x="260" y="320" width="980" height="14" rx="7" fill="#1e293b"/>
      <circle cx="430" cy="590" r="180" fill="#1d4ed8" opacity="0.45"/>
      <circle cx="1480" cy="640" r="220" fill="#22d3ee" opacity="0.25"/>
      <text x="260" y="570" fill="#e2e8f0" font-size="54" font-family="Inter, Arial, sans-serif">Replace screenshotSrc with your capture</text>
      <text x="260" y="640" fill="#94a3b8" font-size="34" font-family="Inter, Arial, sans-serif">Screen Studio style: smooth cursor + eased zoom + dynamic padding</text>
    </svg>`,
  );

const getSegment = <T extends { readonly frame: number }>(
  path: readonly T[],
  frame: number,
): readonly [T, T] => {
  const safeFrame = Math.max(0, frame);
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];
    if (!current || !next) {
      continue;
    }

    if (safeFrame >= current.frame && safeFrame <= next.frame) {
      return [current, next];
    }
  }

  const last = path[path.length - 1];
  if (!last) {
    throw new Error("Keyframe path cannot be empty.");
  }

  return [last, last];
};

const interpolateValue = (
  fromFrame: number,
  toFrame: number,
  frame: number,
  fromValue: number,
  toValue: number,
): number => {
  if (toFrame <= fromFrame) {
    return toValue;
  }

  const progress = (frame - fromFrame) / (toFrame - fromFrame);
  const clamped = Math.min(1, Math.max(0, progress));
  const eased = EASE(clamped);
  return fromValue + (toValue - fromValue) * eased;
};

const interpolateCursor = (
  path: readonly CursorKeyframe[],
  frame: number,
): { x: number; y: number } => {
  const [from, to] = getSegment(path, frame);
  return {
    x: interpolateValue(from.frame, to.frame, frame, from.x, to.x),
    y: interpolateValue(from.frame, to.frame, frame, from.y, to.y),
  };
};

const interpolateCamera = (
  path: readonly CameraKeyframe[],
  frame: number,
): { x: number; y: number; zoom: number; padding: number } => {
  const [from, to] = getSegment(path, frame);
  return {
    x: interpolateValue(from.frame, to.frame, frame, from.x, to.x),
    y: interpolateValue(from.frame, to.frame, frame, from.y, to.y),
    zoom: interpolateValue(from.frame, to.frame, frame, from.zoom, to.zoom),
    padding: interpolateValue(
      from.frame,
      to.frame,
      frame,
      from.padding,
      to.padding,
    ),
  };
};

const nearestClickPulse = (
  path: readonly CursorKeyframe[],
  frame: number,
): number => {
  const clickFrames = path.filter((item) => item.click).map((item) => item.frame);
  if (clickFrames.length === 0) {
    return 0;
  }

  const nearestDistance = clickFrames.reduce((closest, clickFrame) => {
    return Math.min(closest, Math.abs(clickFrame - frame));
  }, Number.POSITIVE_INFINITY);

  if (nearestDistance > 14) {
    return 0;
  }

  const strength = 1 - nearestDistance / 14;
  return Easing.out(Easing.cubic)(strength);
};

export const ScreenStudioStyleComposition: React.FC<ScreenStudioStyleProps> = ({
  screenshotSrc,
  cursorPath = defaultCursorPath,
  cameraPath = defaultCameraPath,
  background = "radial-gradient(circle at 20% 0%, #1e3a8a 0%, #030712 65%)",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const source = screenshotSrc ?? placeholderImage;

  const camera = interpolateCamera(cameraPath, frame);
  const cursorNow = interpolateCursor(cursorPath, frame);
  const cursorBefore = interpolateCursor(cursorPath, frame - 2);
  const cursor = {
    x: cursorBefore.x + (cursorNow.x - cursorBefore.x) * 0.74,
    y: cursorBefore.y + (cursorNow.y - cursorBefore.y) * 0.74,
  };

  const padding = camera.padding;
  const viewportWidth = Math.max(1, width - padding * 2);
  const viewportHeight = Math.max(1, height - padding * 2);

  const tx = viewportWidth / 2 - camera.x * viewportWidth * camera.zoom;
  const ty = viewportHeight / 2 - camera.y * viewportHeight * camera.zoom;

  const cursorX = tx + cursor.x * viewportWidth * camera.zoom;
  const cursorY = ty + cursor.y * viewportHeight * camera.zoom;
  const pulse = nearestClickPulse(cursorPath, frame);

  return (
    <AbsoluteFill
      style={{
        background,
      }}
    >
      <AbsoluteFill
        style={{
          padding,
        }}
      >
        <AbsoluteFill
          style={{
            borderRadius: 26,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 24px 70px rgba(0, 0, 0, 0.45)",
            backgroundColor: "#020617",
          }}
        >
          <AbsoluteFill
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${camera.zoom})`,
              transformOrigin: "0 0",
            }}
          >
            <Img
              alt="Prototype capture"
              src={source}
              style={{
                width: viewportWidth,
                height: viewportHeight,
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: cursorX,
                top: cursorY,
                transform: "translate(-2px, -2px)",
              }}
            >
              <svg width={34} height={40} viewBox="0 0 34 40" fill="none">
                <path
                  d="M3.5 2.5L3.53 30.5L10.95 23.72L16.14 36.31L22.14 33.88L16.95 21.3L26.9 21.3L3.5 2.5Z"
                  fill="white"
                  stroke="#0F172A"
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 9,
                  top: 8,
                  width: 16,
                  height: 16,
                  borderRadius: "999px",
                  border: "2px solid rgba(255,255,255,0.8)",
                  opacity: pulse,
                  transform: `scale(${1 + pulse * 1.4})`,
                }}
              />
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
