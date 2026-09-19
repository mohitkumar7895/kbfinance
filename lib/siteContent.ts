import pool from "@/lib/db";
import { defaultSiteContent, type SiteContent } from "@/data/siteContent";

const CONTENT_KEY = "site_content";

async function ensureSettingsTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      setting_key VARCHAR(100) PRIMARY KEY,
      setting_value TEXT
    )
  `);
}

function mergeSection<T extends Record<string, any>>(defaults: T, stored?: Partial<T> | null): T {
  if (!stored || typeof stored !== "object") return defaults;
  return { ...defaults, ...stored };
}

export function mergeSiteContent(stored?: Partial<SiteContent> | null): SiteContent {
  const src = stored || {};
  return {
    hero: {
      slides: src.hero?.slides?.length ? src.hero.slides : defaultSiteContent.hero.slides,
    },
    highlights: {
      items: src.highlights?.items?.length ? src.highlights.items : defaultSiteContent.highlights.items,
    },
    about: mergeSection(defaultSiteContent.about, src.about),
    services: mergeSection(defaultSiteContent.services, src.services),
    process: {
      ...mergeSection(defaultSiteContent.process, src.process),
      steps: src.process?.steps?.length ? src.process.steps : defaultSiteContent.process.steps,
    },
    founder: mergeSection(defaultSiteContent.founder, src.founder),
    whyUs: {
      ...mergeSection(defaultSiteContent.whyUs, src.whyUs),
      items: src.whyUs?.items?.length ? src.whyUs.items : defaultSiteContent.whyUs.items,
    },
    testimonials: {
      ...mergeSection(defaultSiteContent.testimonials, src.testimonials),
      items: src.testimonials?.items?.length ? src.testimonials.items : defaultSiteContent.testimonials.items,
    },
    faq: {
      ...mergeSection(defaultSiteContent.faq, src.faq),
      items: src.faq?.items?.length ? src.faq.items : defaultSiteContent.faq.items,
    },
    partners: {
      ...mergeSection(defaultSiteContent.partners, src.partners),
      items: src.partners?.items?.length ? src.partners.items : defaultSiteContent.partners.items,
    },
    contact: mergeSection(defaultSiteContent.contact, src.contact),
    footer: mergeSection(defaultSiteContent.footer, src.footer),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    await ensureSettingsTable();
    const [rows] = await pool.execute(
      "SELECT setting_value FROM settings WHERE setting_key = ?",
      [CONTENT_KEY]
    );
    const row = (rows as any[])[0];
    if (!row?.setting_value) return defaultSiteContent;
    const parsed = JSON.parse(row.setting_value);
    return mergeSiteContent(parsed);
  } catch (error) {
    console.error("Failed to load site content:", error);
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  await ensureSettingsTable();
  const merged = mergeSiteContent(content);
  const value = JSON.stringify(merged);
  await pool.execute(
    "INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
    [CONTENT_KEY, value, value]
  );
  return merged;
}
