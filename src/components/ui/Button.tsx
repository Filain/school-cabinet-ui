import { ReactNode } from "react";

interface IButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  icon?: boolean;
}

export default function Button({ icon = false, onClick, disabled, className, type, children }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`w-fit ${className} text-lg flex items-center justify-center ${icon ? "px-1 py-1" : "px-6 py-2"}  
  text-white rounded-lg transition-all duration-200 active:scale-85 ${
    disabled
      ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:scale-100 active:scale-100"
      : "bg-green-800  hover:bg-green-700 hover:scale-105 cursor-pointer"
  }`}
    >
      {children}
    </button>
  );
}
