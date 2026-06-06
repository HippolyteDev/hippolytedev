"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AudienceText } from "@/components/audience-provider";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="section-sm section-dark">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">HippolyteDev</p>
          <h2 className="h2">
            <AudienceText
              agency="Développeur fullstack orienté produit."
              direct="Développeur d’outils web pour petites structures"
            />
          </h2>
          <p className="lead">
            <AudienceText
              agency="React / Next.js / Node — applications métier, back-offices, auth, RBAC, dashboards et produits web complets."
              direct="Outils internes, espaces clients, tableaux de bord, automatisations et applications web utiles au quotidien."
            />
          </p>
        </div>
        <div className="card card-on-dark">
          <h3 className="h3">Liens</h3>
          <p className="text-muted">
            <a href="mailto:hippolyte.devweb@gmail.com" data-track="click_email">
              hippolyte.devweb@gmail.com
            </a>
          </p>
          <p className="text-muted">
            <a
              href="https://www.linkedin.com/in/hippolyte-diallo-6bbbba3a1/"
              target="_blank"
              rel="noreferrer"
              data-track="click_linkedin"
            >
              LinkedIn
            </a>
          </p>
          <p className="text-muted">
            <AudienceText
              agency={
                <a
                  href="https://github.com/HippolyteDev"
                  target="_blank"
                  rel="noreferrer"
                  data-track="click_github"
                >
                  GitHub
                </a>
              }
              direct={
                <a
                  href="https://www.socially.rocks/fr/login?utm_source=hippolytedev&utm_medium=portfolio&utm_campaign=footer_demo"
                  target="_blank"
                  rel="noreferrer"
                  data-track="click_socially_demo_footer"
                >
                  Démo Socially
                </a>
              }
            />
          </p>
          <p className="text-muted">
            <Link href="/confidentialite">Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
