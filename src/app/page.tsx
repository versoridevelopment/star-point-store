import { HeroBanner } from "../components/home/HeroBanner";
import { PaymentBar, ShippingBar } from "../components/home/TrustBar";
import { PageContainer } from "../components/layout/PageContainer";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. HERO BANNER */}
      <HeroBanner />

      {/* 2. PRIMER SEPARADOR: Medios de Pago */}
      <PaymentBar />

      {/* 3. CONTENIDO PRINCIPAL (Aquí irán las Palas) */}
      <PageContainer className="flex flex-col gap-12 py-12 md:py-20">
        {/* Contenedor temporal para dar espacio visual antes de construir el carrusel de productos */}
        <div className="w-full flex items-center justify-center h-64 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            [ Aquí irá el Carrusel de Novedades (Trending Now) ]
          </p>
        </div>
      </PageContainer>

      {/* 4. SEGUNDO SEPARADOR: Envíos (Puedes moverlo más abajo si lo deseas luego) */}
      <ShippingBar />
    </main>
  );
}
