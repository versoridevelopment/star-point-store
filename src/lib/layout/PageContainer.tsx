// src/components/layout/PageContainer.tsx
import { cn } from "@/src/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType; // Permite renderizar como <main>, <section>, <div>, etc.
}

export const PageContainer = ({
  children,
  className,
  as: Component = "main",
  ...props
}: PageContainerProps) => {
  return (
    <Component
      className={cn(
        "w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8", // Responsividad estandarizada
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
