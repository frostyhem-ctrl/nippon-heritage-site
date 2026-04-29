import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Administration | Nippon Heritage",
  description: "Espace d’administration privé Nippon Heritage.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return (
    <>
      <div className="admin-shell admin-shell-page" data-state="loading">
        <header className="admin-topbar">
          <div className="admin-brand">
            <img src="/assets/images/nippon-heritage-logo.png" alt="Logo Nippon Heritage" />
            <div>
              <strong>Nippon Heritage</strong>
              <span>Administration sécurisée</span>
            </div>
          </div>
          <button type="button" className="admin-secondary" id="logout-button">
            Déconnexion
          </button>
        </header>

        <main className="admin-app">
          <div className="admin-grid">
            <section className="admin-card">
              <h1>Gestion des motos</h1>
              <p className="admin-subtle">
                Créez, modifiez ou archivez les motos disponibles sans toucher à la mise en page publique.
              </p>

              <div className="admin-message" id="admin-message" aria-live="polite"></div>

              <form id="motorcycle-form" className="admin-stack">
                <input type="hidden" id="motorcycle-id" />
                <div className="admin-field">
                  <span>Titre *</span>
                  <input id="motorcycle-title" name="title" type="text" required />
                </div>
                <div className="admin-row">
                  <label className="admin-field">
                    <span>Marque</span>
                    <input id="motorcycle-brand" name="brand" type="text" />
                  </label>
                  <label className="admin-field">
                    <span>Modèle</span>
                    <input id="motorcycle-model" name="model" type="text" />
                  </label>
                </div>
                <div className="admin-row">
                  <label className="admin-field">
                    <span>Année</span>
                    <input id="motorcycle-year" name="year" type="number" min="1950" max="2099" />
                  </label>
                  <label className="admin-field">
                    <span>Cylindrée</span>
                    <input id="motorcycle-displacement" name="displacement" type="text" placeholder="250 cc" />
                  </label>
                </div>
                <div className="admin-row">
                  <label className="admin-field">
                    <span>Type moteur</span>
                    <select id="motorcycle-engine-type" name="engine_type" defaultValue="">
                      <option value="">Sélectionner</option>
                      <option value="2t">2 temps</option>
                      <option value="4t">4 temps</option>
                    </select>
                  </label>
                  <label className="admin-field">
                    <span>Origine</span>
                    <input id="motorcycle-origin" name="origin_country" type="text" placeholder="Japon" />
                  </label>
                </div>
                <div className="admin-row">
                  <label className="admin-field">
                    <span>Kilométrage</span>
                    <input id="motorcycle-mileage" name="mileage" type="number" min="0" step="1" />
                  </label>
                  <label className="admin-field">
                    <span>Prix</span>
                    <input id="motorcycle-price" name="price" type="number" min="0" step="1" />
                  </label>
                </div>
                <div className="admin-row">
                  <label className="admin-field">
                    <span>Statut</span>
                    <select id="motorcycle-status" name="status" defaultValue="draft">
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="sold">Vendu</option>
                    </select>
                  </label>
                  <label className="admin-field">
                    <span>Slug</span>
                    <input id="motorcycle-slug" name="slug" type="text" placeholder="honda-rvf400r-nc35" />
                  </label>
                </div>
                <label className="admin-field">
                  <span>Description</span>
                  <textarea id="motorcycle-description" name="description"></textarea>
                </label>
                <label className="admin-field">
                  <span>Images</span>
                  <textarea id="motorcycle-images" name="images" placeholder="Une URL d’image par ligne"></textarea>
                </label>
                <div className="admin-actions">
                  <button type="submit" className="admin-button" id="save-button">
                    Enregistrer
                  </button>
                  <button type="button" className="admin-secondary" id="new-button">
                    Nouvelle fiche
                  </button>
                  <button type="button" className="admin-secondary" id="delete-button">
                    Supprimer
                  </button>
                </div>
              </form>
            </section>

            <section className="admin-card">
              <h2>Catalogue</h2>
              <p className="admin-subtle">
                Les motos publiées alimentent automatiquement la partie publique si Supabase est configuré.
              </p>
              <div className="admin-meta" id="admin-meta"></div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Titre</th>
                      <th>Statut</th>
                      <th>Prix</th>
                      <th>Mise à jour</th>
                    </tr>
                  </thead>
                  <tbody id="motorcycles-table-body">
                    <tr>
                      <td colSpan="5" className="admin-empty">
                        Chargement...
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js" strategy="afterInteractive" />
      <Script src="/admin/admin.js" strategy="afterInteractive" />
    </>
  );
}
