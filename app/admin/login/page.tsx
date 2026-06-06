import { AdminLoginForm } from "@/components/admin-login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <main className="admin-shell">
      <div className="container">
        <section className="card" style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="eyebrow">Admin</p>
          <h1 className="h2">Connexion backoffice.</h1>
          <p className="lead">
            Accès privé pour consulter les visites, les UTM, les choix de lecture et les clics clés
            du portfolio.
          </p>
          <AdminLoginForm />
        </section>
      </div>
    </main>
  );
}
