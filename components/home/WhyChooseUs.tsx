"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function WhyChooseUs() {
  const { whyUs } = useSiteContent();

  return (
    <section id="why-us" className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">{whyUs.eyebrow}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">{whyUs.title}</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.items.map((reason, index) => (
            <motion.div
              key={`${reason.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#E8F0FE] text-[#1952B3] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#0A2540] mb-3">{reason.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
