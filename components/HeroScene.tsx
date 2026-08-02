"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Crimson outer shell, gold inner core — the same "structure resolving
    // out of complexity" motif used throughout the blog cover art.
    const outerGeometry = new THREE.IcosahedronGeometry(2.1, 0);
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8102e,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    scene.add(outer);

    const innerGeometry = new THREE.OctahedronGeometry(1.05, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xc9a227,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(inner);

    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let isIntersecting = true;
    const io = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    });
    io.observe(container);

    let isPageVisible = document.visibilityState === "visible";
    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const clock = new THREE.Clock();
    let frameId = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!isIntersecting || !isPageVisible) return;

      const t = clock.getElapsedTime();
      outer.rotation.y = t * 0.15 + targetX * 0.3;
      outer.rotation.x = t * 0.08 + targetY * 0.2;
      inner.rotation.y = -t * 0.3;
      inner.rotation.x = t * 0.22;

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      outerGeometry.dispose();
      outerMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute right-[2vw] top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 lg:block xl:right-[5vw] xl:h-[480px] xl:w-[480px]"
    />
  );
}
