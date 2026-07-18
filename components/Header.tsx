"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Arsenal", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Unlock body scroll synchronously so the anchor jump isn't swallowed
  // by overflow:hidden before React re-renders.
  const close = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "";
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-[6vw]">
        <a
          href="#"
          className="display text-[20px] tracking-[0.04em] text-paper transition-colors duration-200 hover:text-crimson"
        >
          Sachini Dilrangi<span className="text-crimson">.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-crimson"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="/Sachini-Dilrangi-CV.pdf"
            download
            className="border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-paper transition-colors duration-200 hover:border-crimson hover:text-crimson"
          >
            CV ↓
          </a>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:text-crimson md:hidden"
        >
          Menu
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-md md:hidden"
        >
          <div className="flex h-14 items-center justify-between border-b border-line px-[6vw]">
            <span className="display text-[20px] tracking-[0.04em] text-paper">Menu</span>
            <button
              type="button"
              onClick={close}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-crimson"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-[6vw]">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="group flex items-baseline gap-4 py-2"
              >
                <span className="font-mono text-xs text-crimson">0{i + 1}</span>
                <span className="display text-[clamp(34px,9vw,56px)] leading-none text-paper transition-colors duration-200 group-hover:text-crimson">
                  {link.label}
                </span>
              </a>
            ))}
            <a
              href="/Sachini-Dilrangi-CV.pdf"
              download
              onClick={close}
              className="mt-8 w-fit border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:border-crimson hover:text-crimson"
            >
              Download CV ↓
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
