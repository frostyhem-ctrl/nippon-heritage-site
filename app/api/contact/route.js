import { NextResponse } from "next/server";
import { getRequiredEnv, getSiteUrl } from "../../../lib/env";

export const runtime = "nodejs";

function resolveRedirectTarget(rawTarget) {
  const fallbackUrl = new URL("/merci", getSiteUrl());

  if (!rawTarget) {
    return fallbackUrl;
  }

  try {
    const candidate = new URL(rawTarget, getSiteUrl());
    if (candidate.origin !== fallbackUrl.origin) {
      return fallbackUrl;
    }
    return candidate;
  } catch {
    return fallbackUrl;
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const redirectUrl = resolveRedirectTarget(formData.get("_next"));

  if (String(formData.get("_honey") || "").trim()) {
    return NextResponse.redirect(redirectUrl, 303);
  }

  const recipient = getRequiredEnv("CONTACT_FORM_RECIPIENT");
  const submitUrl = `https://formsubmit.co/${encodeURIComponent(recipient)}`;
  const payload = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (key === "_next" || key === "_url" || key === "_honey") {
      continue;
    }

    payload.append(key, String(value));
  }

  payload.set("_captcha", "false");
  payload.set("_template", "table");
  payload.set("_subject", String(formData.get("_subject") || "Nouvelle demande depuis Nippon Heritage"));

  const response = await fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: payload.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Le formulaire n'a pas pu être transmis.",
      },
      { status: 502 }
    );
  }

  return NextResponse.redirect(redirectUrl, 303);
}
