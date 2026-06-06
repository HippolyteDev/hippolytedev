import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  if (!session) {
    redirect("/admin/login");
  }

  if (adminEmail && session.user.email.toLowerCase() !== adminEmail) {
    redirect("/admin/login");
  }

  const [eventCount, visitorCount, directVisitors, agencyVisitors, eventTypes, recentEvents] =
    await Promise.all([
      prisma.analyticsEvent.count(),
      prisma.analyticsVisitor.count(),
      prisma.analyticsVisitor.count({ where: { audienceMode: "direct" } }),
      prisma.analyticsVisitor.count({ where: { audienceMode: "agency" } }),
      prisma.analyticsEvent.groupBy({
        by: ["type"],
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            type: "desc",
          },
        },
      }),
      prisma.analyticsEvent.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
        select: {
          id: true,
          type: true,
          path: true,
          audienceMode: true,
          referrer: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          createdAt: true,
          metadata: true,
        },
      }),
    ]);

  return (
    <main className="admin-shell">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Backoffice</p>
            <h1 className="h2">Tracking portfolio.</h1>
            <p className="lead">
              Mesure minimale: pages vues, UTM, referrer, choix de vue et clics principaux.
            </p>
          </div>
          <AdminSignOutButton />
        </div>

        <section className="metric-grid" aria-label="Métriques principales">
          <Metric label="Événements" value={eventCount} />
          <Metric label="Visiteurs" value={visitorCount} />
          <Metric label="Vue entreprise" value={directVisitors} />
          <Metric label="Vue équipe tech" value={agencyVisitors} />
        </section>

        <section className="grid-2">
          <article className="card">
            <h2 className="h3">Types d’événements</h2>
            <div className="proof-list" style={{ marginTop: 20 }}>
              {eventTypes.length ? (
                eventTypes.map((event) => (
                  <span className="badge" key={event.type}>
                    {event.type}: {event._count._all}
                  </span>
                ))
              ) : (
                <p className="text-muted">Aucun événement enregistré.</p>
              )}
            </div>
          </article>
          <article className="card">
            <h2 className="h3">Configuration</h2>
            <p className="text-muted">
              Admin autorisé: {adminEmail ?? "ADMIN_EMAIL non défini"}. Base cible: Neon Postgres
              via `DATABASE_URL`.
            </p>
          </article>
        </section>

        <section className="section-sm">
          <h2 className="h3" style={{ marginBottom: 18 }}>
            Derniers événements
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Vue</th>
                  <th>Page</th>
                  <th>UTM</th>
                  <th>Détail</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.length ? (
                  recentEvents.map((event) => (
                    <tr key={event.id}>
                      <td>{event.createdAt.toLocaleString("fr-FR")}</td>
                      <td>{event.type}</td>
                      <td>{event.audienceMode ?? "-"}</td>
                      <td>{event.path}</td>
                      <td>
                        {[event.utmSource, event.utmMedium, event.utmCampaign].filter(Boolean).join(" / ") ||
                          "-"}
                      </td>
                      <td>
                        {event.metadata && typeof event.metadata === "object"
                          ? JSON.stringify(event.metadata)
                          : event.referrer || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>Aucun événement pour le moment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="metric-card">
      <p className="text-muted">{label}</p>
      <strong>{value}</strong>
    </article>
  );
}
