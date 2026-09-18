import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | K B Financial Services",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p>
            At K B Financial Services, protecting your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and financial details required for loan or service processing.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">2. How We Use Collected Information</h2>
          <p>
            K B Financial Services may collect and use Users&apos; personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
            <li>To process applications: We may use the information to facilitate loan processing and communication with financial institutions.</li>
            <li>To send periodic emails or SMS: We may use the email address or phone number to send User information and updates pertaining to their order or inquiry.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">3. How We Protect Your Information</h2>
          <p>
            We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">4. Sharing Your Personal Information</h2>
          <p>
            We do not sell, trade, or rent Users&apos; personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners. We may share necessary information with our partner financial institutions and lenders strictly for the purpose of processing your applications, as agreed by you.
          </p>

          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">5. Contacting Us</h2>
          <p>
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at FINANCESERVICESKB@GMAIL.COM.
          </p>
        </div>
      </div>
    </div>
  );
}
