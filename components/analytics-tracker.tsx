"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackPortfolioEvent, useAudience } from "@/components/audience-provider";
import { normalizeTrackingType } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { mode, selectedMode, isReady } = useAudience();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (!isReady || !mode || !selectedMode) return;
    trackPortfolioEvent({
      type: "page_view",
      audienceMode: selectedMode,
      metadata: {
        viewMode: mode,
      },
    });
  }, [isReady, mode, selectedMode, pathname, searchParams]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (window.location.pathname.startsWith("/admin")) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-track]");
      if (!tracked) return;

      const metadata: Record<string, string> = {};
      for (const attribute of Array.from(tracked.attributes)) {
        if (attribute.name.startsWith("data-track-")) {
          metadata[attribute.name.replace("data-track-", "")] = attribute.value;
        }
      }

      const trackName = tracked.getAttribute("data-track");
      trackPortfolioEvent({
        type: normalizeTrackingType(trackName),
        audienceMode: selectedMode ?? mode ?? undefined,
        metadata: {
          ...metadata,
          eventName: trackName ?? "unknown",
          viewMode: mode ?? "unknown",
        },
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [mode, selectedMode]);

  return null;
}
