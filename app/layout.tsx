import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { AudienceProvider } from "@/components/audience-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://hippolytedev.fr"),
  title: "HippolyteDev — Fullstack React / Next.js / Node",
  description:
    "Développeur fullstack React / Next.js / Node orienté applications métier, back-offices, dashboards, auth/RBAC, APIs et produits web complets.",
  openGraph: {
    title: "HippolyteDev — Fullstack React / Next.js / Node",
    description:
      "Applications métier, back-offices, dashboards, auth/RBAC, APIs et features fullstack cadrées.",
    type: "website",
    url: "https://hippolytedev.fr/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AudienceProvider>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <SiteHeader />
          {children}
          <SiteFooter />
        </AudienceProvider>
      </body>
    </html>
  );
}
