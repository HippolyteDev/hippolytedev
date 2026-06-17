import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hippolyte Diallo — Développeur web freelance à Lyon",
  description:
    "À propos de Hippolyte Diallo, développeur web freelance à Lyon sous le nom HippolyteDev. Sites professionnels, outils internes et applications web sur mesure.",
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title: "Hippolyte Diallo — Développeur web freelance à Lyon",
    description:
      "Hippolyte Diallo, développeur web freelance à Lyon sous le nom HippolyteDev, conçoit des sites professionnels, outils internes et applications web sur mesure.",
    url: "https://hippolytedev.fr/a-propos",
    type: "profile",
  },
};

const sameAsLinks = [
  "https://www.linkedin.com/in/hippolyte-diallo-6bbbba3a1/",
  "https://www.malt.fr/profile/hippolytediallo",
  "https://github.com/HippolyteDev",
];

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: "À propos de Hippolyte Diallo",
            url: "https://hippolytedev.fr/a-propos",
            mainEntity: {
              "@type": "Person",
              name: "Hippolyte Diallo",
              alternateName: "HippolyteDev",
              jobTitle: "Développeur web freelance",
              url: "https://hippolytedev.fr",
              email: "mailto:hippolyte.devweb@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lyon",
                addressCountry: "FR",
              },
              areaServed: ["Lyon", "France"],
              sameAs: sameAsLinks,
              knowsAbout: [
                "Applications web sur mesure",
                "Outils internes",
                "Applications métier",
                "Sites professionnels",
                "Tableaux de bord",
                "Espaces clients",
                "Back-offices",
                "Automatisation",
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "PostgreSQL",
              ],
              description:
                "Hippolyte Diallo est développeur web freelance à Lyon sous le nom HippolyteDev. Il conçoit des sites professionnels, outils internes et applications web sur mesure pour entreprises, indépendants et structures associatives.",
            },
          }),
        }}
      />

      <section className="hero">
        <div className="container">
          <p className="eyebrow">À propos</p>
          <h1 className="h1">Hippolyte Diallo, développeur web freelance à Lyon.</h1>
          <p className="lead">
            Je suis Hippolyte Diallo, développeur web freelance à Lyon sous le nom HippolyteDev. Je
            conçois des sites professionnels, outils internes et applications web sur mesure pour
            entreprises, indépendants et structures associatives.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container grid-2">
          <article className="card">
            <p className="eyebrow">Identité</p>
            <h2 className="h3">HippolyteDev est mon portfolio professionnel.</h2>
            <p className="text-muted">
              Ce site relie clairement mon nom, Hippolyte Diallo, à mon activité freelance et à mes
              profils professionnels. J’y présente mon travail, mes offres et mes réalisations sans
              multiplier les identités séparées.
            </p>
          </article>

          <article className="card">
            <p className="eyebrow">Positionnement</p>
            <h2 className="h3">Des solutions web utiles pour mieux organiser une activité.</h2>
            <p className="text-muted">
              Je travaille sur des besoins concrets : présence web professionnelle, suivi de
              demandes, tableaux de bord, espaces privés, outils internes, backoffices et
              améliorations d’applications existantes.
            </p>
          </article>

          <article className="card">
            <p className="eyebrow">Preuve</p>
            <h2 className="h3">Socially comme réalisation principale.</h2>
            <p className="text-muted">
              Socially montre ma capacité à construire une application complète avec comptes,
              contenus, messages, notifications, réglages et logique de données. C’est ma preuve
              principale sur ce portfolio.
            </p>
            <div className="cta-row">
              <Link href="/socially" className="button button-secondary">
                Voir Socially
              </Link>
            </div>
          </article>

          <article className="card">
            <p className="eyebrow">Liens</p>
            <h2 className="h3">Profils associés à Hippolyte Diallo.</h2>
            <p className="text-muted">
              Mes profils LinkedIn, Malt et GitHub permettent de vérifier mes informations, mes
              projets et mes moyens de contact.
            </p>
            <div className="cta-row">
              <a
                href="https://www.linkedin.com/in/hippolyte-diallo-6bbbba3a1/"
                className="button button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://www.malt.fr/profile/hippolytediallo"
                className="button button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Malt
              </a>
              <a
                href="https://github.com/HippolyteDev"
                className="button button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
