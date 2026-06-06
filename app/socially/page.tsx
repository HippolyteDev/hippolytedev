import type { Metadata } from "next";
import { AudienceLink, AudienceText } from "@/components/audience-provider";

export const metadata: Metadata = {
  title: "Socially — Case study | HippolyteDev",
  description:
    "Case study Socially : application sociale fullstack avec feed, posts, commentaires, notifications, messagerie, settings et logique produit.",
};

const screenshots = [
  ["/image/cover.png", "Feed principal de Socially", "Feed principal : posts, interactions, onglets For You / Following et CTA de création.", "Fil principal avec publications, réactions et création de contenu."],
  ["/image/discover.png", "Page Discover de Socially", "Discover : surfaces de découverte, catégories et créateurs.", "Page de découverte pour explorer contenus et profils."],
  ["/image/post-detail.png", "Détail d’un post Socially", "Détail post : page dédiée, interactions et commentaires associés.", "Page détaillée d’une publication avec discussion."],
  ["/image/create-post.png", "Modale de création de post Socially", "Création de post : titre, contenu, images, validation et gestion d’états.", "Création de contenu avec champs, image et validation."],
  ["/image/comment.png", "Commentaires sur Socially", "Commentaires : réponses, tri et interactions sur une discussion.", "Espace de commentaires et réponses."],
  ["/image/notifications.png", "Notifications Socially", "Notifications : activités liées au compte, likes, commentaires et abonnements.", "Notifications liées aux actions importantes."],
  ["/image/messages.png", "Messagerie Socially", "Messagerie : conversations privées, liste de contacts et espace de discussion.", "Messagerie privée avec liste de conversations."],
  ["/image/settings.png", "Settings Socially", "Settings : compte, confidentialité, données et documents légaux.", "Réglages du compte, confidentialité et documents."],
  ["/image/profile.png", "Profil utilisateur Socially", "Profil : identité utilisateur, handle, avatar et contenus associés.", "Profil utilisateur avec identité et contenus."],
];

export default function SociallyPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Case study principal</p>
            <h1 className="h1">
              <AudienceText
                agency="Socially — application sociale fullstack construite end-to-end."
                direct="Socially — une application complète construite de bout en bout."
              />
            </h1>
            <p className="lead">
              <AudienceText
                agency="Socially est mon projet principal : une application sociale avec feed, posts, commentaires, notifications, messagerie, settings et logique produit. Le back-office de modération est en cours de construction et sera ajouté au case study une fois stabilisé."
                direct="Socially est mon projet principal. Il montre ma capacité à construire une application avec comptes utilisateurs, publications, commentaires, messages, notifications, réglages et parcours complets."
              />
            </p>
            <div className="cta-row">
              <a
                className="button button-primary"
                href="https://www.socially.rocks/fr/login?utm_source=hippolytedev&utm_medium=portfolio&utm_campaign=socially_case_study"
                target="_blank"
                rel="noreferrer"
                data-track="click_socially_live"
              >
                Tester le site
              </a>
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
          <figure className="product-frame">
            <img src="/image/cover.png" alt="Feed principal de Socially" />
            <figcaption className="product-frame-caption">
              <AudienceText
                agency="Feed principal avec posts, interactions et création de contenu."
                direct="Page principale avec contenus, interactions et bouton de publication."
              />
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Ce que le projet prouve</p>
          <h2 className="h2">
            <AudienceText
              agency="Un produit social complet, pas une simple interface."
              direct="Un exemple concret d’application web utilisable."
            />
          </h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            <article className="card">
              <h3 className="h3">
                <AudienceText agency="Produit & flows" direct="Parcours utilisateur" />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Feed, découverte, posts, commentaires, notifications, messagerie et settings utilisateur."
                  direct="Créer un compte, découvrir du contenu, publier, commenter, recevoir des notifications et gérer son profil."
                />
              </p>
            </article>
            <article className="card">
              <h3 className="h3">
                <AudienceText agency="Fullstack" direct="Application complète" />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Logique de données, relations, API, intégration front/back, auth et persistance PostgreSQL."
                  direct="Interface visible, données sauvegardées, comptes privés, règles d’accès et logique côté serveur."
                />
              </p>
            </article>
            <article className="card">
              <h3 className="h3">
                <AudienceText agency="Workflow" direct="Méthode" />
              </h3>
              <p className="text-muted">
                <AudienceText
                  agency="Approche structurée : tickets, PR, arbitrages, README, limites connues et amélioration continue."
                  direct="Travail organisé: petites étapes, vérifications, corrections et documentation des limites."
                />
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section project-showcase-dark">
        <div className="container">
          <p className="eyebrow">Screenshots réels</p>
          <h2 className="h2">Les surfaces principales de Socially.</h2>
          <p className="lead">
            <AudienceText
              agency="Captures du front-office utilisateur : feed, discover, création de post, commentaires, notifications, messagerie, profil et settings."
              direct="Captures des principaux écrans: accueil, découverte, publication, commentaires, notifications, messagerie, profil et réglages."
            />
          </p>
          <div className="screenshot-grid">
            {screenshots.map(([src, alt, agencyCaption, directCaption]) => (
              <figure className="product-frame" key={src}>
                <img src={src} alt={alt} />
                <figcaption className="product-frame-caption">
                  <AudienceText agency={agencyCaption} direct={directCaption} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">
              <AudienceText agency="Preuve technique" direct="Preuve technique" />
            </p>
            <h2 className="h2">
              <AudienceText
                agency="Ce que Socially démontre concrètement"
                direct="Ce que Socially démontre concrètement"
              />
            </h2>
            <p className="lead">
              <AudienceText
                agency="Socially montre ma capacité à construire une application complète : comptes utilisateurs, contenus, messagerie, notifications, réglages, rôles, modération et backoffice. Ces briques peuvent être adaptées à des besoins d’entreprise : espace client, outil interne, tableau de bord, suivi de demandes ou interface d’administration."
                direct="Socially montre ma capacité à construire une application complète : comptes utilisateurs, contenus, messagerie, notifications, réglages, rôles, modération et backoffice. Ces briques peuvent être adaptées à des besoins d’entreprise : espace client, outil interne, tableau de bord, suivi de demandes ou interface d’administration."
              />
            </p>
          </div>
          <div className="card">
            <h3 className="h3">
              <AudienceText agency="Capacité démontrée" direct="Capacité démontrée" />
            </h3>
            <p className="text-muted">
              <AudienceText
                agency="Concevoir, développer, organiser et maintenir une application web complète avec données, utilisateurs, interfaces et logique métier."
                direct="Concevoir, développer, organiser et maintenir une application web complète avec données, utilisateurs, interfaces et logique métier."
              />
            </p>
            <div className="cta-row">
              <AudienceLink
                agencyHref="/agence/workflow"
                directHref="/methode"
                agency="Voir mon workflow"
                direct="Voir ma méthode"
                className="button button-secondary"
                data-track="click_method_from_socially"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
