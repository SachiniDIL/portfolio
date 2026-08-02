"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

interface Piece {
  mesh: THREE.Mesh;
  spinX: number;
  spinY: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

export default function ArsenalScene() {
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
    camera.position.z = 6;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // A loose cluster of small wireframe polyhedra — scattered tools, not a
    // single dominant shape, kept low-opacity so it reads as background
    // texture rather than competing with the tag cloud in front of it.
    const geometries = [
      new THREE.TetrahedronGeometry(0.55, 0),
      new THREE.OctahedronGeometry(0.45, 0),
      new THREE.IcosahedronGeometry(0.5, 0),
    ];
    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0xc8102e,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xc9a227,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
    ];

    const pieces: Piece[] = geometries.map((geometry, i) => {
      const mesh = new THREE.Mesh(geometry, materials[i % materials.length]);
      scene.add(mesh);
      return {
        mesh,
        spinX: 0.15 + i * 0.07,
        spinY: 0.22 - i * 0.05,
        orbitRadius: 0.9 + i * 0.4,
        orbitSpeed: 0.12 + i * 0.04,
        orbitOffset: (i * Math.PI * 2) / geometries.length,
      };
    });

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
      for (const p of pieces) {
        p.mesh.rotation.x = t * p.spinX;
        p.mesh.rotation.y = t * p.spinY;
        const angle = t * p.orbitSpeed + p.orbitOffset;
        p.mesh.position.x = Math.cos(angle) * p.orbitRadius;
        p.mesh.position.y = Math.sin(angle) * p.orbitRadius * 0.6;
      }

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
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
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
      className="pointer-events-none absolute bottom-0 right-[2vw] z-0 hidden h-[320px] w-[320px] lg:block"
    />
  );
}
