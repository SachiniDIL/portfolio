import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgCard({ eyebrow, title, tagline }: { eyebrow: string; title: string; tagline: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0908",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#c8102e" }} />
          <div
            style={{
              display: "flex",
              color: "#c9a227",
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#f3eee3",
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginTop: 32,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            color: "#c9c2b4",
            fontSize: 32,
            marginTop: 24,
            maxWidth: 880,
          }}
        >
          {tagline}
        </div>
        <div style={{ display: "flex", width: 170, height: 5, backgroundColor: "#c8102e", marginTop: 52 }} />
      </div>
    ),
    ogImageSize
  );
}
