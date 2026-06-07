"use client";

import {
  ANALYTICS_OPTOUT_COOKIE,
  AUDIENCE_COOKIE,
  AudienceMode,
  VISITOR_COOKIE,
  audienceLabels,
} from "@/lib/audience";
import { AnalyticsEventInput } from "@/lib/analytics";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type AudienceContextValue = {
  mode: AudienceMode | null;
  selectedMode: AudienceMode | null;
  isReady: boolean;
  setMode: (mode: AudienceMode, source: "selected" | "switched") => void;
  toggleMode: () => void;
};

const AudienceContext = createContext<AudienceContextValue | null>(null);

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : null;
}

function writeCookie(name: string, value: string, maxAge = 60 * 60 * 24 * 180) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function getVisitorId() {
  const existing = readCookie(VISITOR_COOKIE);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  writeCookie(VISITOR_COOKIE, id, 60 * 60 * 24 * 395);
  return id;
}

function currentUtm() {
  const params = new URLSearchParams(window.location.search);

  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined,
  };
}

export function trackPortfolioEvent(input: Omit<AnalyticsEventInput, "visitorId" | "path">) {
  if (typeof window === "undefined") return;
  if (readCookie(ANALYTICS_OPTOUT_COOKIE) === "1") return;

  const payload: AnalyticsEventInput = {
    visitorId: getVisitorId(),
    path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
    utm: currentUtm(),
    ...input,
  };

  const beacon = navigator.sendBeacon?.(
    "/api/events",
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
  );

  if (!beacon) {
    fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }
}

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [mode, updateMode] = useState<AudienceMode | null>(null);
  const [selectedMode, updateSelectedMode] = useState<AudienceMode | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedMode = readCookie(AUDIENCE_COOKIE);
    if (savedMode === "agency" || savedMode === "direct") {
      // The audience cookie is browser-only by design so public routes can stay static.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      updateSelectedMode(savedMode);
      updateMode(savedMode);
    }
    setIsReady(true);
  }, []);

  const setMode = useCallback((nextMode: AudienceMode, source: "selected" | "switched") => {
    const savedMode = readCookie(AUDIENCE_COOKIE);

    if (source === "selected") {
      writeCookie(AUDIENCE_COOKIE, nextMode, 60 * 60 * 24 * 395);
      updateSelectedMode(nextMode);
    }

    const stableMode =
      source === "selected"
        ? nextMode
        : savedMode === "agency" || savedMode === "direct"
          ? savedMode
          : selectedMode;

    updateMode(nextMode);
    trackPortfolioEvent({
      type: source === "selected" ? "audience_selected" : "audience_switched",
      audienceMode: stableMode ?? nextMode,
      metadata:
        source === "switched"
          ? {
              selectedMode: stableMode ?? nextMode,
              viewMode: nextMode,
            }
          : undefined,
    });
  }, [selectedMode]);

  const toggleMode = useCallback(() => {
    setMode(mode === "direct" ? "agency" : "direct", "switched");
  }, [mode, setMode]);

  const value = useMemo(
    () => ({
      mode,
      selectedMode,
      isReady,
      setMode,
      toggleMode,
    }),
    [isReady, mode, selectedMode, setMode, toggleMode],
  );

  return (
    <AudienceContext.Provider value={value}>
      <div className={!isReady ? "audience-loading" : undefined}>{children}</div>
      {isReady && !mode && !isAdminRoute ? (
        <AudienceModal onSelect={(nextMode) => setMode(nextMode, "selected")} />
      ) : null}
    </AudienceContext.Provider>
  );
}

function AudienceModal({ onSelect }: { onSelect: (mode: AudienceMode) => void }) {
  return (
    <div className="audience-modal-backdrop" role="presentation">
      <section
        className="audience-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audience-modal-title"
      >
        <p className="eyebrow">Choix de lecture</p>
        <h1 id="audience-modal-title" className="h2">
          Quel contexte correspond le mieux à votre besoin ?
        </h1>
        <p className="lead">
          Choisissez la lecture la plus adaptée pour afficher un contenu clair : profil technique
          pour une équipe, ou solutions web pour une structure qui souhaite concrétiser un projet.
        </p>
        <div className="audience-choice-grid">
          <button className="card card-hover audience-choice" onClick={() => onSelect("agency")}>
            <span className="badge">Équipe tech</span>
            <strong>Agence, ESN, studio, recruteur ou équipe produit</strong>
            <span className="text-muted">
              Lecture technique: stack, méthode, codebase, auth, données, qualité et preuves de
              livraison.
            </span>
          </button>
          <button className="card card-hover audience-choice" onClick={() => onSelect("direct")}>
            <span className="badge">Entreprise</span>
            <strong>TPE, PME, indépendant ou association avec un projet web</strong>
            <span className="text-muted">
              Lecture orientée besoin métier : site professionnel, outil interne, espace privé,
              tableau de bord ou application sur mesure.
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used inside AudienceProvider");
  }
  return context;
}

export function AudienceText({
  agency,
  direct,
}: {
  agency: React.ReactNode;
  direct: React.ReactNode;
}) {
  const { mode } = useAudience();
  return <>{mode === "direct" ? direct : agency}</>;
}

export function AudienceLink({
  agencyHref,
  directHref,
  agency,
  direct,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  agencyHref: LinkProps["href"];
  directHref: LinkProps["href"];
  agency: React.ReactNode;
  direct: React.ReactNode;
}) {
  const { mode } = useAudience();

  return (
    <Link href={mode === "direct" ? directHref : agencyHref} {...props}>
      {mode === "direct" ? direct : agency}
    </Link>
  );
}

export function useAudienceLabel() {
  const { mode } = useAudience();
  return mode ? audienceLabels[mode] : "vue à choisir";
}
