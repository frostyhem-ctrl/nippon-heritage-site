import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { getStorageBucket } from "../../../../lib/env";
import { slugify } from "../../../../lib/motorcycles";

export const runtime = "nodejs";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 8 * 1024 * 1024;

function getFileExtension(file) {
  const rawName = typeof file.name === "string" ? file.name : "";
  const fromName = rawName.includes(".") ? rawName.split(".").pop().toLowerCase() : "";

  if (fromName) {
    return fromName;
  }

  switch (file.type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

function sanitizeFolder(value) {
  const slug = slugify(value || "annonce");
  return slug || "annonce";
}

export async function POST(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const formData = await request.formData();
    const folder = sanitizeFolder(formData.get("folder"));
    const files = formData.getAll("files").filter((item) => item instanceof File);

    if (!files.length) {
      return NextResponse.json({ error: "Aucun fichier image reçu." }, { status: 400 });
    }

    const bucket = getStorageBucket();
    const uploads = [];

    for (const file of files) {
      if (!allowedMimeTypes.has(file.type)) {
        return NextResponse.json({ error: "Seuls les fichiers JPG, PNG et WEBP sont acceptés." }, { status: 400 });
      }

      if (file.size > maxFileSize) {
        return NextResponse.json({ error: "Une image dépasse la limite de 8 Mo." }, { status: 400 });
      }

      const extension = getFileExtension(file);
      const storagePath = `${folder}/${Date.now()}-${randomUUID()}.${extension}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await authResult.serviceClient.storage.from(bucket).upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 400 });
      }

      const { data: publicUrlData } = authResult.serviceClient.storage.from(bucket).getPublicUrl(storagePath);

      uploads.push({
        id: randomUUID(),
        url: publicUrlData.publicUrl,
        path: storagePath,
        isPrimary: false,
      });
    }

    return NextResponse.json({ items: uploads }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    const paths = Array.isArray(body?.paths) ? body.paths.map((value) => String(value || "").trim()).filter(Boolean) : [];

    if (!paths.length) {
      return NextResponse.json({ success: true });
    }

    const { error } = await authResult.serviceClient.storage.from(getStorageBucket()).remove(paths);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}
