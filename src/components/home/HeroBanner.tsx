"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ArrowRight, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { mockProducts } from "@/src/data/mockProducts";
import { Placeholder } from "../ui/Placeholder";

export const HeroBanner = () => {
  const featuredProducts = mockProducts.filter((p) => p.isNew).slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length,
    );

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex];

  const dynamicDescription =
    currentProduct.category === "palas"
      ? `Experimenta el máximo rendimiento con la nueva ${currentProduct.name}. Diseñada para un juego de ${currentProduct.tags[0] || "alto nivel"} gracias a su forma ${currentProduct.specs?.forma?.toLowerCase() || "innovadora"} y balance ${currentProduct.specs?.balance?.toLowerCase() || "perfecto"}.`
      : `Descubre la última innovación de ${currentProduct.brand}. ${currentProduct.name} se une a nuestro catálogo para llevar tu equipamiento al siguiente nivel.`;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <LazyMotion features={domAnimation}>
      {/* CORRECCIÓN CLAVE AQUÍ: 
        Quitamos cualquier "mt-" (margin) y usamos exclusivamente "pt-" (padding).
        Esto garantiza que el fondo azul oscuro comience en la línea 0 de la pantalla.
      */}
      <section className="relative w-full bg-slate-900 pt-[80px] md:pt-[96px] pb-12 overflow-hidden group">
        {/* Fondos Decorativos Estáticos */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
          <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-star-blue/20 blur-[120px]"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-star-red/10 blur-[100px]"></div>
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-16 lg:py-20 flex flex-col md:flex-row items-center"
          >
            {/* TEXTOS Y CALL TO ACTION */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left z-10 order-2 md:order-1 mt-8 md:mt-0 pr-0 md:pr-12">
              <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-star-yellow text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 mx-auto md:mx-0 w-fit backdrop-blur-sm shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-star-yellow" />
                Lanzamiento Exclusivo
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-4">
                {currentProduct.name}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0 font-medium">
                {dynamicDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <Link
                  href={`/producto/${currentProduct.slug}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-star-yellow text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all uppercase tracking-wide text-sm shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                >
                  Ver Producto <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-md">
                  {currentProduct.discountPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-star-red text-xl tracking-tight">
                        {formatPrice(currentProduct.discountPrice)}
                      </span>
                      <span className="text-slate-400 text-sm line-through">
                        {formatPrice(currentProduct.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl tracking-tight">
                      {formatPrice(currentProduct.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* IMAGEN DEL PRODUCTO */}
            <div className="w-full md:w-1/2 flex justify-center items-center z-10 order-1 md:order-2">
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px]">
                {/* Círculo de fondo para resaltar el producto */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-full shadow-2xl transform rotate-3 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
                  <Placeholder
                    text={`Imagen PNG de ${currentProduct.brand}`}
                    className="w-3/4 h-3/4 bg-slate-800 border-none text-slate-400 rounded-3xl shadow-2xl rotate-[-15deg]"
                  />
                </div>

                {/* Badge Flotante de Marca */}
                <div className="absolute bottom-4 right-4 sm:bottom-10 sm:-right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                  <span className="text-white font-black uppercase tracking-widest text-sm">
                    {currentProduct.brand}
                  </span>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>

        {/* CONTROLES DEL CARRUSEL (Botones Laterales e Indicadores) */}
        {featuredProducts.length > 1 && (
          <>
            {/* Flechas (Solo visibles en Desktop al hacer hover) */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20 hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20 hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Puntos Indicadores (Visibles siempre, optimizados para móvil) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? "w-8 h-2 bg-star-yellow"
                      : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ir a la diapositiva ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </LazyMotion>
  );
};
