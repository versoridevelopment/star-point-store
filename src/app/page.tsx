import { HeroVideo } from "../components/home/HeroVideo";
import { PaymentBar, ShippingBar } from "../components/home/TrustBar";
import { ProductCarousel } from "../components/home/ProductCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { mockProducts } from "../data/mockProducts";

export default function Home() {
  const ultimosCargados = mockProducts.filter((p) => p.isNew).slice(0, 8);
  const productosEnOferta = mockProducts.filter(
    (p) => p.discountPrice !== undefined,
  );

  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden bg-slate-900">
      {/* 1. NUEVO VIDEO DE PRESENTACIÓN (Ocupa la primera vista) */}
      <HeroVideo />

      {/* 2. BARRA DE PAGOS */}
      <PaymentBar />

      {/* 3. CARRUSELES DE PRODUCTOS (Con fondo claro para contrastar con el video) */}
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

      {/* 4. BARRA DE ENVÍOS */}
      <ShippingBar />

      {/* 5. ANTIGUO HERO BANNER (Actúa como un excelente cierre destacando un producto estrella) */}
      <div className="bg-slate-900">
        <HeroBanner />
      </div>
    </main>
  );
}
