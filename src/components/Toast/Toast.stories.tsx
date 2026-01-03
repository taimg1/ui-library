import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast, { type ToastType } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    id: "1",
    message: "Operation completed successfully!",
    type: "success",
    duration: 5000,
    onClose: (id) => console.log("Toast closed:", id),
  },
};

export const Error: Story = {
  args: {
    id: "2",
    message: "An error occurred while processing your request.",
    type: "error",
    duration: 5000,
    onClose: (id) => console.log("Toast closed:", id),
  },
};

export const Warning: Story = {
  args: {
    id: "3",
    message: "Please review your input before continuing.",
    type: "warning",
    duration: 5000,
    onClose: (id) => console.log("Toast closed:", id),
  },
};

export const Info: Story = {
  args: {
    id: "4",
    message: "Your session will expire in 5 minutes.",
    type: "info",
    duration: 5000,
    onClose: (id) => console.log("Toast closed:", id),
  },
};

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

const ToastDemo = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccessToast = () => {
    addToast("success", "Your changes have been saved successfully!");
  };

  const showErrorToast = () => {
    addToast("error", "Failed to connect to the server. Please try again.");
  };

  const showWarningToast = () => {
    addToast("warning", "Your storage is almost full. Please free up space.");
  };

  const showInfoToast = () => {
    addToast("info", "New update available. Click here to learn more.");
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Toast Notification Demo
        </h2>
        <p className="text-gray-600 mb-4">
          Click the buttons below to show different types of toasts:
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={showSuccessToast}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Show Success
          </button>
          <button
            onClick={showErrorToast}
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Show Error
          </button>
          <button
            onClick={showWarningToast}
            className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Show Warning
          </button>
          <button
            onClick={showInfoToast}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Show Info
          </button>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={3000}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: () => <ToastDemo />,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Interactive demo showing multiple toasts in action. Click the buttons to trigger different types of notifications. Toasts will auto-dismiss after 3 seconds or can be manually closed with the X button. Multiple toasts stack in the bottom-right corner.",
      },
    },
  },
};
