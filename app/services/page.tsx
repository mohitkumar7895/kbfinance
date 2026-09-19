import { Metadata } from "next";
import Image from "next/image";
import EnquiryModal from "@/components/layout/EnquiryModal";
import pool from "@/lib/db";

export const metadata: Metadata = {
  title: "Services | K B Financial Services",
  description: "Explore our wide range of financial services including Investment, Insurance, Tax Planning, and Loans in Varanasi.",
};

export default async function ServicesPage() {
  let services = [];
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at ASC');
    services = (rows as any[]).map(row => ({
      ...row,
      bullets: typeof row.bullets === 'string' ? JSON.parse(row.bullets) : row.bullets
    }));
  } catch (err) {
    console.error("Failed to fetch services:", err);
  }

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Financial Services</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Helping You Build Wealth & Security with comprehensive solutions.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service: any) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-[#e4ebf5] rounded-3xl overflow-hidden shadow-md flex flex-col border border-white/50 scroll-mt-24"
              >
                <div className="relative h-72 md:h-80 w-full p-4 pb-0">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-4">{service.title}</h3>
                  <p className="text-[#0A2540]/80 text-base md:text-lg mb-6 font-medium leading-relaxed">
                    "{service.subtitle}"
                  </p>
                  <ul className="mb-10 space-y-3 flex-grow">
                    {service.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start text-base text-[#0A2540]/90">
                        <span className="mr-3 text-[#0A2540] text-[10px] mt-2">●</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  
                  <EnquiryModal
                    triggerText={service.buttonText}
                    triggerClassName="w-full bg-[#1952B3] hover:bg-[#123e8a] text-white rounded-full py-4 md:py-7 text-base font-semibold transition-colors duration-300 group"
                  />
                </div>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-10 text-gray-500">No services found.</div>
          )}

          <div className="mt-20 text-center text-sm text-gray-500 max-w-4xl mx-auto border-t pt-8">
            * All products and services are subject to eligibility criteria, submission of required documentation, and the final decision of the respective lenders or financial institutions. K B Financial Services provides guidance and assistance to facilitate the process.
          </div>
        </div>
      </section>
    </div>
  );
}
