import { useState, type FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, Info } from "lucide-react";
import Input from "../components/Input/Input";
import Toast, { type ToastType } from "../components/Toast/Toast";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

const Dashboard = () => {
  const [username, setUsername] = useState("john_doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToast("success", "Profile updated successfully!");
  };

  const triggerError = () => {
    addToast("error", "Failed to connect to the server. Please try again.");
  };

  const triggerWarning = () => {
    addToast("warning", "Your session will expire in 5 minutes.");
  };

  const triggerInfo = () => {
    addToast("info", "New features are available. Check them out!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-slate-700">
          Update your profile information and test the toast notifications
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Account Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            clearable
            onClear={() => setUsername("")}
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            clearable
            onClear={() => setEmail("")}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password (optional)"
            clearable
            onClear={() => setPassword("")}
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Test Notifications
        </h2>
        <p className="text-sm text-slate-700 mb-4">
          Click the buttons below to trigger different types of toast
          notifications
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={triggerError}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
          >
            <AlertCircle className="h-4 w-4" />
            Trigger Error
          </button>

          <button
            onClick={triggerWarning}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium"
          >
            <AlertCircle className="h-4 w-4" />
            Trigger Warning
          </button>

          <button
            onClick={triggerInfo}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            <Info className="h-4 w-4" />
            Trigger Info
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

export default Dashboard;
