// main.js

document.addEventListener("DOMContentLoaded", () => {
  const roleButtons = document.querySelectorAll("[data-role]");
  const roleMessage = document.querySelector("[data-role-message]");

  const messages = {
    "lead-tech":
      "Profil technique : accédez rapidement aux preuves, à Socially, aux choix d’architecture, aux stacks et aux limites connues.",
    "rh":
      "Profil recrutement : mon positionnement, mes projets et mes liens sont structurés pour évaluer rapidement mon adéquation avec une mission React / Next.js / Node.",
    "dirigeant":
      "Profil dirigeant : l’objectif est de réduire le risque via des missions cadrées, des preuves visibles et une communication claire.",
    "agence":
      "Profil agence : je cible surtout du renfort backlog, reprise d’existant, back-office, auth, dashboards et features fullstack cadrées.",
    "ia":
      "Profil IA / sourcing : les pages, titres, mots-clés et preuves sont structurés pour rendre le profil lisible et vérifiable.",
    "curieux":
      "Profil curieux : commencez par Socially pour comprendre le type d’applications complètes que je construis."
  };

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const role = button.getAttribute("data-role");
      if (!role) return;

      localStorage.setItem("hippolytedev_visitor_role", role);

      roleButtons.forEach((btn) => btn.classList.remove("is-selected"));
      button.classList.add("is-selected");

      if (roleMessage && messages[role]) {
        roleMessage.textContent = messages[role];
      }

      if (window.trackEvent) {
        window.trackEvent("visitor_role_selected", { role });
      }
    });
  });

  const savedRole = localStorage.getItem("hippolytedev_visitor_role");
  if (savedRole) {
    const savedButton = document.querySelector(`[data-role="${savedRole}"]`);
    if (savedButton) savedButton.click();
  }
});
