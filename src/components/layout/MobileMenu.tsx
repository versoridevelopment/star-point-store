"use client";

import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import {
  X,
  Search,
  ChevronRight,
  ShoppingBag,
  User,
  Trophy,
  Package,
  Footprints,
  Shirt,
} from "lucide-react";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay Premium */}
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
              className="fixed inset-y-0 left-0 w-[90%] max-w-sm bg-white dark:bg-slate-950 z-[70] shadow-2xl flex flex-col"
            >
              {/* Header con Logo Idéntico al Navbar */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link href="/" onClick={onClose} className="flex items-start">
                  <div className="flex items-baseline tracking-tighter">
                    <span className="text-xl font-black text-star-blue uppercase">
                      STAR
                    </span>
                    <span className="text-xl font-black text-slate-900 dark:text-white uppercase">
                      POINT
                    </span>
                  </div>
                  <span className="ml-1 mt-0.5 text-[8px] font-bold uppercase tracking-widest bg-gradient-to-r from-star-yellow to-star-red text-transparent bg-clip-text">
                    Store
                  </span>
                </Link>
                <Button variant="ghost" onClick={onClose} className="p-1">
                  <X className="w-6 h-6 text-slate-900 dark:text-white" />
                </Button>
              </div>

              {/* Buscador Integrado (Prioridad Mobile) */}
              <div className="px-5 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar marca o modelo..."
                    className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-star-blue transition-all"
                  />
                </div>
              </div>

              {/* Navegación por Categorías */}
              <div className="flex-1 overflow-y-auto px-5 py-2 space-y-6">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Catálogo Principal
                  </h3>
                  <div className="space-y-1">
                    <MenuLink
                      href="/palas"
                      icon={<Trophy className="w-4 h-4" />}
                      label="Palas por Marca"
                      onClick={onClose}
                    />
                    <MenuLink
                      href="/calzados"
                      icon={<Footprints className="w-4 h-4" />}
                      label="Calzados"
                      onClick={onClose}
                    />
                    <MenuLink
                      href="/indumentaria"
                      icon={<Shirt className="w-4 h-4" />}
                      label="Indumentaria"
                      onClick={onClose}
                    />
                    <MenuLink
                      href="/equipamiento"
                      icon={<Package className="w-4 h-4" />}
                      label="Bolsos y Accesorios"
                      onClick={onClose}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Marcas Destacadas
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Bullpadel", "Nox", "Adidas", "Head", "Trexx"].map(
                      (marca) => (
                        <Link
                          key={marca}
                          href={`/palas/marcas/${marca.toLowerCase()}`}
                          onClick={onClose}
                          className="text-xs font-bold py-3 px-4 border border-slate-100 dark:border-slate-800 rounded-lg text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                        >
                          {marca}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Acciones de Cuenta */}
              <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <Link
                  href="/catalogo"
                  onClick={onClose}
                  className="flex items-center justify-center w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-transform active:scale-95"
                >
                  Ver Catálogo Completo
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 gap-2 text-[10px] uppercase font-bold tracking-wider"
                  >
                    <User className="w-4 h-4" /> Mi Perfil
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 gap-2 text-[10px] uppercase font-bold tracking-wider relative"
                  >
                    <ShoppingBag className="w-4 h-4" /> Carrito
                    <span className="absolute top-2 right-3 w-4 h-4 bg-star-red text-white rounded-full flex items-center justify-center text-[8px]">
                      0
                    </span>
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

// Componente auxiliar para links del menú
const MenuLink = ({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className="text-slate-400 group-hover:text-star-blue transition-colors">
        {icon}
      </div>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </span>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300" />
  </Link>
);
