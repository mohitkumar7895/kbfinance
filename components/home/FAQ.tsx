"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function FAQ() {
  const { faq } = useSiteContent();

  return (
    <section id="faq" className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">{faq.eyebrow}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">{faq.title}</h3>
          <p className="text-gray-600">{faq.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion className="w-full">
            {faq.items.map((item, i) => (
              <AccordionItem key={`${item.question}-${i}`} value={`item-${i}`} className="border-b border-gray-200 py-2">
                <AccordionTrigger className="text-left text-lg font-semibold text-[#0A2540] hover:text-[#1952B3] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
