import React, { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, clearable, onClear, className, type, value, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");

    const currentValue = value !== undefined ? value : internalValue;
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const hasValue = String(currentValue).length > 0;
    const showClearButton = clearable && hasValue;
    const showPasswordToggle = isPassword;

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else {
        setInternalValue("");
        if (props.onChange) {
          const syntheticEvent = {
            target: { value: "" },
          } as React.ChangeEvent<HTMLInputElement>;
          props.onChange(syntheticEvent);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors",
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
              (showClearButton || showPasswordToggle) && "pr-10",
              className
            )}
            {...props}
          />
          {(showClearButton || showPasswordToggle) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
              {showClearButton && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
