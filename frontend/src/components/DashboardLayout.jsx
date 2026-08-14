import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const roleUsers = {
  receptionist: { name: "Adaeze Uche", role: "Front Desk Receptionist" },
  doctor: { name: "Dr. Alex Morgan", role: "General Practitioner" },
  admin: { name: "Kwame Osei", role: "System Administrator" },
};

export default function DashboardLayout({ role, title, links }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = roleUsers[role];

  const base = `/${role}`;
  const segment = location.pathname.replace(base, "").replace(/^\/+/, "");
  const currentPage = segment
    ? segment.charAt(0).toUpperCase() + segment.slice(1)
    : "Dashboard";

  const crumbs = [
    { label: "Home", to: base },
    { label: title },
    { label: currentPage },
  ];

  return (
    <div className="min-h-screen">
      <Sidebar
        title={title}
        links={links}
        user={user}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          crumbs={crumbs}
          onMenuClick={() => setMobileOpen(true)}
          userName={user.name}
        />
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
