"use client";

import { createContext, useContext } from "react";
import { defaultSiteContent, type SiteContent } from "@/data/siteContent";

const SiteContentContext = createContext<SiteContent>(defaultSiteContent);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
