import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Comment se passe un projet ? — HippolyteDev",
  description:
    "Un parcours simple pour clarifier votre besoin, cadrer une solution réaliste et avancer étape par étape.",
};

const steps = [
  {
    title: "Vous prenez rendez-vous",
    text: "Vous me présentez rapidement votre activité, votre problème actuel et ce que vous aimeriez améliorer.",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
      </>
    ),
  },
  {
    title: "On clarifie le besoin",
    text: "Je vous aide à transformer une idée floue ou une difficulté quotidienne en besoin concret et priorisé.",
    icon: (
      <>
        <path d="M9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    title: "Je propose une solution",
    text: "Selon votre situation, je recommande le format le plus adapté : site professionnel, outil interne, tableau de bord, formulaire, espace client ou amélioration d’existant.",
    icon: (
      <>
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="m16.24 16.24 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="m4.93 19.07 2.83-2.83" />
        <path d="m16.24 7.76 2.83-2.83" />
      </>
    ),
  },
  {
    title: "On cadre le projet",
    text: "Le périmètre, les livrables, le prix, les délais et les limites du projet sont définis clairement avant de commencer.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </>
    ),
  },
  {
    title: "Je développe avec des points de suivi",
    text: "Vous suivez l’avancement, validez les étapes importantes et pouvez demander des ajustements dans le cadre prévu.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Je livre et j’explique",
    text: "La solution est mise en ligne ou livrée, puis je vous montre comment l’utiliser simplement.",
    icon: (
      <>
        <path d="M12 2v13" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 22h14" />
      </>
    ),
  },
  {
    title: "Support ou évolutions si besoin",
    text: "Après la livraison, un support ou des évolutions peuvent être prévus selon vos besoins.",
    icon: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </>
    ),
  },
];

export default function MethodPage() {
  return (
    <main>
      <section className="hero method-hero">
        <div className="container method-hero-grid">
          <div>
            <p className="eyebrow">Méthode</p>
            <h1 className="h1">Comment se passe un projet ?</h1>
            <p className="lead">
              Vous m’expliquez votre besoin, je vous aide à le clarifier, puis je propose une
              solution adaptée à votre activité, votre budget et vos priorités.
            </p>
            <p className="method-intro">
              Vous n’avez pas besoin d’arriver avec un cahier des charges complet. Le premier
              échange sert à comprendre votre activité, vos outils actuels, vos difficultés et ce
              que vous aimeriez améliorer. À partir de là, je vous propose une solution réaliste,
              cadrée et simple à comprendre.
            </p>
            <div className="cta-row">
              <Link
                href="/contact"
                className="button button-primary"
                data-track="click_method_hero_contact"
              >
                Parler de mon projet
              </Link>
              <Link
                href="/entreprise/offres"
                className="button button-secondary"
                data-track="click_method_hero_offers"
              >
                Voir les offres
              </Link>
            </div>
          </div>

          <aside className="method-panel" aria-label="Ce que permet le premier échange">
            <span className="badge badge-success">Premier échange sans engagement</span>
            <h2 className="h3">On clarifie le besoin avant de construire.</h2>
            <div className="method-panel-list">
              <div className="method-panel-row">
                <span>01</span>
                <p>Comprendre votre activité et vos priorités.</p>
              </div>
              <div className="method-panel-row">
                <span>02</span>
                <p>
                  Identifier ce qui bloque : suivi, visibilité, organisation, données ou tâches
                  répétitives.
                </p>
              </div>
              <div className="method-panel-row">
                <span>03</span>
                <p>
                  Définir la solution utile : site, outil interne, tableau de bord, formulaire ou
                  espace client.
                </p>
              </div>
              <div className="method-panel-row">
                <span>04</span>
                <p>Cadrer le périmètre : livrables, prix, délais, limites et accompagnement.</p>
              </div>
            </div>
            <div className="method-panel-result">
              <strong>À la sortie</strong>
              <p>
                Vous savez quelle solution est pertinente, ce qui sera livré, combien cela coûte et
                comment le projet va se dérouler.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-sm method-steps-section">
        <div className="container">
          <div className="grid-2 method-section-head">
            <div>
              <p className="eyebrow">Parcours</p>
              <h2 className="h2">Du premier échange à la mise en ligne.</h2>
            </div>
            <p className="lead">
              Le projet avance par étapes courtes et compréhensibles. Vous n’avez pas besoin de
              parler technique: je vous aide à transformer le problème en solution concrète.
            </p>
          </div>

          <div className="grid-3 method-step-grid">
            {steps.map((step, index) => (
              <article className="card method-step-card" key={step.title}>
                <span className="method-step-number">{String(index + 1).padStart(2, "0")}</span>
                <Icon>{step.icon}</Icon>
                <h2 className="h3">{step.title}</h2>
                <p className="text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">Premier échange sans engagement</p>
            <h2 className="h2">Comprendre avant de proposer.</h2>
          </div>
          <div className="card">
            <p className="text-muted">
              L’objectif du premier rendez-vous n’est pas de vous vendre une solution toute faite,
              mais de comprendre si je peux réellement vous aider et quelle approche serait la plus
              pertinente.
            </p>
            <div className="cta-row">
              <Link
                href="/contact"
                className="button button-primary"
                data-track="click_method_contact"
              >
                Parler de mon projet
              </Link>
              <Link
                href="/entreprise/offres"
                className="button button-secondary"
                data-track="click_method_offers"
              >
                Voir les offres
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
