import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workflow agence — HippolyteDev",
  description:
    "Ma méthode de travail proche agence : tickets, branches Git, commits lisibles, pull requests, reviews, CI, tests, corrections et documentation.",
};

const workflowSteps = [
  {
    title: "1. Ticket",
    text: "Une tâche part d’un besoin cadré : objectif, scope, fichiers probables, risques et critères de validation.",
  },
  {
    title: "2. Branche",
    text: "Chaque sujet est isolé dans une branche thématique pour éviter les changements mélangés et garder une lecture claire.",
  },
  {
    title: "3. Commit",
    text: "Je vise un commit = une intention, avec un message compréhensible et un diff qui raconte une étape précise.",
  },
  {
    title: "4. Pull request",
    text: "La PR sert à relire le changement comme une livraison : contexte, impact, risques, choix techniques et vérifications.",
  },
  {
    title: "5. Review",
    text: "Je challenge la logique métier, la sécurité, les edge cases, la maintenabilité et les effets de bord possibles.",
  },
  {
    title: "6. CI & tests",
    text: "Les checks pertinents doivent passer : lint, typecheck, tests ciblés ou validation manuelle selon le risque du changement.",
  },
  {
    title: "7. Corrections",
    text: "Une review n’est pas décorative : je reprends les points faibles, simplifie ce qui doit l’être et relance les vérifications.",
  },
  {
    title: "8. Documentation",
    text: "Je documente les décisions importantes, les limites connues et les points à reprendre quand cela aide la maintenance.",
  },
];

export default function AgencyWorkflowPage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Workflow agence</p>
          <h1 className="h1">Une méthode de travail proche d’une équipe produit.</h1>
          <p className="lead">
            N’ayant pas encore d’expérience agence réelle, j’ai volontairement construit mes projets
            avec une méthode proche des conditions d’équipe : tickets, branches Git, commits
            lisibles, pull requests, reviews, CI, tests, documentation et corrections itératives.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container grid-3">
          <article className="card">
            <h2 className="h3">Pas seulement coder</h2>
            <p className="text-muted">
              Je m’entraîne à livrer une tâche complète : comprendre le besoin, isoler le
              changement, vérifier les effets de bord et produire une livraison relisible.
            </p>
          </article>
          <article className="card">
            <h2 className="h3">Réduire le risque</h2>
            <p className="text-muted">
              L’objectif est de rendre mon travail lisible et vérifiable : scope clair, commits
              propres, PR documentées, checks, captures et limites connues.
            </p>
          </article>
          <article className="card">
            <h2 className="h3">M’intégrer à une équipe</h2>
            <p className="text-muted">
              Je travaille ma capacité à rejoindre un workflow déjà en place : conventions Git,
              tickets, branches, PR, review, CI, standards qualité et documentation.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">Review simulée</p>
            <h2 className="h2">Travailler avec une contrainte externe.</h2>
            <p className="lead">
              J’ai utilisé l’IA comme support pour reproduire une partie du cadre d’équipe :
              première implémentation cadrée, revue de PR avec Codex Review, conversations à
              résoudre, demandes de correction et checks à relancer avant de considérer une tâche
              acceptable.
            </p>
          </div>
          <div className="card">
            <h3 className="h3">Codebase existante</h3>
            <p className="text-muted">
              Ce travail m’a entraîné à intervenir sur du code que je ne maîtrise pas immédiatement,
              à respecter les patterns existants, à corriger une implémentation proposée, à
              justifier mes choix et à intégrer mes changements.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Méthode appliquée</p>
          <h2 className="h2">Le workflow que je reproduis sur mes projets.</h2>
          <div className="grid-4" style={{ marginTop: 40 }}>
            {workflowSteps.map((step) => (
              <article className="card" key={step.title}>
                <h3 className="h3">{step.title}</h3>
                <p className="text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm section-dark">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">Cas concret</p>
            <h2 className="h2">Socially comme terrain d’entraînement principal.</h2>
            <p className="lead">
              Socially m’a permis de pratiquer ce workflow sur une vraie codebase fullstack : auth,
              onboarding, feed, posts, commentaires, notifications, messagerie, settings,
              Prisma/PostgreSQL, tests et documentation.
            </p>
          </div>
          <div className="card card-on-dark">
            <h3 className="h3">Ce que j’ai travaillé</h3>
            <p className="text-muted">
              Tickets Linear, branches par ticket, commits structurés, pull requests, reviews,
              corrections post-review, checks CI/CD, tests ciblés, README, documentation et suivi
              des limites produit.
            </p>
            <div className="cta-row">
              <Link
                href="/socially"
                className="button button-secondary"
                data-track="click_workflow_socially_case_study"
              >
                Voir le case study Socially
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Standards personnels</p>
          <h2 className="h2">Ce que je cherche à rendre vérifiable.</h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            <article className="card">
              <h3 className="h3">Changements isolés</h3>
              <p className="text-muted">
                Limiter le scope d’une tâche pour faciliter la review et éviter les refactors cachés
                dans une feature.
              </p>
            </article>
            <article className="card">
              <h3 className="h3">Décisions explicites</h3>
              <p className="text-muted">
                Expliquer les compromis techniques quand un choix peut avoir un impact produit,
                sécurité ou maintenance.
              </p>
            </article>
            <article className="card">
              <h3 className="h3">Validation concrète</h3>
              <p className="text-muted">
                Ne pas considérer une tâche terminée uniquement parce que le code compile : vérifier
                le comportement attendu.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
