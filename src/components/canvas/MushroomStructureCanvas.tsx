"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface LabelData {
  id: string;
  name: string;
  desc: string;
  xPercent: number; // coordinates for HTML pointers
  yPercent: number;
}

const LABELS: LabelData[] = [
  { id: "cap", name: "Cap (Pileus)", desc: "The protective dome shield designed for moisture retention.", xPercent: 22, yPercent: 25 },
  { id: "gills", name: "Gills (Lamellae)", desc: "Radial spore-producing structures that maximize surface area.", xPercent: 78, yPercent: 42 },
  { id: "stem", name: "Stem (Stipe)", desc: "A structural column elevating the cap for spore release.", xPercent: 20, yPercent: 60 },
  { id: "mycelium", name: "Mycelium", desc: "The vegetative underground network feeding the organism.", xPercent: 75, yPercent: 82 },
  { id: "spores", name: "Spores", desc: "Single-celled microscopic seeds dispersed via ambient air flows.", xPercent: 55, yPercent: 52 },
];

export default function MushroomStructureCanvas({ hideSidebar = false }: { hideSidebar?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCrossSection, setIsCrossSection] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<LabelData | null>(LABELS[0]);
  const capLeftRef = useRef<THREE.Group | null>(null);
  const capRightRef = useRef<THREE.Group | null>(null);
  const splitProgressRef = useRef(0);
  const isCrossSectionRef = useRef(false);

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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f2fe, 1.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x39ff14, 0.6);
    fillLight.position.set(-5, -2, 2);
    scene.add(fillLight);

    // Mushroom Parent Group
    const mushroomGroup = new THREE.Group();
    scene.add(mushroomGroup);

    // Materials
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xcd853f, // Brownish golden mushroom cap
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const innerCapMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5dc, // Light beige
      roughness: 0.6,
      side: THREE.DoubleSide,
    });

    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfefe, // Off-white stem
      roughness: 0.8,
    });

    const gillMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b, // Dark brown gills
      roughness: 0.9,
      side: THREE.DoubleSide,
    });

    // --- STEM ---
    const stemGeo = new THREE.CylinderGeometry(0.18, 0.32, 2.5, 32);
    const stem = new THREE.Mesh(stemGeo, stemMaterial);
    stem.position.y = -0.5;
    mushroomGroup.add(stem);

    // --- PROCEDURAL CAP SPLIT GROUPS ---
    // Instead of one solid cap, we create left and right halves to allow split cross-section.
    const leftCapGroup = new THREE.Group();
    const rightCapGroup = new THREE.Group();
    mushroomGroup.add(leftCapGroup);
    mushroomGroup.add(rightCapGroup);
    capLeftRef.current = leftCapGroup;
    capRightRef.current = rightCapGroup;

    // Cap geometry parameters: Sphere sliced in half
    const capGeoLeft = new THREE.SphereGeometry(1.2, 32, 16, Math.PI / 2, Math.PI, 0, Math.PI / 2);
    const capGeoRight = new THREE.SphereGeometry(1.2, 32, 16, -Math.PI / 2, Math.PI, 0, Math.PI / 2);

    const capLeft = new THREE.Mesh(capGeoLeft, capMaterial);
    const capRight = new THREE.Mesh(capGeoRight, capMaterial);
    
    // Scale y to make it dome shaped
    capLeft.scale.set(1.1, 0.75, 1.1);
    capRight.scale.set(1.1, 0.75, 1.1);

    capLeft.position.y = 0.75;
    capRight.position.y = 0.75;

    leftCapGroup.add(capLeft);
    rightCapGroup.add(capRight);

    // Inner cap filling plane (flat cover for split surface when split)
    const cutSectionGeoLeft = new THREE.CircleGeometry(1.2, 32, Math.PI / 2, Math.PI);
    const cutSectionGeoRight = new THREE.CircleGeometry(1.2, 32, -Math.PI / 2, Math.PI);
    
    const cutLeft = new THREE.Mesh(cutSectionGeoLeft, innerCapMaterial);
    const cutRight = new THREE.Mesh(cutSectionGeoRight, innerCapMaterial);
    
    // Orient them along the cut plane (Z-Y plane)
    cutLeft.rotation.y = Math.PI / 2;
    cutRight.rotation.y = Math.PI / 2;
    cutLeft.scale.set(1, 0.75, 1);
    cutRight.scale.set(1, 0.75, 1);
    cutLeft.position.set(0, 0.75, 0);
    cutRight.position.set(0, 0.75, 0);

    leftCapGroup.add(cutLeft);
    rightCapGroup.add(cutRight);

    // --- GILLS ---
    // Radial gills. Thin planes rotated around Y-axis.
    const gillCount = 36;
    for (let i = 0; i < gillCount; i++) {
      const angle = (i / gillCount) * Math.PI * 2;
      const isLeft = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2;

      // Slice geometric coordinates
      const gillW = 0.8;
      const gillH = 0.3;
      const gillGeo = new THREE.PlaneGeometry(gillW, gillH);
      const gillMesh = new THREE.Mesh(gillGeo, gillMaterial);
      
      // Position and rotate
      gillMesh.position.x = Math.cos(angle) * (gillW / 2);
      gillMesh.position.z = Math.sin(angle) * (gillW / 2);
      gillMesh.position.y = 0.65;
      gillMesh.rotation.y = -angle;

      if (isLeft) {
        // Shift start point relative to split group origin
        gillMesh.position.x = Math.cos(angle) * (gillW / 2);
        leftCapGroup.add(gillMesh);
      } else {
        rightCapGroup.add(gillMesh);
      }
    }

    // --- MYCELIUM ROOT FIBERS ---
    const fiberCount = 20;
    const myceliumGroup = new THREE.Group();
    const fiberMat = new THREE.LineBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < fiberCount; i++) {
      const points = [];
      const startX = (Math.random() - 0.5) * 0.4;
      const startZ = (Math.random() - 0.5) * 0.4;
      points.push(new THREE.Vector3(startX, -1.75, startZ));

      let lastPt = new THREE.Vector3(startX, -1.75, startZ);
      const segments = 4;
      for (let j = 0; j < segments; j++) {
        const nextPt = new THREE.Vector3(
          lastPt.x + (Math.random() - 0.5) * 0.5,
          lastPt.y - 0.3 - Math.random() * 0.2,
          lastPt.z + (Math.random() - 0.5) * 0.5
        );
        points.push(nextPt);
        lastPt = nextPt;
      }

      const fiberGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(fiberGeo, fiberMat);
      myceliumGroup.add(line);
    }
    mushroomGroup.add(myceliumGroup);

    // --- FALLING SPORE PARTICLES ---
    const sporeCount = 80;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePositions = new Float32Array(sporeCount * 3);
    const sporeSpeeds: number[] = [];

    for (let i = 0; i < sporeCount; i++) {
      // Spawn radially under the gills
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.9 + 0.1;
      sporePositions[i * 3] = Math.cos(angle) * r;
      sporePositions[i * 3 + 1] = 0.5 - Math.random() * 0.5; // just under gills
      sporePositions[i * 3 + 2] = Math.sin(angle) * r;
      sporeSpeeds.push(Math.random() * 0.008 + 0.003);
    }

    sporeGeo.setAttribute("position", new THREE.BufferAttribute(sporePositions, 3));
    
    // Glowing gold texture
    const sporeCanvas = document.createElement("canvas");
    sporeCanvas.width = 8;
    sporeCanvas.height = 8;
    const sCtx = sporeCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(4, 4, 0, 4, 4, 4);
      grad.addColorStop(0, "rgba(255, 239, 155, 1)");
      grad.addColorStop(0.5, "rgba(243, 156, 18, 0.4)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 8, 8);
    }
    const sporeTex = new THREE.CanvasTexture(sporeCanvas);

    const sporeMat = new THREE.PointsMaterial({
      size: 0.15,
      map: sporeTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sporeParticles = new THREE.Points(sporeGeo, sporeMat);
    mushroomGroup.add(sporeParticles);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Slow rotation when NOT split, pause rotation during split for examination
      if (!isCrossSectionRef.current) {
        mushroomGroup.rotation.y = time * 0.15;
        // Damp split progress back to 0
        splitProgressRef.current += (0 - splitProgressRef.current) * 0.08;
      } else {
        // Slow sway
        mushroomGroup.rotation.y = Math.sin(time * 0.3) * 0.2;
        // Damp split progress to 1
        splitProgressRef.current += (1 - splitProgressRef.current) * 0.08;
      }

      // Apply cap split displacement
      if (capLeftRef.current && capRightRef.current) {
        const displacement = splitProgressRef.current * 0.55;
        // Shift left cap left (negative X relative to rotated space)
        capLeftRef.current.position.x = -displacement;
        capRightRef.current.position.x = displacement;
      }

      // Animate falling spores
      const pos = sporeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < sporeCount; i++) {
        pos[i * 3 + 1] -= sporeSpeeds[i];
        
        // Reset spore when it reaches bottom
        if (pos[i * 3 + 1] < -1.8) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.9 + 0.1;
          pos[i * 3] = Math.cos(angle) * r;
          pos[i * 3 + 1] = 0.5;
          pos[i * 3 + 2] = Math.sin(angle) * r;
        }
      }
      sporeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
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
      
      // Clean resources
      stemGeo.dispose();
      capGeoLeft.dispose();
      capGeoRight.dispose();
      cutSectionGeoLeft.dispose();
      cutSectionGeoRight.dispose();
      sporeGeo.dispose();
      
      capMaterial.dispose();
      innerCapMaterial.dispose();
      stemMaterial.dispose();
      gillMaterial.dispose();
      fiberMat.dispose();
      sporeMat.dispose();
      renderer.dispose();
    };
  }, []);

  const toggleCrossSection = () => {
    setIsCrossSection((prev) => !prev);
  };

  if (hideSidebar) {
    return (
      <div ref={containerRef} className="w-full h-full relative cursor-pointer" onClick={toggleCrossSection} />
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px] glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row">
      
      {/* Three.js viewport */}
      <div ref={containerRef} className="flex-1 w-full h-[320px] md:h-full cursor-pointer relative" onClick={toggleCrossSection}>
        <div className="absolute top-4 left-4 bg-obsidian-black/80 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none text-xs font-mono text-bio-teal select-none z-10 flex items-center gap-1.5 animate-pulse">
          <span className="w-2 h-2 bg-bio-teal rounded-full" />
          Click Canvas to {isCrossSection ? "Assemble" : "Slice Cross-Section"}
        </div>

        {/* 3D Label pointer dots in viewport */}
        {isCrossSection && (
          <div className="absolute inset-0 pointer-events-none select-none z-10">
            {LABELS.map((lbl) => (
              <button
                key={lbl.id}
                style={{ left: `${lbl.xPercent}%`, top: `${lbl.yPercent}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLabel(lbl);
                }}
                className={`absolute w-4 h-4 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto transition-all duration-300 flex items-center justify-center ${
                  selectedLabel?.id === lbl.id
                    ? "bg-bio-green border-white scale-125 ring-4 ring-bio-green/20"
                    : "bg-obsidian-black border-bio-teal hover:border-bio-green"
                }`}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Label side panel */}
      <div className="w-full md:w-[320px] border-t md:border-t-0 md:border-l border-white/10 bg-obsidian-gray/80 p-6 flex flex-col justify-between z-10">
        <div>
          <span className="text-[10px] text-bio-green font-mono uppercase tracking-widest block mb-1">Mushroom Anatomy</span>
          <h3 className="text-white font-display text-2xl font-bold tracking-wide mb-4">
            Biological Architecture
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            Unlike plants, mushrooms are fruiting bodies formed by massive, structured mycelial grids to release spores into the atmosphere. Click the canvas to trigger a structural slice-view.
          </p>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsCrossSection(false)}
              className={`flex-1 py-2 text-xs rounded-lg font-semibold tracking-wider uppercase transition-all duration-300 ${
                !isCrossSection
                  ? "bg-forest-green text-white border border-bio-green/20"
                  : "bg-obsidian-dark text-gray-500 border border-transparent hover:text-white"
              }`}
            >
              Full Model
            </button>
            <button
              onClick={() => setIsCrossSection(true)}
              className={`flex-1 py-2 text-xs rounded-lg font-semibold tracking-wider uppercase transition-all duration-300 ${
                isCrossSection
                  ? "bg-forest-green text-white border border-bio-teal/20"
                  : "bg-obsidian-dark text-gray-500 border border-transparent hover:text-white"
              }`}
            >
              Cross Section
            </button>
          </div>

          {isCrossSection && selectedLabel && (
            <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 animate-fadeIn">
              <span className="text-[10px] text-bio-teal font-mono uppercase">Component Highlight</span>
              <h4 className="font-display font-bold text-white text-base mt-0.5 mb-1">{selectedLabel.name}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{selectedLabel.desc}</p>
            </div>
          )}

          {!isCrossSection && (
            <div className="flex flex-col gap-3">
              {LABELS.map((lbl) => (
                <button
                  key={lbl.id}
                  onClick={() => {
                    setIsCrossSection(true);
                    setSelectedLabel(lbl);
                  }}
                  className="w-full text-left p-3 rounded-lg border border-white/5 hover:border-bio-teal/30 hover:bg-white/5 transition-all text-xs flex justify-between items-center group"
                >
                  <span className="font-semibold text-gray-300 group-hover:text-white">{lbl.name}</span>
                  <span className="text-bio-teal text-[10px] uppercase font-mono group-hover:underline">Inspect →</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-[10px] text-gray-600 mt-6 text-center border-t border-white/5 pt-4">
          Interactive WebGL System. Fully responsive procedural renders.
        </div>
      </div>

    </div>
  );
}
