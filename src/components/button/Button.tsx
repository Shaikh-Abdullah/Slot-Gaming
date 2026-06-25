import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}: ButtonProps) => {
  const baseClasses =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300",
    secondary: "bg-blue-500 text-white hover:bg-blue-400",
    danger: "bg-red-500 text-white hover:bg-red-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;