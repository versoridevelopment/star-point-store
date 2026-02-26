"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Product } from "../../data/mockProducts";
import { ProductCard } from "../product/ProductCard";

interface ProductCarouselProps {
  titulo: string;
  subtitulo?: string;
  productos: Product[];
  enlaceVerTodo?: string;
}

export const ProductCarousel = ({
  titulo,
  subtitulo,
  productos,
  enlaceVerTodo,
}: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [mostrarFlechaIzquierda, setMostrarFlechaIzquierda] = useState(false);
  const [mostrarFlechaDerecha, setMostrarFlechaDerecha] = useState(false);
  const [centrarContenido, setCentrarContenido] = useState(false);

  // Lógica matemática combinada
  const revisarCarrusel = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      const puedeHacerScroll = scrollWidth > clientWidth;

      // Si no puede hacer scroll (caben todos), lo centramos
      setCentrarContenido(!puedeHacerScroll);

      setMostrarFlechaIzquierda(puedeHacerScroll && scrollLeft > 5);
      setMostrarFlechaDerecha(
        puedeHacerScroll &&
          Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5,
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(revisarCarrusel, 100);
    window.addEventListener("resize", revisarCarrusel);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", revisarCarrusel);
    };
  }, [productos]);

  const desplazar = (direccion: "izquierda" | "derecha") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cantidad =
        direccion === "izquierda"
          ? -current.offsetWidth / 1.5
          : current.offsetWidth / 1.5;
      current.scrollBy({ left: cantidad, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full relative py-4 flex flex-col gap-6">
      {/* --- ENCABEZADO --- */}
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full border-b border-slate-200 pb-4">
          <div className="flex flex-col gap-1 flex-1 min-w-0 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight break-words">
              {titulo}
            </h2>
            {subtitulo && (
              <p className="text-sm text-slate-500 font-medium break-words">
                {subtitulo}
              </p>
            )}
          </div>

          {enlaceVerTodo && (
            <Link
              href={enlaceVerTodo}
              className="hidden sm:flex shrink-0 items-center gap-2 text-sm font-bold text-star-blue hover:text-blue-800 transition-colors uppercase tracking-widest"
            >
              Ver Todo <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* --- CARRUSEL --- */}
      <div className="relative group/carrusel w-full">
        {/* Controles PC */}
        <div className="absolute inset-0 max-w-screen-2xl mx-auto pointer-events-none z-20 hidden md:block">
          {mostrarFlechaIzquierda && (
            <button
              onClick={() => desplazar("izquierda")}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover/carrusel:opacity-100 transition-all pointer-events-auto hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {mostrarFlechaDerecha && (
            <button
              onClick={() => desplazar("derecha")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover/carrusel:opacity-100 transition-all pointer-events-auto hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* LA MAGIA DEL CSS CONDICIONAL: 
            Si centra -> Padding simétrico (px-...). 
            Si NO centra -> Padding izquierdo (pl-...) y el div espaciador al final.
        */}
        <div
          ref={scrollRef}
          onScroll={revisarCarrusel}
          className={`flex overflow-x-auto gap-4 sm:gap-6 pb-8 pt-4 snap-x snap-mandatory scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            centrarContenido
              ? "md:justify-center px-4 sm:px-6 md:px-8"
              : "justify-start pl-4 sm:pl-6 md:pl-8"
          }`}
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="snap-start shrink-0 w-[240px] sm:w-[280px] md:w-[300px]"
            >
              <ProductCard product={producto} />
            </div>
          ))}

          {/* El tope final solo existe si el carrusel necesita hacer scroll */}
          {!centrarContenido && (
            <div
              className="shrink-0 w-4 sm:w-6 md:w-8"
              aria-hidden="true"
            ></div>
          )}
        </div>
      </div>

      {/* Botón Móvil */}
      {enlaceVerTodo && (
        <div className="flex sm:hidden px-4 sm:px-6 mt-2">
          <Link
            href={enlaceVerTodo}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-colors uppercase tracking-widest active:scale-95"
          >
            Ver Catálogo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
};
