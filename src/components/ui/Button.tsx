import { cn } from "@/src/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

// Definimos las variantes disponibles para mantener consistencia visual
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    // Diccionario de estilos según la variante
    const variants = {
      primary:
        "bg-star-yellow text-star-background hover:bg-yellow-400 font-semibold",
      secondary: "bg-star-blue text-white hover:bg-slate-800",
      outline:
        "border-2 border-slate-700 text-white hover:border-star-yellow transition-colors",
      ghost: "text-slate-300 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
