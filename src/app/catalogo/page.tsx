"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/src/components/product/ProductCard";
import { mockProducts } from "@/src/data/mockProducts";
import { FilterSidebar } from "@/src/components/catalog/FilterSidebar";

export default function CatalogoPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filtros, setFiltros] = useState<{
    categoria: string | null;
    marcas: string[];
  }>({
    categoria: null,
    marcas: [],
  });

  // INGENIERÍA DE DATOS: Simulamos "SELECT DISTINCT" para extraer categorías y marcas reales de tu inventario.
  const categoriasDisponibles = useMemo(() => {
    const todasLasCategorias = mockProducts.map((p) =>
      p.category.toLowerCase(),
    );
    return Array.from(new Set(todasLasCategorias)); // Array.from(new Set()) elimina los duplicados instantáneamente
  }, []);

  const marcasDisponibles = useMemo(() => {
    const todasLasMarcas = mockProducts.map((p) => p.brand);
    return Array.from(new Set(todasLasMarcas));
  }, []);

  // Lógica de filtrado reactiva
  const productosFiltrados = useMemo(() => {
    return mockProducts.filter((producto) => {
      const cumpleCategoria = filtros.categoria
        ? producto.category.toLowerCase() === filtros.categoria
        : true;
      const cumpleMarca =
        filtros.marcas.length > 0
          ? filtros.marcas.includes(producto.brand)
          : true;

      return cumpleCategoria && cumpleMarca;
    });
  }, [filtros]);

  return (
    <main className="flex flex-col w-full min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="w-full bg-white border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Equipamiento <span className="text-star-blue">Profesional</span>
          </h1>
          <p className="mt-2 text-slate-500 font-medium text-sm md:text-base max-w-2xl">
            Explora nuestro catálogo completo. Filtrá por tu marca favorita o
            tipo de producto y encontra tu próxima pala.
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* Pasamos los datos dinámicos al Sidebar */}
        <FilterSidebar
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filtrosActivos={filtros}
          setFiltros={setFiltros}
          categoriasDisponibles={categoriasDisponibles}
          marcasDisponibles={marcasDisponibles}
        />

        <div className="flex flex-col flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <span className="text-sm font-bold text-slate-500">
              {productosFiltrados.length}{" "}
              {productosFiltrados.length === 1 ? "producto" : "productos"}
            </span>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-900 shadow-sm active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                <SlidersHorizontal className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                No hay resultados
              </h3>
              <p className="text-slate-500 font-medium text-sm max-w-md">
                No encontramos productos que coincidan con tus filtros. Probá
                quitando algunas marcas o cambiando la categoría.
              </p>
              <button
                onClick={() => setFiltros({ categoria: null, marcas: [] })}
                className="mt-6 text-sm font-bold text-star-blue hover:text-blue-700 uppercase tracking-widest"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
