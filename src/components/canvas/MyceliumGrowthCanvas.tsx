"use client";

import React, { useEffect, useRef } from "react";

interface Branch {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  width: number;
}

export default function MyceliumGrowthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.clientWidth || 300);
    let height = (canvas.height = canvas.clientHeight || 300);

    let branches: Branch[] = [];
    const maxBranches = 80;

    // Initialize seed branches at the center bottom
    const initBranches = () => {
      branches = [];
      for (let i = 0; i < 5; i++) {
        branches.push({
          x: width / 2,
          y: height - 10,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          life: 0,
          maxLife: Math.random() * 100 + 80,
          width: Math.random() * 2 + 1.5,
        });
      }
    };
    initBranches();

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;

      // Spawn new threads from cursor occasionally
      if (branches.length < maxBranches && Math.random() < 0.15) {
        branches.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 0,
          maxLife: Math.random() * 50 + 30,
          width: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Semi-transparent overlay to create trailing fade effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Draw active branches
      for (let i = branches.length - 1; i >= 0; i--) {
        const b = branches[i];
        
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);

        // Mycelium steering logic towards mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - b.x;
          const dy = mouseRef.current.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 5) {
            // Apply gentle steering force towards mouse coordinates
            b.vx += (dx / dist) * 0.12;
            b.vy += (dy / dist) * 0.12;
          }
        }

        // Add organic noise/jiggle
        b.vx += (Math.random() - 0.5) * 0.4;
        b.vy += (Math.random() - 0.5) * 0.4;

        // Speed cap
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        const maxSpeed = 3.5;
        if (speed > maxSpeed) {
          b.vx = (b.vx / speed) * maxSpeed;
          b.vy = (b.vy / speed) * maxSpeed;
        }

        // Move
        const nextX = b.x + b.vx;
        const nextY = b.y + b.vy;

        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = "rgba(0, 242, 254, 0.75)";
        ctx.lineWidth = b.width * (1 - b.life / b.maxLife);
        ctx.shadowColor = "rgba(0, 242, 254, 0.5)";
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Update positions
        b.x = nextX;
        b.y = nextY;
        b.life++;

        // Branching off mutation
        if (b.life < b.maxLife && branches.length < maxBranches && Math.random() < 0.02) {
          branches.push({
            x: b.x,
            y: b.y,
            vx: b.vx * 0.8 + (Math.random() - 0.5) * 1.5,
            vy: b.vy * 0.8 + (Math.random() - 0.5) * 1.5,
            life: 0,
            maxLife: b.maxLife * 0.7,
            width: b.width * 0.75,
          });
        }

        // Remove dead branches or keep them within screens
        if (b.life >= b.maxLife || b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
          branches.splice(i, 1);
        }
      }

      // Re-seed if all branches die out
      if (branches.length === 0) {
        initBranches();
      }
    };

    render();

    // Resize
    const handleResize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      initBranches();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block bg-obsidian-black/90" />
      
      {/* Interactive visual prompts */}
      <div className="absolute top-4 right-4 bg-obsidian-black/80 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none text-xs font-mono text-bio-teal select-none z-10 flex items-center gap-1.5 animate-pulse">
        <span className="w-2 h-2 bg-bio-teal rounded-full" />
        Move Mouse to Guide Growth
      </div>
    </div>
  );
}
