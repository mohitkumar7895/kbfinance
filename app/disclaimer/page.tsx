import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | K B Financial Services",
};

export default function Disclaimer() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-8">Disclaimer</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p>
            The information contained on this website is for general information purposes only. The information is provided by <strong>K B Financial Services</strong>, and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>

          <div className="bg-blue-50 border-l-4 border-[#1952B3] p-6 rounded-r-lg my-8">
            <h3 className="font-bold text-[#0A2540] mb-2">Important Notice Regarding Financial Products</h3>
            <p className="text-sm">
              K B Financial Services operates strictly as an independent consultant and facilitator. We are not a bank, NBFC, or a direct lender. We assist clients in navigating the application processes for various financial products offered by third-party financial institutions.
            </p>
            <p className="text-sm mt-2 font-semibold">
              Approval of any loan, credit card, or financial product is solely at the discretion of the respective bank or financial institution based on their independent assessment of your eligibility, creditworthiness, and submission of required documentation. We do not guarantee the approval or disbursal of any funds.
            </p>
          </div>

          <p>
            In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>

          <p>
            Through this website, you may be able to link to other websites which are not under the control of K B Financial Services. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>

          <p>
            Every effort is made to keep the website up and running smoothly. However, K B Financial Services takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
          </p>
        </div>
      </div>
    </div>
  );
}
