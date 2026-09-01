"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLayerGroup, FaMoneyCheck, FaPhotoFilm, FaUsers } from "react-icons/fa6";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const adminNavItems = [
  {
    name: "Users",
    href: "/admin/users",
    icon: <FaUsers className="text-accent" />,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: <FaLayerGroup className="text-accent" />,
  },
  {
    name: "Gigs",
    href: "/admin/gigs",
    icon: <FaPhotoFilm className="text-accent" />,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: <FaMoneyCheck className="text-accent" />,
  },
];

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }: AdminSidebarProps) => {
  const pathname = usePathname();
  return (
    <>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-50 bg-black/50 lg:hidden backdrop-blur-xs transition-opacity" />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-57 shrink-0 bg-card border-r border-border flex flex-col backdrop-blur-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-8 py-4.75 border-b border-border">
          <Link
            href="/admin"
            className="text-4xl font-extrabold tracking-tight"
            onClick={() => setIsSidebarOpen(false)}
          >
            Skill<span className="text-accent">ora</span>{" "}
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-4 mb-3">Management</p>
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-accent/10 border-accent text-accent shadow-sm"
                    : "text-muted-foreground hover:bg-card/80 hover:text-foreground border-transparent"
                }`}
              >
                <div className="text-base">{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pb-6 border-t border-border pt-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-muted-foreground bg-background border border-border hover:border-accent/40 hover:text-accent transition-all duration-300"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
