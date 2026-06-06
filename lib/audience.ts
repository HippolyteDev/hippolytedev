export const AUDIENCE_COOKIE = "audience_mode";
export const VISITOR_COOKIE = "portfolio_visitor_id";
export const ANALYTICS_OPTOUT_COOKIE = "portfolio_analytics_optout";

export type AudienceMode = "agency" | "direct";

export const audienceLabels: Record<AudienceMode, string> = {
  agency: "vue équipe tech",
  direct: "vue entreprise",
};

export const audienceSwitchCopy: Record<AudienceMode, string> = {
  agency: "Vous avez choisi la vue équipe tech. Voir la vue entreprise",
  direct: "Vous avez choisi la vue entreprise. Voir la vue équipe tech",
};

export function getAudienceSwitchCopy(selectedMode: AudienceMode, viewMode: AudienceMode) {
  if (selectedMode === "agency") {
    return viewMode === "agency"
      ? "Vous avez choisi la vue équipe tech. Voir la vue entreprise"
      : "Vous avez choisi la vue équipe tech. Revenir à la vue équipe tech";
  }

  return viewMode === "direct"
    ? "Vous avez choisi la vue entreprise. Voir la vue équipe tech"
    : "Vous avez choisi la vue entreprise. Revenir à la vue entreprise";
}
