"use client";

import { useState, ReactNode } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import {
  X,
  Search,
  ChevronDown,
  ShoppingBag,
  User,
  Trophy,
  Footprints,
  Shirt,
  Package,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/src/lib/utils";
import { Logo } from "../ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Interfaz para evitar el error de ESLint "Unexpected any"
interface AccordionItemProps {
  id: string;
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "palas",
  );

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]"
            />

            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[90%] max-w-sm bg-white dark:bg-slate-950 z-[70] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* HEADER - Logo con Montserrat Italic */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950 z-20">
                <Logo onClick={onClose} />
                <Button variant="ghost" onClick={onClose} className="p-1">
                  <X className="w-6 h-6 text-slate-900 dark:text-white" />
                </Button>
              </div>

              {/* BUSCADOR - Contraste corregido para placeholder */}
              <div className="px-5 py-4 z-20 bg-white dark:bg-slate-950">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-1 focus:ring-star-blue transition-all"
                  />
                </div>
              </div>

              {/* FILTROS DESPLEGABLES */}
              <div className="flex-1 overflow-y-auto px-5 py-2 space-y-2 z-10">
                {/* 1. PALAS */}
                <AccordionItem
                  id="palas"
                  title="Palas"
                  icon={<Trophy className="w-4 h-4" />}
                  isOpen={activeAccordion === "palas"}
                  onClick={() => toggleAccordion("palas")}
                >
                  <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
                    {["Bullpadel", "Nox", "Adidas", "Head", "Trexx"].map(
                      (marca) => (
                        <Link
                          key={marca}
                          href={`/palas/${marca.toLowerCase()}`}
                          onClick={onClose}
                          className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300"
                        >
                          {marca}
                        </Link>
                      ),
                    )}
                    <Link
                      href="/palas"
                      onClick={onClose}
                      className="col-span-2 p-3 border border-star-blue/20 rounded-lg text-xs font-bold text-star-blue flex items-center justify-center gap-2"
                    >
                      Ver todas las palas <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </AccordionItem>

                {/* 2. INDUMENTARIA */}
                <AccordionItem
                  id="indumentaria"
                  title="Indumentaria"
                  icon={<Shirt className="w-4 h-4" />}
                  isOpen={activeAccordion === "indumentaria"}
                  onClick={() => toggleAccordion("indumentaria")}
                >
                  <div className="flex flex-col gap-1 pt-2 pb-3">
                    <Link
                      href="/indumentaria/masculino"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-900"
                    >
                      Masculino
                    </Link>
                    <Link
                      href="/indumentaria/femenino"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-900"
                    >
                      Femenino
                    </Link>
                    <Link
                      href="/indumentaria/sin-genero"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      Sin Género
                    </Link>
                    <Link
                      href="/indumentaria"
                      onClick={onClose}
                      className="mt-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between"
                    >
                      Catálogo de Ropa <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </AccordionItem>

                {/* 3. EQUIPAMIENTO */}
                <AccordionItem
                  id="equipamiento"
                  title="Equipamiento"
                  icon={<Package className="w-4 h-4" />}
                  isOpen={activeAccordion === "equipamiento"}
                  onClick={() => toggleAccordion("equipamiento")}
                >
                  <div className="flex flex-col gap-1 pt-2 pb-3">
                    <Link
                      href="/calzados"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-900 flex items-center gap-2"
                    >
                      <Footprints className="w-3 h-3" /> Zapatillas
                    </Link>
                    <Link
                      href="/bolsos"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-900"
                    >
                      Bolsos y Paleteros
                    </Link>
                    <Link
                      href="/pelotas"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-900"
                    >
                      Pelotas
                    </Link>
                    <Link
                      href="/accesorios"
                      onClick={onClose}
                      className="p-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      Accesorios
                    </Link>
                    <Link
                      href="/equipamiento"
                      onClick={onClose}
                      className="mt-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between"
                    >
                      Ver Todo el Equipo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </AccordionItem>
              </div>

              {/* FOOTER ACCIONES */}
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 z-20 space-y-3">
                <Link
                  href="/catalogo"
                  onClick={onClose}
                  className="flex items-center justify-center w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl"
                >
                  Todo el Catálogo
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 text-[10px] font-bold uppercase tracking-widest active:bg-slate-100"
                  >
                    <User className="w-4 h-4 mr-2" /> Mi Cuenta
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 text-[10px] font-bold uppercase tracking-widest relative active:bg-slate-100"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" /> Carrito
                  </Button>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

// Componente Auxiliar Tipado Correctamente
const AccordionItem = ({
  id,
  title,
  icon,
  isOpen,
  onClick,
  children,
}: AccordionItemProps) => (
  <div className="border-b border-slate-50 dark:border-slate-900">
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-4 px-2"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "transition-colors",
            isOpen ? "text-star-blue" : "text-slate-400",
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-sm font-bold uppercase tracking-tight transition-colors",
            isOpen ? "text-slate-900 dark:text-white" : "text-slate-500",
          )}
        >
          {title}
        </span>
      </div>
      <ChevronDown
        className={cn(
          "w-4 h-4 text-slate-300 transition-transform duration-300",
          isOpen && "rotate-180 text-star-blue",
        )}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden px-2"
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  </div>
);
