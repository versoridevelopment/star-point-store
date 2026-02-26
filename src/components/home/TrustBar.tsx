"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { CreditCard, Truck } from "lucide-react";
import { cn } from "@/src/lib/utils";

// 1. Datos
export const PAYMENT_METHODS = [
  "VISA",
  "Mastercard",
  "American Express",
  "Cabal",
  "Naranja X",
  "Mercado Pago",
  "Pago Fácil",
  "Rapipago",
];

export const SHIPPING_METHODS = ["Envío Nube", "Correo Argentino", "Andreani"];

// 2. Interfaz del Componente Genérico
interface InfiniteSeparatorProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  direction?: "left" | "right";
  theme?: "blue" | "red";
}

// 3. El Componente Maestro (Micro-Optimizado para Móviles)
const InfiniteSeparator = ({
  title,
  icon,
  items,
  direction = "left",
  theme = "blue",
}: InfiniteSeparatorProps) => {
  const isBlue = theme === "blue";
  const glowColor = isBlue ? "bg-star-blue/10" : "bg-star-red/10";
  const borderColor = isBlue ? "border-star-blue/20" : "border-star-red/20";
  const shadowColor = isBlue
    ? "shadow-[0_0_10px_rgba(37,99,235,0.2)]"
    : "shadow-[0_0_10px_rgba(220,38,38,0.2)]";
  const textColor = isBlue ? "text-star-blue" : "text-star-red";

  const animationVariants = {
    left: ["0%", "-50%"],
    right: ["-50%", "0%"],
  };

  return (
    <section className="w-full relative flex flex-row items-center bg-slate-900 dark:bg-black border-y border-slate-800/50 overflow-hidden h-14 sm:h-16 md:h-20">
      {/* Atmósfera de color sutil */}
      <div
        className={cn(
          "absolute left-0 top-0 w-1/3 md:w-1/4 h-full blur-[60px] md:blur-[80px] opacity-40 pointer-events-none",
          glowColor,
        )}
      ></div>

      {/* Lado Fijo: Título y Logotipo (Optimizado para no comerse el ancho del móvil) */}
      <div className="flex items-center gap-2 md:gap-3 px-3 sm:px-4 md:px-8 z-20 shrink-0 relative bg-slate-900 dark:bg-black h-full shadow-[10px_0_15px_-5px_rgba(0,0,0,0.3)]">
        <div
          className={cn(
            "p-1.5 md:p-2 rounded-lg border",
            glowColor,
            borderColor,
            shadowColor,
          )}
        >
          {/* Reducimos sutilmente el tamaño del ícono en móvil */}
          <div
            className={cn(
              textColor,
              "[&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5",
            )}
          >
            {icon}
          </div>
        </div>
        {/* Usamos hidden min-[360px]:block para ocultar el texto solo en teléfonos extra angostos si hiciera falta, pero con text-[9px] suele entrar perfecto */}
        <h3 className="text-[9px] sm:text-[10px] md:text-xs font-black text-white uppercase tracking-[0.15em] md:tracking-[0.25em] whitespace-nowrap">
          {title}
        </h3>
      </div>

      {/* Lado Dinámico: Carrusel Infinito */}
      <div className="relative flex overflow-hidden w-full h-full items-center">
        {/* Máscaras de difuminado laterales más delgadas en móvil */}
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-12 bg-linear-to-r from-slate-900 dark:from-black to-transparent z-30 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-6 md:w-12 bg-linear-to-l from-slate-900 dark:from-black to-transparent z-30 pointer-events-none"></div>

        <m.div
          animate={{ x: animationVariants[direction] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: direction === "left" ? 35 : 30,
          }}
          className="flex items-center gap-2 md:gap-4 px-2 md:px-4 w-max"
        >
          {/* Loop infinito */}
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center bg-white/5 border border-white/10 px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 cursor-default"
            >
              <span className="text-[9px] md:text-xs font-black text-slate-300 whitespace-nowrap tracking-wider uppercase">
                {item}
              </span>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

// 4. Exportaciones Listas para Usar
export const PaymentBar = () => (
  <LazyMotion features={domAnimation}>
    <InfiniteSeparator
      title="Medios de Pago"
      icon={<CreditCard />}
      items={PAYMENT_METHODS}
      direction="left"
      theme="blue"
    />
  </LazyMotion>
);

export const ShippingBar = () => (
  <LazyMotion features={domAnimation}>
    <InfiniteSeparator
      title="Envíos al país"
      icon={<Truck />}
      items={SHIPPING_METHODS}
      direction="right"
      theme="red"
    />
  </LazyMotion>
);
