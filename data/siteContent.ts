export type HeroSlide = {
  id: number;
  title: string;
  heading: string;
  desc: string;
  image: string;
  link: string;
  buttonText: string;
  contactText: string;
};

export type HighlightItem = {
  icon: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  icon: string;
  title: string;
  description: string;
};

export type ReasonItem = {
  title: string;
  description: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PartnerItem = {
  image: string;
  name: string;
};

export type SiteContent = {
  hero: {
    slides: HeroSlide[];
  };
  highlights: {
    items: HighlightItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    image: string;
    paragraphs: string[];
    missionTitle: string;
    missionText: string;
    buttonText: string;
    pageTitle: string;
    pageSubtitle: string;
    storyTitle: string;
    storyParagraphs: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    pageTitle: string;
    pageSubtitle: string;
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    note: string;
  };
  founder: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    items: ReasonItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  partners: {
    title: string;
    subtitle: string;
    items: PartnerItem[];
  };
  contact: {
    pageTitle: string;
    pageSubtitle: string;
    heading: string;
    intro: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    hoursLabel: string;
    hours: string;
    formTitle: string;
  };
  footer: {
    brand: string;
    brandAccent: string;
    about: string;
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    slides: [
      {
        id: 1,
        title: "Personal Finance",
        heading: "Practical finance. Clearer decisions.",
        desc: "K B Financial Services helps individuals explore loans, planning, and protection with honest guidance.",
        image: "/images/hero-1.jpg",
        link: "/contact",
        buttonText: "Start Planning",
        contactText: "Contact Us",
      },
      {
        id: 2,
        title: "Business Growth",
        heading: "Strategic advisory for your business.",
        desc: "Comprehensive financial solutions designed for business expansion and working capital management.",
        image: "/images/hero-2.jpg",
        link: "/contact",
        buttonText: "Grow Your Business",
        contactText: "Contact Us",
      },
      {
        id: 3,
        title: "Market Trends",
        heading: "Data-driven insights for investment.",
        desc: "Make informed investment decisions with our expert guidance and personalized financial planning.",
        image: "/images/hero-3.jpg",
        link: "/contact",
        buttonText: "Explore Markets",
        contactText: "Contact Us",
      },
    ],
  },
  highlights: {
    items: [
      { icon: "layers", title: "Investment Planning", description: '"Smart investment strategies tailored to your goals."' },
      { icon: "shield", title: "Insurance Advisory", description: '"Protect what matters most with expert guidance."' },
      { icon: "clipboard", title: "Tax & Retirement\nPlanning", description: '"Secure your golden years with smart tax-saving investments."' },
      { icon: "creditcard", title: "Loan & Credit Advisory", description: '"Get the best financial support for your personal and business needs."' },
    ],
  },
  about: {
    eyebrow: "About Us",
    title: "Committed to Your Financial Well-being",
    image: "/images/about.jpg",
    paragraphs: [
      "Located in the heart of Varanasi at Andhrapool, K B Financial Services is dedicated to helping individuals and businesses navigate their financial journeys with confidence.",
      "Led by Sanjay Kumar Rawat, our team believes in a customer-first approach. We understand that financial decisions can be complex, which is why we focus on providing transparent, clear, and professional assistance tailored to your unique requirements.",
      "Whether you're looking for personal financial support, looking to expand your business, or seeking guidance on securing a home loan, we are here to simplify the process and connect you with the right solutions.",
    ],
    missionTitle: "Our Mission",
    missionText: "To empower our clients with transparent financial guidance and seamless service, ensuring their long-term growth and success.",
    buttonText: "Read Our Full Story",
    pageTitle: "About K B Financial Services",
    pageSubtitle: "Your trusted financial partner in Varanasi, committed to providing practical solutions and transparent guidance.",
    storyTitle: "Our Story",
    storyParagraphs: [
      "Based in Varanasi, Uttar Pradesh, K B Financial Services was founded with a clear mission: to simplify the complex world of finance for individuals and businesses alike.",
      "Under the leadership of Sanjay Kumar Rawat, our team has dedicated itself to understanding the unique challenges our clients face. We believe that access to the right financial products—whether it's a personal loan to manage unexpected expenses or a business loan to fuel growth—can transform lives and communities.",
      "At K B Financial Services, we don't just process applications. We take the time to sit down with you, understand your requirements, and present options that genuinely suit your circumstances. Our customer-centric approach means you get transparent communication every step of the way.",
    ],
  },
  services: {
    eyebrow: "Our Services",
    title: "Helping You Build Wealth & Security",
    pageTitle: "Our Financial Services",
    pageSubtitle: "Helping You Build Wealth & Security with comprehensive solutions.",
  },
  process: {
    eyebrow: "Customer Journey",
    title: "Simple & Transparent Process",
    subtitle: "We guide you through every step of your financial journey, ensuring clarity and ease.",
    steps: [
      { icon: "search", title: "Understand Your Requirement", description: "We start by carefully listening to your financial needs and goals." },
      { icon: "list", title: "Explore Suitable Options", description: "Our experts present the most practical and suitable financial options." },
      { icon: "file", title: "Submit Information & Docs", description: "Provide the required documentation and eligibility details." },
      { icon: "clock", title: "Application Processing", description: "Your application is processed efficiently with the relevant institutions." },
      { icon: "check", title: "Final Decision", description: "Approval and disbursal by the relevant lender based on their policies." },
    ],
    note: "* Please note: Approval of any financial product or service depends strictly on individual eligibility, required documentation, and the applicable policies of the relevant financial institutions or lenders. K B Financial Services acts as a facilitator and guide.",
  },
  founder: {
    eyebrow: "Leadership",
    title: "Meet The Founder",
    name: "Sanjay Kumar Rawat",
    role: "Founder & Director, K B Financial Services",
    bio: "Dedicated to helping individuals and businesses navigate their financial journeys with confidence.",
    image: "/images/about.jpg",
  },
  whyUs: {
    eyebrow: "Why K B Financial Services",
    title: "The Right Partner for Your Financial Journey",
    items: [
      { title: "Transparent Communication", description: "Clear and honest discussions about your financial options." },
      { title: "Customer-Centric", description: "Your needs and goals are at the center of everything we do." },
      { title: "Professional Assistance", description: "Expert guidance from experienced financial professionals." },
      { title: "Simple Process", description: "Streamlined procedures to save your time and effort." },
    ],
  },
  testimonials: {
    eyebrow: "Client Success Stories",
    title: "What Our Clients Say",
    subtitle: "Don't just take our word for it. Hear from the people and businesses we've helped achieve their financial goals.",
    items: [
      { name: "Rajesh Kumar", role: "Business Owner", content: "K B Financial Services helped me secure a business loan quickly when I needed to expand my operations. Their transparent process and professional guidance were exceptional.", rating: 5 },
      { name: "Sneha Singh", role: "Homeowner", content: "I never thought getting a home loan could be this stress-free. The team handled all the complex paperwork and got me the best interest rate possible.", rating: 5 },
      { name: "Amit Patel", role: "IT Professional", content: "Their financial planning advice completely changed how I look at investments. I feel much more secure about my future now. Highly recommended!", rating: 5 },
    ],
  },
  faq: {
    eyebrow: "Common Questions",
    title: "Frequently Asked Questions",
    subtitle: "Find quick answers to common queries about our financial services and loan processes.",
    items: [
      { question: "What types of loans do you provide?", answer: "We offer a wide range of loans including Personal Loans, Business Loans, Home Loans, and Vehicle Loans. We tailor the loan type to best suit your specific financial requirements." },
      { question: "What is the typical time taken for loan approval?", answer: "Loan approval times vary depending on the type of loan and completeness of your documentation. Generally, personal and vehicle loans can be approved within 2-3 working days, while home and business loans might take a week." },
      { question: "Do I need collateral for all loans?", answer: "No. Personal loans and certain types of business loans are unsecured and do not require collateral. However, home loans and vehicle loans are secured against the respective assets." },
    ],
  },
  partners: {
    title: "Our Trusted Partners",
    subtitle: "Working together to bring you the best financial solutions.",
    items: [
      { image: "/images/partner1.jpg", name: "Partner 1" },
      { image: "/images/partner2.jpg", name: "Partner 2" },
      { image: "/images/partner3.jpg", name: "Partner 3" },
    ],
  },
  contact: {
    pageTitle: "Contact Us",
    pageSubtitle: "Get in touch with our experts today. We're here to answer your questions and guide you to the right financial solutions.",
    heading: "Get In Touch",
    intro: "Whether you have a question about our services, need assistance with an application, or want to explore financial options, our team is ready to help.",
    addressLabel: "Office Address",
    address: "1st Floor, National Market, Andhrapool, Varanasi, U.P. – 221002",
    phoneLabel: "Phone Number",
    phone: "831 876 3728",
    emailLabel: "Email Address",
    email: "FINANCESERVICESKB@GMAIL.COM",
    hoursLabel: "Business Hours",
    hours: "Monday - Saturday: 10:00 AM - 7:00 PM\nSunday: Closed",
    formTitle: "Send an Inquiry",
  },
  footer: {
    brand: "K B FINANCIAL",
    brandAccent: "SERVICES",
    about: "Your trusted partner for practical financial solutions. We provide transparent guidance and customer-focused service to help individuals and businesses secure their tomorrow.",
  },
};
