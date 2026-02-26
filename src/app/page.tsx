import { HeroBanner } from "../components/home/HeroBanner";
import { PaymentBar, ShippingBar } from "../components/home/TrustBar";
import { ProductCarousel } from "../components/home/ProductCarousel";
import { mockProducts } from "../data/mockProducts";

export default function Home() {
  const ultimosCargados = mockProducts.filter((p) => p.isNew).slice(0, 8);
  const productosEnOferta = mockProducts.filter(
    (p) => p.discountPrice !== undefined,
  );

  return (
    // CORRECCIÓN CLAVE: Agregamos "overflow-x-hidden" para prohibir el scroll horizontal accidental en la página
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <HeroBanner />
      <PaymentBar />

      <div className="flex flex-col w-full py-12 md:py-16 gap-10 md:gap-16">
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
    </main>
  );
}
