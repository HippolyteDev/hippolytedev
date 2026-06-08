"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AudienceText, useAudience } from "@/components/audience-provider";
import { LogoIcon } from "@/components/icon";
import { getAudienceSwitchCopy } from "@/lib/audience";

type NavItem = {
  href: string;
  label: string;
  badge?: string;
};

const agencyNavItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/socially", label: "Socially" },
  { href: "/projets", label: "Projets" },
  { href: "/agence/workflow", label: "Workflow" },
  { href: "/contact", label: "Contact" },
];

const directNavItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/methode", label: "Méthode" },
  { href: "/entreprise/offres", label: "Offres", badge: "Lancement -40 %" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { mode, selectedMode, toggleMode } = useAudience();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = mode === "direct" ? directNavItems : agencyNavItems;

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="logo" href="/" aria-label="Accueil HippolyteDev">
          <LogoIcon />
          <span>HippolyteDev</span>
        </Link>
        <nav className="nav-links" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "page"
                  : undefined
              }
            >
              <span>{item.label}</span>
              {item.badge ? <span className="nav-offer-badge">{item.badge}</span> : null}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          {mode ? (
            <button
              className="audience-switch"
              type="button"
              onClick={toggleMode}
              data-track="click_audience_switch"
              data-track-selected-mode={selectedMode ?? mode}
              data-track-view-mode={mode}
            >
              {getAudienceSwitchCopy(selectedMode ?? mode, mode)}
            </button>
          ) : null}
          <Link className="button button-secondary" href="/contact" data-track="click_nav_contact">
            <AudienceText agency="Me contacter" direct="Parler de mon projet" />
          </Link>
        </div>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className="mobile-menu"
        id="mobile-navigation"
        data-open={isMobileMenuOpen ? "true" : "false"}
      >
        <div className="container mobile-menu-inner">
          <nav className="mobile-nav-links" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "page"
                    : undefined
                }
              >
                <span>{item.label}</span>
                {item.badge ? <span className="nav-offer-badge">{item.badge}</span> : null}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-actions">
            {mode ? (
              <button
                className="audience-switch"
                type="button"
                onClick={() => {
                  toggleMode();
                  setIsMobileMenuOpen(false);
                }}
                data-track="click_audience_switch"
                data-track-selected-mode={selectedMode ?? mode}
                data-track-view-mode={mode}
              >
                {getAudienceSwitchCopy(selectedMode ?? mode, mode)}
              </button>
            ) : null}
            <Link
              className="button button-primary"
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              data-track="click_nav_contact"
            >
              <AudienceText agency="Me contacter" direct="Parler de mon projet" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
