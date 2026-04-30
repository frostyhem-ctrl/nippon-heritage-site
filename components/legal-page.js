import Script from "next/script";
import { PageLead, PublicShell } from "./public-ui";

export function LegalPage({ pageId, title, intro, sections }) {
  return (
    <>
      <Script id={`page-context-${pageId}`} strategy="beforeInteractive">
        {`document.documentElement.dataset.page="${pageId}";`}
      </Script>
      <PublicShell activePath="" showRail={false}>
        <main className="legal-page">
          <section className="legal-section">
            <div className="container">
              <div className="legal-shell">
                <div className="legal-copy">
                  <PageLead kicker="Informations légales" title={title} body={intro} />
                </div>

                <div className="legal-grid">
                  {sections.map((section) => (
                    <article key={section.title} className="legal-card">
                      <h2>{section.title}</h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.items?.length ? (
                        <ul>
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
