import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: SidebarItem[];
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
}
