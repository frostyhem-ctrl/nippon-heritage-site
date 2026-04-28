import Script from "next/script";
import { buildAdminHtml } from "../../lib/admin-templates";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <>
      <div
        className="admin-shell admin-shell-page"
        data-state="loading"
        dangerouslySetInnerHTML={{ __html: buildAdminHtml() }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"
        strategy="afterInteractive"
      />
      <Script src="/admin/admin.js" strategy="afterInteractive" />
    </>
  );
}
