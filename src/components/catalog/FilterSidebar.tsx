"use client";

import { X } from "lucide-react";

// 1. Tipamos estrictamente el estado de los filtros para eliminar el 'any'
export type FiltrosState = {
  categoria: string | null;
  marcas: string[];
};

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filtrosActivos: FiltrosState;
  setFiltros: (filtros: FiltrosState) => void; // Adiós 'any'
  categoriasDisponibles: string[];
  marcasDisponibles: string[];
}

interface FilterContentProps {
  categoriasDisponibles: string[];
  marcasDisponibles: string[];
  filtrosActivos: FiltrosState;
  onToggleMarca: (marca: string) => void;
  onSetCategoria: (cat: string | null) => void;
}

// 2. Extraemos el sub-componente AFUERA para que React no lo re-cree en cada render
const FilterContent = ({
  categoriasDisponibles,
  marcasDisponibles,
  filtrosActivos,
  onToggleMarca,
  onSetCategoria,
}: FilterContentProps) => (
  <div className="flex flex-col gap-8 w-full">
    {/* Categorías Dinámicas */}
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
        Categoría
      </h3>
      <div className="flex flex-col gap-2">
        {categoriasDisponibles.map((cat) => (
          <button
            key={cat}
            onClick={() => onSetCategoria(cat)}
            className={`text-left text-sm font-medium transition-colors ${
              filtrosActivos.categoria === cat
                ? "text-star-blue font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>

    {/* Marcas Dinámicas */}
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
        Marcas
      </h3>
      <div className="flex flex-col gap-3">
        {marcasDisponibles.map((marca) => (
          <label
            key={marca}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                filtrosActivos.marcas.includes(marca)
                  ? "bg-star-blue border-star-blue"
                  : "border-slate-300 group-hover:border-star-blue"
              }`}
            >
              {filtrosActivos.marcas.includes(marca) && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={filtrosActivos.marcas.includes(marca)}
              onChange={() => onToggleMarca(marca)}
            />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
              {marca}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

export const FilterSidebar = ({
  isOpen,
  onClose,
  filtrosActivos,
  setFiltros,
  categoriasDisponibles,
  marcasDisponibles,
}: FilterSidebarProps) => {
  const toggleMarca = (marca: string) => {
    const nuevasMarcas = filtrosActivos.marcas.includes(marca)
      ? filtrosActivos.marcas.filter((m) => m !== marca)
      : [...filtrosActivos.marcas, marca];

    setFiltros({ ...filtrosActivos, marcas: nuevasMarcas });
  };

  const setCategoria = (cat: string | null) => {
    setFiltros({
      ...filtrosActivos,
      categoria: cat === filtrosActivos.categoria ? null : cat,
    });
  };

  return (
    <>
      {/* VISTA PC */}
      <div className="hidden lg:block w-64 shrink-0">
        <FilterContent
          categoriasDisponibles={categoriasDisponibles}
          marcasDisponibles={marcasDisponibles}
          filtrosActivos={filtrosActivos}
          onToggleMarca={toggleMarca}
          onSetCategoria={setCategoria}
        />
      </div>

      {/* VISTA MÓVIL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="relative w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">
                Filtros
              </h2>
              {/* 3. Agregamos aria-label para solucionar el warning de Accesibilidad */}
              <button
                onClick={onClose}
                aria-label="Cerrar filtros"
                className="p-2 -mr-2 text-slate-400 hover:text-slate-900 bg-slate-100 rounded-full active:scale-95 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <FilterContent
                categoriasDisponibles={categoriasDisponibles}
                marcasDisponibles={marcasDisponibles}
                filtrosActivos={filtrosActivos}
                onToggleMarca={toggleMarca}
                onSetCategoria={setCategoria}
              />
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button
                onClick={onClose}
                className="w-full bg-slate-900 text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl active:scale-95 transition-all"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
