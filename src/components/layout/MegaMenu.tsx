import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const MegaMenu = () => {
  return (
    <div className="hidden md:block relative group">
      <button className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-star-blue transition-colors py-4">
        Catálogo
        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
      </button>

      <div className="absolute top-full left-0 w-[800px] bg-white border border-slate-200 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
        <div className="h-1 w-full bg-gradient-to-r from-star-blue via-star-yellow to-star-red"></div>

        {/* Usamos un grid de 4 columnas para abarcar todo el inventario */}
        <div className="p-6 grid grid-cols-4 gap-6">
          {/* Columna 1: El Core (Palas) */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
              Palas
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/palas/potencia"
                className="text-sm font-medium text-slate-600 hover:text-star-red transition-colors"
              >
                Diamante (Potencia)
              </Link>
              <Link
                href="/palas/polivalente"
                className="text-sm font-medium text-slate-600 hover:text-star-blue transition-colors"
              >
                Lágrima (Polivalente)
              </Link>
              <Link
                href="/palas/control"
                className="text-sm font-medium text-slate-600 hover:text-star-yellow transition-colors"
              >
                Redonda (Control)
              </Link>
              <Link
                href="/palas/iniciacion"
                className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors mt-1"
              >
                Nivel Iniciación
              </Link>
            </div>
          </div>

          {/* Columna 2: Calzado e Indumentaria */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
              Equipación
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/calzado"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Zapatillas (Suela Espiga)
              </Link>
              <Link
                href="/ropa/hombre"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Indumentaria Hombre
              </Link>
              <Link
                href="/ropa/mujer"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Indumentaria Mujer
              </Link>
            </div>
          </div>

          {/* Columna 3: Complementos */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
              Accesorios
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/accesorios/tubos"
                className="text-sm font-medium text-slate-600 hover:text-star-yellow transition-colors"
              >
                Tubos de Pelotas
              </Link>
              <Link
                href="/accesorios/bolsos"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Bolsos y Paleteros
              </Link>
              <Link
                href="/accesorios/overgrips"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Overgrips y Protectores
              </Link>
            </div>
          </div>

          {/* Columna 4: Marcas y Promociones */}
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col justify-between border border-slate-100">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                Top Marcas
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">
                  Bullpadel
                </span>
                <span className="text-xs font-medium bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">
                  Nox
                </span>
                <span className="text-xs font-bold bg-star-blue/10 text-star-blue border border-star-blue/20 px-2 py-1 rounded">
                  Star Point
                </span>
              </div>
            </div>
            <Link
              href="/ofertas"
              className="text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-md hover:bg-star-red transition-colors text-center w-full"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
