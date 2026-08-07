"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NodeData {
  name: string;
  pos: [number, number, number];
  description: string;
}

const NODES: NodeData[] = [
  { name: "Forest Canopy", pos: [-3, 1, -1], description: "Natural biological reservoir and spore repository." },
  { name: "Research Centers", pos: [-1.5, -0.2, 1], description: "Genomic sequencing and hybrid strain creation." },
  { name: "Biotech Lab", pos: [0, 0.6, 0], description: "Pure culture isolation and liquid bioreactor systems." },
  { name: "Government Hub", pos: [2.5, 1.0, -1], description: "Agricultural policy, certifications, and partnerships." },
  { name: "Commercial Farms", pos: [1.8, -1.0, 1], description: "Mass colonization and high-yield fruiting chambers." },
  { name: "Rural Farmers", pos: [-2, -1.2, 0.5], description: "Empowering growers with high-efficiency grain spawn." },
  { name: "Export Hubs", pos: [0.5, -1.3, -0.5], description: "Global cold-chain distribution of sterile spawn." },
];

export default function MyceliumHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    
    // Light background and fog
    scene.background = new THREE.Color(0xfcfbfa);
    scene.fog = new THREE.FogExp2(0xfcfbfa, 0.18);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 6.2;
    camera.position.y = 0.3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x083b1e, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x16a34a, 1.2, 8);
    pointLight.position.set(0, 1.0, 0);
    scene.add(pointLight);

    // Main Group
    const nodeGroup = new THREE.Group();
    const nodeMeshes: THREE.Mesh[] = [];

    // --- INSERT THE MUSHROOM ON THE SOIL LINE ---
    const mushroomGroup = new THREE.Group();
    mushroomGroup.position.set(0, 1.35, 0); // Positioned exactly on the boundary/soil surface

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.8, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xdfdad0, // Organic mushroom cream stem
      roughness: 0.8,
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = -0.4;
    mushroomGroup.add(stem);

    // Cap
    const capGeo = new THREE.SphereGeometry(0.48, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x083b1e, // Premium rich forest green cap
      roughness: 0.3,
      metalness: 0.1,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.scale.set(1.15, 0.65, 1.15);
    cap.position.y = 0.0;
    mushroomGroup.add(cap);

    // Gills under the cap
    const gillsGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.05, 24);
    const gillsMat = new THREE.MeshStandardMaterial({
      color: 0x8b7355, // Brown gills
      roughness: 0.9,
    });
    const gills = new THREE.Mesh(gillsGeo, gillsMat);
    gills.position.y = -0.02;
    mushroomGroup.add(gills);

    nodeGroup.add(mushroomGroup);

    // Create Mycelium Node Spheres
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    
    NODES.forEach((node) => {
      // Glow material
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0x0d9488, // Rich teal for high visibility on light background
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(...node.pos);
      mesh.userData = { ...node };
      
      // Node core
      const coreGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x083b1e }); // Forest green core
      const core = new THREE.Mesh(coreGeo, coreMat);
      mesh.add(core);

      // Node outer glow ring
      const ringGeo = new THREE.RingGeometry(0.18, 0.22, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x16a34a, // Green ring
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.name = "glowRing";
      mesh.add(ring);

      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    });
    scene.add(nodeGroup);

    // Connecting Lines (Mycelium Threads) - Forest Green for light background contrast
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x083b1e,
      transparent: true,
      opacity: 0.25,
      blending: THREE.NormalBlending,
    });

    const linesGroup = new THREE.Group();
    const connections: [THREE.Vector3, THREE.Vector3][] = [];

    // Connect nodes semi-randomly but ensure it spans everything
    for (let i = 0; i < nodeMeshes.length; i++) {
      for (let j = i + 1; j < nodeMeshes.length; j++) {
        const dist = nodeMeshes[i].position.distanceTo(nodeMeshes[j].position);
        if (dist < 4.2 || (i === 2) || (j === 2)) {
          connections.push([nodeMeshes[i].position, nodeMeshes[j].position]);

          const start = nodeMeshes[i].position;
          const end = nodeMeshes[j].position;
          
          const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          midPoint.y += (Math.random() - 0.5) * 0.4;
          midPoint.x += (Math.random() - 0.5) * 0.4;
          midPoint.z += (Math.random() - 0.5) * 0.4;

          const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
          const curvePoints = curve.getPoints(16);
          const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
          const line = new THREE.Line(lineGeo, lineMaterial);
          linesGroup.add(line);
        }
      }
      
      // Also connect the mushroom root stem to the central Biotech Lab node
      const stemBasePos = new THREE.Vector3(0, 0.9, 0);
      const labPos = nodeMeshes[2].position;
      const rootCurve = new THREE.QuadraticBezierCurve3(
        stemBasePos,
        new THREE.Vector3(0, 0.75, 0),
        labPos
      );
      const rootPoints = rootCurve.getPoints(12);
      const rootGeo = new THREE.BufferGeometry().setFromPoints(rootPoints);
      const rootLine = new THREE.Line(rootGeo, new THREE.LineBasicMaterial({
        color: 0x16a34a,
        transparent: true,
        opacity: 0.5,
      }));
      linesGroup.add(rootLine);
    }
    scene.add(linesGroup);

    // Floating Spores (Darker teal and green particles for light background visibility)
    const sporeCount = 120;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePositions = new Float32Array(sporeCount * 3);
    const sporeSpeeds: number[] = [];

    for (let i = 0; i < sporeCount; i++) {
      sporePositions[i * 3] = (Math.random() - 0.5) * 8;
      sporePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      sporePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sporeSpeeds.push(Math.random() * 0.004 + 0.002);
    }

    sporeGeo.setAttribute("position", new THREE.BufferAttribute(sporePositions, 3));
    
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(8, 59, 30, 0.8)");
      grad.addColorStop(0.5, "rgba(13, 148, 136, 0.4)");
      grad.addColorStop(1, "rgba(252, 251, 250, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const sporeTexture = new THREE.CanvasTexture(canvas);

    const sporeMat = new THREE.PointsMaterial({
      size: 0.1,
      map: sporeTexture,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const sporeParticles = new THREE.Points(sporeGeo, sporeMat);
    scene.add(sporeParticles);

    // Data Flow Particles (Green traveling dots)
    const flows: {
      mesh: THREE.Mesh;
      start: THREE.Vector3;
      end: THREE.Vector3;
      progress: number;
      speed: number;
    }[] = [];

    const flowGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const flowMat = new THREE.MeshBasicMaterial({
      color: 0x16a34a,
      transparent: true,
      opacity: 0.8,
    });

    const createFlow = () => {
      if (connections.length === 0) return;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const reverse = Math.random() > 0.5;
      const start = reverse ? conn[1] : conn[0];
      const end = reverse ? conn[0] : conn[1];

      const mesh = new THREE.Mesh(flowGeo, flowMat);
      mesh.position.copy(start);
      scene.add(mesh);

      flows.push({
        mesh,
        start,
        end,
        progress: 0,
        speed: Math.random() * 0.01 + 0.005,
      });
    };

    for (let i = 0; i < 6; i++) {
      createFlow();
    }

    // Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current = { x: mouse.x, y: mouse.y };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate groups slightly for parallax effect
      nodeGroup.rotation.y = elapsedTime * 0.015 + mouseRef.current.x * 0.03;
      nodeGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.02 + mouseRef.current.y * 0.03;
      linesGroup.rotation.y = nodeGroup.rotation.y;
      linesGroup.rotation.x = nodeGroup.rotation.x;

      // Gentle mushroom rotation offset
      mushroomGroup.rotation.y = -elapsedTime * 0.04;

      // Animate Outer Rings
      nodeMeshes.forEach((mesh) => {
        const ring = mesh.getObjectByName("glowRing");
        if (ring) {
          ring.rotation.z += 0.01;
          const scale = 1 + Math.sin(elapsedTime * 4 + mesh.position.x) * 0.15;
          ring.scale.set(scale, scale, 1);
        }
      });

      // Spore drift animation
      const positions = sporeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < sporeCount; i++) {
        positions[i * 3 + 1] += sporeSpeeds[i];
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.001;
        
        if (positions[i * 3 + 1] > 3) {
          positions[i * 3 + 1] = -3;
          positions[i * 3] = (Math.random() - 0.5) * 8;
        }
      }
      sporeGeo.attributes.position.needsUpdate = true;

      // Data Flow updates
      for (let i = flows.length - 1; i >= 0; i--) {
        const flow = flows[i];
        flow.progress += flow.speed;
        
        flow.mesh.position.lerpVectors(flow.start, flow.end, flow.progress);
        
        const pulse = 1 + Math.sin(elapsedTime * 10 + i) * 0.15;
        flow.mesh.scale.set(pulse, pulse, pulse);

        if (flow.progress >= 1) {
          scene.remove(flow.mesh);
          flow.mesh.geometry.dispose();
          flows.splice(i, 1);
          createFlow();
        }
      }

      // Raycaster for active node detection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        const data = mesh.userData as NodeData;
        setActiveNode(data);
        
        mesh.scale.set(1.4, 1.4, 1.4);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.setHex(0x16a34a); // Glow green on hover
        
        document.body.style.cursor = "pointer";
      } else {
        setActiveNode(null);
        document.body.style.cursor = "default";
        
        nodeMeshes.forEach((mesh) => {
          mesh.scale.set(1, 1, 1);
          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.color.setHex(0x0d9488); // Reset to teal
        });
      }

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
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      try {
        if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      } catch (e) { /* ignore cleanup errors */ }
      
      nodeGeo.dispose();
      stemGeo.dispose();
      capGeo.dispose();
      gillsGeo.dispose();
      sporeGeo.dispose();
      flowGeo.dispose();
      sporeMat.dispose();
      flowMat.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full select-none overflow-hidden bg-[#fcfbfa]">
      {/* Node details HUD overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fcfbfa]/90 border border-[#e5e1d5] px-6 py-4 rounded-xl max-w-sm pointer-events-none transition-all duration-300 transform opacity-100 translate-y-0 z-20 shadow-md">
        {activeNode ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-bio-green animate-pulse" />
              <h4 className="font-display font-bold text-gray-900 text-sm tracking-wider">{activeNode.name}</h4>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">{activeNode.description}</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-bio-teal animate-ping" />
              <h4 className="font-display text-gray-700 text-xs tracking-wider uppercase font-semibold">Active Mycelial Network</h4>
            </div>
            <p className="text-gray-500 text-[10px]">Hover mouse over biological nodes to inspect network connections.</p>
          </div>
        )}
      </div>

      <div className="absolute top-12 left-10 pointer-events-none select-none z-10 flex flex-col gap-1">
        <span className="text-[10px] text-bio-green font-mono uppercase tracking-widest">SporoNova Bio-grid</span>
        <h3 className="text-gray-900 font-display text-sm font-semibold tracking-wide">THE UNDERGROUND SYNERGY</h3>
      </div>
    </div>
  );
}
