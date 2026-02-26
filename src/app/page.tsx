import { HeroVideo } from "../components/home/HeroVideo";
import { PaymentBar, ShippingBar } from "../components/home/TrustBar";
import { ProductCarousel } from "../components/home/ProductCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { BrandTicker } from "../components/home/BrandTicker";
import { Newsletter } from "../components/home/Newsletter"; // Importamos el Newsletter
import { mockProducts } from "../data/mockProducts";

export default function Home() {
  const ultimosCargados = mockProducts.filter((p) => p.isNew).slice(0, 8);
  const productosEnOferta = mockProducts.filter(
    (p) => p.discountPrice !== undefined,
  );

  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-slate-900">
      <HeroVideo />
      <BrandTicker />

      <div className="flex flex-col w-full py-16 md:py-20 gap-16 bg-slate-50">
        <ProductCarousel
          titulo="Productos Destacados"
          productos={ultimosCargados}
          enlaceVerTodo="/destacados"
        />
        {productosEnOferta.length > 0 && (
          <ProductCarousel
            titulo="Ofertas Especiales"
            productos={productosEnOferta}
            enlaceVerTodo="/ofertas"
          />
        )}
      </div>

      <ShippingBar />

      <div className="bg-slate-900 border-b border-slate-800">
        <HeroBanner />
      </div>

      <PaymentBar />

      {/* NUEVO: Bloque de captación justo antes de terminar la página */}
      <Newsletter />
    </main>
  );
}
