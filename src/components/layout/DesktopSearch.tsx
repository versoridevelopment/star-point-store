"use client";

import { useEffect, useRef } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Search, X } from "lucide-react";

interface DesktopSearchProps {
  isActive: boolean;
  onClose: () => void;
}

export const DesktopSearch = ({ isActive, onClose }: DesktopSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus inteligente cuando se abre la barra de búsqueda
  useEffect(() => {
    if (isActive && inputRef.current) {
      // Un pequeño timeout asegura que la animación termine antes de enfocar
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isActive]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isActive && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center px-4 bg-white dark:bg-slate-950 z-20"
          >
            <div className="relative w-full max-w-2xl flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar palas, zapatillas, indumentaria..."
                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full py-3 pl-12 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-star-blue transition-all outline-none shadow-inner"
              />
              <button
                onClick={onClose}
                className="absolute right-2 p-2 text-slate-400 hover:text-star-red hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Cerrar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};
