import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | K B Financial Services",
};

export default function Terms() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-8">Terms & Conditions</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p>
            Welcome to K B Financial Services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use K B Financial Services if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">1. Nature of Services</h2>
          <p>
            K B Financial Services acts as a consultant and facilitator. We assist clients in understanding and applying for various financial products such as loans and insurance from third-party financial institutions and banks. We do not lend money directly.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">2. Application Approval</h2>
          <p>
            All financial products and services are subject to the eligibility criteria, documentation requirements, and terms and conditions of the respective banks or financial institutions. K B Financial Services does not guarantee the approval of any loan or financial product.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">3. Accuracy of Information</h2>
          <p>
            Users must provide accurate, current, and complete information during the inquiry and application process. Any false or misleading information may result in the rejection of your application by the financial institution.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall K B Financial Services, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website or the rejection of any application by a third-party lender.
          </p>
        </div>
      </div>
    </div>
  );
}
