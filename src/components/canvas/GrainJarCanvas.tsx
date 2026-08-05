"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GrainJarCanvas({ hideSidebar = false }: { hideSidebar?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCrossSection, setIsCrossSection] = useState(false);
  const isCrossSectionRef = useRef(false);
  const jarLeftRef = useRef<THREE.Group | null>(null);
  const jarRightRef = useRef<THREE.Group | null>(null);
  const splitProgressRef = useRef(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    isCrossSectionRef.current = isCrossSection;
  }, [isCrossSection]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any existing canvas elements (prevents duplicates from React strict mode)
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0x00f2fe, 1.5);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x39ff14, 0.6);
    light2.position.set(-5, -2, 2);
    scene.add(light2);

    // Main Group
    const jarGroup = new THREE.Group();
    scene.add(jarGroup);

    // Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 0.8,
      side: THREE.DoubleSide,
    });

    const lidMaterial = new THREE.MeshStandardMaterial({
      color: 0xcd853f, // Metal/brass cap
      roughness: 0.3,
      metalness: 0.8,
    });

    const grainMaterial = new THREE.MeshStandardMaterial({
      color: 0xeedc82, // Wheat flax yellow-gold
      roughness: 0.6,
    });

    const myceliumMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
    });

    // --- PROCEDURAL SPLIT GROUPS FOR JAR ---
    const leftJar = new THREE.Group();
    const rightJar = new THREE.Group();
    jarGroup.add(leftJar);
    jarGroup.add(rightJar);
    jarLeftRef.current = leftJar;
    jarRightRef.current = rightJar;

    // Left Half Glass Jar
    const jarGeoLeft = new THREE.CylinderGeometry(0.85, 0.85, 2.0, 32, 1, true, Math.PI / 2, Math.PI);
    const bodyLeft = new THREE.Mesh(jarGeoLeft, glassMaterial);
    leftJar.add(bodyLeft);

    // Right Half Glass Jar
    const jarGeoRight = new THREE.CylinderGeometry(0.85, 0.85, 2.0, 32, 1, true, -Math.PI / 2, Math.PI);
    const bodyRight = new THREE.Mesh(jarGeoRight, glassMaterial);
    rightJar.add(bodyRight);

    // Left/Right Lids
    const lidGeoLeft = new THREE.CylinderGeometry(0.9, 0.9, 0.25, 32, 1, false, Math.PI / 2, Math.PI);
    const lidLeft = new THREE.Mesh(lidGeoLeft, lidMaterial);
    lidLeft.position.y = 1.1;
    leftJar.add(lidLeft);

    const lidGeoRight = new THREE.CylinderGeometry(0.9, 0.9, 0.25, 32, 1, false, -Math.PI / 2, Math.PI);
    const lidRight = new THREE.Mesh(lidGeoRight, lidMaterial);
    lidRight.position.y = 1.1;
    rightJar.add(lidRight);

    // Bottom Base
    const baseGeoLeft = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 32, 1, false, Math.PI / 2, Math.PI);
    const baseLeft = new THREE.Mesh(baseGeoLeft, glassMaterial);
    baseLeft.position.y = -1.04;
    leftJar.add(baseLeft);

    const baseGeoRight = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 32, 1, false, -Math.PI / 2, Math.PI);
    const baseRight = new THREE.Mesh(baseGeoRight, glassMaterial);
    baseRight.position.y = -1.04;
    rightJar.add(baseRight);

    // --- PACKED GRAINS INSIDE THE JAR ---
    const grainCount = 130;
    const grainGeo = new THREE.SphereGeometry(0.12, 10, 10);
    grainGeo.scale(0.65, 1.45, 0.65); // make it grain-shaped

    for (let i = 0; i < grainCount; i++) {
      // Packed coordinate spacing inside the jar boundaries
      const angle = Math.random() * Math.PI * 2;
      const isLeft = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2;
      
      const maxRadius = 0.72;
      const r = Math.random() * maxRadius;
      const px = Math.cos(angle) * r;
      const pz = Math.sin(angle) * r;
      const py = (Math.random() - 0.5) * 1.8; // height spacing

      const grain = new THREE.Mesh(grainGeo, grainMaterial);
      grain.position.set(px, py, pz);
      grain.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

      // White fuzzy mycelium spots/capsule inside the grain
      const myceliumSpotGeo = new THREE.SphereGeometry(0.13, 8, 8);
      myceliumSpotGeo.scale(0.67, 1.47, 0.67);
      const spot = new THREE.Mesh(myceliumSpotGeo, myceliumMaterial);
      spot.scale.set(1.02, 1.02, 1.02);
      grain.add(spot);

      if (isLeft) {
        leftJar.add(grain);
      } else {
        rightJar.add(grain);
      }
    }

    // --- WEBBING MYCELIAL PATHS BETWEEN GRAINS ---
    // Curved white lines connecting adjacent spaces inside jar
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const webCount = 40;
    for (let i = 0; i < webCount; i++) {
      const points = [];
      const angle = Math.random() * Math.PI * 2;
      const isLeft = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2;

      const px = Math.cos(angle) * Math.random() * 0.68;
      const pz = Math.sin(angle) * Math.random() * 0.68;
      const py = (Math.random() - 0.5) * 1.6;

      points.push(new THREE.Vector3(px, py, pz));
      points.push(new THREE.Vector3(
        px + (Math.random() - 0.5) * 0.35,
        py + (Math.random() - 0.5) * 0.35,
        pz + (Math.random() - 0.5) * 0.35
      ));

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);

      if (isLeft) {
        leftJar.add(line);
      } else {
        rightJar.add(line);
      }
    }

    // Interactive mouse listeners
    const handleMouseEnter = () => {
      hoverRef.current = true;
    };
    const handleMouseLeave = () => {
      hoverRef.current = false;
    };

    containerRef.current.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotation settings (spins faster on hover)
      const rotSpeed = hoverRef.current ? 0.6 : 0.2;
      
      if (!isCrossSectionRef.current) {
        jarGroup.rotation.y = time * rotSpeed;
        splitProgressRef.current += (0 - splitProgressRef.current) * 0.08;
      } else {
        // Stop spinning when split so user can inspect details
        jarGroup.rotation.y = Math.sin(time * 0.25) * 0.15;
        splitProgressRef.current += (1 - splitProgressRef.current) * 0.08;
      }

      // Displace left/right halves
      if (leftJar && rightJar) {
        const displacement = splitProgressRef.current * 0.6;
        leftJar.position.x = -displacement;
        rightJar.position.x = displacement;
      }
      // Interpolate grain material color based on split progress
      const colorProgress = Math.min(splitProgressRef.current, 1.0);
      const closedColor = new THREE.Color(0xf5f5dc); // light beige colonized mycelium surface
      const openColor = new THREE.Color(0xcd853f); // raw brown grain seed color
      grainMaterial.color.lerpColors(closedColor, openColor, colorProgress);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      try {
        if (containerRef.current) {
          containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
          containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
          if (renderer.domElement && containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
          }
        }
      } catch (e) { /* ignore cleanup errors */ }

      jarGeoLeft.dispose();
      jarGeoRight.dispose();
      lidGeoLeft.dispose();
      lidGeoRight.dispose();
      baseGeoLeft.dispose();
      baseGeoRight.dispose();
      grainGeo.dispose();

      glassMaterial.dispose();
      lidMaterial.dispose();
      grainMaterial.dispose();
      myceliumMaterial.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative group">
      {/* Click Viewport to toggle cross-section split */}
      <div
        ref={containerRef}
        onClick={() => setIsCrossSection((prev) => !prev)}
        className="w-full h-full cursor-pointer"
      />
      
      {/* HUD Info panel absolute overlays */}
      {!hideSidebar && (
        <>
          <div className="absolute top-4 left-4 bg-obsidian-black/80 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none text-xs font-mono text-bio-teal select-none z-10 flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 bg-bio-teal rounded-full" />
            Click Model to {isCrossSection ? "Reassemble" : "Reveal Grains"}
          </div>

          <div className="absolute bottom-4 left-4 bg-obsidian-black/85 p-4 rounded-xl border border-white/10 max-w-[280px] pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
            <span className="text-[10px] text-bio-green font-mono uppercase block mb-0.5">Physical Substrate</span>
            <h4 className="text-white font-display font-semibold text-xs mb-1">Wheat-Mycelium Grid</h4>
            <p className="text-gray-400 text-[10px] leading-relaxed">
              Grains act as anchor points. White mycelium covers the surface and binds the grains into a dense vegetative block.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
