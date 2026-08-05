"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Leaf, TrendingUp, Clock, Award, Target } from "lucide-react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 200, suffix: "+", label: "Farmers Supported", icon: Users },
  { value: 14, suffix: "+", label: "Mushroom Species", icon: Leaf },
  { value: 50, suffix: "%", label: "Higher Biological Efficiency", icon: TrendingUp },
  { value: 3, suffix: "", label: "Months Shelf Life", icon: Clock },
  { value: 12, suffix: "+", label: "Years Experience", icon: Award },
  { value: 100, suffix: "%", label: "Scientific Quality Focus", icon: Target },
];

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function Counter({ value, suffix, label, icon: Icon }: { value: number, suffix: string, label: string, icon: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(easeOutExpo(progress) * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-8 flex flex-col items-center">
      <div className="w-14 h-14 rounded-2xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center mb-6 text-[#1c3c24]">
        <Icon size={24} strokeWidth={2} />
      </div>
      <div className="text-5xl md:text-6xl font-display font-black text-[#1c3c24] mb-2 flex items-center justify-center">
        {count}
        <span className="text-[#4e8c4a]">{suffix}</span>
      </div>
      <div className="text-sm font-bold text-gray-600 uppercase tracking-wider mt-2">
        {label}
      </div>
    </div>
  );
}

export default function AboutImpact() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-[#1c3c24]">
              Numbers That Speak for Themselves
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 divide-y md:divide-y-0 md:gap-x-8">
          {stats.map((stat, i) => (
            <div key={i} className={`relative ${
              i % 3 !== 2 ? 'lg:after:content-[""] lg:after:absolute lg:after:right-0 lg:after:top-[20%] lg:after:h-[60%] lg:after:w-[1px] lg:after:bg-[#e6e4dc]/60' : ''
            } ${
              i % 2 !== 1 ? 'md:after:content-[""] md:after:absolute md:after:right-0 md:after:top-[20%] md:after:h-[60%] md:after:w-[1px] md:after:bg-[#e6e4dc]/60 lg:after:hidden' : ''
            } ${
              i > 0 ? 'border-[#e6e4dc]/60 pt-8 md:pt-0' : ''
            }`}>
              <Counter {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
