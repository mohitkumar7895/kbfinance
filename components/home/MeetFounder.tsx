"use client";

import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function MeetFounder() {
  const { founder } = useSiteContent();

  return (
    <section id="meet-founder" className="py-10 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase mb-3">{founder.eyebrow}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540]">{founder.title}</h3>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          <div className="md:w-2/5 relative min-h-[300px] md:min-h-[400px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${founder.image}')` }}></div>
          </div>

          <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <h4 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-2">{founder.name}</h4>
            <p className="text-[#1952B3] font-medium mb-6">{founder.role}</p>
            <div className="space-y-4 text-gray-600 leading-relaxed italic border-l-4 border-[#D4AF37] pl-6">
              "{founder.bio}"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
