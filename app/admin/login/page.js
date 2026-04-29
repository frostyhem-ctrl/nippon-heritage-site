import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Connexion admin | Nippon Heritage",
  description: "Connexion à l’espace admin privé Nippon Heritage.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLoginPage() {
  return (
    <>
      <div className="admin-shell admin-shell-page" data-state="loading">
        <main className="login-wrap">
          <section className="login-shell">
            <div className="login-card">
              <div className="login-brand">
                <img src="/assets/images/nippon-heritage-logo.png" alt="Logo Nippon Heritage" />
                <div>
                  <strong>Connexion admin</strong>
                  <p>Accès réservé aux administrateurs Nippon Heritage.</p>
                </div>
              </div>

              <div className="admin-message" id="login-message" aria-live="polite"></div>

              <form id="login-form" className="admin-stack">
                <label className="admin-field">
                  <span>E-mail</span>
                  <input id="login-email" type="email" required autoComplete="email" />
                </label>
                <label className="admin-field">
                  <span>Mot de passe</span>
                  <input id="login-password" type="password" required autoComplete="current-password" />
                </label>
                <div className="login-actions">
                  <button type="submit" className="admin-button">
                    Se connecter
                  </button>
                  <a className="admin-secondary" href="/">
                    Retour au site
                  </a>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js" strategy="afterInteractive" />
      <Script src="/admin/login.js" strategy="afterInteractive" />
    </>
  );
}
