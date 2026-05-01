"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

const statusOptions = [
  { value: "draft", label: "Brouillon" },
  { value: "available", label: "Disponible" },
  { value: "reserved", label: "Réservée" },
  { value: "sold", label: "Vendue" },
];

const engineTypeOptions = [
  { value: "", label: "Sélectionner" },
  { value: "2t", label: "2 temps" },
  { value: "4t", label: "4 temps" },
];

const motorcycleTypeOptions = ["Sportive", "Roadster", "Trail", "GT", "Custom", "Collection"];
const conditionOptions = ["Très bon état", "Bon état", "À reprendre", "Restauration légère", "Restauration complète"];

function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function buildSuggestedSlug(data) {
  return slugify(data.title || `${data.brand || ""} ${data.model || ""}`);
}

function emptyFormState() {
  return {
    id: "",
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    displacement: "",
    engine_type: "",
    motorcycle_type: "",
    price: "",
    description: "",
    condition: "",
    origin_country: "Japon",
    import_details: "",
    location: "",
    status: "draft",
    slug: "",
    published_at: null,
    gallery: [],
    created_at: null,
    updated_at: null,
  };
}

function normalizeGallery(gallery = []) {
  return gallery.map((item, index) => ({
    ...item,
    id: item.id || `${item.url}-${index}`,
    isPrimary: index === 0,
  }));
}

function toFormState(item) {
  if (!item) {
    return emptyFormState();
  }

  return {
    id: item.id || "",
    title: item.title || "",
    brand: item.brand || "",
    model: item.model || "",
    year: item.year ?? "",
    mileage: item.mileage ?? "",
    displacement: item.displacement || "",
    engine_type: item.engine_type || "",
    motorcycle_type: item.motorcycle_type || "",
    price: item.price ?? "",
    description: item.description || "",
    condition: item.condition || "",
    origin_country: item.origin_country || "Japon",
    import_details: item.import_details || "",
    location: item.location || "",
    status: item.status || "draft",
    slug: item.slug || "",
    published_at: item.published_at || null,
    gallery: normalizeGallery(item.gallery || []),
    created_at: item.created_at || null,
    updated_at: item.updated_at || null,
  };
}

function serializeFormState(formState, overrideStatus) {
  const status = overrideStatus || formState.status || "draft";

  return {
    title: formState.title,
    brand: formState.brand,
    model: formState.model,
    year: formState.year,
    mileage: formState.mileage,
    displacement: formState.displacement,
    engine_type: formState.engine_type,
    motorcycle_type: formState.motorcycle_type,
    price: formState.price,
    description: formState.description,
    condition: formState.condition,
    origin_country: formState.origin_country,
    import_details: formState.import_details,
    location: formState.location,
    status,
    slug: formState.slug,
    published_at: formState.published_at,
    gallery: normalizeGallery(formState.gallery).map((item, index) => ({
      id: item.id,
      url: item.url,
      path: item.path || "",
      position: index,
      isPrimary: index === 0,
    })),
  };
}

async function compressImageFile(file) {
  if (!file.type.startsWith("image/") || file.size <= 2_000_000) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const maxDimension = 1800;
  const longestSide = Math.max(bitmap.width, bitmap.height);
  const scale = longestSide > maxDimension ? maxDimension / longestSide : 1;

  if (scale === 1) {
    bitmap.close();
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.86);
  });

  if (!blob) {
    return file;
  }

  const nextName = file.name.replace(/\.[^/.]+$/, "") || "image";
  return new File([blob], `${nextName}.jpg`, {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "same-origin",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== "undefined") {
        window.location.replace("/admin/login");
      }
    }
    const error = new Error(payload.error || "Une erreur est survenue.");
    error.status = response.status;
    throw error;
  }

  return payload;
}

