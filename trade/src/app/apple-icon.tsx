import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const block = (bg: string, rotate: number, x: number, y: number) => (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: 66,
        height: 40,
        borderRadius: 14,
        background: bg,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d104b",
          borderRadius: 36,
          position: "relative",
        }}
      >
        {block("#3190cb", 45, 30, 30)}
        {block("#7dc0ea", -45, 86, 34)}
        {block("#7dc0ea", -45, 26, 96)}
        {block("#3190cb", 45, 84, 100)}
      </div>
    ),
    { ...size }
  );
}
