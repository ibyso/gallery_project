import { useState, type ChangeEvent, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: IconType;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  id,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  icon: Icon,
  onChange,
  onClick,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          id={id}
          name={name}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
          className={`w-full rounded-lg border border-slate-300 bg-white py-3 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 ${
            Icon ? "pl-10" : "pl-4"
          }`}
        />

        {/* 비밀번호 표시/숨김 */}
        {type == "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
