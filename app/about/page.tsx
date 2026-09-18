import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | K B Financial Services",
  description: "Learn more about K B Financial Services and our commitment to helping individuals and businesses achieve their financial goals in Varanasi.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About K B Financial Services</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Your trusted financial partner in Varanasi, committed to providing practical solutions and transparent guidance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl font-bold text-[#0A2540] mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Based in Varanasi, Uttar Pradesh, <strong>K B Financial Services</strong> was founded with a clear mission: to simplify the complex world of finance for individuals and businesses alike.
                </p>
                <p>
                  Under the leadership of <strong>Sanjay Kumar Rawat</strong>, our team has dedicated itself to understanding the unique challenges our clients face. We believe that access to the right financial products—whether it&apos;s a personal loan to manage unexpected expenses or a business loan to fuel growth—can transform lives and communities.
                </p>
                <p>
                  At K B Financial Services, we don&apos;t just process applications. We take the time to sit down with you, understand your requirements, and present options that genuinely suit your circumstances. Our customer-centric approach means you get transparent communication every step of the way.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0A2540] mb-6 border-b pb-4">Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Business Owner</h4>
                  <p className="text-xl font-medium text-[#1952B3]">Sanjay Kumar Rawat</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Office Address</h4>
                  <p className="text-gray-700">1st Floor, National Market, Andhrapool<br/>Varanasi, U.P. – 221002</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</h4>
                  <p className="text-gray-700">7081000063</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-[#1952B3]">FINANCESERVICESKB@GMAIL.COM</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
