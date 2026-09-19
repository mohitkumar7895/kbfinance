"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function Testimonials() {
  const { testimonials } = useSiteContent();

  return (
    <section id="testimonials" className="py-10 bg-[#0A2540] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">{testimonials.eyebrow}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{testimonials.title}</h3>
          <p className="text-gray-300">{testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.items.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(Math.max(1, Math.min(5, Number(t.rating) || 5)))].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic leading-relaxed">"{t.content}"</p>
              <div>
                <h4 className="font-bold text-white text-lg">{t.name}</h4>
                <p className="text-[#D4AF37] text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
