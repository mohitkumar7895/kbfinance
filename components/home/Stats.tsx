"use client";

import { motion } from "framer-motion";
import { Handshake, Lightbulb, ShieldCheck, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    title: "Customer-Focused",
    description: "Service tailored to you",
  },
  {
    icon: Lightbulb,
    title: "Transparent",
    description: "Clear & honest guidance",
  },
  {
    icon: Handshake,
    title: "Multiple Solutions",
    description: "Diverse financial options",
  },
  {
    icon: ShieldCheck,
    title: "Professional",
    description: "Expert assistance",
  },
];

export default function Stats() {
  return (
    <section className="relative z-20 -mt-16 px-4 md:mx-auto md:max-w-6xl md:px-0">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(10,37,64,0.12)] backdrop-blur-xl md:p-8">
        <div className="grid grid-cols-1 gap-6 divide-y divide-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={`flex flex-col items-center px-2 text-center ${index !== 0 ? "pt-6 md:pt-0" : ""}`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0FE] text-[#1952B3]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#0A2540]">{stat.title}</h3>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
