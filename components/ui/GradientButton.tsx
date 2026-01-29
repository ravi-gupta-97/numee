import { ButtonHTMLAttributes } from "react";

export function GradientButton({
  children,
  type = "submit",
  className = "",
  ...props
}: {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 transition shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
