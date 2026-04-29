export const metadata = {
  title: "Page introuvable | Nippon Heritage",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="thank-you-page">
      <section className="search-section">
        <div className="container">
          <div className="section-heading centered on-dark">
            <p className="section-kicker">404</p>
            <h1>Page introuvable</h1>
            <div className="accent-line" aria-hidden="true"></div>
            <p>Le contenu demandé n&apos;est plus disponible ou a été déplacé.</p>
            <div className="button-row hero-actions">
              <a className="button" href="/">
                Retour à l&apos;accueil
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
