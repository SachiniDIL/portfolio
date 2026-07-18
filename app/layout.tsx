import type { Metadata } from "next";
import { Bebas_Neue, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const fraunces = Fraunces({
  weight: "500",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Sachini Dilrangi — Software Engineer",
  description:
    "Final-year Software Engineering undergraduate at SLIIT, previously Associate Software Engineer at Cloud-eDesign. Building AI-powered software with a real industrial workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${fraunces.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
