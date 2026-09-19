import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import AboutSnippet from "@/components/home/AboutSnippet";
import Services from "@/components/home/Services";
import Workflow from "@/components/home/Workflow";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import MeetFounder from "@/components/home/MeetFounder";
import OurPartners from "@/components/home/OurPartners";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutSnippet />
      <Services />
      <Workflow />
      <MeetFounder />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <OurPartners />
    </>
  );
}
