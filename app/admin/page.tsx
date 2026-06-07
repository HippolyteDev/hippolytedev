import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type DashboardEvent = {
  type: string;
  path: string;
  visitorId: string;
  audienceMode: "agency" | "direct" | null;
  referrer: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  createdAt: Date;
};

type DashboardVisitor = {
  audienceMode: "agency" | "direct" | null;
  firstReferrer: string | null;
  firstUtmSource: string | null;
  firstUtmCampaign: string | null;
};

type BarItem = {
  label: string;
  value: number;
};

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

  const periodStart = startOfDay(daysAgo(29));

  const [events, totalVisitors, visitors] = await Promise.all([
    prisma.analyticsEvent.findMany({
      where: {
        createdAt: {
          gte: periodStart,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        type: true,
        path: true,
        visitorId: true,
        audienceMode: true,
        referrer: true,
        utmSource: true,
        utmCampaign: true,
        createdAt: true,
      },
    }),
    prisma.analyticsVisitor.count(),
    prisma.analyticsVisitor.findMany({
      where: {
        firstSeenAt: {
          gte: periodStart,
        },
      },
      select: {
        audienceMode: true,
        firstReferrer: true,
        firstUtmSource: true,
        firstUtmCampaign: true,
      },
    }),
  ]);

  const visitors30d = visitors.length;
  const pageViews = events.filter((event) => event.type === "page_view").length;
  const ctaClicks = events.filter((event) => event.type === "cta_click").length;
  const contactClicks = events.filter((event) => event.type === "contact_click").length;
  const outboundClicks = events.filter((event) => event.type === "outbound_click").length;

  const pageViewSeries = buildDailySeries(events, "page_view", periodStart);
  const clickSeries = buildDailySeries(
    events.filter((event) => event.type === "cta_click" || event.type === "contact_click" || event.type === "outbound_click"),
    "all",
    periodStart,
  );

  const topPages = topItems(
    events.filter((event) => event.type === "page_view"),
    (event) => normalizePath(event.path),
    6,
  );

  const clickPages = topItems(
    events.filter((event) => event.type === "cta_click" || event.type === "contact_click" || event.type === "outbound_click"),
    (event) => normalizePath(event.path),
    6,
  );

  const sources = acquisitionItems(visitors);
  const directAudience = visitors.filter((visitor) => visitor.audienceMode === "direct").length;
  const agencyAudience = visitors.filter((visitor) => visitor.audienceMode === "agency").length;
  const unknownAudience = Math.max(visitors.length - directAudience - agencyAudience, 0);

  return (
    <main className="admin-shell">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Backoffice</p>
            <h1 className="h2">Dashboard portfolio.</h1>
            <p className="lead">
              Vue synthétique des 30 derniers jours : trafic, pages qui attirent, clics importants,
              sources et choix de lecture.
            </p>
          </div>
          <div className="admin-header-actions">
            <AdminNav />
            <AdminSignOutButton />
          </div>
        </div>

        <section className="metric-grid" aria-label="Métriques principales">
          <Metric label="Visiteurs 30j" value={visitors30d} detail={`${totalVisitors} au total`} />
          <Metric label="Pages vues" value={pageViews} detail="Sur 30 jours" />
          <Metric label="Clics CTA" value={ctaClicks} detail="Boutons internes" />
          <Metric label="Clics contact" value={contactClicks} detail="Email, LinkedIn, contact" />
        </section>

        <section className="admin-dashboard-grid">
          <article className="card dashboard-card dashboard-card-wide">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow">Activité</p>
                <h2 className="h3">Pages vues et clics sur 30 jours</h2>
              </div>
              <div className="chart-legend">
                <span><i className="legend-page" /> Pages vues</span>
                <span><i className="legend-click" /> Clics</span>
              </div>
            </div>
            <LineChart pageViews={pageViewSeries} clicks={clickSeries} />
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow">Audience</p>
                <h2 className="h3">Vue choisie</h2>
              </div>
            </div>
            <AudienceSplit direct={directAudience} agency={agencyAudience} unknown={unknownAudience} />
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow">Acquisition</p>
                <h2 className="h3">Sources principales</h2>
              </div>
            </div>
            <PieChart items={sources} empty="Aucune source détectée." />
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow">Actions</p>
                <h2 className="h3">Clics par page</h2>
              </div>
            </div>
            <BarChart items={clickPages} empty="Aucun clic enregistré sur la période." />
          </article>

          <article className="card dashboard-card">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow">Pages</p>
                <h2 className="h3">Pages les plus vues</h2>
              </div>
            </div>
            <BarChart items={topPages} empty="Aucune page vue sur la période." />
          </article>

          <article className="card dashboard-card dashboard-summary-card">
            <p className="eyebrow">Lecture rapide</p>
            <h2 className="h3">Ce qu’il faut surveiller</h2>
            <ul>
              <li>Les pages qui génèrent des clics, pas seulement des vues.</li>
              <li>Les sources UTM qui amènent des visiteurs qualifiés.</li>
              <li>La différence entre vue entreprise et vue équipe tech.</li>
              <li>Les clics sortants vers Socially, GitHub, Malt ou LinkedIn.</li>
            </ul>
            <Link href="/admin/events" className="button button-secondary">
              Voir les événements bruts
            </Link>
          </article>
        </section>

        <section className="metric-grid admin-secondary-metrics" aria-label="Métriques secondaires">
          <Metric label="Clics sortants" value={outboundClicks} detail="Démo, repo, liens externes" />
          <Metric label="Vue entreprise" value={directAudience} detail="Visiteurs associés" />
          <Metric label="Vue équipe tech" value={agencyAudience} detail="Visiteurs associés" />
          <Metric label="Événements" value={events.length} detail="Volume brut 30j" />
        </section>
      </div>
    </main>
  );
}

