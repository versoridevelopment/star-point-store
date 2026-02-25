"use client";

import Link from "next/link";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Placeholder } from "../ui/Placeholder";

export const HeroBanner = () => {
  return (
    <LazyMotion features={domAnimation}>
      {/* Contenedor principal: Margen en desktop, full-width en móvil */}
      <section className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 mt-4 md:mt-8 mb-12 md:mb-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full bg-slate-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center"
        >
          {/* Fondo decorativo (Resplandor sutil para no hacerlo un bloque negro plano) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-star-blue/20 blur-[100px]"></div>
            <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-star-red/10 blur-[80px]"></div>
          </div>

          {/* 1. Columna de Texto y CTA (Call to Action) */}
          <div className="relative z-10 w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
            {/* Badge de Novedad */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-star-yellow text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 mx-auto md:mx-0 w-fit backdrop-blur-sm"
            >
              <Zap className="w-3.5 h-3.5 fill-star-yellow" />
              Colección 2026
            </m.div>

            {/* Titular de Alto Impacto */}
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6"
            >
              Potencia tu juego.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Domina la pista.
              </span>
            </m.h1>

            {/* Subtítulo descriptivo */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0 font-medium"
            >
              Las palas más esperadas de la temporada ya están aquí. Tecnología
              de nivel profesional para jugadores que no aceptan menos que la
              excelencia.
            </m.p>

            {/* Botones de Acción (Optimizados para pulgar en móvil) */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/novedades"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-star-yellow text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-yellow-400 hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-wide text-sm"
              >
                Ver Novedades <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/palas"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-colors active:scale-95 uppercase tracking-wide text-sm"
              >
                Explorar Catálogo
              </Link>
            </m.div>
          </div>

          {/* 2. Columna de Imagen (Placeholder hasta que carguemos los assets) */}
          <div className="relative z-10 w-full md:w-1/2 min-h-[300px] md:min-h-[500px] bg-slate-800/50 order-1 md:order-2 flex items-center justify-center p-6 md:p-12">
            {/* Aquí reemplazaremos el Placeholder por el componente Image de Next.js luego */}
            <div className="w-full h-full max-w-[400px] aspect-square transform hover:scale-105 transition-transform duration-700">
              <Placeholder
                text="Imagen de Pala Destacada (PNG sin fondo)"
                className="bg-slate-800 border-slate-700 text-slate-500 rounded-2xl shadow-2xl"
              />
            </div>

            {/* Etiqueta flotante decorativa simulando UI de e-commerce */}
            <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl hidden sm:flex items-center gap-3 animate-bounce shadow-xl">
              <div className="w-10 h-10 bg-star-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">PRO</span>
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-none">
                  Nueva Bullpadel
                </p>
                <p className="text-star-yellow text-[10px] font-bold mt-1">
                  Stock Limitado
                </p>
              </div>
            </div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
};
