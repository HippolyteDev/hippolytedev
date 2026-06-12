import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { AudienceProvider } from "@/components/audience-provider";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://hippolytedev.fr"),
  title: "HippolyteDev — Outils internes et applications web pour entreprises",
  description:
    "Création d’applications web sur mesure pour TPE/PME : outils internes, espaces clients, tableaux de bord, suivi de demandes et automatisation.",
  openGraph: {
    title: "HippolyteDev — Outils internes et applications web pour entreprises",
    description:
      "Applications web sur mesure pour centraliser les données, suivre les demandes et mieux organiser l’activité d’une entreprise.",
    type: "website",
    url: "https://hippolytedev.fr/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AudienceProvider>
          <ScrollReveal />
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
