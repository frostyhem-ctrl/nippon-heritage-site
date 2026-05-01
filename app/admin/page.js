import { redirect } from "next/navigation";
import { AdminDashboard } from "../../components/admin-dashboard";
import { requireAdminFromCookies } from "../../lib/auth";
import { getAdminMotorcycles } from "../../lib/motorcycles";

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

export default async function AdminPage() {
  const authResult = await requireAdminFromCookies();

  if (!authResult.ok) {
    redirect("/admin/login");
  }

  const items = await getAdminMotorcycles(authResult.serviceClient);

  return <AdminDashboard initialItems={items} initialProfile={authResult.profile} />;
}
