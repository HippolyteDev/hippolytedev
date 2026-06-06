import type { Metadata } from "next";
import { AudienceText } from "@/components/audience-provider";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Contact — HippolyteDev",
  description:
    "Contacter HippolyteDev pour échanger autour de React, Next.js, Node, back-office, auth, RBAC, dashboards et applications métier.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="h1">
            <AudienceText
              agency="Échanger autour d’un besoin React / Next.js / Node."
              direct="Échanger autour d’un outil web à construire ou améliorer."
            />
          </h1>
          <p className="lead">
            <AudienceText
              agency="Contact simple : email, LinkedIn ou GitHub. Je réponds plus facilement aux demandes cadrées avec contexte, stack, objectif et type de feature."
              direct="Envoyez-moi le contexte, le problème à résoudre et ce que vous aimeriez obtenir en première version. Si le besoin est encore flou, le premier échange servira justement à le clarifier."
            />
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container grid-3">
          <a className="card card-hover" href="mailto:hippolyte.devweb@gmail.com" data-track="click_email_contact">
            <Icon>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </Icon>
            <h2 className="h3">Email</h2>
            <p className="text-muted">hippolyte.devweb@gmail.com</p>
          </a>
          <a
            className="card card-hover"
            href="https://www.linkedin.com/in/hippolyte-diallo-6bbbba3a1/"
            target="_blank"
            rel="noreferrer"
            data-track="click_linkedin_contact"
          >
            <Icon>
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </Icon>
            <h2 className="h3">LinkedIn</h2>
            <p className="text-muted">Profil professionnel, échanges et prospection.</p>
          </a>
          <AudienceText
            agency={
              <a
                className="card card-hover"
                href="https://github.com/HippolyteDev"
                target="_blank"
                rel="noreferrer"
                data-track="click_github_contact"
              >
                <Icon>
                  <path d="m8 8-4 4 4 4" />
                  <path d="m16 8 4 4-4 4" />
                  <circle cx="12" cy="12" r="1" />
                  <path d="M12 13v6" />
                  <path d="M9 19h6" />
                </Icon>
                <h2 className="h3">GitHub</h2>
                <p className="text-muted">Repos, projets, code et preuves techniques.</p>
              </a>
            }
            direct={
              <a
                className="card card-hover"
                href="https://www.malt.fr/profile/hippolytediallo"
                target="_blank"
                rel="noreferrer"
                data-track="click_malt_contact"
              >
                <Icon>
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </Icon>
                <h2 className="h3">Malt</h2>
                <p className="text-muted">Profil freelance, informations mission et prise de contact.</p>
              </a>
            }
          />
        </div>
      </section>
    </main>
  );
}
