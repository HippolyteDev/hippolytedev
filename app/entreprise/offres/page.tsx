import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offres entreprise — HippolyteDev",
  description:
    "Offres de lancement pour clients directs : site professionnel, outil interne simple, amélioration ou refonte d’existant.",
};

const offers = [
  {
    title: "Site professionnel",
    forWho:
      "Indépendants, associations, petites structures qui veulent une présence web claire et crédible.",
    solves: "Manque de visibilité, image peu professionnelle, difficulté à présenter ses services.",
    deliverablesLabel: "Livrables",
    deliverables: [
      "Site moderne et responsive",
      "Pages principales",
      "Information",
      "Mise en ligne",
      "Accompagnement de prise en main",
    ],
    normalPrice: "1 500 € – 3 000 €",
    launchPrice: "900 € – 1 800 €",
    cta: "Demander ce site",
  },
  {
    title: "Outil interne simple",
    forWho:
      "TPE/PME qui gèrent encore une partie de leur activité avec Excel, papier, mails ou messages.",
    solves:
      "Informations dispersées, suivi difficile, ressaisies, erreurs ou manque de visibilité sur l’activité.",
    deliverablesLabel: "Livrables",
    deliverables: [
      "Tableau de suivi",
      "Formulaire",
      "Espace d’administration",
      "Gestion simple des données",
      "Mise en ligne",
      "Accompagnement d’utilisation",
    ],
    normalPrice: "3 500 € – 8 000 €",
    launchPrice: "2 100 € – 4 800 €",
    cta: "Créer mon outil interne",
  },
  {
    title: "Application métier complète",
    forWho:
      "Structures qui ont besoin d’un outil web plus avancé qu’un simple site ou tableau de suivi.",
    solves:
      "Besoin de gérer des utilisateurs, des données, des demandes, des statuts, des espaces privés ou des processus spécifiques à l’activité.",
    deliverablesLabel: "Livrables possibles",
    deliverables: [
      "Espace client ou espace privé",
      "Comptes utilisateurs",
      "Backoffice d’administration",
      "Tableau de bord",
      "Gestion de demandes ou dossiers",
      "Rôles et permissions",
      "Formulaires avancés",
      "Exports ou suivi de données",
    ],
    normalPrice: "À partir de 10 000 €",
    launchPrice: "À partir de 6 000 €",
    cta: "Créer mon application métier",
  },
];

const includedItems = [
  "Échange de cadrage",
  "Périmètre clair avant démarrage",
  "Devis détaillé",
  "Développement",
  "Tests",
  "Mise en ligne",
  "Explication d’utilisation",
  "Support prévu dans le devis",
];

const priceFactors = [
  "Nombre de pages ou d’écrans",
  "Espace d’administration",
  "Gestion de données",
  "Comptes utilisateurs",
  "Formulaires complexes",
  "Automatisations",
  "Urgence",
  "Support demandé",
  "Niveau de responsabilité du projet",
];

export default function OffersPage() {
  return (
    <main>
      <section className="hero offers-hero">
        <div className="container offers-hero-grid">
          <div>
            <p className="eyebrow">Offres client direct</p>
            <h1 className="h1">
              Des offres de lancement pour créer votre site ou outil web à prix réduit.
            </h1>
            <p className="lead">
              Pendant la phase de lancement, je propose des tarifs réduits de 40 % sur des projets
              cadrés afin de construire mes premières références clients, tout en livrant une
              solution professionnelle, claire et utile.
            </p>
            <div className="cta-row">
              <Link
                href="/contact"
                className="button button-primary"
                data-track="click_launch_offer_contact"
              >
                Profiter de l’offre de lancement
              </Link>
              <Link
                href="#offres"
                className="button button-secondary"
                data-track="click_scroll_offers"
              >
                Voir les offres
              </Link>
            </div>
          </div>
          <aside className="launch-panel" aria-label="Offre de lancement">
            <span className="badge launch-badge">-40 % lancement</span>
            <h2 className="h3">Offre de lancement : -40 % sur les premières missions</h2>
            <p>
              Places limitées : cette réduction est réservée aux premiers projets validés avec un
              périmètre clair.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-sm" id="offres">
        <div className="container">
          <div className="offers-section-head">
            <div>
              <p className="eyebrow">Comparer les offres</p>
              <h2 className="h2">Trois formats simples pour démarrer.</h2>
            </div>
            <p className="text-muted">
              Les prix sont des repères pour un périmètre cadré. Le devis final dépend du besoin,
              des contenus, des fonctionnalités et du niveau d’accompagnement attendu.
            </p>
          </div>

          <div className="offers-grid">
            {offers.map((offer) => (
              <article className="card offer-card" key={offer.title}>
                <div className="offer-card-head">
                  <span className="badge launch-badge">-40 % lancement</span>
                  <h3 className="h3">{offer.title}</h3>
                </div>
?
                <div className="offer-copy">
                  <div>
                    <strong>Pour qui</strong>
                    <p>{offer.forWho}</p>
                  </div>
                  <div>
                    <strong>Ce que ça résout</strong>
                    <p>{offer.solves}</p>
                  </div>
                </div>

                <div>
                  <strong className="offer-label">{offer.deliverablesLabel}</strong>
                  <ul className="offer-check-list">
                    {offer.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="offer-price">
                  <span className="old-price">{offer.normalPrice}</span>
                  <strong>{offer.launchPrice}</strong>
                </div>

                <Link
                  href="/contact"
                  className="button button-primary"
                  data-track="click_offer_card_contact"
                >
                  {offer.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm offer-details-section">
        <div className="container">
          <div className="offer-details-head">
            <p className="eyebrow">Cadre du projet</p>
            <h2 className="h2">Ce qui est compris, et ce qui ajuste le devis.</h2>
            <p className="lead">
              L’objectif est d’éviter les zones floues : vous savez ce qui est inclus avant de
              démarrer, et ce qui peut faire évoluer le prix selon votre situation.
            </p>
          </div>

          <div className="offer-details-grid">
            <article className="card offer-detail-card offer-detail-card-included">
              <div className="offer-detail-card-head">
                <span className="offer-detail-kicker">Inclus</span>
                <h3 className="h3">Un projet cadré jusqu’à la mise en ligne</h3>
              </div>
              <ul className="offer-included-grid">
                {includedItems.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="card offer-detail-card offer-detail-card-factors">
              <div className="offer-detail-card-head">
                <span className="offer-detail-kicker">Variables</span>
                <h3 className="h3">Les éléments qui peuvent modifier le budget</h3>
              </div>
              <p className="text-muted">
                Ces points ne sont pas un problème : ils servent simplement à estimer le bon niveau
                de travail et d’accompagnement.
              </p>
              <div className="offer-factor-cloud">
                {priceFactors.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="final-offer-cta">
            <p className="eyebrow">Démarrer</p>
            <h2 className="h2">Vous voulez profiter du tarif de lancement ?</h2>
            <p className="lead">
              Présentez-moi votre besoin et je vous dirai si une des offres correspond à votre
              situation.
            </p>
            <div className="cta-row">
              <Link
                href="/contact"
                className="button button-primary"
                data-track="click_final_offer_contact"
              >
                Parler de mon besoin
              </Link>
              <Link
                href="/methode"
                className="button button-secondary"
                data-track="click_final_offer_method"
              >
                Voir comment se passe un projet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
