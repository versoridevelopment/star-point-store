"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// Añadimos el icono User para el login
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/src/lib/utils";
// Importamos nuestro nuevo componente modular
import { MegaMenu } from "./MegaMenu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

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
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-white border-b border-transparent py-4 md:py-5",
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* 1. Izquierda: Menú Móvil y Mega-Menú */}
        <div className="flex-1 flex items-center justify-start gap-4">
          <Button
            variant="ghost"
            className="md:hidden p-2 text-slate-900 -ml-2"
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">Menú</span>
          </Button>

          {/* Inyectamos el componente aislado */}
          <MegaMenu />
        </div>

        {/* 2. Centro: Logo "Star Point Store" Sutil */}
        <div className="flex-shrink-0 flex items-center justify-center mt-1">
          <Link href="/" className="flex items-start group">
            <div className="flex items-baseline tracking-tighter">
              <span className="text-xl md:text-3xl font-black text-star-blue">
                STAR
              </span>
              <span className="text-xl md:text-3xl font-black text-slate-900">
                POINT
              </span>
              <span className="text-2xl md:text-4xl text-star-red leading-none ml-0.5">
                .
              </span>
            </div>
            {/* Store posicionado como superíndice, pequeño y con color neutro */}
            <span className="ml-1 mt-0.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Store
            </span>
          </Link>
        </div>

        {/* 3. Derecha: Acciones (Buscador, Login y Carrito) */}
        <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
          <Button
            variant="ghost"
            className="p-2 text-slate-900 hover:text-star-blue hover:bg-blue-50 transition-colors hidden sm:flex"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Botón de Login / Mi Cuenta */}
          <Button
            variant="ghost"
            className="p-2 text-slate-900 hover:text-star-blue hover:bg-blue-50 transition-colors hidden sm:flex"
          >
            <User className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            className="relative p-2 text-slate-900 hover:text-star-blue hover:bg-blue-50 transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-star-red text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};
