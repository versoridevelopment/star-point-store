"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export const HeroVideo = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* CONTENEDOR DEL VIDEO DE YOUTUBE 
        pointer-events-none: Evita que el usuario pause el video al tocar la pantalla del celular.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          /* PARÁMETROS ESTRICTOS DE LA API DE YOUTUBE:
            - autoplay=1: Inicia automáticamente.
            - mute=1: OBLIGATORIO para que el teléfono permita el autoplay.
            - controls=0: Oculta la barra de reproducción.
            - loop=1 & playlist=0n_ZBeysGB8: Obligatorio para que se repita infinitamente.
            - playsinline=1: VITAL. Evita que iOS abra el video a pantalla completa.
            - rel=0: Evita que muestre videos de otros canales al final.
            - iv_load_policy=3: Oculta anotaciones y tarjetas.
            - start=3: NUEVO. Inicia el video a los 3 segundos para saltar introducciones.
          */
          src="https://www.youtube.com/embed/0n_ZBeysGB8?autoplay=1&mute=1&controls=0&loop=1&playlist=0n_ZBeysGB8&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&start=3"
          allow="autoplay; encrypted-media"
          title="Video de presentación Star Point"
          /* EL TRUCO DE ESCALADO CSS PARA SIMULAR "object-cover":
            Los iframes no soportan object-cover nativamente. 
            Lo escalamos masivamente (hasta 300vw en móviles) y lo centramos para que cubra toda la pantalla vertical del teléfono sin dejar franjas negras a los lados.
          */
          className="absolute top-1/2 left-1/2 w-[300vw] h-[168.75vw] sm:w-[200vw] sm:h-[112.5vw] xl:w-[100vw] xl:h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-60"
        ></iframe>
      </div>

      {/* OVERLAY OSCURO PARA DAR CONTRASTE AL TEXTO */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900 z-10"></div>

      {/* CONTENIDO TEXTUAL */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto">
        {/* Etiqueta animada */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-star-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-star-red"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
            Nueva Temporada 2026
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
          Eleva Tu <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-star-blue via-star-yellow to-star-red">
            Nivel
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-sm md:text-lg text-slate-300 font-medium max-w-xl mx-auto mb-10 drop-shadow-md">
          Equipamiento de alto rendimiento para jugadores que buscan el mejor
          desempeño.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/catalogo?categoria=palas"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-star-blue hover:text-white transition-all active:scale-95 shadow-xl"
          >
            Ver Colección <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/catalogo?ofertas=true"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900/40 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 shadow-xl"
          >
            <Play className="w-4 h-4" /> Ofertas
          </Link>
        </div>
      </div>
    </section>
  );
};
