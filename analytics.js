// analytics.js
// Umami helper. Remplace l'ID dans chaque page HTML :
// data-website-id="METTRE_TON_DATA_WEBSITE_ID_ICI"

function trackEvent(eventName, eventData = {}) {
  if (window.umami && typeof window.umami.track === "function") {
    window.umami.track(eventName, eventData);
  }
}

window.trackEvent = trackEvent;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      const eventName = element.getAttribute("data-track");
      if (!eventName) return;

      const payload = {};
      for (const attr of element.attributes) {
        if (attr.name.startsWith("data-track-")) {
          const key = attr.name.replace("data-track-", "");
          payload[key] = attr.value;
        }
      }

      trackEvent(eventName, payload);
    });
  });
});
