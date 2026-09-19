"use client";

import { motion } from "framer-motion";
import { Layers, Shield, ClipboardList, CreditCard } from "lucide-react";

const stats = [
  {
    icon: Layers,
    title: "Investment Planning",
    description: '"Smart investment strategies tailored to your goals."',
  },
  {
    icon: Shield,
    title: "Insurance Advisory",
    description: '"Protect what matters most with expert guidance."',
  },
  {
    icon: ClipboardList,
    title: "Tax & Retirement\nPlanning",
    description: '"Secure your golden years with smart tax-saving investments."',
  },
  {
    icon: CreditCard,
    title: "Loan & Credit Advisory",
    description: '"Get the best financial support for your personal and business needs."',
  },
];

export default function Stats() {
  return (
    <section className="relative z-20 mt-12 px-4 md:mx-auto md:max-w-7xl md:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center bg-white px-6 py-10 text-center shadow-[0_15px_50px_rgba(0,0,0,0.12)] rounded-xl border border-gray-100 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A3FBA] text-white shadow-lg">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A2540] whitespace-pre-line">{stat.title}</h3>
              <p className="text-[13px] font-medium text-gray-600 leading-relaxed">{stat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
