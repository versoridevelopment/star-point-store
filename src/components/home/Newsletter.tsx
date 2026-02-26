"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Suscrito con:", email);
    setEmail("");
    alert("¡Email registrado con éxito!");
  };

  return (
    <section className="w-full bg-slate-950 py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[40%] h-[80%] bg-star-blue/10 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col items-center text-center z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
          Novedades y <span className="text-star-yellow">Ofertas</span>
        </h2>

        <p className="text-slate-400 text-sm md:text-base font-medium max-w-md mx-auto mb-8">
          Dejanos tu email para recibir acceso anticipado a nuevos ingresos y un{" "}
          <strong className="text-white">10% de descuento</strong> en tu próxima
          compra.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md relative flex items-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:border-star-blue focus:ring-1 focus:ring-star-blue transition-all"
          />
          <button
            type="submit"
            aria-label="Suscribirse"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-star-blue hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors active:scale-95"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
};