export function AdminDashboard({ initialItems = [], initialProfile }) {
  const inputRef = useRef(null);
  const [items, setItems] = useState(Array.isArray(initialItems) ? initialItems : []);
  const profile = initialProfile || null;
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || "");
  const [formState, setFormState] = useState(() => toFormState(initialItems[0] || null));
  const [slugEdited, setSlugEdited] = useState(Boolean(initialItems[0]?.slug));
  const [isDirty, setIsDirty] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteArmed, setDeleteArmed] = useState(false);
  const [draggedImageId, setDraggedImageId] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = [item.title, item.brand, item.model, item.slug, item.location].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [items, search, statusFilter]);

  const stats = useMemo(() => {
    const countByStatus = {
      total: items.length,
      available: 0,
      reserved: 0,
      sold: 0,
    };

    items.forEach((item) => {
      if (item.status === "available") countByStatus.available += 1;
      if (item.status === "reserved") countByStatus.reserved += 1;
      if (item.status === "sold") countByStatus.sold += 1;
    });

    return countByStatus;
  }, [items]);

  function setBanner(text, tone = "") {
    setMessage(text);
    setMessageTone(tone);
  }

  function replaceItems(nextItems, preferredId) {
    const sortedItems = [...nextItems].sort((left, right) => {
      const leftDate = left.updated_at || left.created_at || "";
      const rightDate = right.updated_at || right.created_at || "";
      return rightDate.localeCompare(leftDate);
    });

    setItems(sortedItems);
    const targetId = preferredId || selectedId;
    const matched = sortedItems.find((item) => item.id === targetId) || sortedItems[0] || null;

    if (!matched) {
      setSelectedId("");
      setFormState(toFormState(null));
      setSlugEdited(false);
      setIsDirty(false);
      return;
    }

    setSelectedId(matched.id);
    setFormState(toFormState(matched));
    setSlugEdited(Boolean(matched.slug));
    setIsDirty(false);
  }

  async function reloadItems(preferredId) {
    const payload = await requestJson("/api/admin/motorcycles", { method: "GET" });
    replaceItems(payload.items || [], preferredId);
  }

  function safelyLeaveCurrentDraft() {
    if (!isDirty) {
      return true;
    }

    return window.confirm("Des modifications non enregistrées sont présentes. Voulez-vous les abandonner ?");
  }

  function selectItem(item) {
    if (!safelyLeaveCurrentDraft()) {
      return;
    }

    setSelectedId(item.id);
    setFormState(toFormState(item));
    setSlugEdited(Boolean(item.slug));
    setIsDirty(false);
    setDeleteArmed(false);
    setBanner("", "");
  }

  function createNewAd() {
    if (!safelyLeaveCurrentDraft()) {
      return;
    }

    setSelectedId("");
    setFormState(emptyFormState());
    setSlugEdited(false);
    setIsDirty(false);
    setDeleteArmed(false);
    setBanner("Nouvelle annonce prête à être remplie.", "");
  }

  function updateField(name, value) {
    setFormState((previous) => {
      const nextState = { ...previous, [name]: value };
      if (!slugEdited && ["title", "brand", "model"].includes(name)) {
        nextState.slug = buildSuggestedSlug(nextState);
      }
      return nextState;
    });
    setIsDirty(true);
  }

  function updateSlug(value) {
    setSlugEdited(true);
    updateField("slug", slugify(value));
  }

  function normalizePreviewGallery(gallery) {
    return normalizeGallery(gallery);
  }

  async function handleImageUpload(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) {
      return;
    }

    setIsUploading(true);
    setBanner("Téléversement des images en cours...", "");

    try {
      const compressedFiles = [];
      for (const file of files) {
        compressedFiles.push(await compressImageFile(file));
      }

      const uploadData = new FormData();
      uploadData.append("folder", formState.slug || buildSuggestedSlug(formState) || "annonce");
      compressedFiles.forEach((file) => uploadData.append("files", file, file.name));

      const payload = await requestJson("/api/admin/uploads", {
        method: "POST",
        body: uploadData,
      });

      setFormState((previous) => ({
        ...previous,
        gallery: normalizePreviewGallery([...(previous.gallery || []), ...(payload.items || [])]),
      }));
      setIsDirty(true);
      setBanner("Images ajoutées avec succès.", "success");
    } catch (error) {
      setBanner(error.message || "Impossible de téléverser les images.", "error");
    } finally {
      setIsUploading(false);
    }
  }

  async function removeImage(imageId) {
    const image = formState.gallery.find((item) => item.id === imageId);
    if (!image) {
      return;
    }

    if (!window.confirm("Supprimer cette image de l'annonce ?")) {
      return;
    }

    try {
      if (image.path) {
        await requestJson("/api/admin/uploads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paths: [image.path] }),
        });
      }

      setFormState((previous) => ({
        ...previous,
        gallery: normalizePreviewGallery(previous.gallery.filter((item) => item.id !== imageId)),
      }));
      setIsDirty(true);
      setBanner("Image supprimée.", "success");
    } catch (error) {
      setBanner(error.message || "Impossible de supprimer l'image.", "error");
    }
  }

  function moveImage(imageId, direction) {
    setFormState((previous) => {
      const gallery = [...previous.gallery];
      const currentIndex = gallery.findIndex((item) => item.id === imageId);
      if (currentIndex === -1) {
        return previous;
      }

      const nextIndex = currentIndex + direction;
      if (nextIndex < 0 || nextIndex >= gallery.length) {
        return previous;
      }

      [gallery[currentIndex], gallery[nextIndex]] = [gallery[nextIndex], gallery[currentIndex]];
      return {
        ...previous,
        gallery: normalizePreviewGallery(gallery),
      };
    });

    setIsDirty(true);
  }

  function setPrimaryImage(imageId) {
    setFormState((previous) => {
      const currentIndex = previous.gallery.findIndex((item) => item.id === imageId);
      if (currentIndex <= 0) {
        return previous;
      }

      const gallery = [...previous.gallery];
      const [selected] = gallery.splice(currentIndex, 1);
      gallery.unshift(selected);

      return {
        ...previous,
        gallery: normalizePreviewGallery(gallery),
      };
    });

    setIsDirty(true);
  }

  function handleDragStart(imageId) {
    setDraggedImageId(imageId);
  }

  function handleDropImage(imageId) {
    if (!draggedImageId || draggedImageId === imageId) {
      setDraggedImageId("");
      return;
    }

    setFormState((previous) => {
      const gallery = [...previous.gallery];
      const fromIndex = gallery.findIndex((item) => item.id === draggedImageId);
      const toIndex = gallery.findIndex((item) => item.id === imageId);
      if (fromIndex === -1 || toIndex === -1) {
        return previous;
      }

      const [dragged] = gallery.splice(fromIndex, 1);
      gallery.splice(toIndex, 0, dragged);
      return {
        ...previous,
        gallery: normalizePreviewGallery(gallery),
      };
    });

    setDraggedImageId("");
    setIsDirty(true);
  }

  async function saveAnnouncement(nextStatus) {
    if (!formState.title.trim()) {
      setBanner("Le titre de l'annonce est obligatoire.", "error");
      return;
    }

    setIsSaving(true);
    setDeleteArmed(false);
    setBanner(nextStatus === "draft" ? "Enregistrement du brouillon..." : "Enregistrement de l'annonce...", "");

    try {
      const payload = serializeFormState(formState, nextStatus);
      const response = await requestJson("/api/admin/motorcycles", {
        method: formState.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState.id ? { id: formState.id, ...payload } : payload),
      });

      await reloadItems(response.item.id);
      setBanner(nextStatus === "draft" ? "Brouillon enregistré." : "Annonce enregistrée avec succès.", "success");
    } catch (error) {
      setBanner(error.message || "Impossible d'enregistrer l'annonce.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteAnnouncement() {
    if (!formState.id) {
      return;
    }

    setIsDeleting(true);
    setBanner("Suppression de l'annonce...", "");

    try {
      await requestJson("/api/admin/motorcycles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: formState.id }),
      });

      const nextItems = items.filter((item) => item.id !== formState.id);
      replaceItems(nextItems, nextItems[0]?.id || "");
      setBanner("Annonce supprimée.", "success");
    } catch (error) {
      setBanner(error.message || "Impossible de supprimer l'annonce.", "error");
    } finally {
      setDeleteArmed(false);
      setIsDeleting(false);
    }
  }

  async function logout() {
    try {
      await requestJson("/api/admin/session", { method: "DELETE" });
    } finally {
      window.location.replace("/admin/login");
    }
  }

  const previewImage = formState.gallery[0]?.url || "/assets/images/stock/vfr400.jpg";
  const previewLink = formState.slug ? `/motos/${encodeURIComponent(formState.slug)}` : "";

  return (
    <div className="admin-shell admin-shell-page" data-state="ready">
      <header className="admin-topbar">
        <div className="admin-brand">
          <img src="/assets/images/nippon-heritage-logo.png" alt="Logo Nippon Heritage" />
          <div>
            <strong>Nippon Heritage</strong>
            <span>Gestion des annonces</span>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <button type="button" className="admin-secondary" onClick={createNewAd}>
            Ajouter une annonce
          </button>
          <button type="button" className="admin-secondary" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="admin-app">
        <section className="admin-summary-grid">
          <article className="admin-summary-card">
            <span>Annonces</span>
            <strong>{stats.total}</strong>
          </article>
          <article className="admin-summary-card">
            <span>Disponibles</span>
            <strong>{stats.available}</strong>
          </article>
          <article className="admin-summary-card">
            <span>Réservées</span>
            <strong>{stats.reserved}</strong>
          </article>
          <article className="admin-summary-card">
            <span>Vendues</span>
            <strong>{stats.sold}</strong>
          </article>
        </section>

        <div className="admin-grid admin-grid-large">
          <aside className="admin-card admin-sidebar">
            <div className="admin-section-head">
              <div>
                <h1>Tableau de bord</h1>
                <p className="admin-subtle">Retrouvez vos annonces et ouvrez une fiche pour la modifier.</p>
              </div>
            </div>

            <div className="admin-meta">
              <span>Compte : {profile?.email || "Admin"}</span>
              <span>Rôle : {profile?.role || "admin"}</span>
              <span>Accès : sécurisé</span>
            </div>

            <div className="admin-stack admin-list-filters">
              <label className="admin-field">
                <span>Recherche</span>
                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Titre, modèle, slug..." />
              </label>
              <label className="admin-field">
                <span>Statut</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">Tous les statuts</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="admin-list">
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <article key={item.id} className={`admin-list-card${item.id === selectedId ? " is-active" : ""}`}>
                    <button type="button" className="admin-list-select" onClick={() => selectItem(item)}>
                      <div className="admin-list-thumb">
                        {item.main_image ? <img src={item.main_image} alt={item.title || "Moto"} width="160" height="120" loading="lazy" decoding="async" /> : null}
                      </div>
                      <div className="admin-list-copy">
                        <div className="admin-list-head">
                          <strong>{item.title}</strong>
                          <span className="admin-status" data-status={item.status}>
                            {item.status_label}
                          </span>
                        </div>
                        <p>{[item.brand, item.model].filter(Boolean).join(" • ") || "Annonce moto"}</p>
                        <div className="admin-list-meta">
                          <span>{formatPrice(item.price)}</span>
                          <span>{formatDate(item.published_at || item.updated_at)}</span>
                          <span className="admin-list-edit">Modifier</span>
                        </div>
                      </div>
                    </button>
                  </article>
                ))
              ) : (
                <div className="admin-empty-block">
                  <p>Aucune annonce ne correspond aux filtres actuels.</p>
                </div>
              )}
            </div>
          </aside>

          <section className="admin-editor-shell">
            <div className="admin-card admin-editor-card">
              <div className="admin-section-head">
                <div>
                  <h2>{formState.id ? "Modifier une annonce" : "Nouvelle annonce"}</h2>
                  <p className="admin-subtle">Organisation inspirée d'une gestion d'annonces simple, claire et rapide à reprendre.</p>
                </div>
                <div className="admin-editor-actions">
                  <button type="button" className="admin-secondary" onClick={() => saveAnnouncement("draft")} disabled={isSaving || isUploading}>
                    {isSaving && formState.status === "draft" ? "Enregistrement..." : "Enregistrer en brouillon"}
                  </button>
                  <button type="button" className="admin-button" onClick={() => saveAnnouncement("available")} disabled={isSaving || isUploading}>
                    {isSaving ? "Enregistrement..." : "Publier"}
                  </button>
                </div>
              </div>

              <div className="admin-message" data-tone={messageTone} aria-live="polite">
                {message}
              </div>

              <div className="admin-form-layout">
                <div className="admin-form-main">
                  <section className="admin-form-section">
                    <h3>Informations principales</h3>
                    <div className="admin-stack">
                      <label className="admin-field">
                        <span>Titre de l'annonce *</span>
                        <input value={formState.title} onChange={(event) => updateField("title", event.target.value)} required />
                      </label>

                      <div className="admin-row admin-row-3">
                        <label className="admin-field">
                          <span>Marque</span>
                          <input value={formState.brand} onChange={(event) => updateField("brand", event.target.value)} />
                        </label>
                        <label className="admin-field">
                          <span>Modèle</span>
                          <input value={formState.model} onChange={(event) => updateField("model", event.target.value)} />
                        </label>
                        <label className="admin-field">
                          <span>Année</span>
                          <input type="number" min="1950" max="2099" value={formState.year} onChange={(event) => updateField("year", event.target.value)} />
                        </label>
                      </div>

                      <div className="admin-row admin-row-3">
                        <label className="admin-field">
                          <span>Kilométrage</span>
                          <input type="number" min="0" value={formState.mileage} onChange={(event) => updateField("mileage", event.target.value)} />
                        </label>
                        <label className="admin-field">
                          <span>Cylindrée</span>
                          <input value={formState.displacement} onChange={(event) => updateField("displacement", event.target.value)} placeholder="250 cc" />
                        </label>
                        <label className="admin-field">
                          <span>Prix</span>
                          <input type="number" min="0" value={formState.price} onChange={(event) => updateField("price", event.target.value)} />
                        </label>
                      </div>

                      <div className="admin-row admin-row-3">
                        <label className="admin-field">
                          <span>Type moteur</span>
                          <select value={formState.engine_type} onChange={(event) => updateField("engine_type", event.target.value)}>
                            {engineTypeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="admin-field">
                          <span>Type de moto</span>
                          <select value={formState.motorcycle_type} onChange={(event) => updateField("motorcycle_type", event.target.value)}>
                            <option value="">Sélectionner</option>
                            {motorcycleTypeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="admin-field">
                          <span>État</span>
                          <select value={formState.condition} onChange={(event) => updateField("condition", event.target.value)}>
                            <option value="">Sélectionner</option>
                            {conditionOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  </section>

                  <section className="admin-form-section">
                    <h3>Publication et origine</h3>
                    <div className="admin-stack">
                      <div className="admin-row admin-row-3">
                        <label className="admin-field">
                          <span>Statut</span>
                          <select value={formState.status} onChange={(event) => updateField("status", event.target.value)}>
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="admin-field">
                          <span>Localisation</span>
                          <input value={formState.location} onChange={(event) => updateField("location", event.target.value)} placeholder="France, région, ville..." />
                        </label>
                        <label className="admin-field">
                          <span>Origine</span>
                          <input value={formState.origin_country} onChange={(event) => updateField("origin_country", event.target.value)} placeholder="Japon" />
                        </label>
                      </div>

                      <label className="admin-field">
                        <span>Informations d'importation</span>
                        <textarea
                          rows="4"
                          value={formState.import_details}
                          onChange={(event) => updateField("import_details", event.target.value)}
                          placeholder="Précisions utiles sur la provenance, l'historique ou l'importation."
                        />
                      </label>

                      <label className="admin-field">
                        <span>Slug public</span>
                        <input value={formState.slug} onChange={(event) => updateSlug(event.target.value)} placeholder="honda-rvf400r-nc35" />
                      </label>
                    </div>
                  </section>

                  <section className="admin-form-section">
                    <h3>Description</h3>
                    <label className="admin-field">
                      <span>Description complète</span>
                      <textarea
                        rows="8"
                        value={formState.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        placeholder="Décrivez la moto, son état, son intérêt, son équipement et tout élément utile à l'acheteur."
                      />
                    </label>
                  </section>

                  <section className="admin-form-section">
                    <div className="admin-section-head">
                      <div>
                        <h3>Galerie d'images</h3>
                        <p className="admin-subtle">Téléversez, réorganisez, choisissez l'image principale et retirez les visuels devenus inutiles.</p>
                      </div>
                      <div className="admin-upload-actions">
                        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={handleImageUpload} />
                        <button type="button" className="admin-secondary" onClick={() => inputRef.current?.click()} disabled={isUploading}>
                          {isUploading ? "Téléversement..." : "Ajouter des images"}
                        </button>
                      </div>
                    </div>

                    {formState.gallery.length ? (
                      <div className="admin-gallery-grid">
                        {formState.gallery.map((image, index) => (
                          <article
                            key={image.id}
                            className={`admin-gallery-card${image.isPrimary ? " is-primary" : ""}`}
                            draggable
                            onDragStart={() => handleDragStart(image.id)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => handleDropImage(image.id)}
                          >
                            <img src={image.url} alt={`Visuel ${index + 1}`} width="480" height="320" loading="lazy" decoding="async" />
                            <div className="admin-gallery-meta">
                              <strong>{image.isPrimary ? "Image principale" : `Image ${index + 1}`}</strong>
                              <div className="admin-gallery-actions">
                                <button type="button" className="admin-chip" onClick={() => setPrimaryImage(image.id)}>
                                  Principale
                                </button>
                                <button type="button" className="admin-chip" onClick={() => moveImage(image.id, -1)}>
                                  Monter
                                </button>
                                <button type="button" className="admin-chip" onClick={() => moveImage(image.id, 1)}>
                                  Descendre
                                </button>
                                <button type="button" className="admin-chip admin-chip-danger" onClick={() => removeImage(image.id)}>
                                  Supprimer
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="admin-empty-block">
                        <p>Aucune image ajoutée pour le moment.</p>
                      </div>
                    )}
                  </section>
                </div>

                <aside className="admin-preview-panel">
                  <section className="admin-card admin-preview-card">
                    <h3>Aperçu rapide</h3>
                    <img className="admin-preview-image" src={previewImage} alt={formState.title || "Annonce moto"} width="1280" height="960" />
                    <div className="admin-preview-copy">
                      <span className="admin-status" data-status={formState.status}>
                        {statusOptions.find((option) => option.value === formState.status)?.label || "Brouillon"}
                      </span>
                      <strong>{formState.title || "Titre de l'annonce"}</strong>
                      <p>{formState.description || "La description de l'annonce s'affichera ici pour un aperçu rapide avant publication."}</p>
                      <dl className="admin-preview-specs">
                        <div>
                          <dt>Prix</dt>
                          <dd>{formatPrice(formState.price)}</dd>
                        </div>
                        <div>
                          <dt>Année</dt>
                          <dd>{formState.year || "—"}</dd>
                        </div>
                        <div>
                          <dt>Kilométrage</dt>
                          <dd>{formState.mileage ? `${new Intl.NumberFormat("fr-FR").format(Number(formState.mileage))} km` : "—"}</dd>
                        </div>
                        <div>
                          <dt>Publication</dt>
                          <dd>{formatDate(formState.published_at)}</dd>
                        </div>
                      </dl>
                    </div>
                  </section>

                  <section className="admin-card admin-preview-card">
                    <h3>Actions de gestion</h3>
                    <div className="admin-stack">
                      <button type="button" className="admin-button" onClick={() => saveAnnouncement(formState.status)} disabled={isSaving || isUploading}>
                        {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                      </button>

                      {formState.slug && formState.status !== "draft" ? (
                        <Link className="admin-secondary" href={previewLink} target="_blank">
                          Ouvrir la fiche publique
                        </Link>
                      ) : null}

                      <button
                        type="button"
                        className={`admin-secondary${deleteArmed ? " is-danger" : ""}`}
                        onClick={() => {
                          if (!formState.id) {
                            setBanner("L'annonce doit être enregistrée avant suppression.", "error");
                            return;
                          }

                          if (!deleteArmed) {
                            setDeleteArmed(true);
                            setBanner("Cliquez à nouveau sur supprimer pour confirmer.", "error");
                            return;
                          }

                          deleteAnnouncement();
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Suppression..." : deleteArmed ? "Confirmer la suppression" : "Supprimer l'annonce"}
                      </button>
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
