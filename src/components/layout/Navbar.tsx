"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/src/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../ui/Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      // Smart Navbar: Ocultar al bajar, mostrar al subir
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
          "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out border-b",
          isHidden ? "-translate-y-full" : "translate-y-0",
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm py-3"
            : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900 py-4 md:py-5",
        )}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Lado Izquierdo: Menú Móvil & MegaMenu */}
          <div className="flex-1 flex items-center justify-start gap-1">
            <Button
              variant="ghost"
              className="md:hidden p-2 text-slate-900 dark:text-white -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <MegaMenu />
          </div>

          {/* Centro: Logo Componentizado */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Logo />
          </div>

          {/* Lado Derecho: Acciones (Visibles en Móvil) */}
          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
            {/* El buscador solo se muestra en Desktop ahora */}
            <Button
              variant="ghost"
              className="hidden md:flex p-2 text-slate-900 dark:text-white hover:text-star-blue"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              className="p-1.5 sm:p-2 text-slate-900 dark:text-white hover:text-star-blue"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <Button
              variant="ghost"
              className="relative p-1.5 sm:p-2 text-slate-900 dark:text-white hover:text-star-blue"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-star-red text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white dark:border-slate-950">
                0
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Menú Lateral para Móviles */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
