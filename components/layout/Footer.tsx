"use client";

import { useSiteContent } from "@/components/content/SiteContentProvider";

export default function AboutPage() {
  const { about, contact, founder } = useSiteContent();

  return (
    <div className="bg-white">
      <section className="bg-[#0A2540] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{about.pageTitle}</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">{about.pageSubtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0A2540] mb-6">{about.storyTitle}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                {about.storyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0A2540] mb-6 border-b pb-4">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Business Owner</h4>
                  <p className="text-xl font-medium text-[#1952B3]">{founder.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{contact.addressLabel}</h4>
                  <p className="text-gray-700 whitespace-pre-line">{contact.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{contact.phoneLabel}</h4>
                  <p className="text-gray-700">{contact.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{contact.emailLabel}</h4>
                  <p className="text-[#1952B3]">{contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
