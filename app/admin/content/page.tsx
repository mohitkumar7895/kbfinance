"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultSiteContent, type SiteContent } from "@/data/siteContent";
import { HIGHLIGHT_ICON_OPTIONS, PROCESS_ICON_OPTIONS } from "@/lib/sectionIcons";
import { Plus, Trash2 } from "lucide-react";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "highlights", label: "Highlights" },
  { id: "about", label: "About" },
  { id: "services", label: "Services Text" },
  { id: "process", label: "Process" },
  { id: "founder", label: "Founder" },
  { id: "whyUs", label: "Why Us" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact / Footer" },
] as const;

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1952B3]"
        />
      )}
    </div>
  );
}

export default function WebsiteContentPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("hero");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setContent(data);
      })
      .catch(() => toast({ title: "Error", description: "Could not load content.", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [toast]);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Saved", description: "Website sections updated. Refresh the live site to see changes." });
    } catch {
      toast({ title: "Error", description: "Failed to save content.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Website Content">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-gray-500">Edit every homepage and page section. Changes go live after save.</p>
          <Button onClick={save} disabled={saving || loading} className="bg-[#0A2540] hover:bg-[#1952B3] text-white">
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                tab === item.id ? "bg-[#0A2540] text-white" : "bg-white text-gray-600 border"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-8 text-gray-500">Loading content...</div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            {tab === "hero" && (
              <div className="space-y-6">
                {content.hero.slides.map((slide, index) => (
                  <div key={index} className="border rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#0A2540]">Slide {index + 1}</h4>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        hero: { slides: content.hero.slides.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Badge title" value={slide.title} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, title: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                      <Field label="Heading" value={slide.heading} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, heading: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                      <Field label="Description" textarea value={slide.desc} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, desc: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                      <Field label="Image URL" value={slide.image} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, image: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                      <Field label="Button text" value={slide.buttonText} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, buttonText: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                      <Field label="Button link" value={slide.link} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, link: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                      <Field label="Contact button text" value={slide.contactText} onChange={(v) => {
                        const slides = [...content.hero.slides]; slides[index] = { ...slide, contactText: v };
                        setContent({ ...content, hero: { slides } });
                      }} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content,
                  hero: {
                    slides: [...content.hero.slides, {
                      id: Date.now(),
                      title: "New Slide",
                      heading: "New heading.",
                      desc: "Add your description.",
                      image: "/images/hero-1.jpg",
                      link: "/contact",
                      buttonText: "Get Started",
                      contactText: "Contact Us",
                    }],
                  },
                })}><Plus className="w-4 h-4 mr-2" /> Add slide</Button>
              </div>
            )}

            {tab === "highlights" && (
              <div className="space-y-6">
                {content.highlights.items.map((item, index) => (
                  <div key={index} className="border rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between">
                      <h4 className="font-bold">Card {index + 1}</h4>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        highlights: { items: content.highlights.items.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Icon</label>
                        <select
                          value={item.icon}
                          onChange={(e) => {
                            const items = [...content.highlights.items];
                            items[index] = { ...item, icon: e.target.value };
                            setContent({ ...content, highlights: { items } });
                          }}
                          className="w-full px-4 py-2 border rounded-xl text-sm"
                        >
                          {HIGHLIGHT_ICON_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <Field label="Title" value={item.title} onChange={(v) => {
                        const items = [...content.highlights.items]; items[index] = { ...item, title: v };
                        setContent({ ...content, highlights: { items } });
                      }} />
                      <Field label="Description" value={item.description} onChange={(v) => {
                        const items = [...content.highlights.items]; items[index] = { ...item, description: v };
                        setContent({ ...content, highlights: { items } });
                      }} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content,
                  highlights: { items: [...content.highlights.items, { icon: "layers", title: "New highlight", description: "Add text" }] },
                })}><Plus className="w-4 h-4 mr-2" /> Add card</Button>
              </div>
            )}

            {tab === "about" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Home eyebrow" value={content.about.eyebrow} onChange={(v) => setContent({ ...content, about: { ...content.about, eyebrow: v } })} />
                <Field label="Home title" value={content.about.title} onChange={(v) => setContent({ ...content, about: { ...content.about, title: v } })} />
                <Field label="Image URL" value={content.about.image} onChange={(v) => setContent({ ...content, about: { ...content.about, image: v } })} />
                <Field label="Button text" value={content.about.buttonText} onChange={(v) => setContent({ ...content, about: { ...content.about, buttonText: v } })} />
                <Field label="Home paragraphs (one per line)" textarea rows={6} value={content.about.paragraphs.join("\n")} onChange={(v) => setContent({ ...content, about: { ...content.about, paragraphs: v.split("\n").filter(Boolean) } })} />
                <Field label="Mission title" value={content.about.missionTitle} onChange={(v) => setContent({ ...content, about: { ...content.about, missionTitle: v } })} />
                <Field label="Mission text" textarea value={content.about.missionText} onChange={(v) => setContent({ ...content, about: { ...content.about, missionText: v } })} />
                <Field label="About page title" value={content.about.pageTitle} onChange={(v) => setContent({ ...content, about: { ...content.about, pageTitle: v } })} />
                <Field label="About page subtitle" textarea value={content.about.pageSubtitle} onChange={(v) => setContent({ ...content, about: { ...content.about, pageSubtitle: v } })} />
                <Field label="Story title" value={content.about.storyTitle} onChange={(v) => setContent({ ...content, about: { ...content.about, storyTitle: v } })} />
                <Field label="Story paragraphs (one per line)" textarea rows={6} value={content.about.storyParagraphs.join("\n")} onChange={(v) => setContent({ ...content, about: { ...content.about, storyParagraphs: v.split("\n").filter(Boolean) } })} />
              </div>
            )}

            {tab === "services" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Home eyebrow" value={content.services.eyebrow} onChange={(v) => setContent({ ...content, services: { ...content.services, eyebrow: v } })} />
                <Field label="Home title" value={content.services.title} onChange={(v) => setContent({ ...content, services: { ...content.services, title: v } })} />
                <Field label="Services page title" value={content.services.pageTitle} onChange={(v) => setContent({ ...content, services: { ...content.services, pageTitle: v } })} />
                <Field label="Services page subtitle" textarea value={content.services.pageSubtitle} onChange={(v) => setContent({ ...content, services: { ...content.services, pageSubtitle: v } })} />
                <p className="md:col-span-2 text-sm text-gray-500">Individual service cards are managed in the Services menu.</p>
              </div>
            )}

            {tab === "process" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Eyebrow" value={content.process.eyebrow} onChange={(v) => setContent({ ...content, process: { ...content.process, eyebrow: v } })} />
                  <Field label="Title" value={content.process.title} onChange={(v) => setContent({ ...content, process: { ...content.process, title: v } })} />
                  <Field label="Subtitle" textarea value={content.process.subtitle} onChange={(v) => setContent({ ...content, process: { ...content.process, subtitle: v } })} />
                  <Field label="Footer note" textarea value={content.process.note} onChange={(v) => setContent({ ...content, process: { ...content.process, note: v } })} />
                </div>
                {content.process.steps.map((step, index) => (
                  <div key={index} className="border rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between">
                      <h4 className="font-bold">Step {index + 1}</h4>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        process: { ...content.process, steps: content.process.steps.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Icon</label>
                        <select
                          value={step.icon}
                          onChange={(e) => {
                            const steps = [...content.process.steps];
                            steps[index] = { ...step, icon: e.target.value };
                            setContent({ ...content, process: { ...content.process, steps } });
                          }}
                          className="w-full px-4 py-2 border rounded-xl text-sm"
                        >
                          {PROCESS_ICON_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <Field label="Title" value={step.title} onChange={(v) => {
                        const steps = [...content.process.steps]; steps[index] = { ...step, title: v };
                        setContent({ ...content, process: { ...content.process, steps } });
                      }} />
                      <Field label="Description" value={step.description} onChange={(v) => {
                        const steps = [...content.process.steps]; steps[index] = { ...step, description: v };
                        setContent({ ...content, process: { ...content.process, steps } });
                      }} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content,
                  process: { ...content.process, steps: [...content.process.steps, { icon: "check", title: "New step", description: "Add details" }] },
                })}><Plus className="w-4 h-4 mr-2" /> Add step</Button>
              </div>
            )}

            {tab === "founder" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Eyebrow" value={content.founder.eyebrow} onChange={(v) => setContent({ ...content, founder: { ...content.founder, eyebrow: v } })} />
                <Field label="Title" value={content.founder.title} onChange={(v) => setContent({ ...content, founder: { ...content.founder, title: v } })} />
                <Field label="Name" value={content.founder.name} onChange={(v) => setContent({ ...content, founder: { ...content.founder, name: v } })} />
                <Field label="Role" value={content.founder.role} onChange={(v) => setContent({ ...content, founder: { ...content.founder, role: v } })} />
                <Field label="Image URL" value={content.founder.image} onChange={(v) => setContent({ ...content, founder: { ...content.founder, image: v } })} />
                <Field label="Bio" textarea rows={5} value={content.founder.bio} onChange={(v) => setContent({ ...content, founder: { ...content.founder, bio: v } })} />
              </div>
            )}

            {tab === "whyUs" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Eyebrow" value={content.whyUs.eyebrow} onChange={(v) => setContent({ ...content, whyUs: { ...content.whyUs, eyebrow: v } })} />
                  <Field label="Title" value={content.whyUs.title} onChange={(v) => setContent({ ...content, whyUs: { ...content.whyUs, title: v } })} />
                </div>
                {content.whyUs.items.map((item, index) => (
                  <div key={index} className="border rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between">
                      <h4 className="font-bold">Reason {index + 1}</h4>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        whyUs: { ...content.whyUs, items: content.whyUs.items.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                    <Field label="Title" value={item.title} onChange={(v) => {
                      const items = [...content.whyUs.items]; items[index] = { ...item, title: v };
                      setContent({ ...content, whyUs: { ...content.whyUs, items } });
                    }} />
                    <Field label="Description" textarea value={item.description} onChange={(v) => {
                      const items = [...content.whyUs.items]; items[index] = { ...item, description: v };
                      setContent({ ...content, whyUs: { ...content.whyUs, items } });
                    }} />
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content, whyUs: { ...content.whyUs, items: [...content.whyUs.items, { title: "New reason", description: "Add details" }] },
                })}><Plus className="w-4 h-4 mr-2" /> Add reason</Button>
              </div>
            )}

            {tab === "testimonials" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Eyebrow" value={content.testimonials.eyebrow} onChange={(v) => setContent({ ...content, testimonials: { ...content.testimonials, eyebrow: v } })} />
                  <Field label="Title" value={content.testimonials.title} onChange={(v) => setContent({ ...content, testimonials: { ...content.testimonials, title: v } })} />
                  <Field label="Subtitle" textarea value={content.testimonials.subtitle} onChange={(v) => setContent({ ...content, testimonials: { ...content.testimonials, subtitle: v } })} />
                </div>
                {content.testimonials.items.map((item, index) => (
                  <div key={index} className="border rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between">
                      <h4 className="font-bold">Review {index + 1}</h4>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        testimonials: { ...content.testimonials, items: content.testimonials.items.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Field label="Name" value={item.name} onChange={(v) => {
                        const items = [...content.testimonials.items]; items[index] = { ...item, name: v };
                        setContent({ ...content, testimonials: { ...content.testimonials, items } });
                      }} />
                      <Field label="Role" value={item.role} onChange={(v) => {
                        const items = [...content.testimonials.items]; items[index] = { ...item, role: v };
                        setContent({ ...content, testimonials: { ...content.testimonials, items } });
                      }} />
                      <Field label="Rating (1-5)" value={String(item.rating)} onChange={(v) => {
                        const items = [...content.testimonials.items]; items[index] = { ...item, rating: Number(v) || 5 };
                        setContent({ ...content, testimonials: { ...content.testimonials, items } });
                      }} />
                    </div>
                    <Field label="Review" textarea value={item.content} onChange={(v) => {
                      const items = [...content.testimonials.items]; items[index] = { ...item, content: v };
                      setContent({ ...content, testimonials: { ...content.testimonials, items } });
                    }} />
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content,
                  testimonials: { ...content.testimonials, items: [...content.testimonials.items, { name: "Client", role: "Customer", content: "Great service.", rating: 5 }] },
                })}><Plus className="w-4 h-4 mr-2" /> Add review</Button>
              </div>
            )}

            {tab === "faq" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Eyebrow" value={content.faq.eyebrow} onChange={(v) => setContent({ ...content, faq: { ...content.faq, eyebrow: v } })} />
                  <Field label="Title" value={content.faq.title} onChange={(v) => setContent({ ...content, faq: { ...content.faq, title: v } })} />
                  <Field label="Subtitle" textarea value={content.faq.subtitle} onChange={(v) => setContent({ ...content, faq: { ...content.faq, subtitle: v } })} />
                </div>
                {content.faq.items.map((item, index) => (
                  <div key={index} className="border rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between">
                      <h4 className="font-bold">FAQ {index + 1}</h4>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        faq: { ...content.faq, items: content.faq.items.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                    <Field label="Question" value={item.question} onChange={(v) => {
                      const items = [...content.faq.items]; items[index] = { ...item, question: v };
                      setContent({ ...content, faq: { ...content.faq, items } });
                    }} />
                    <Field label="Answer" textarea value={item.answer} onChange={(v) => {
                      const items = [...content.faq.items]; items[index] = { ...item, answer: v };
                      setContent({ ...content, faq: { ...content.faq, items } });
                    }} />
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content,
                  faq: { ...content.faq, items: [...content.faq.items, { question: "New question?", answer: "Add answer." }] },
                })}><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
              </div>
            )}

            {tab === "partners" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Title" value={content.partners.title} onChange={(v) => setContent({ ...content, partners: { ...content.partners, title: v } })} />
                  <Field label="Subtitle" value={content.partners.subtitle} onChange={(v) => setContent({ ...content, partners: { ...content.partners, subtitle: v } })} />
                </div>
                {content.partners.items.map((item, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 border rounded-2xl p-4">
                    <Field label="Partner name" value={item.name} onChange={(v) => {
                      const items = [...content.partners.items]; items[index] = { ...item, name: v };
                      setContent({ ...content, partners: { ...content.partners, items } });
                    }} />
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Field label="Logo / image URL" value={item.image} onChange={(v) => {
                          const items = [...content.partners.items]; items[index] = { ...item, image: v };
                          setContent({ ...content, partners: { ...content.partners, items } });
                        }} />
                      </div>
                      <Button variant="ghost" onClick={() => setContent({
                        ...content,
                        partners: { ...content.partners, items: content.partners.items.filter((_, i) => i !== index) },
                      })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setContent({
                  ...content,
                  partners: { ...content.partners, items: [...content.partners.items, { name: "Partner", image: "/images/partner1.jpg" }] },
                })}><Plus className="w-4 h-4 mr-2" /> Add partner</Button>
              </div>
            )}

            {tab === "contact" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Contact page title" value={content.contact.pageTitle} onChange={(v) => setContent({ ...content, contact: { ...content.contact, pageTitle: v } })} />
                <Field label="Contact page subtitle" textarea value={content.contact.pageSubtitle} onChange={(v) => setContent({ ...content, contact: { ...content.contact, pageSubtitle: v } })} />
                <Field label="Heading" value={content.contact.heading} onChange={(v) => setContent({ ...content, contact: { ...content.contact, heading: v } })} />
                <Field label="Intro" textarea value={content.contact.intro} onChange={(v) => setContent({ ...content, contact: { ...content.contact, intro: v } })} />
                <Field label="Address label" value={content.contact.addressLabel} onChange={(v) => setContent({ ...content, contact: { ...content.contact, addressLabel: v } })} />
                <Field label="Address" textarea value={content.contact.address} onChange={(v) => setContent({ ...content, contact: { ...content.contact, address: v } })} />
                <Field label="Phone label" value={content.contact.phoneLabel} onChange={(v) => setContent({ ...content, contact: { ...content.contact, phoneLabel: v } })} />
                <Field label="Phone" value={content.contact.phone} onChange={(v) => setContent({ ...content, contact: { ...content.contact, phone: v } })} />
                <Field label="Email label" value={content.contact.emailLabel} onChange={(v) => setContent({ ...content, contact: { ...content.contact, emailLabel: v } })} />
                <Field label="Email" textarea value={content.contact.email} onChange={(v) => setContent({ ...content, contact: { ...content.contact, email: v } })} />
                <Field label="Hours label" value={content.contact.hoursLabel} onChange={(v) => setContent({ ...content, contact: { ...content.contact, hoursLabel: v } })} />
                <Field label="Hours" textarea value={content.contact.hours} onChange={(v) => setContent({ ...content, contact: { ...content.contact, hours: v } })} />
                <Field label="Form title" value={content.contact.formTitle} onChange={(v) => setContent({ ...content, contact: { ...content.contact, formTitle: v } })} />
                <Field label="Footer brand" value={content.footer.brand} onChange={(v) => setContent({ ...content, footer: { ...content.footer, brand: v } })} />
                <Field label="Footer brand accent" value={content.footer.brandAccent} onChange={(v) => setContent({ ...content, footer: { ...content.footer, brandAccent: v } })} />
                <Field label="Footer about text" textarea value={content.footer.about} onChange={(v) => setContent({ ...content, footer: { ...content.footer, about: v } })} />
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
