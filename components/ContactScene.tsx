"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

export default function ContactScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(containerRef);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

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
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 6.5;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // A single, more resolved shape as the page's closing note — gold,
    // where the rest of the site's 3D pieces lead with crimson.
    const geometry = new THREE.TorusKnotGeometry(1.05, 0.32, 120, 12, 2, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0xc9a227,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let isPageVisible = document.visibilityState === "visible";
    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const timer = new THREE.Timer();
    let frameId = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!isPageVisible) return;

      timer.update();
      const t = timer.getElapsed();
      knot.rotation.y = t * 0.18 + targetX * 0.3;
      knot.rotation.x = t * 0.1 + targetY * 0.2;

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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [inView]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute right-[3vw] top-1/2 z-0 hidden h-[340px] w-[340px] -translate-y-1/2 lg:block"
    />
  );
}