function AdminNav() {
  return (
    <nav className="admin-nav" aria-label="Navigation admin">
      <Link href="/admin" aria-current="page">
        Dashboard
      </Link>
      <Link href="/admin/events">Événements</Link>
    </nav>
  );
}

function Metric({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <article className="metric-card">
      <p className="text-muted">{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

function LineChart({ pageViews, clicks }: { pageViews: BarItem[]; clicks: BarItem[] }) {
  const width = 640;
  const height = 220;
  const padding = 22;
  const rawMaxValue = Math.max(0, ...pageViews.map((item) => item.value), ...clicks.map((item) => item.value));
  const maxValue = Math.max(1, rawMaxValue);
  const pagePoints = points(pageViews, width, height, padding, maxValue);
  const clickPoints = points(clicks, width, height, padding, maxValue);
  const hasData = rawMaxValue > 0;

  return (
    <div className="line-chart" aria-label="Graphique activité">
      {!hasData ? (
        <div className="chart-empty-state">
          <strong>Aucune page vue ou clic sur cette période.</strong>
          <span>
            Les choix de vue et changements de vue existent dans les événements, mais ce graphique
            affiche uniquement les pages vues et les clics.
          </span>
        </div>
      ) : null}
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Pages vues et clics par jour">
        <text className="chart-axis-value" x={padding} y={16}>
          {maxValue}
        </text>
        <text className="chart-axis-value" x={padding} y={height - padding - 6}>
          0
        </text>
        <path className="chart-grid-line" d={`M ${padding} ${height - padding} H ${width - padding}`} />
        {hasData ? (
          <>
            <polyline className="chart-line chart-line-page" points={pagePoints} />
            <polyline className="chart-line chart-line-click" points={clickPoints} />
            {pageViews.map((item, index) =>
              item.value > 0 ? (
                <circle
                  className="chart-dot chart-dot-page"
                  cx={xPoint(index, pageViews.length, width, padding)}
                  cy={yPoint(item.value, height, padding, maxValue)}
                  r="4"
                  key={`page-${item.label}`}
                />
              ) : null,
            )}
            {clicks.map((item, index) =>
              item.value > 0 ? (
                <circle
                  className="chart-dot chart-dot-click"
                  cx={xPoint(index, clicks.length, width, padding)}
                  cy={yPoint(item.value, height, padding, maxValue)}
                  r="4"
                  key={`click-${item.label}`}
                />
              ) : null,
            )}
          </>
        ) : null}
        {pageViews.map((item, index) => {
          const x = xPoint(index, pageViews.length, width, padding);
          return (
            <text className="chart-label" x={x} y={height - 4} textAnchor="middle" key={item.label}>
              {index % 5 === 0 || index === pageViews.length - 1 ? item.label : ""}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function AudienceSplit({ direct, agency, unknown }: { direct: number; agency: number; unknown: number }) {
  const total = Math.max(direct + agency + unknown, 1);
  const directWidth = (direct / total) * 100;
  const agencyWidth = (agency / total) * 100;
  const unknownWidth = 100 - directWidth - agencyWidth;

  return (
    <div className="audience-split">
      <div className="audience-split-bar" aria-label="Répartition audience">
        <span className="audience-direct" style={{ width: `${directWidth}%` }} />
        <span className="audience-agency" style={{ width: `${agencyWidth}%` }} />
        <span className="audience-unknown" style={{ width: `${unknownWidth}%` }} />
      </div>
      <div className="audience-split-list">
        <SplitRow label="Entreprise" value={direct} />
        <SplitRow label="Équipe tech" value={agency} />
        <SplitRow label="Non défini" value={unknown} />
      </div>
    </div>
  );
}

function SplitRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function BarChart({ items, empty }: { items: BarItem[]; empty: string }) {
  const max = Math.max(1, ...items.map((item) => item.value));

  if (!items.length) {
    return <p className="text-muted">{empty}</p>;
  }

  return (
    <div className="bar-chart">
      {items.map((item) => (
        <div className="bar-row" key={item.label}>
          <div className="bar-row-label">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
          <div className="bar-track">
            <span style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PieChart({ items, empty }: { items: BarItem[]; empty: string }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const colors = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#64748b", "#84cc16"];

  if (!items.length || total === 0) {
    return <p className="text-muted">{empty}</p>;
  }

  const gradient = items
    .reduce<{ segments: string[]; cursor: number }>(
      (accumulator, item, index) => {
        const start = accumulator.cursor;
        const end = start + (item.value / total) * 100;

        return {
          cursor: end,
          segments: [...accumulator.segments, `${colors[index % colors.length]} ${start}% ${end}%`],
        };
      },
      { cursor: 0, segments: [] },
    )
    .segments.join(", ");

  return (
    <div className="pie-chart-wrap">
      <div
        className="pie-chart"
        style={{ background: `conic-gradient(${gradient})` }}
        aria-label="Répartition des sources d’acquisition"
      >
        <span>{total}</span>
      </div>
      <div className="pie-legend">
        {items.map((item, index) => (
          <div key={item.label}>
            <span style={{ background: colors[index % colors.length] }} />
            <strong>{item.label}</strong>
            <em>
              {item.value} visiteur{item.value > 1 ? "s" : ""} · {Math.round((item.value / total) * 100)} %
            </em>
          </div>
        ))}
      </div>
    </div>
  );
}

function points(items: BarItem[], width: number, height: number, padding: number, maxValue: number) {
  return items
    .map((item, index) => {
      const x = xPoint(index, items.length, width, padding);
      const y = yPoint(item.value, height, padding, maxValue);
      return `${x},${y}`;
    })
    .join(" ");
}

function yPoint(value: number, height: number, padding: number, maxValue: number) {
  return height - padding - (value / maxValue) * (height - padding * 2);
}

function xPoint(index: number, total: number, width: number, padding: number) {
  if (total <= 1) return padding;
  return padding + (index / (total - 1)) * (width - padding * 2);
}

function buildDailySeries(events: DashboardEvent[], type: string, start: Date): BarItem[] {
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = dayKey(date);
    const value = events.filter((event) => (type === "all" || event.type === type) && dayKey(event.createdAt) === key).length;

    return {
      label: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      value,
    };
  });
}

function topItems(events: DashboardEvent[], getLabel: (event: DashboardEvent) => string, limit: number): BarItem[] {
  const counts = new Map<string, number>();

  for (const event of events) {
    const label = getLabel(event);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function acquisitionItems(visitors: DashboardVisitor[]): BarItem[] {
  const counts = new Map<string, number>();

  for (const visitor of visitors) {
    const label = acquisitionLabel(visitor);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function acquisitionLabel(visitor: DashboardVisitor) {
  if (visitor.firstUtmSource) {
    return visitor.firstUtmCampaign
      ? `${visitor.firstUtmSource} / ${visitor.firstUtmCampaign}`
      : visitor.firstUtmSource;
  }

  if (visitor.firstReferrer) {
    try {
      const hostname = new URL(visitor.firstReferrer).hostname.replace(/^www\./, "");
      return hostname === "localhost" || hostname === "127.0.0.1" ? "Localhost (test)" : hostname;
    } catch {
      return "Referrer inconnu";
    }
  }

  return "Direct / inconnu";
}

function normalizePath(path: string) {
  const cleanPath = path.split("?")[0] || "/";
  return cleanPath.length > 36 ? `${cleanPath.slice(0, 33)}...` : cleanPath;
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function startOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}
