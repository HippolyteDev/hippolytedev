import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = analyticsEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid analytics event." }, { status: 400 });
  }

  const event = parsed.data;
  const utm = event.utm ?? {};

  if (!process.env.DATABASE_URL) {
    return new Response(null, { status: 204 });
  }

  try {
    await prisma.analyticsVisitor.upsert({
      where: {
        id: event.visitorId,
      },
      create: {
        id: event.visitorId,
        audienceMode: event.audienceMode,
        firstReferrer: event.referrer,
        firstUtmSource: utm.source,
        firstUtmMedium: utm.medium,
        firstUtmCampaign: utm.campaign,
        firstUtmContent: utm.content,
        firstUtmTerm: utm.term,
      },
      update: {
        ...(event.type === "audience_selected" ? { audienceMode: event.audienceMode } : {}),
        lastSeenAt: new Date(),
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        visitorId: event.visitorId,
        type: event.type,
        path: event.path,
        audienceMode: event.audienceMode,
        referrer: event.referrer,
        utmSource: utm.source,
        utmMedium: utm.medium,
        utmCampaign: utm.campaign,
        utmContent: utm.content,
        utmTerm: utm.term,
        metadata: event.metadata,
      },
    });
  } catch (error) {
    console.error("analytics_event_failed", error);
  }

  return new Response(null, { status: 204 });
}
