"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SpawnMorphCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); // 0: Seed, 1: Colonization, 2: Spawn Bottle
  const stageRef = useRef(0);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

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
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 1.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x39ff14, 0.8);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // Main Group
    const morphGroup = new THREE.Group();
    scene.add(morphGroup);

    // --- STAGE 0: RAW WHEAT SEED MODEL ---
    // Oval/ellipsoid geometry for seed grain
    const seedGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const seedMat = new THREE.MeshStandardMaterial({
      color: 0xd2b48c, // Tan/golden wheat color
      roughness: 0.6,
      bumpScale: 0.05,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    seedMesh.scale.set(0.6, 1.2, 0.5); // Morph into grain shape
    morphGroup.add(seedMesh);

    // --- STAGE 1: MYCELIUM COATING ---
    // Fine web of white lines surrounding the seed
    const myceliumGroup = new THREE.Group();
    const fiberMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const fiberCount = 40;
    for (let i = 0; i < fiberCount; i++) {
      const points = [];
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const rx = 0.62 * 0.7;
      const ry = 1.22 * 0.7;
      const rz = 0.52 * 0.7;

      const start = new THREE.Vector3(
        rx * Math.sin(phi) * Math.cos(theta),
        ry * Math.cos(phi),
        rz * Math.sin(phi) * Math.sin(theta)
      );
      points.push(start);

      // Organic winding paths along surface
      let current = start.clone();
      for (let j = 0; j < 4; j++) {
        const next = new THREE.Vector3(
          current.x + (Math.random() - 0.5) * 0.15,
          current.y + (Math.random() - 0.5) * 0.15,
          current.z + (Math.random() - 0.5) * 0.15
        ).normalize();
        
        // Match grain proportions
        next.x *= rx + 0.05;
        next.y *= ry + 0.05;
        next.z *= rz + 0.05;

        points.push(next);
        current = next;
      }

      const fiberGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(fiberGeo, fiberMat);
      myceliumGroup.add(line);
    }
    morphGroup.add(myceliumGroup);

    // Fuzzy outer cloud for colonizing grain
    const fuzzyGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const fuzzyMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0, // starts invisible
      wireframe: true,
    });
    const fuzzyMesh = new THREE.Mesh(fuzzyGeo, fuzzyMat);
    fuzzyMesh.scale.set(0.62, 1.22, 0.52);
    morphGroup.add(fuzzyMesh);

    // --- STAGE 2: SPAWN BOTTLE & GRAINS ---
    // A translucent laboratory flask/bottle
    const bottleGroup = new THREE.Group();
    
    // Glass cylinder
    const bottleGeo = new THREE.CylinderGeometry(0.9, 1.1, 2.4, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
      side: THREE.DoubleSide,
    });
    const bottleGlass = new THREE.Mesh(bottleGeo, glassMat);
    bottleGroup.add(bottleGlass);

    // Top neck ring
    const neckGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 32);
    const neckMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
    });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = 1.4;
    bottleGroup.add(neck);

    // Bottom base lid
    const baseGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.1, 32);
    const baseMesh = new THREE.Mesh(baseGeo, neckMat);
    baseMesh.position.y = -1.25;
    bottleGroup.add(baseMesh);

    // Tiny multiple colonized grains inside the bottle
    const miniGrainsGroup = new THREE.Group();
    const miniGrainCount = 24;
    const miniGrainGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const miniGrainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
    });

    for (let i = 0; i < miniGrainCount; i++) {
      const grain = new THREE.Mesh(miniGrainGeo, miniGrainMat);
      
      // Distribute in cylindrical cylinder space
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.65;
      const px = Math.cos(angle) * r;
      const pz = Math.sin(angle) * r;
      const py = (Math.random() - 0.5) * 1.6; // height bounds inside bottle
      
      grain.position.set(px, py, pz);
      grain.scale.set(0.6, 1.4, 0.6);
      grain.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      
      // Mini mycelium fibers around mini grains
      const ringGeo = new THREE.RingGeometry(0.24, 0.28, 8);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x39ff14,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      grain.add(ring);

      miniGrainsGroup.add(grain);
    }
    bottleGroup.add(miniGrainsGroup);
    morphGroup.add(bottleGroup);

    // Animation variables
    let animId: number;
    let clock = new THREE.Clock();

    // Lerp values
    let currentSeedScale = new THREE.Vector3(0.6, 1.2, 0.5);
    let currentSeedOpacity = 1.0;
    let currentMyceliumOpacity = 0.0;
    let currentFuzzyOpacity = 0.0;
    let currentBottleScale = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Sway model organically
      morphGroup.rotation.y = time * 0.4;
      morphGroup.rotation.x = Math.sin(time * 0.5) * 0.15;

      // Target configurations depending on stage
      let targetSeedScale = new THREE.Vector3(0.6, 1.2, 0.5);
      let targetSeedOpacity = 1.0;
      let targetMyceliumOpacity = 0.0;
      let targetFuzzyOpacity = 0.0;
      let targetBottleScale = new THREE.Vector3(0.001, 0.001, 0.001); // invisible

      if (stageRef.current === 0) {
        // Stage 0: Just wheat seed
        targetSeedScale.set(0.9, 1.5, 0.7);
        targetSeedOpacity = 1.0;
        targetMyceliumOpacity = 0.0;
        targetFuzzyOpacity = 0.0;
        targetBottleScale.set(0.001, 0.001, 0.001);
      } else if (stageRef.current === 1) {
        // Stage 1: Seed colonizing (mycelium appears, seed fades slightly and turns white)
        targetSeedScale.set(0.9, 1.5, 0.7);
        targetSeedOpacity = 0.65;
        targetMyceliumOpacity = 1.0;
        targetFuzzyOpacity = 0.55;
        targetBottleScale.set(0.001, 0.001, 0.001);
      } else if (stageRef.current === 2) {
        // Stage 2: Transforms into a full spawn bottle container
        targetSeedScale.set(0.001, 0.001, 0.001); // dissolve original giant seed
        targetSeedOpacity = 0.0;
        targetMyceliumOpacity = 0.0;
        targetFuzzyOpacity = 0.0;
        targetBottleScale.set(1.4, 1.4, 1.4); // Bottle scales up!
      }

      // Smooth Lerping
      currentSeedScale.lerp(targetSeedScale, 0.08);
      currentSeedOpacity += (targetSeedOpacity - currentSeedOpacity) * 0.08;
      currentMyceliumOpacity += (targetMyceliumOpacity - currentMyceliumOpacity) * 0.08;
      currentFuzzyOpacity += (targetFuzzyOpacity - currentFuzzyOpacity) * 0.08;
      currentBottleScale.lerp(targetBottleScale, 0.08);

      // Apply transformations
      seedMesh.scale.copy(currentSeedScale);
      
      // Update seed color (morph from tan to white/light grey as it colonizes)
      if (stageRef.current === 1) {
        seedMat.color.lerp(new THREE.Color(0xf5f5f5), 0.08);
      } else if (stageRef.current === 0) {
        seedMat.color.lerp(new THREE.Color(0xd2b48c), 0.08);
      }
      seedMat.transparent = true;
      seedMat.opacity = currentSeedOpacity;

      // Update mycelium fibers transparency
      myceliumGroup.traverse((child) => {
        if (child instanceof THREE.Line) {
          const mat = child.material as THREE.LineBasicMaterial;
          mat.opacity = currentMyceliumOpacity * 0.85;
        }
      });

      // Update fuzzy coating mesh
      fuzzyMesh.scale.copy(currentSeedScale).multiplyScalar(1.03);
      fuzzyMat.opacity = currentFuzzyOpacity * 0.25;

      // Scale spawn bottle
      bottleGroup.scale.copy(currentBottleScale);
      
      // Rotate mini-grains inside the bottle at different rates
      miniGrainsGroup.rotation.y = time * 0.15;

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
        if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      } catch (e) { /* ignore cleanup errors */ }

      seedGeo.dispose();
      bottleGeo.dispose();
      neckGeo.dispose();
      baseGeo.dispose();
      miniGrainGeo.dispose();
      seedMat.dispose();
      glassMat.dispose();
      neckMat.dispose();
      miniGrainMat.dispose();
      fuzzyMat.dispose();
      fiberMat.dispose();
      renderer.dispose();
    };
  }, []);

  const STAGES = [
    { title: "1. Raw Wheat Grain", desc: "A nutrient-rich grain seed (wheat, millet, or sorghum) acting as a biological substrate carrier." },
    { title: "2. Liquid Inoculation", desc: "Pure mother culture is injected, releasing mycelial hyphae that digest nutrients and spread across grains." },
    { title: "3. Fully Colonized Spawn", desc: "The matrix transforms into a solid white block of active mycelium, packaged under ultra-sterile cold chain." },
  ];

  return (
    <div className="w-full h-full min-h-[500px] glass-panel rounded-3xl overflow-hidden flex flex-col">
      {/* Visual Port */}
      <div ref={containerRef} className="flex-1 w-full h-[320px] md:h-[380px] relative">
        <div className="absolute top-4 left-4 bg-obsidian-black/80 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none text-xs font-mono text-bio-green select-none z-10 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-bio-green rounded-full animate-ping" />
          Active Morph Stage: {stage + 1}/3
        </div>

        {/* Floating details overlay */}
        <div className="absolute bottom-4 right-4 pointer-events-none select-none z-10 text-right">
          <span className="text-[10px] text-bio-teal font-mono uppercase block">Active Component</span>
          <span className="text-white font-display text-sm font-semibold uppercase tracking-wider">
            {stage === 0 ? "Starch Substrate" : stage === 1 ? "Mycelial Colonization" : "Commercial Spawn Bottle"}
          </span>
        </div>
      </div>

      {/* Control panel and explanations */}
      <div className="bg-obsidian-gray/80 p-6 border-t border-white/10 z-10">
        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setStage(idx)}
              className={`flex-1 py-2.5 text-xs rounded-xl font-bold tracking-wider transition-all duration-300 ${
                stage === idx
                  ? "bg-forest-green text-white border border-bio-teal/30 shadow-lg shadow-forest-green/20"
                  : "bg-obsidian-dark text-gray-500 border border-transparent hover:text-white"
              }`}
            >
              Stage {idx + 1}
            </button>
          ))}
        </div>

        <div className="min-h-[70px] animate-fadeIn">
          <h4 className="font-display font-bold text-white text-lg mb-1">{STAGES[stage].title}</h4>
          <p className="text-gray-400 text-xs leading-relaxed">{STAGES[stage].desc}</p>
        </div>
      </div>
    </div>
  );
}
