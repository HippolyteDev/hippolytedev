import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité — HippolyteDev",
  description: "Informations sur le tracking minimal utilisé par le portfolio HippolyteDev.",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Confidentialité</p>
          <h1 className="h1">Mesure d’audience minimale.</h1>
          <p className="lead">
            Ce portfolio utilise un suivi first-party limité pour comprendre les pages consultées,
            les sources UTM et le choix de lecture équipe tech ou entreprise.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container grid-2">
          <article className="card">
            <h2 className="h3">Ce qui est collecté</h2>
            <p className="text-muted">
              Pages vues, paramètres UTM, referrer, choix de vue, changement de vue et clics sur les
              principaux liens de contact ou de projets.
            </p>
          </article>
          <article className="card">
            <h2 className="h3">Ce qui n’est pas collecté</h2>
            <p className="text-muted">
              Pas d’IP brute stockée, pas de fingerprinting, pas de tracking cross-site et pas de
              transmission des données analytics à un tiers.
            </p>
          </article>
          <article className="card">
            <h2 className="h3">Cookies utilisés</h2>
            <p className="text-muted">
              `audience_mode` pour mémoriser la vue choisie, `portfolio_visitor_id` pour éviter de
              compter chaque page comme un nouveau visiteur, et `portfolio_analytics_optout` si vous
              refusez la mesure.
            </p>
          </article>
          <article className="card">
            <h2 className="h3">Opposition</h2>
            <p className="text-muted">
              Pour refuser la mesure, vous pouvez me contacter à hippolyte.devweb@gmail.com. Une
              préférence d’opt-out dédiée peut ensuite être ajoutée dans l’interface.
            </p>
          </article>
        </div>
        <div className="container privacy-note">
          <p className="text-muted">
            La finalité est strictement la mesure d’audience et l’amélioration du portfolio. Les
            données servent à comprendre si la lecture “équipe tech” ou “entreprise” est utile.
          </p>
        </div>
      </section>
    </main>
  );
}
