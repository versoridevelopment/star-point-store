"use client";

import { X } from "lucide-react";

export type FiltrosState = {
  categoria: string | null;
  marcas: string[];
  genero: string | null;
  precioMin: number; // NUEVO: Precio Mínimo
  precioMax: number;
  soloOfertas: boolean;
};

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filtrosActivos: FiltrosState;
  setFiltros: (filtros: FiltrosState) => void;
  categoriasDisponibles: string[];
  marcasDisponibles: string[];
  precioMinimoHistorico: number; // NUEVO: Base de la BD
  precioMaximoHistorico: number;
}

const GENEROS = ["masculino", "femenino", "unisex"];

interface FilterContentProps {
  categoriasDisponibles: string[];
  marcasDisponibles: string[];
  precioMinimoHistorico: number;
  precioMaximoHistorico: number;
  filtrosActivos: FiltrosState;
  onToggleMarca: (marca: string) => void;
  onSetFiltroUnico: <K extends keyof FiltrosState>(
    key: K,
    value: FiltrosState[K],
  ) => void;
}

const FilterContent = ({
  categoriasDisponibles,
  marcasDisponibles,
  precioMinimoHistorico,
  precioMaximoHistorico,
  filtrosActivos,
  onToggleMarca,
  onSetFiltroUnico,
}: FilterContentProps) => (
  <div className="flex flex-col gap-8 w-full pb-8">
    {/* 1. CATEGORÍAS */}
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Categoría
      </h3>
      <div className="flex flex-col gap-2">
        {categoriasDisponibles.map((cat) => {
          const isActive =
            filtrosActivos.categoria?.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() =>
                onSetFiltroUnico("categoria", isActive ? null : cat)
              }
              className={`text-left text-sm font-bold transition-colors ${
                isActive
                  ? "text-star-blue"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          );
        })}
      </div>
    </div>

    {/* 2. GÉNERO */}
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Género
      </h3>
      <div className="flex flex-wrap gap-2">
        {GENEROS.map((gen) => {
          const isActive =
            filtrosActivos.genero?.toLowerCase() === gen.toLowerCase();
          return (
            <button
              key={gen}
              onClick={() => onSetFiltroUnico("genero", isActive ? null : gen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-transparent text-slate-500 border-slate-200 hover:border-slate-400"
              }`}
            >
              {gen}
            </button>
          );
        })}
      </div>
    </div>

    {/* 3. MARCAS */}
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Marcas
      </h3>
      <div className="flex flex-col gap-3">
        {marcasDisponibles.map((marca) => {
          const isActive = filtrosActivos.marcas.some(
            (m) => m.toLowerCase() === marca.toLowerCase(),
          );
          return (
            <label
              key={marca}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-star-blue border-star-blue"
                    : "border-slate-300 group-hover:border-star-blue"
                }`}
              >
                {isActive && (
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
                checked={isActive}
                onChange={() => onToggleMarca(marca)}
              />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                {marca}
              </span>
            </label>
          );
        })}
      </div>
    </div>

    {/* 4. PRECIO (Doble Slider) */}
    <div className="flex flex-col gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Rango de Precio
      </h3>

      {/* Rango Mínimo */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Desde
          </span>
          <span className="text-sm font-bold text-slate-900">
            ${filtrosActivos.precioMin.toLocaleString("es-AR")}
          </span>
        </div>
        <input
          type="range"
          min={precioMinimoHistorico}
          max={filtrosActivos.precioMax} // Tope dinámico: No puede ser mayor al Max
          step={5000}
          value={filtrosActivos.precioMin}
          onChange={(e) =>
            onSetFiltroUnico("precioMin", parseInt(e.target.value))
          }
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
        />
      </div>

      {/* Rango Máximo */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Hasta
          </span>
          <span className="text-sm font-bold text-star-blue">
            ${filtrosActivos.precioMax.toLocaleString("es-AR")}
          </span>
        </div>
        <input
          type="range"
          min={filtrosActivos.precioMin} // Tope dinámico: No puede ser menor al Min
          max={precioMaximoHistorico}
          step={5000}
          value={filtrosActivos.precioMax}
          onChange={(e) =>
            onSetFiltroUnico("precioMax", parseInt(e.target.value))
          }
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-star-blue"
        />
      </div>
    </div>

    {/* 5. OFERTAS */}
    <label className="flex items-center justify-between cursor-pointer group bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors hover:border-star-red/50">
      <span className="text-sm font-black text-star-red uppercase tracking-widest">
        Solo Ofertas
      </span>
      <div
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${filtrosActivos.soloOfertas ? "bg-star-red" : "bg-slate-300"}`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${filtrosActivos.soloOfertas ? "translate-x-6" : "translate-x-0"}`}
        ></div>
      </div>
      <input
        type="checkbox"
        className="hidden"
        checked={filtrosActivos.soloOfertas}
        onChange={(e) => onSetFiltroUnico("soloOfertas", e.target.checked)}
      />
    </label>
  </div>
);

export const FilterSidebar = ({
  isOpen,
  onClose,
  filtrosActivos,
  setFiltros,
  categoriasDisponibles,
  marcasDisponibles,
  precioMinimoHistorico,
  precioMaximoHistorico,
}: FilterSidebarProps) => {
  const toggleMarca = (marca: string) => {
    const isActive = filtrosActivos.marcas.some(
      (m) => m.toLowerCase() === marca.toLowerCase(),
    );
    const nuevasMarcas = isActive
      ? filtrosActivos.marcas.filter(
          (m) => m.toLowerCase() !== marca.toLowerCase(),
        )
      : [...filtrosActivos.marcas, marca];

    setFiltros({ ...filtrosActivos, marcas: nuevasMarcas });
  };

  const updateFiltro = <K extends keyof FiltrosState>(
    key: K,
    value: FiltrosState[K],
  ) => {
    setFiltros({ ...filtrosActivos, [key]: value });
  };

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0">
        <FilterContent
          categoriasDisponibles={categoriasDisponibles}
          marcasDisponibles={marcasDisponibles}
          precioMinimoHistorico={precioMinimoHistorico}
          precioMaximoHistorico={precioMaximoHistorico}
          filtrosActivos={filtrosActivos}
          onToggleMarca={toggleMarca}
          onSetFiltroUnico={updateFiltro}
        />
      </div>

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
                precioMinimoHistorico={precioMinimoHistorico}
                precioMaximoHistorico={precioMaximoHistorico}
                filtrosActivos={filtrosActivos}
                onToggleMarca={toggleMarca}
                onSetFiltroUnico={updateFiltro}
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
