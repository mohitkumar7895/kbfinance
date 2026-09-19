"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import EnquiryModal from "@/components/layout/EnquiryModal";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function Services({ services }: { services: any[] }) {
  const { services: servicesCopy } = useSiteContent();
  return (
    <section id="services" className="py-10 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">{servicesCopy.eyebrow}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
            {servicesCopy.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#e4ebf5] rounded-3xl overflow-hidden shadow-md flex flex-col border border-white/50"
            >
              <div className="relative h-64 md:h-72 w-full p-3 pb-0">
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    unoptimized={service.image?.startsWith("http")}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h4 className="text-xl md:text-2xl font-bold text-[#0A2540] mb-3">{service.title}</h4>
                <p className="text-[#0A2540]/80 text-sm mb-5 font-medium leading-relaxed">
                  "{service.subtitle}"
                </p>
                <ul className="mb-8 space-y-2.5 flex-grow">
                  {(service.bullets || []).map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-[#0A2540]/90">
                      <span className="mr-2.5 text-[#0A2540] text-[8px] mt-1.5">●</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <EnquiryModal
                  triggerText={service.buttonText}
                  triggerClassName="w-full bg-[#1952B3] hover:bg-[#123e8a] text-white rounded-full py-6 font-semibold transition-colors duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
