"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  FilterSidebar,
  type FiltrosState,
} from "@/src/components/catalog/FilterSidebar";
import { ProductCard } from "@/src/components/product/ProductCard";
import { mockProducts } from "@/src/data/mockProducts";

const CatalogoContent = () => {
  const searchParams = useSearchParams();
  const currentQueryString = searchParams.toString();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [lastQuery, setLastQuery] = useState(currentQueryString);
  const [orden, setOrden] = useState<string>("destacados");

  // INGENIERÍA: Calculamos los topes de precio reales basados en el inventario actual
  const minPrecioHistorico = useMemo(
    () => Math.min(...mockProducts.map((p) => p.discountPrice || p.price)),
    [],
  );
  const maxPrecioHistorico = useMemo(
    () => Math.max(...mockProducts.map((p) => p.discountPrice || p.price)),
    [],
  );

  const [filtros, setFiltros] = useState<FiltrosState>({
    categoria: searchParams.get("categoria"),
    marcas: searchParams.get("marca") ? [searchParams.get("marca")!] : [],
    genero: searchParams.get("genero"),
    precioMin: minPrecioHistorico, // Arranca en el piso
    precioMax: maxPrecioHistorico, // Arranca en el techo
    soloOfertas: searchParams.get("ofertas") === "true",
  });

  if (currentQueryString !== lastQuery) {
    setFiltros({
      categoria: searchParams.get("categoria"),
      marcas: searchParams.get("marca") ? [searchParams.get("marca")!] : [],
      genero: searchParams.get("genero"),
      precioMin: minPrecioHistorico,
      precioMax: maxPrecioHistorico,
      soloOfertas: searchParams.get("ofertas") === "true",
    });
    setLastQuery(currentQueryString);
  }

  const categoriasDisponibles = useMemo(
    () =>
      Array.from(new Set(mockProducts.map((p) => p.category.toLowerCase()))),
    [],
  );
  const marcasDisponibles = useMemo(
    () => Array.from(new Set(mockProducts.map((p) => p.brand))),
    [],
  );

  // 1. FILTRADO
  const productosFiltrados = useMemo(() => {
    return mockProducts.filter((producto) => {
      const cumpleCategoria = filtros.categoria
        ? producto.category.toLowerCase() === filtros.categoria.toLowerCase()
        : true;
      const cumpleMarca =
        filtros.marcas.length > 0
          ? filtros.marcas.some(
              (m) => m.toLowerCase() === producto.brand.toLowerCase(),
            )
          : true;
      const cumpleOfertas = filtros.soloOfertas
        ? producto.discountPrice !== undefined
        : true;
      const cumpleGenero = filtros.genero
        ? producto.tags?.some(
            (tag) => tag.toLowerCase() === filtros.genero?.toLowerCase(),
          )
        : true;

      // Filtro por Rango de Precios
      const precioFinal = producto.discountPrice || producto.price;
      const cumplePrecio =
        precioFinal >= filtros.precioMin && precioFinal <= filtros.precioMax;

      return (
        cumpleCategoria &&
        cumpleMarca &&
        cumpleOfertas &&
        cumpleGenero &&
        cumplePrecio
      );
    });
  }, [filtros]);

  // 2. ORDENAMIENTO
  const productosOrdenados = useMemo(() => {
    const filtrados = [...productosFiltrados];
    return filtrados.sort((a, b) => {
      const precioA = a.discountPrice || a.price;
      const precioB = b.discountPrice || b.price;

      switch (orden) {
        case "precio-asc":
          return precioA - precioB;
        case "precio-desc":
          return precioB - precioA;
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        case "nuevos":
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
        default:
          return 0;
      }
    });
  }, [productosFiltrados, orden]);

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start mt-8">
      <FilterSidebar
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filtrosActivos={filtros}
        setFiltros={setFiltros}
        categoriasDisponibles={categoriasDisponibles}
        marcasDisponibles={marcasDisponibles}
        precioMinimoHistorico={minPrecioHistorico}
        precioMaximoHistorico={maxPrecioHistorico}
      />

      <div className="flex flex-col flex-1 w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <span className="text-sm font-bold text-slate-500">
            {productosOrdenados.length}{" "}
            {productosOrdenados.length === 1 ? "producto" : "productos"}
          </span>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-star-blue focus-within:ring-1 focus-within:ring-star-blue transition-all">
              <ArrowUpDown className="w-4 h-4 text-slate-400 mr-2" />
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none appearance-none cursor-pointer pr-4"
              >
                <option value="destacados">Más Vendidos</option>
                <option value="nuevos">Más Nuevos</option>
                <option value="precio-asc">Menor Precio</option>
                <option value="precio-desc">Mayor Precio</option>
                <option value="a-z">Alfabético (A-Z)</option>
                <option value="z-a">Alfabético (Z-A)</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold text-slate-900 shadow-sm active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
          </div>
        </div>

        {productosOrdenados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {productosOrdenados.map((producto) => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <SlidersHorizontal className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
              No hay resultados
            </h3>
            <p className="text-slate-500 font-medium text-sm max-w-md mb-6">
              No encontramos productos que coincidan con todos estos filtros
              juntos. Probá desactivando algunos o ampliando el rango de precio.
            </p>
            <button
              onClick={() =>
                setFiltros({
                  categoria: null,
                  marcas: [],
                  genero: null,
                  precioMin: minPrecioHistorico,
                  precioMax: maxPrecioHistorico,
                  soloOfertas: false,
                })
              }
              className="text-sm font-bold text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-widest"
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CatalogoPage() {
  return (
    <main className="flex flex-col w-full min-h-screen pt-20 md:pt-24 bg-white">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-star-blue rounded-full animate-spin"></div>
          </div>
        }
      >
        <CatalogoContent />
      </Suspense>
    </main>
  );
}
