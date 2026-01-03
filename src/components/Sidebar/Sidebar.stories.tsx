import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Home,
  Settings,
  User,
  Shield,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  BarChart,
  Folder,
  Mail,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { type SidebarItem } from "./types";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const mockMenuItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      {
        label: "Profile",
        href: "/settings/profile",
        icon: User,
      },
      {
        label: "Security",
        href: "/settings/security",
        icon: Shield,
      },
      {
        label: "Notifications",
        href: "/settings/notifications",
        icon: Bell,
      },
      {
        label: "Billing",
        icon: CreditCard,
        children: [
          {
            label: "Payment Methods",
            href: "/settings/billing/payment-methods",
          },
          {
            label: "Invoices",
            href: "/settings/billing/invoices",
          },
        ],
      },
    ],
  },
  {
    label: "Documents",
    icon: Folder,
    children: [
      {
        label: "Reports",
        href: "/documents/reports",
        icon: FileText,
      },
      {
        label: "Archives",
        href: "/documents/archives",
        icon: Folder,
      },
    ],
  },
  {
    label: "Messages",
    href: "/messages",
    icon: Mail,
  },
  {
    label: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
];

const simpleMenuItems: SidebarItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const deepNestedItems: SidebarItem[] = [
  {
    label: "Level 1",
    icon: Folder,
    children: [
      {
        label: "Level 2A",
        icon: Folder,
        children: [
          {
            label: "Level 3A",
            href: "/level-3a",
          },
          {
            label: "Level 3B",
            href: "/level-3b",
          },
        ],
      },
      {
        label: "Level 2B",
        href: "/level-2b",
      },
    ],
  },
  {
    label: "Another Top Level",
    href: "/top",
    icon: Home,
  },
];

const SidebarDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-gray-50 dark:bg-slate-950">
      <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Sidebar Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Click the button below to open the sidebar. Try expanding nested
            menus and clicking on links.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
        >
          Open Menu
        </button>
      </div>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={mockMenuItems}
      />
    </div>
  );
};

const SimpleMenuDemo = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-screen h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={simpleMenuItems}
      />
      <div className="flex items-center justify-center h-full">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Menu
        </button>
      </div>
    </div>
  );
};

const DeepNestingDemo = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-screen h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={deepNestedItems}
      />
      <div className="flex items-center justify-center h-full">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Menu
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <SidebarDemo />,
};

export const AlwaysOpen: Story = {
  render: () => (
    <div className="relative w-screen h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar
        isOpen={true}
        onClose={() => console.log("Close clicked")}
        items={mockMenuItems}
      />
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 dark:text-gray-400">
          Sidebar is always visible in this story
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sidebar in a permanently open state for easier inspection.",
      },
    },
  },
};

export const SimpleMenu: Story = {
  render: () => <SimpleMenuDemo />,
  parameters: {
    docs: {
      description: {
        story: "Simple flat menu without nested items.",
      },
    },
  },
};

export const DeepNesting: Story = {
  render: () => <DeepNestingDemo />,
  parameters: {
    docs: {
      description: {
        story: "Example with deeper nesting (3 levels).",
      },
    },
  },
};
