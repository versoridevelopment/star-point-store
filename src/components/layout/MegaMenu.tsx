import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export const MegaMenu = () => {
  return (
    <div className="hidden md:block relative group">
      <button className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white hover:text-star-blue transition-colors py-4">
        Catálogo
        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
      </button>

      <div className="absolute top-full left-0 w-[800px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
        <div className="h-1 w-full bg-gradient-to-r from-star-blue via-star-yellow to-star-red"></div>

        <div className="p-6 grid grid-cols-4 gap-6">
          {/* Columna 1: Palas por Marca */}
          <div className="flex flex-col h-full">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
              Palas
            </h3>
            <div className="flex flex-col gap-2 flex-grow text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link
                href="/palas/bullpadel"
                className="hover:text-star-blue transition-colors"
              >
                Bullpadel
              </Link>
              <Link
                href="/palas/nox"
                className="hover:text-star-blue transition-colors"
              >
                Nox
              </Link>
              <Link
                href="/palas/adidas"
                className="hover:text-star-blue transition-colors"
              >
                Adidas
              </Link>
              <Link
                href="/palas/head"
                className="hover:text-star-blue transition-colors"
              >
                Head
              </Link>
              <Link
                href="/palas/trexx"
                className="hover:text-star-blue transition-colors"
              >
                Trexx
              </Link>
            </div>
            <Link
              href="/palas"
              className="mt-4 flex items-center gap-1 text-xs font-bold text-star-blue group/link"
            >
              Ver todas las palas{" "}
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Columna 2: Indumentaria */}
          <div className="flex flex-col h-full">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
              Indumentaria
            </h3>
            <div className="flex flex-col gap-2 flex-grow text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link
                href="/indumentaria/masculino"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Masculino
              </Link>
              <Link
                href="/indumentaria/femenino"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Femenino
              </Link>
              <Link
                href="/indumentaria/sin-genero"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Sin Género
              </Link>
            </div>
            <Link
              href="/indumentaria"
              className="mt-4 flex items-center gap-1 text-xs font-bold text-star-blue group/link"
            >
              Ver toda la ropa{" "}
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Columna 3: Equipamiento */}
          <div className="flex flex-col h-full">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
              Equipamiento
            </h3>
            <div className="flex flex-col gap-2 flex-grow text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link
                href="/calzados"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Zapatillas
              </Link>
              <Link
                href="/bolsos"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Bolsos y Paleteros
              </Link>
              <Link
                href="/pelotas"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Pelotas
              </Link>
              <Link
                href="/accesorios"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Accesorios
              </Link>
            </div>
            <Link
              href="/equipamiento"
              className="mt-4 flex items-center gap-1 text-xs font-bold text-star-blue group/link"
            >
              Ver todo el equipo{" "}
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Columna 4: Acceso Directo Catálogo */}
          <div className="flex flex-col h-full justify-center">
            <Link
              href="/catalogo"
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-900 bg-star-yellow px-4 py-4 rounded-md hover:bg-yellow-400 transition-colors w-full uppercase tracking-tighter"
            >
              Ir a Todo el Catálogo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
