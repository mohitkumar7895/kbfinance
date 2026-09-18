import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import Calculator from "@/components/home/Calculator";
import Workflow from "@/components/home/Workflow";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutSnippet from "@/components/home/AboutSnippet";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Calculator />
      <Workflow />
      <WhyChooseUs />
      <AboutSnippet />
    </>
  );
}
