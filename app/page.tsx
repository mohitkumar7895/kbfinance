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
import pool from "@/lib/db";

export default async function Home() {
  let services = [];
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at ASC');
    services = (rows as any[]).map(row => ({
      ...row,
      bullets: typeof row.bullets === 'string' ? JSON.parse(row.bullets) : row.bullets
    }));
  } catch (err) {
    console.error("Failed to fetch services for home:", err);
  }

  return (
    <>
      <Hero />
      <Stats />
      <AboutSnippet />
      <Services services={services} />
      <Workflow />
      <MeetFounder />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <OurPartners />
    </>
  );
}
