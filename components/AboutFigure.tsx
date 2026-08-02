"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

// An abstract wireframe figure built from primitives — not a rigged
// character model (that needs an actual .glb asset), but a stylized
// humanoid silhouette in the same wireframe language as the rest of the
// site's 3D pieces.
interface Figure {
  group: THREE.Group;
  materials: THREE.Material[];
}

function buildFigure(): Figure {
  const group = new THREE.Group();

  const bodyMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8102e,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const headMaterial = new THREE.MeshBasicMaterial({
    color: 0xc9a227,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 10), headMaterial);
  head.position.set(0, 2.3, 0);
  group.add(head);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.3, 4, 8), bodyMaterial);
  torso.position.set(0, 1.3, 0);
  group.add(torso);

  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 1.0, 4, 6), bodyMaterial);
  leftArm.position.set(-0.62, 1.35, 0);
  leftArm.rotation.z = 0.32;
  group.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 1.0, 4, 6), bodyMaterial);
  rightArm.position.set(0.62, 1.35, 0);
  rightArm.rotation.z = -0.32;
  group.add(rightArm);

  const leftLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 1.2, 4, 6), bodyMaterial);
  leftLeg.position.set(-0.24, 0.05, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 1.2, 4, 6), bodyMaterial);
  rightLeg.position.set(0.24, 0.05, 0);
  group.add(rightLeg);

  group.position.y = -1.3;
  return { group, materials: [bodyMaterial, headMaterial] };
}

export default function AboutFigure() {
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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 6.5;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const { group: figure, materials } = buildFigure();
    scene.add(figure);

    let targetX = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
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
      figure.rotation.y = Math.sin(t * 0.3) * 0.5 + targetX * 0.25;
      figure.position.y = -1.3 + Math.sin(t * 0.8) * 0.06;

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
      figure.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
        }
      });
      materials.forEach((material) => material.dispose());
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
      className="pointer-events-none absolute right-[3vw] top-1/2 z-0 hidden h-[360px] w-[280px] -translate-y-1/2 lg:block"
    />
  );
}
