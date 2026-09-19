"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/content/SiteContentProvider";
import { getSectionIcon } from "@/lib/sectionIcons";

export default function Workflow() {
  const { process } = useSiteContent();

  return (
    <section id="workflow" className="py-10 bg-[#0A2540] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">{process.eyebrow}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">{process.title}</h3>
          <p className="text-blue-100 text-lg">{process.subtitle}</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#1952B3]/50"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative z-10">
            {process.steps.map((step, index) => {
              const Icon = getSectionIcon(step.icon);
              return (
                <motion.div
                  key={`${step.title}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[#1952B3] flex items-center justify-center mb-6 shadow-[0_0_0_8px_rgba(25,82,179,0.2)] border-2 border-white/20 relative">
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D4AF37] text-[#0A2540] font-bold flex items-center justify-center text-sm border-2 border-[#0A2540]">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                  <p className="text-sm text-blue-200">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-white/50 max-w-4xl mx-auto border-t border-white/10 pt-8">
          {process.note}
        </div>
      </div>
    </section>
  );
}
