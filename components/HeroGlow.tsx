"use client";

import { useEffect, useRef } from "react";

export default function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.transform = `translate(${e.clientX - rect.left - 300}px, ${
        e.clientY - rect.top - 300
      }px)`;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] opacity-0 will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(200,16,46,0.12), transparent 60%)",
        transition: "transform 0.25s ease-out, opacity 0.6s ease",
      }}
    />
  );
}
