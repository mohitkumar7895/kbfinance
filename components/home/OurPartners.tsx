"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function OurPartners() {
  const { partners } = useSiteContent();

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0A2540]">{partners.title}</h3>
          <p className="text-gray-500 mt-2">{partners.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {partners.items.map((partner, index) => (
            <motion.div
              key={`${partner.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-full aspect-[21/9] md:aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gray-200 group bg-gray-50 flex items-center justify-center"
            >
              <img
                src={partner.image}
                alt={partner.name || `Partner ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
