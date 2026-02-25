"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/src/lib/utils";
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Usamos useRef para guardar la posición anterior sin provocar re-renders
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Controla el efecto blur y padding
      setIsScrolled(currentY > 20);

      // Lógica "Smart Navbar": Ocultar al bajar (después de 150px), mostrar al subir
      if (currentY > lastYRef.current && currentY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isHidden ? "-translate-y-full" : "translate-y-0",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-white border-b border-transparent py-5",
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* 1. Izquierda: Menú Móvil (Prioridad) y Filtro Dropdown (Desktop) */}
        <div className="flex-1 flex items-center justify-start gap-4">
          <Button
            variant="ghost"
            className="md:hidden p-2 text-slate-900 -ml-2"
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">Menú</span>
          </Button>

          {/* Dropdown de Categorías (Oculto en móvil, limpio en desktop) */}
          <div className="hidden md:block relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-star-blue transition-colors py-2">
              Tipos de Pala
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Contenedor del menú desplegable */}
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="p-2 flex flex-col gap-1">
                <Link
                  href="/categoria/potencia"
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Potencia (Ataque)
                </Link>
                <Link
                  href="/categoria/control"
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Control (Defensa)
                </Link>
                <Link
                  href="/categoria/polivalente"
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Polivalentes (Híbridas)
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                <Link
                  href="/catalogo"
                  className="px-4 py-2 text-sm text-star-blue font-medium hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Ver catálogo completo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Centro: Logo Estático */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              STAR
            </span>
            <span className="text-2xl font-black tracking-tighter text-star-blue">
              POINT
            </span>
          </Link>
        </div>

        {/* 3. Derecha: Acciones */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
          <Button
            variant="ghost"
            className="p-2 text-slate-900 hover:bg-slate-100 hidden sm:flex"
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            className="relative p-2 text-slate-900 hover:bg-slate-100"
          >
            <ShoppingBag className="w-6 h-6" />
            {/* Color del badge actualizado a star-yellow para el CTA principal */}
            <span className="absolute top-1 right-1 w-4 h-4 bg-star-yellow text-slate-900 text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};
