import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Home, Settings, User } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import type { SidebarItem } from "../Sidebar/types";

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
    ],
  },
];

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={sidebarItems}
      />

      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:pl-80" : "pl-0"
        }`}
      >
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
