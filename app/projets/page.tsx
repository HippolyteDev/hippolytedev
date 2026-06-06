import type { Metadata } from "next";
import Link from "next/link";
import { AudienceText } from "@/components/audience-provider";

export const metadata: Metadata = {
  title: "Projets — HippolyteDev",
  description: "Projets fullstack : Socially, Elevate, NodeShop et Train-RBAC.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Projets</p>
          <h1 className="h1">
            <AudienceText
              agency="Des projets orientés produits web complets."
              direct="Des exemples d’applications web concrètes."
            />
          </h1>
          <p className="lead">
            <AudienceText
              agency="Je garde volontairement peu de projets : un projet principal très complet, puis des projets secondaires qui montrent des axes techniques spécifiques."
              direct="Je mets en avant peu de projets, mais chacun montre un type de besoin réel: espace privé, outil interne, paiement, rôles, données ou interface de gestion."
            />
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <article className="card grid-2">
            <figure className="product-frame">
              <img src="/image/cover.png" alt="Cover Socially" />
            </figure>
            <div>
              <p className="eyebrow">Projet principal</p>
              <h2 className="h2">Socially</h2>
              <p className="lead">
                <AudienceText
                  agency="Application sociale fullstack avec feed, posts, commentaires, notifications, messagerie, settings et logique produit. Le module back-office/modération sera ajouté au portfolio une fois stabilisé."
                  direct="Application complète avec comptes, contenus, commentaires, messages, notifications et réglages. C’est mon principal exemple de produit web construit en profondeur."
                />
              </p>
              <div className="proof-list" style={{ marginTop: 24 }}>
                <AudienceText
                  agency={
                    <>
                      <span className="badge">Next.js</span>
                      <span className="badge">Prisma</span>
                      <span className="badge">PostgreSQL</span>
                      <span className="badge">Auth</span>
                      <span className="badge">Messaging</span>
                    </>
                  }
                  direct={
                    <>
                      <span className="badge">Comptes</span>
                      <span className="badge">Données</span>
                      <span className="badge">Messages</span>
                      <span className="badge">Notifications</span>
                    </>
                  }
                />
              </div>
              <div className="cta-row">
                <Link className="button button-primary" href="/socially" data-track="click_project_socially">
                  Voir le case study
                </Link>
                <AudienceText
                  agency={
                    <a
                      className="button button-secondary"
                      href="https://github.com/HippolyteDev/socially"
                      target="_blank"
                      rel="noreferrer"
                      data-track="click_socially_repo"
                    >
                      Voir le code
                    </a>
                  }
                  direct={null}
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">
            <AudienceText agency="Projets secondaires" direct="Autres exemples" />
          </p>
          <h2 className="h2">
            <AudienceText agency="Autres preuves techniques." direct="D’autres cas d’usage." />
          </h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            <ProjectCard
              image="/image/elevate-cover.png"
              alt="Cover Elevate"
              title="Elevate"
              agency="Plateforme de formation orientée SaaS avec espace public, back-office, Better Auth, RBAC, Stripe, emails transactionnels, Cloudinary et Prisma/PostgreSQL."
              direct="Plateforme de formation avec espace privé, administration, paiement, emails et gestion de contenus."
              badges={["Next.js", "Better Auth", "Stripe", "Prisma"]}
              live="https://elevate.hippolytedev.fr/"
              repo="https://github.com/HippolyteDev/elevate"
              trackLive="click_elevate_live"
              trackRepo="click_elevate_repo"
            />
            <ProjectCard
              image="/image/nodeshop-cover.png"
              alt="Cover NodeShop"
              title="NodeShop"
              agency="Projet fullstack de consolidation backend avec frontend Next.js et API Node/Express/MongoDB : sessions, validation, sécurité HTTP, rate limiting, audit logs et CRUD produit."
              direct="Gestion de produits avec connexion, sécurité, historique des actions et interface simple pour administrer les données."
              badges={["Node.js", "Express", "MongoDB", "Audit logs"]}
              live="https://nodeshop.hippolytedev.fr/"
              repo="https://github.com/HippolyteDev/nodeshop"
              trackLive="click_nodeshop_live"
              trackRepo="click_nodeshop_repo"
            />
            <ProjectCard
              image="/image/train-rbac-cover.png"
              alt="Cover Train-RBAC"
              title="Train-RBAC"
              agency="Projet ciblé sur un espace staff admin : rôles owner/admin/viewer, sessions Express, routes protégées, middleware permission et interface de gestion des membres."
              direct="Espace équipe avec accès différents selon les personnes: propriétaire, administrateur ou lecture seule."
              badges={["RBAC", "Express", "MongoDB", "Next.js"]}
              live="https://rbac.hippolytedev.fr/"
              repo="https://github.com/HippolyteDev/TRAIN-RBAC"
              trackLive="click_train_rbac_live"
              trackRepo="click_train_rbac_repo"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectCard(props: {
  image: string;
  alt: string;
  title: string;
  agency: string;
  direct: string;
  badges: string[];
  live: string;
  repo: string;
  trackLive: string;
  trackRepo: string;
}) {
  return (
    <article className="card card-hover">
      <img src={props.image} alt={props.alt} style={{ borderRadius: 16, marginBottom: 20 }} />
      <h3 className="h3">{props.title}</h3>
      <p className="text-muted">
        <AudienceText agency={props.agency} direct={props.direct} />
      </p>
      <div className="proof-list" style={{ marginTop: 20 }}>
        {props.badges.map((badge) => (
          <span className="badge" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <div className="cta-row">
        <a href={props.live} className="button button-primary" data-track={props.trackLive}>
          Tester le site
        </a>
        <AudienceText
          agency={
            <a
              href={props.repo}
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
              data-track={props.trackRepo}
            >
              Voir le code
            </a>
          }
          direct={null}
        />
      </div>
    </article>
  );
}
