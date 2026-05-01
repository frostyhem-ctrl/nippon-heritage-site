import "./admin.css";

export const metadata = {
  title: "Admin | Nippon Heritage",
  description: "Espace d’administration privé Nippon Heritage.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return children;
}
