"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/src/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../ui/Logo";
import { DesktopSearch } from "./DesktopSearch";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

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
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isHidden ? "-translate-y-full" : "translate-y-0",
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-3"
            : "bg-white dark:bg-slate-950 py-4 md:py-5",
        )}
      >
        {/* EL EFECTO "VIVO" MEJORADO: Mayor grosor, resplandor y colores puros */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-slate-100 dark:bg-slate-800/30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-star-blue to-transparent animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between relative">
          {/* 1. Izquierda */}
          <div className="flex items-center gap-2 z-30 relative">
            <Button
              variant="ghost"
              className="md:hidden p-2 text-slate-900 dark:text-white -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="mt-1">
              <Logo />
            </div>
          </div>

          {/* 2. Centro: Navegación Principal */}
          <nav
            className={cn(
              "hidden md:flex flex-1 items-center justify-center gap-8 pl-8 transition-opacity duration-200",
              isSearchActive ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
          >
            {/* --- Desplegable Palas --- */}
            <div className="relative group py-2">
              <Link
                href="/catalogo?categoria=palas"
                className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white hover:text-star-blue transition-colors uppercase tracking-tight"
              >
                Palas{" "}
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                <div className="flex flex-col py-2">
                  {/* Filtro combinado: Categoría + Marca */}
                  {["Bullpadel", "Nox", "Adidas", "Head", "Trexx"].map((m) => (
                    <Link
                      key={m}
                      href={`/catalogo?categoria=palas&marca=${m.toLowerCase()}`}
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-star-blue hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      {m}
                    </Link>
                  ))}
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-4"></div>
                  <Link
                    href="/catalogo?categoria=palas"
                    className="px-4 py-2 text-xs font-bold text-star-blue hover:text-blue-800 transition-colors"
                  >
                    Ver todas
                  </Link>
                </div>
              </div>
            </div>

            {/* --- Desplegable Indumentaria --- */}
            <div className="relative group py-2">
              <Link
                href="/catalogo?categoria=indumentaria"
                className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white hover:text-star-blue transition-colors uppercase tracking-tight"
              >
                Indumentaria{" "}
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                <div className="flex flex-col py-2">
                  {/* Filtro combinado: Categoría + Género */}
                  <Link
                    href="/catalogo?categoria=indumentaria&genero=masculino"
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-star-blue hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Masculino
                  </Link>
                  <Link
                    href="/catalogo?categoria=indumentaria&genero=femenino"
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-star-blue hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Femenino
                  </Link>
                  <Link
                    href="/catalogo?categoria=indumentaria&genero=unisex"
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-star-blue hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Sin Género
                  </Link>
                </div>
              </div>
            </div>

            {/* --- Calzado --- */}
            <Link
              href="/catalogo?categoria=calzado"
              className="text-sm font-bold text-slate-900 dark:text-white hover:text-star-blue transition-colors uppercase tracking-tight py-2"
            >
              Calzado
            </Link>

            {/* --- Accesorios --- */}
            <Link
              href="/catalogo?categoria=accesorios"
              className="text-sm font-bold text-slate-900 dark:text-white hover:text-star-blue transition-colors uppercase tracking-tight py-2"
            >
              Accesorios
            </Link>

            {/* --- Ofertas --- */}
            <Link
              href="/catalogo?ofertas=true"
              className="text-sm font-bold text-star-red hover:text-red-700 transition-colors uppercase tracking-tight py-2 ml-4"
            >
              Ofertas
            </Link>
          </nav>

          {/* Componente Flotante de Búsqueda */}
          <div className="hidden md:block">
            <DesktopSearch
              isActive={isSearchActive}
              onClose={() => setIsSearchActive(false)}
            />
          </div>

          {/* 3. Derecha: Acciones */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-2 z-30 relative">
            {!isSearchActive && (
              <Button
                variant="ghost"
                onClick={() => setIsSearchActive(true)}
                className="hidden md:flex p-1.5 sm:p-2 text-slate-900 dark:text-white hover:text-star-blue transition-colors"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            )}

            <Button
              variant="ghost"
              className="p-1.5 sm:p-2 text-slate-900 dark:text-white hover:text-star-blue transition-colors"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <Button
              variant="ghost"
              className="relative p-1.5 sm:p-2 text-slate-900 dark:text-white hover:text-star-blue transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              {/* Este es el contador que conectaremos con Zustand */}
              <span className="absolute top-0 right-0 w-4 h-4 bg-star-red text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white dark:border-slate-950">
                0
              </span>
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
