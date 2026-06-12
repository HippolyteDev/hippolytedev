"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  "main > .hero",
  "main > .section",
  "main > .section-sm",
  "main article.card",
  "main .product-frame",
  "main .method-panel",
  "main .launch-panel",
  "main .final-offer-cta",
  "footer.section-sm",
].join(", ");

function isAlreadyInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92;
}

function revealDelayFor(element: HTMLElement) {
  const parent = element.parentElement;

  if (!parent) {
    return "0ms";
  }

  const siblings = Array.from(parent.children).filter(
    (child) =>
      child instanceof HTMLElement &&
      (child.matches(".card") || child.matches(".product-frame") || child.matches(".method-panel")),
  );
  const index = siblings.indexOf(element);

  if (index < 0) {
    return "0ms";
  }

  return `${Math.min(index * 55, 220)}ms`;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    document.documentElement.classList.add("reveal-ready");
    const trackedElements = new Set<HTMLElement>();
    let scanFrame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    function prepareElement(element: HTMLElement) {
      if (element.closest(".admin-shell") || element.closest(".audience-modal")) {
        return;
      }

      if (!trackedElements.has(element)) {
        trackedElements.add(element);
        element.classList.add("reveal-target");
        element.style.setProperty("--reveal-delay", revealDelayFor(element));
      }

      if (element.classList.contains("is-visible")) {
        return;
      }

      if (isAlreadyInView(element)) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    }

    function scanPage() {
      scanFrame = 0;
      const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

      for (const element of elements) {
        prepareElement(element);
      }
    }

    function scheduleScan() {
      if (scanFrame) {
        return;
      }

      scanFrame = window.requestAnimationFrame(scanPage);
    }

    const mutationObserver = new MutationObserver(scheduleScan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    scheduleScan();
    const delayedScan = window.setTimeout(scanPage, 120);

    return () => {
      window.clearTimeout(delayedScan);
      if (scanFrame) {
        window.cancelAnimationFrame(scanFrame);
      }

      observer.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove("reveal-ready");

      for (const element of trackedElements) {
        element.classList.remove("reveal-target", "is-visible");
        element.style.removeProperty("--reveal-delay");
      }
    };
  }, [pathname]);

  return null;
}
