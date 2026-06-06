import { z } from "zod";

export const analyticsEventTypes = [
  "page_view",
  "audience_selected",
  "audience_switched",
  "cta_click",
  "contact_click",
  "outbound_click",
] as const;

export const analyticsEventSchema = z.object({
  visitorId: z.string().min(10).max(80),
  type: z.enum(analyticsEventTypes),
  path: z.string().min(1).max(300),
  audienceMode: z.enum(["agency", "direct"]).optional(),
  referrer: z.string().max(500).optional(),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(160).optional(),
      content: z.string().max(160).optional(),
      term: z.string().max(160).optional(),
    })
    .optional(),
  metadata: z.record(z.string(), z.string().max(240)).optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

export function normalizeTrackingType(trackName: string | null): (typeof analyticsEventTypes)[number] {
  if (!trackName) return "cta_click";
  if (trackName.includes("contact") || trackName.includes("email") || trackName.includes("linkedin")) {
    return "contact_click";
  }
  if (trackName.includes("outbound") || trackName.includes("repo") || trackName.includes("live")) {
    return "outbound_click";
  }
  return "cta_click";
}
