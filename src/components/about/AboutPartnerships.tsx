"use client";

import { motion } from "framer-motion";
import { Landmark, Microscope, GraduationCap, HandshakeIcon, Globe } from "lucide-react";

const partnerships = [
  {
    icon: Landmark,
    title: "Government Institutions",
    description: "Working with state horticulture departments and JICA for farmer empowerment programs."
  },
  {
    icon: Microscope,
    title: "Research Organizations",
    description: "Collaborating with ICAR-DMR and biotechnology research institutes."
  },
  {
    icon: GraduationCap,
    title: "Agricultural Universities",
    description: "Supplying research-grade cultures and training materials to academic institutions."
  },
  {
    icon: HandshakeIcon,
    title: "Farmer Cooperatives",
    description: "Supporting FPO formation and providing technical assistance to farming communities."
  },
  {
    icon: Globe,
    title: "International Development Partners",
    description: "Partnering with global organizations for sustainable agricultural development."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function AboutPartnerships() {
  return (
    <section className="py-24 bg-[#f9faf7]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
              Partnerships
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-[#1c3c24]">
              Collaborating for Agricultural Growth
            </h2>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {partnerships.map((partner, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border border-[#e6e4dc] rounded-3xl p-8 group cursor-pointer hover:shadow-lg hover:-translate-y-2 hover:border-[#4e8c4a]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle green glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4e8c4a]/0 to-[#4e8c4a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-[#1c3c24] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <partner.icon className="text-white" size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-display font-black tracking-tight text-[#1c3c24] mb-4 group-hover:text-[#4e8c4a] transition-colors duration-300 relative z-10">
                {partner.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
