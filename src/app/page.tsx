import { HeroBanner } from "../components/home/HeroBanner";
import { PageContainer } from "../components/layout/PageContainer";

export default function Home() {
  return (
    // Quitamos PageContainer como raíz. Usamos un main normal full-width.
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. HERO BANNER: Libre de restricciones, ocupa el 100% de la pantalla */}
      <HeroBanner />

      {/* 2. CONTENIDO ESTÁNDAR: Todo lo demás va aquí adentro para mantener la alineación perfecta */}
      <PageContainer className="flex flex-col gap-12 md:gap-20 py-8 md:py-12">
        {/* Aquí pondremos la Barra de Confianza (TrustBar) */}

        {/* Aquí pondremos el Carrusel de Novedades */}
      </PageContainer>
    </main>
  );
}
