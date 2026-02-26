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
  icon: React.ReactNode; // Usamos React.ReactNode directamente
  items: string[];
  direction?: "left" | "right";
  theme?: "blue" | "red";
}

// 3. El Componente Maestro (Reutilizable y Optimizado)
const InfiniteSeparator = ({
  title,
  icon,
  items,
  direction = "left",
  theme = "blue",
}: InfiniteSeparatorProps) => {
  // Configuraciones dinámicas basadas en el tema
  const isBlue = theme === "blue";
  const glowColor = isBlue ? "bg-star-blue/10" : "bg-star-red/10";
  const borderColor = isBlue ? "border-star-blue/20" : "border-star-red/20";
  const shadowColor = isBlue
    ? "shadow-[0_0_15px_rgba(37,99,235,0.2)]"
    : "shadow-[0_0_15px_rgba(220,38,38,0.2)]";
  const textColor = isBlue ? "text-star-blue" : "text-star-red";

  const animationVariants = {
    left: ["0%", "-50%"],
    right: ["-50%", "0%"],
  };

  return (
    <section className="w-full relative flex flex-col md:flex-row items-center bg-slate-900 dark:bg-black border-y border-slate-800/50 overflow-hidden h-16 md:h-20">
      {/* Atmósfera de color sutil */}
      <div
        className={cn(
          "absolute left-0 top-0 w-1/4 h-full blur-[80px] opacity-40 pointer-events-none",
          glowColor,
        )}
      ></div>

      {/* Título y Logotipo Estáticos */}
      <div className="flex items-center gap-3 px-6 md:px-8 z-20 shrink-0 relative bg-slate-900 dark:bg-black h-full">
        <div
          className={cn(
            "p-2 rounded-lg border",
            glowColor,
            borderColor,
            shadowColor,
          )}
        >
          {/* Clonamos el ícono para inyectarle el color correcto dinámicamente */}
          <div className={textColor}>{icon}</div>
        </div>
        <h3 className="text-[11px] md:text-xs font-black text-white uppercase tracking-[0.25em] whitespace-nowrap">
          {title}
        </h3>
      </div>

      {/* Carrusel Infinito */}
      <div className="relative flex overflow-hidden w-full h-full items-center">
        {/* Máscaras de difuminado laterales (Actualizadas a bg-linear-to de Tailwind v4) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-slate-900 dark:from-black to-transparent z-30 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-slate-900 dark:from-black to-transparent z-30 pointer-events-none"></div>

        <m.div
          animate={{ x: animationVariants[direction] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: direction === "left" ? 40 : 35,
          }}
          className="flex items-center gap-4 px-4 w-max"
        >
          {/* Duplicamos el array para el loop infinito */}
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center bg-white/5 border border-white/10 px-5 py-2 md:py-2.5 rounded-xl backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 cursor-default"
            >
              <span className="text-[10px] md:text-xs font-black text-slate-300 whitespace-nowrap tracking-wider uppercase">
                {item}
              </span>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

// 4. Exportamos las dos versiones ya pre-configuradas para usarlas fácilmente
export const PaymentBar = () => (
  <LazyMotion features={domAnimation}>
    <InfiniteSeparator
      title="Medios de Pago"
      icon={<CreditCard className="w-5 h-5" />}
      items={PAYMENT_METHODS}
      direction="left"
      theme="blue"
    />
  </LazyMotion>
);

export const ShippingBar = () => (
  <LazyMotion features={domAnimation}>
    <InfiniteSeparator
      title="Envíos a todo el país"
      icon={<Truck className="w-5 h-5" />}
      items={SHIPPING_METHODS}
      direction="right"
      theme="red"
    />
  </LazyMotion>
);
