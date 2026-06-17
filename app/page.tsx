import Link from "next/link";
import { AudienceText } from "@/components/audience-provider";
import { Icon } from "@/components/icon";

const integrationCategories = [
  {
    title: "Gestion & suivi",
    description: "Pour mieux organiser les demandes, dossiers, clients ou tâches du quotidien.",
    features: [
      "Formulaires de demande",
      "Tableaux de suivi",
      "Statuts personnalisés",
      "Recherche et filtres",
      "Exports de données",
      "Notes internes",
    ],
    icon: (
      <>
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </>
    ),
  },
  {
    title: "Espace privé & utilisateurs",
    description: "Pour donner un accès adapté à vos clients, votre équipe ou vos partenaires.",
    features: [
      "Comptes utilisateurs",
      "Espace client",
      "Espace équipe",
      "Rôles et permissions",
      "Accès sécurisés",
      "Historique des actions",
    ],
    icon: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21a7 7 0 0 1 14 0" />
        <path d="M17 11l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Administration & données",
    description: "Pour gérer vos contenus, informations et dossiers depuis une interface simple.",
    features: [
      "Espace d’administration",
      "Backoffice complet",
      "Gestion de contenus",
      "Gestion de dossiers",
      "Gestion de fichiers",
      "Tableaux de bord",
    ],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M9 20V10" />
      </>
    ),
  },
  {
    title: "Automatisation & communication",
    description: "Pour réduire les actions répétitives et mieux communiquer avec vos utilisateurs.",
    features: [
      "Emails automatiques",
      "Notifications",
      "Relances",
      "Messagerie interne",
      "Intégration IA",
      "Connexion à des outils externes",
    ],
    icon: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </>
    ),
  },
  {
    title: "Visibilité & croissance",
    description:
      "Pour présenter votre activité, générer plus de demandes et mieux comprendre vos résultats.",
    features: [
      "Site professionnel",
      "Pages de services",
      "SEO de base",
      "Tracking / statistiques",
      "Multilingue",
      "Paiement en ligne",
    ],
    icon: (
      <>
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  {
    title: "Fiabilité & conformité",
    description:
      "Pour livrer une solution plus sérieuse, maintenable et adaptée aux données traitées.",
    features: [
      "Sécurité des accès",
      "RGPD / données personnelles",
      "Tests",
      "Mise en ligne",
      "Maintenance légère",
      "Documentation / prise en main",
    ],
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
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
              sameAs: [
                "https://github.com/HippolyteDev",
                "https://www.linkedin.com/in/hippolyte-diallo-6bbbba3a1/",
                "https://www.malt.fr/profile/hippolytediallo",
              ],
              knowsAbout: [
                "Applications web sur mesure",
                "Outils internes",
                "Applications métier",
                "Sites professionnels",
                "Tableaux de bord",
                "Espaces clients",
                "Back-offices",
                "Suivi de demandes",
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
      <AudienceText
        agency={
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <p className="eyebrow">Fullstack product builder</p>
                <h1 className="h1">
                  Développeur fullstack React / Next.js / Node orienté applications métier.
                </h1>
                <p className="lead">
                  J’interviens en renfort sur des applications web complètes avec React, Next.js et
                  Node : auth, RBAC, dashboards, back-offices, données, parcours métier, tests et
                  documentation. L’objectif est de livrer des features cadrées, lisibles et
                  intégrables dans une codebase existante.
                </p>
                <div className="cta-row">
                  <Link
                    href="/socially"
                    className="button button-primary"
                    data-track="click_hero_socially"
                  >
                    Voir Socially
                  </Link>
                  <Link
                    href="/contact"
                    className="button button-secondary"
                    data-track="click_hero_contact"
                  >
                    Me contacter
                  </Link>
                </div>
                <div className="proof-list" style={{ marginTop: 28 }}>
                  <span className="badge">React</span>
                  <span className="badge">Next.js</span>
                  <span className="badge">Node.js</span>
                  <span className="badge">Auth & RBAC</span>
                  <span className="badge">Back-office</span>
                </div>
              </div>
              <figure className="product-frame">
                <img src="/image/cover.png" alt="Screenshot du feed principal de Socially" />
                <figcaption className="product-frame-caption">
                  Socially — application sociale fullstack avec feed, posts, commentaires,
                  notifications, messagerie et settings.
                </figcaption>
              </figure>
            </div>
          </section>
        }
        direct={
          <section className="hero direct-centered-hero">
            <div className="container direct-centered-hero-inner">
              <p className="eyebrow">Solutions web pour entreprises et structures indépendantes</p>
              <h1 className="h1">
                Centralisez vos données et pilotez votre activité avec un outil web sur-mesure.
              </h1>
              <p className="lead">
                Que ce soit pour gagner en visibilité ou mieux organiser votre activité, je vous
                aide à transformer un besoin concret en solution web claire, cadrée et simple à
                utiliser.
              </p>
              <div className="cta-row">
                <Link
                  href="/contact"
                  className="button button-primary"
                  data-track="click_hero_contact"
                >
                  Parler de mon besoin
                </Link>
                <Link
                  href="/entreprise/offres"
                  className="button button-secondary"
                  data-track="click_hero_offers"
                >
                  Voir les offres
                </Link>
              </div>
            </div>
          </section>
        }
      />

      <section className="section">
        <div className="container">
          <p className="eyebrow">
            <AudienceText
              agency="Ce que je prends en charge"
              direct="Ce que je peux vous construire"
            />
          </p>
          <h2 className="h2">
            <AudienceText
              agency="Renfort fullstack sur des features produit concrètes."
              direct="Des applications pratiques, pensées pour un usage réel."
            />
          </h2>
          <div className="grid-4" style={{ marginTop: 40 }}>
            <article className="card">
              <Icon>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </Icon>
              <h3 className="h3">
                <AudienceText agency="Back-office & dashboards" direct="Tableaux de bord" />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Interfaces admin, tableaux de bord, filtres, vues internes et outils de gestion."
                  direct="Une vue claire pour suivre vos clients, demandes, contenus, paiements, dossiers ou indicateurs."
                />
              </p>
            </article>
            <article className="card">
              <Icon>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </Icon>
              <h3 className="h3">
                <AudienceText agency="Auth, rôles & permissions" direct="Comptes et accès" />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Authentification, sessions, onboarding, RBAC, permissions et logique d’accès."
                  direct="Connexion sécurisée, espace privé, accès différent selon les personnes et données protégées."
                />
              </p>
            </article>
            <article className="card">
              <Icon>
                <path d="m8 8-4 4 4 4" />
                <path d="m16 8 4 4-4 4" />
                <path d="m14 4-4 16" />
              </Icon>
              <h3 className="h3">
                <AudienceText agency="Features React / Node" direct="Fonctionnalités sur mesure" />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Composants, API, validation, persistance, états, erreurs et intégration front/back."
                  direct="Formulaires, recherche, filtres, documents, messages, exports ou parcours métier."
                />
              </p>
            </article>
            <article className="card">
              <Icon>
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="6" r="3" />
                <path d="M6 15V6a3 3 0 0 1 3-3h2" />
                <path d="M9 18h6a3 3 0 0 0 3-3V9" />
              </Icon>
              <h3 className="h3">
                <AudienceText
                  agency="Reprise d’existant"
                  direct="Amélioration d’un outil existant"
                />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Lecture de codebase, correction de bugs, documentation et livraison vérifiable."
                  direct="Correction de problèmes, ajout d’écrans, simplification d’un parcours ou stabilisation d’une première version."
                />
              </p>
            </article>
          </div>
        </div>
      </section>

      <AudienceText
        agency={null}
        direct={
          <section className="section integration-section">
            <div className="container">
              <div className="integration-head">
                <p className="eyebrow">Briques utiles</p>
                <h2 className="h2">Ce que je peux intégrer à votre projet</h2>
                <p className="lead">
                  Chaque projet n’a pas besoin de tout. L’objectif est de sélectionner uniquement les
                  briques utiles pour résoudre votre problème : mieux présenter votre activité,
                  centraliser vos informations, suivre vos demandes ou créer un espace privé.
                </p>
              </div>

              <div className="integration-grid">
                {integrationCategories.map((category) => (
                  <article className="card integration-card" key={category.title}>
                    <Icon>{category.icon}</Icon>
                    <h3 className="h3">{category.title}</h3>
                    <p className="text-muted">{category.description}</p>
                    <ul className="integration-feature-list">
                      {category.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="integration-note">
                <div>
                  <p className="eyebrow">Cadrage</p>
                  <h3 className="h3">Tout n’est pas nécessaire dès le départ</h3>
                  <p className="text-muted">
                    Ces fonctionnalités sont choisies selon votre besoin réel, votre budget et le
                    niveau de complexité utile. Le but n’est pas d’ajouter des options inutiles, mais
                    de construire une solution claire, cadrée et réellement utilisable.
                  </p>
                </div>
                <div className="cta-row">
                  <Link
                    href="/contact"
                    className="button button-primary"
                    data-track="click_integrations_contact"
                  >
                    Parler de mon besoin
                  </Link>
                  <Link
                    href="/entreprise/offres"
                    className="button button-secondary"
                    data-track="click_integrations_offers"
                  >
                    Voir les offres
                  </Link>
                </div>
              </div>
            </div>
          </section>
        }
      />

      <section className="section project-showcase-dark">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">Projet principal</p>
            <h2 className="h2">
              <AudienceText
                agency="Socially — application sociale fullstack."
                direct="Socially — un exemple de solution web complète et structurée"
              />
            </h2>
            <p className="lead">
              <AudienceText
                agency="Produit construit end-to-end avec feed, posts, commentaires, notifications, messagerie, settings, logique de données et méthode proche d’une codebase professionnelle."
                direct="Socially regroupe des comptes utilisateurs, du contenu, des commentaires, des messages, des notifications et des réglages. C’est mon exemple principal pour montrer un produit complet."
              />
            </p>
            <div className="proof-list" style={{ marginTop: 28 }}>
              <AudienceText
                agency={
                  <>
                    <span className="badge">Auth</span>
                    <span className="badge">Feed</span>
                    <span className="badge">Messaging</span>
                    <span className="badge">Notifications</span>
                    <span className="badge">Prisma/PostgreSQL</span>
                  </>
                }
                direct={
                  <>
                    <span className="badge">Comptes</span>
                    <span className="badge">Contenus</span>
                    <span className="badge">Messages</span>
                    <span className="badge">Notifications</span>
                    <span className="badge">Données</span>
                  </>
                }
              />
            </div>
            <div className="cta-row">
              <Link
                href="/socially"
                className="button button-primary"
                data-track="click_socially_case_study"
              >
                <AudienceText agency="Étudier le case study" direct="Voir l’exemple détaillé" />
              </Link>
              <a
                href="https://www.socially.rocks/fr/login?utm_source=hippolytedev&utm_medium=portfolio&utm_campaign=socially_case_study"
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
                data-track="click_socially_live"
              >
                Tester le site
              </a>
            </div>
          </div>
          <figure className="product-frame">
            <img src="/image/discover.png" alt="Page Discover de Socially" />
            <figcaption className="product-frame-caption">
              <AudienceText
                agency="Discover : catégories, contenus éditoriaux, créateurs et discussions."
                direct="Une page de découverte avec contenus, catégories et profils à explorer."
              />
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">
            <AudienceText agency="Autres preuves" direct="Autres exemples" />
          </p>
          <h2 className="h2">
            <AudienceText
              agency="Projets secondaires."
              direct="Plusieurs types d’applications web."
            />
          </h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            <article className="card card-hover">
              <img
                src="/image/elevate-cover.png"
                alt="Cover du projet Elevate"
                style={{ borderRadius: 16, marginBottom: 20 }}
              />
              <h3 className="h3">Elevate</h3>
              <p className="text-muted">
                <AudienceText
                  agency="Plateforme de formation orientée SaaS avec auth, back-office, RBAC, Stripe, emails, Cloudinary et Prisma/PostgreSQL."
                  direct="Plateforme de formation avec espace privé, gestion des contenus, paiement, emails et espace d’administration."
                />
              </p>
            </article>
            <article className="card card-hover">
              <img
                src="/image/nodeshop-cover.png"
                alt="Cover du projet NodeShop"
                style={{ borderRadius: 16, marginBottom: 20 }}
              />
              <h3 className="h3">NodeShop</h3>
              <p className="text-muted">
                <AudienceText
                  agency="Projet fullstack de consolidation backend : API Express, MongoDB, sessions, validation, rate limiting, audit logs et CRUD."
                  direct="Gestion de produits avec connexion, règles de sécurité, historique des actions et interface d’administration."
                />
              </p>
            </article>
            <article className="card card-hover">
              <img
                src="/image/train-rbac-cover.png"
                alt="Cover du projet Train-RBAC"
                style={{ borderRadius: 16, marginBottom: 20 }}
              />
              <h3 className="h3">Train-RBAC</h3>
              <p className="text-muted">
                <AudienceText
                  agency="Lab orienté staff admin, rôles owner/admin/viewer, permissions, routes protégées et interface de gestion."
                  direct="Exemple d’espace équipe où chaque personne a des droits différents selon son rôle."
                />
              </p>
            </article>
          </div>
          <div className="cta-row">
            <Link href="/projets" className="button button-secondary" data-track="click_projects">
              Voir tous les projets
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
