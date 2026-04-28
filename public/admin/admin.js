(function () {
  const body = document.querySelector(".admin-shell-page") || document.body;
  const message = document.getElementById("admin-message");
  const form = document.getElementById("motorcycle-form");
  const tableBody = document.getElementById("motorcycles-table-body");
  const adminMeta = document.getElementById("admin-meta");
  const logoutButton = document.getElementById("logout-button");
  const newButton = document.getElementById("new-button");
  const deleteButton = document.getElementById("delete-button");

  const fields = {
    id: document.getElementById("motorcycle-id"),
    title: document.getElementById("motorcycle-title"),
    brand: document.getElementById("motorcycle-brand"),
    model: document.getElementById("motorcycle-model"),
    year: document.getElementById("motorcycle-year"),
    displacement: document.getElementById("motorcycle-displacement"),
    engine_type: document.getElementById("motorcycle-engine-type"),
    origin_country: document.getElementById("motorcycle-origin"),
    mileage: document.getElementById("motorcycle-mileage"),
    price: document.getElementById("motorcycle-price"),
    description: document.getElementById("motorcycle-description"),
    status: document.getElementById("motorcycle-status"),
    slug: document.getElementById("motorcycle-slug"),
    images: document.getElementById("motorcycle-images"),
  };

  let supabaseClient;
  let motorcycles = [];

  const setMessage = (text, tone) => {
    if (!message) return;
    message.textContent = text || "";
    message.dataset.tone = tone || "";
  };

  const formatDate = (value) => {
    if (!value) return "-";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  };

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  const parseImages = (value) =>
    value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

  const fillMeta = (profile) => {
    if (!adminMeta) return;
    adminMeta.innerHTML = "";

    [
      `Compte : ${profile.email || "-"}`,
      `Role : ${profile.role || "admin"}`,
      "Acces : prive",
    ].forEach((text) => {
      const chip = document.createElement("span");
      chip.textContent = text;
      adminMeta.appendChild(chip);
    });
  };

  const emptyForm = () => {
    Object.values(fields).forEach((field) => {
      if (field) field.value = "";
    });
    fields.status.value = "draft";
    setMessage("", "");
  };

  const fillForm = (item) => {
    fields.id.value = item.id || "";
    fields.title.value = item.title || "";
    fields.brand.value = item.brand || "";
    fields.model.value = item.model || "";
    fields.year.value = item.year || "";
    fields.displacement.value = item.displacement || "";
    fields.engine_type.value = item.engine_type || "";
    fields.origin_country.value = item.origin_country || "";
    fields.mileage.value = item.mileage || "";
    fields.price.value = item.price || "";
    fields.description.value = item.description || "";
    fields.status.value = item.status || "draft";
    fields.slug.value = item.slug || "";
    fields.images.value = Array.isArray(item.images) ? item.images.join("\n") : "";
  };

  const selectedId = () => fields.id.value || "";

  const renderTable = () => {
    if (!tableBody) return;

    if (!motorcycles.length) {
      tableBody.innerHTML = '<tr><td colspan="5" class="admin-empty">Aucune moto trouvee.</td></tr>';
      return;
    }

    tableBody.innerHTML = "";

    motorcycles.forEach((item) => {
      const row = document.createElement("tr");
      row.dataset.id = item.id;
      row.innerHTML = `
        <td>${item.images && item.images[0] ? `<img src="${item.images[0]}" alt="${item.title || "Moto"}" loading="lazy" />` : "-"}</td>
        <td><strong>${item.title || "-"}</strong><br /><span class="admin-subtle">${item.brand || ""} ${item.model || ""}</span></td>
        <td><span class="admin-status" data-status="${item.status || "draft"}">${item.status || "draft"}</span></td>
        <td>${formatPrice(item.price)}</td>
        <td>${formatDate(item.updated_at)}</td>
      `;
      row.addEventListener("click", () => fillForm(item));
      tableBody.appendChild(row);
    });
  };

  const fetchConfig = async () => {
    const response = await fetch("/api/public/config");
    if (!response.ok) {
      throw new Error("Configuration publique indisponible.");
    }
    return response.json();
  };

  const getAccessToken = async () => {
    const { data } = await supabaseClient.auth.getSession();
    return data.session?.access_token || null;
  };

  const apiFetch = async (url, options) => {
    const token = await getAccessToken();
    if (!token) {
      window.location.replace("/admin/login");
      throw new Error("Session admin absente.");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options && options.headers ? options.headers : {}),
      },
    });

    if (response.status === 401 || response.status === 403) {
      await supabaseClient.auth.signOut();
      window.location.replace("/admin/login");
      throw new Error("Acces admin refuse.");
    }

    return response;
  };

  const loadProfile = async () => {
    const response = await apiFetch("/api/admin/me", { method: "GET" });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Impossible de verifier le role admin.");
    }
    fillMeta(payload.profile || {});
  };

  const loadMotorcycles = async () => {
    const response = await apiFetch("/api/admin/motorcycles", { method: "GET" });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Impossible de charger les motos.");
    }
    motorcycles = Array.isArray(payload.items) ? payload.items : [];
    renderTable();
  };

  const buildPayload = () => ({
    title: fields.title.value.trim(),
    brand: fields.brand.value.trim(),
    model: fields.model.value.trim(),
    year: fields.year.value ? Number(fields.year.value) : null,
    displacement: fields.displacement.value.trim(),
    engine_type: fields.engine_type.value,
    origin_country: fields.origin_country.value.trim(),
    mileage: fields.mileage.value ? Number(fields.mileage.value) : null,
    price: fields.price.value ? Number(fields.price.value) : null,
    description: fields.description.value.trim(),
    status: fields.status.value,
    slug: fields.slug.value.trim(),
    images: parseImages(fields.images.value),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Enregistrement en cours...", "");

    const id = selectedId();
    const method = id ? "PUT" : "POST";
    const payload = buildPayload();

    const response = await apiFetch("/api/admin/motorcycles", {
      method,
      body: JSON.stringify(id ? { id, ...payload } : payload),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "La sauvegarde a echoue.");
    }

    setMessage("Moto enregistree avec succes.", "success");
    await loadMotorcycles();
    const updated = motorcycles.find((item) => item.id === result.item.id);
    if (updated) fillForm(updated);
  };

  const handleDelete = async () => {
    const id = selectedId();
    if (!id) {
      setMessage("Selectionnez d'abord une moto a supprimer.", "error");
      return;
    }

    if (!window.confirm("Supprimer cette moto du catalogue admin ?")) {
      return;
    }

    setMessage("Suppression en cours...", "");

    const response = await apiFetch("/api/admin/motorcycles", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "La suppression a echoue.");
    }

    emptyForm();
    await loadMotorcycles();
    setMessage("Moto supprimee.", "success");
  };

  const bootstrap = async () => {
    try {
      const config = await fetchConfig();
      if (!config.supabaseUrl || !config.supabaseAnonKey) {
        throw new Error("Variables Supabase publiques manquantes.");
      }

      supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);

      const { data } = await supabaseClient.auth.getSession();
      if (!data.session) {
        window.location.replace("/admin/login");
        return;
      }

      await loadProfile();
      await loadMotorcycles();

      form.addEventListener("submit", (event) => {
        handleSubmit(event).catch((error) => {
          setMessage(error.message || "Erreur de sauvegarde.", "error");
        });
      });

      newButton.addEventListener("click", emptyForm);
      deleteButton.addEventListener("click", () => {
        handleDelete().catch((error) => {
          setMessage(error.message || "Erreur de suppression.", "error");
        });
      });

      logoutButton.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        window.location.replace("/admin/login");
      });

      body.dataset.state = "ready";
    } catch (error) {
      setMessage(error.message || "Impossible de charger l'administration.", "error");
      body.dataset.state = "ready";
    }
  };

  bootstrap();
})();
