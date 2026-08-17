import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#0b0e33",
          color: "#eceef8",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* graticule motif */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(236,238,248,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,238,248,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#9aa1c9",
            textTransform: "uppercase",
            fontFamily: "'Courier New', monospace",
          }}
        >
          41.9848° N / 87.8459° W — Chicago · US–India Trade Corridor
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            color: "#b9bede",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 56, gap: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              color: "#eceef8",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: "#d3915a" }} />
            Metal &amp; Scrap Export
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              color: "#eceef8",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: "#4aa3dc" }} />
            International Trade &amp; Sourcing
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
