import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Simplified pinwheel abstraction of the Coordinatez mark — four rotated
// rounded blocks in the two brand blues.
export default function Icon() {
  const block = (bg: string, rotate: number, x: number, y: number) => (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: 13,
        height: 8,
        borderRadius: 3,
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
          borderRadius: 7,
          position: "relative",
        }}
      >
        {block("#3190cb", 45, 5, 5)}
        {block("#7dc0ea", -45, 15, 6)}
        {block("#7dc0ea", -45, 4, 17)}
        {block("#3190cb", 45, 15, 18)}
      </div>
    ),
    { ...size }
  );
}
