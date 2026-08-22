"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LiquidSpawnBottleCanvas({ hideSidebar = false }: { hideSidebar?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    camera.position.set(0, 0, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 1.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x39ff14, 0.5);
    dirLight2.position.set(-5, 0, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00f2fe, 1, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Main Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // --- MATERIALS ---
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc, // defined silver/grey profile
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
      side: THREE.DoubleSide,
    });

    const liquidMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // honey golden amber nutrient broth
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.8,
    });

    // --- GLASS BOTTLE GEOMETRY ---
    const bottleBodyGeo = new THREE.CylinderGeometry(0.9, 0.9, 2.0, 32);
    const bottleBody = new THREE.Mesh(bottleBodyGeo, glassMaterial);
    bottleGroup.add(bottleBody);

    const bottleShoulderGeo = new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bottleShoulder = new THREE.Mesh(bottleShoulderGeo, glassMaterial);
    bottleShoulder.position.y = 1.0;
    bottleGroup.add(bottleShoulder);

    const bottleNeckGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 32);
    const bottleNeck = new THREE.Mesh(bottleNeckGeo, glassMaterial);
    bottleNeck.position.y = 1.3;
    bottleGroup.add(bottleNeck);

    const capGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.3, 32);
    const cap = new THREE.Mesh(capGeo, metalMaterial);
    cap.position.y = 1.6;
    bottleGroup.add(cap);

    // --- NUTRIENT LIQUID LEVEL ---
    const liquidGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.4, 32);
    const liquid = new THREE.Mesh(liquidGeo, liquidMaterial);
    liquid.position.y = -0.3; // occupies bottom portion
    bottleGroup.add(liquid);

    // --- BUBBLES ---
    const bubbleCount = 40;
    const bubbleMeshes: THREE.Mesh[] = [];
    const bubbleGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const bubbleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
      
      // Distribute inside liquid cylinder
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.75;
      bubble.position.x = Math.cos(angle) * r;
      bubble.position.z = Math.sin(angle) * r;
      bubble.position.y = -1.0 + Math.random() * 1.4; // between bottom and top of liquid
      
      // Save custom speeds
      bubble.userData = {
        speed: Math.random() * 0.015 + 0.008,
        angleSpeed: Math.random() * 0.02,
        r,
        angle,
      };

      bottleGroup.add(bubble);
      bubbleMeshes.push(bubble);
    }

    // --- FLOATING MYCELIUM FLAKES ---
    const flakeCount = 50;
    const flakeGroup = new THREE.Group();
    const flakeGeo = new THREE.DodecahedronGeometry(0.04, 1);
    const flakeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });

    const flakes: THREE.Mesh[] = [];

    for (let i = 0; i < flakeCount; i++) {
      const flake = new THREE.Mesh(flakeGeo, flakeMat);
      
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.65;
      flake.position.x = Math.cos(angle) * r;
      flake.position.z = Math.sin(angle) * r;
      flake.position.y = -0.9 + Math.random() * 1.2;
      
      // Custom scale to look organic
      const s = Math.random() * 0.6 + 0.7;
      flake.scale.set(s, s * 1.5, s);
      flake.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

      flake.userData = {
        driftSpeedY: (Math.random() - 0.5) * 0.003,
        driftSpeedR: (Math.random() - 0.5) * 0.003,
        rotSpeed: Math.random() * 0.01,
        angle,
        r,
      };

      flakeGroup.add(flake);
      flakes.push(flake);
    }
    bottleGroup.add(flakeGroup);

    // --- SOFT GLOWING PARTICLES ---
    const glowCount = 80;
    const glowGeo = new THREE.BufferGeometry();
    const glowPos = new Float32Array(glowCount * 3);
    const glowSpeeds: number[] = [];

    for (let i = 0; i < glowCount; i++) {
      glowPos[i * 3] = (Math.random() - 0.5) * 4;
      glowPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      glowPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      glowSpeeds.push(Math.random() * 0.004 + 0.002);
    }

    glowGeo.setAttribute("position", new THREE.BufferAttribute(glowPos, 3));

    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(212, 175, 55, 1)"); // Gold core
      grad.addColorStop(0.5, "rgba(255, 165, 0, 0.3)"); // Amber outer
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const glowTexture = new THREE.CanvasTexture(canvas);

    const glowMat = new THREE.PointsMaterial({
      size: 0.15,
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const glowParticles = new THREE.Points(glowGeo, glowMat);
    if (!hideSidebar) {
      scene.add(glowParticles);
    }

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Slow idle rotation of bottle + mouse responsive tilt
      bottleGroup.rotation.y = time * 0.25 + mouseX * 0.5;
      bottleGroup.rotation.x = Math.sin(time * 0.4) * 0.05 + mouseY * 0.3;
      bottleGroup.position.y = Math.sin(time * 0.6) * 0.1; // hover floating

      // Update bubbles rising
      bubbleMeshes.forEach((bubble) => {
        bubble.position.y += bubble.userData.speed;
        
        // Add tiny lateral wobble
        bubble.userData.angle += bubble.userData.angleSpeed;
        bubble.position.x = Math.cos(bubble.userData.angle) * bubble.userData.r;
        bubble.position.z = Math.sin(bubble.userData.angle) * bubble.userData.r;

        // Reset bubble when it reaches surface of liquid (y = 0.4)
        if (bubble.position.y > 0.35) {
          bubble.position.y = -1.0;
          bubble.userData.r = Math.random() * 0.75;
        }
      });

      // Update floating flakes (slow drifting in fluid)
      flakes.forEach((flake) => {
        flake.userData.angle += 0.002;
        flake.position.y += flake.userData.driftSpeedY;
        
        // Keep them bounded inside liquid height
        if (flake.position.y > 0.3 || flake.position.y < -0.9) {
          flake.userData.driftSpeedY *= -1; // bounce
        }

        flake.userData.r += flake.userData.driftSpeedR;
        if (flake.userData.r > 0.78 || flake.userData.r < 0.1) {
          flake.userData.driftSpeedR *= -1; // bounce radially
        }

        flake.position.x = Math.cos(flake.userData.angle) * flake.userData.r;
        flake.position.z = Math.sin(flake.userData.angle) * flake.userData.r;

        flake.rotation.x += flake.userData.rotSpeed;
        flake.rotation.y += flake.userData.rotSpeed;
      });

      // Ambient particles drift
      const positions = glowGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < glowCount; i++) {
        positions[i * 3 + 1] += glowSpeeds[i];
        positions[i * 3] += Math.sin(time + i) * 0.002;

        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = -2.5;
          positions[i * 3] = (Math.random() - 0.5) * 4;
        }
      }
      glowGeo.attributes.position.needsUpdate = true;

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
      window.removeEventListener("mousemove", handleMouseMove);
      try {
        if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      } catch (e) { /* ignore cleanup errors */ }

      bottleBodyGeo.dispose();
      bottleShoulderGeo.dispose();
      bottleNeckGeo.dispose();
      capGeo.dispose();
      liquidGeo.dispose();
      bubbleGeo.dispose();
      flakeGeo.dispose();
      glowGeo.dispose();

      glassMaterial.dispose();
      liquidMaterial.dispose();
      metalMaterial.dispose();
      bubbleMat.dispose();
      flakeMat.dispose();
      glowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[480px] min-h-[450px] relative">
      <div ref={containerRef} className="w-full h-full min-h-[450px] cursor-pointer" />
    </div>
  );
}
