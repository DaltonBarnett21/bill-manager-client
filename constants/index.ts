import { Icons } from "@/lib/icons";
import { getAuthActions } from "@/stores/authstore";

const { clearAuthStore } = getAuthActions();

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: Icons.dashboard,
    href: "/dashboard",
  },
  {
    title: "Add New Bill",
    icon: Icons.bill,
    href: "/add-new-bill",
  },
  {
    title: "History",
    icon: Icons.history,
    href: "/history",
  },
  {
    title: "Settings",
    icon: Icons.settings,
    href: "/settings",
  },
  {
    title: "Logout",
    icon: Icons.logout,
    href: "",
    handleClick: () => clearAuthStore(),
  },
];
