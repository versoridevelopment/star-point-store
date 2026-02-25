import { Button } from "../ui/Button";
export const HeroSection = () => {
  return (
    // Redujimos la altura y lo hicimos ver como un banner de e-commerce
    <section className="relative w-full bg-slate-900 rounded-2xl overflow-hidden mt-6 mb-12 border border-slate-800">
      {/* Fondo sutil para no distraer del producto */}
      <div className="absolute inset-0 bg-gradient-to-r from-star-blue to-transparent z-0"></div>

      <div className="relative z-10 flex flex-col justify-center px-8 py-12 md:py-16 max-w-2xl">
        <span className="text-star-yellow font-bold tracking-wider uppercase text-xs mb-3">
          Oferta de Temporada
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          El equipamiento exacto para tu próximo partido.
        </h1>

        <p className="text-slate-300 text-base md:text-lg mb-8 max-w-md">
          Encuentra las palas más buscadas del circuito y calzado con máximo
          agarre. Envío gratis en órdenes superiores a $150.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Ver Palas 2026</Button>
          <Button variant="outline">Ir a Calzado</Button>
        </div>
      </div>
    </section>
  );
};
