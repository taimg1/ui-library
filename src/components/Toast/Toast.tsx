import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "../../lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    textColor: "text-green-800",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    textColor: "text-red-800",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    textColor: "text-blue-800",
    iconColor: "text-blue-500",
  },
};

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg shadow-lg border-l-4 min-w-[320px] max-w-[400px]",
        config.bgColor,
        config.borderColor
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", config.iconColor)} />
      <p className={cn("flex-1 text-sm font-medium", config.textColor)}>
        {message}
      </p>
      <button
        onClick={() => onClose(id)}
        className={cn(
          "flex-shrink-0 hover:opacity-70 transition-opacity focus:outline-none",
          config.iconColor
        )}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
