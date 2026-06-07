import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const eventTypes = [
  "page_view",
  "audience_selected",
  "audience_switched",
  "cta_click",
  "contact_click",
  "outbound_click",
] as const;

const audienceModes = ["direct", "agency"] as const;

type EventType = (typeof eventTypes)[number];
type AudienceMode = (typeof audienceModes)[number];

const eventTypeLabels: Record<EventType, string> = {
  page_view: "Page vue",
  audience_selected: "Choix de vue",
  audience_switched: "Changement de vue",
  cta_click: "Clic bouton",
  contact_click: "Clic contact",
  outbound_click: "Clic externe",
};

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; audience?: string }>;
}) {
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

  const params = await searchParams;
  const selectedType = eventTypes.includes(params.type as EventType) ? (params.type as EventType) : undefined;
  const selectedAudience = audienceModes.includes(params.audience as AudienceMode)
    ? (params.audience as AudienceMode)
    : undefined;

  const where = {
    ...(selectedType ? { type: selectedType } : {}),
    ...(selectedAudience ? { audienceMode: selectedAudience } : {}),
  };

  const [events, total] = await Promise.all([
    prisma.analyticsEvent.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
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
    prisma.analyticsEvent.count({ where }),
  ]);

  return (
    <main className="admin-shell">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Backoffice</p>
            <h1 className="h2">Événements bruts.</h1>
            <p className="lead">
              Logs détaillés des pages vues, choix de vue, switches et clics principaux. Affichage
              limité aux 100 derniers résultats.
            </p>
          </div>
          <div className="admin-header-actions">
            <AdminNav />
            <AdminSignOutButton />
          </div>
        </div>

        <section className="card admin-filters">
          <div>
            <h2 className="h3">Filtres</h2>
            <p className="text-muted">{total} événement{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}.</p>
          </div>
          <div className="admin-filter-group" aria-label="Filtrer par type">
            <FilterLink href="/admin/events" active={!selectedType && !selectedAudience}>
              Tous
            </FilterLink>
            {eventTypes.map((type) => (
              <FilterLink key={type} href={`/admin/events?type=${type}`} active={selectedType === type}>
                {eventTypeLabels[type]}
              </FilterLink>
            ))}
          </div>
          <div className="admin-filter-group" aria-label="Filtrer par audience">
            <FilterLink href="/admin/events?audience=direct" active={selectedAudience === "direct"}>
              Vue entreprise
            </FilterLink>
            <FilterLink href="/admin/events?audience=agency" active={selectedAudience === "agency"}>
              Vue équipe tech
            </FilterLink>
          </div>
        </section>

        <section className="section-sm">
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
                {events.length ? (
                  events.map((event) => (
                    <tr key={event.id}>
                      <td>{event.createdAt.toLocaleString("fr-FR")}</td>
                      <td>{eventTypeLabels[event.type]}</td>
                      <td>{event.audienceMode ?? "-"}</td>
                      <td>{event.path}</td>
                      <td>
                        {[event.utmSource, event.utmMedium, event.utmCampaign].filter(Boolean).join(" / ") || "-"}
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
                    <td colSpan={6}>Aucun événement pour ce filtre.</td>
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

function AdminNav() {
  return (
    <nav className="admin-nav" aria-label="Navigation admin">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/events" aria-current="page">
        Événements
      </Link>
    </nav>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={active ? "admin-filter-active" : undefined}>
      {children}
    </Link>
  );
}
