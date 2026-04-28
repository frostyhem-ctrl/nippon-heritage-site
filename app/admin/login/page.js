import Script from "next/script";
import { buildAdminLoginHtml } from "../../../lib/admin-templates";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Connexion admin | Nippon Heritage",
  description: "Connexion a l'espace admin prive Nippon Heritage.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLoginPage() {
  return (
    <>
      <div
        className="admin-shell admin-shell-page"
        data-state="loading"
        dangerouslySetInnerHTML={{ __html: buildAdminLoginHtml() }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"
        strategy="afterInteractive"
      />
      <Script src="/admin/login.js" strategy="afterInteractive" />
    </>
  );
}
