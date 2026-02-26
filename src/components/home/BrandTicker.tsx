"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";

// Mapeamos las rutas de los PNGs que agregaste
const MARCAS = [
  { nombre: "Bullpadel", src: "/marcas_blanco/bullpadel.png" },
  { nombre: "Nox", src: "/marcas_blanco/nox.png" },
  { nombre: "Head", src: "/marcas_blanco/head.png" },
  { nombre: "Adidas", src: "/marcas_blanco/adidas.png" },
  { nombre: "Trexx", src: "/marcas_blanco/trexx.png" },
];

export const BrandTicker = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="w-full bg-black py-8 md:py-10 overflow-hidden border-y border-white/5">
        <div className="relative flex items-center w-full">
          {/* Máscaras de difuminado laterales */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <m.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            className="flex items-center gap-12 md:gap-20 px-6 w-max"
          >
            {/* Duplicamos el array varias veces para garantizar que el loop no se corte 
              incluso en monitores ultra anchos.
            */}
            {[...MARCAS, ...MARCAS, ...MARCAS, ...MARCAS].map((marca, idx) => (
              <div
                key={idx}
                // LA CAJA DELIMITADORA:
                // Le damos un ancho (w-24 en móvil, w-32 en PC) y un alto fijo (h-10 en móvil, h-14 en PC).
                // Opacidad al 50% por defecto, se ilumina al pasar el mouse.
                className="relative w-24 h-10 md:w-32 md:h-14 shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
              >
                <Image
                  src={marca.src}
                  alt={`Logo de ${marca.nombre}`}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  // object-contain garantiza que las imágenes se adapten sin deformarse
                  className="object-contain"
                />
              </div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};
