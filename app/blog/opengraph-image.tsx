import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/og-card";

export const runtime = "edge";
export const alt = "The Log — Sachini Dilrangi";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Sachini Dilrangi",
    title: "The Log",
    tagline: "Notes on building software — real projects, real tradeoffs.",
  });
}
