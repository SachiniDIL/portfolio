import { renderOgCard, ogImageSize, ogImageContentType } from "@/lib/og-card";

export const runtime = "edge";
export const alt = "Sachini Dilrangi — Software Engineer";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Open to Software Engineering Roles",
    title: "Sachini Dilrangi",
    tagline: "Software Engineer — building AI-powered products with a real industrial workflow.",
  });
}
