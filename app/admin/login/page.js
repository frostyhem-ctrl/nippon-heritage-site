import { redirect } from "next/navigation";
import { AdminLoginForm } from "../../../components/admin-login-form";
import { requireAdminFromCookies } from "../../../lib/auth";

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

export default async function AdminLoginPage() {
  const authResult = await requireAdminFromCookies();

  if (authResult.ok) {
    redirect("/admin");
  }

  return (
    <div className="admin-shell admin-shell-page" data-state="ready">
      <AdminLoginForm />
    </div>
  );
}
