"use client";

import { useEffect, useState, type RefObject } from "react";

// Shared by every 3D scene on the page so each only creates its WebGL
// context while actually near the viewport, and tears it down once
// scrolled well away — browsers cap how many WebGL contexts a single page
// may hold open at once, so this keeps that count small regardless of how
// many 3D accents the page has.
export function useInViewport(ref: RefObject<HTMLElement | null>, rootMargin = "200px 0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Some environments are slow (or fail) to deliver the
    // IntersectionObserver's first callback — seed the initial state
    // synchronously from the element's actual position so already-visible
    // content (like a hero piece) isn't left waiting on it. The observer
    // still takes over afterward for ongoing scroll-in/scroll-out tracking.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
    }

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
