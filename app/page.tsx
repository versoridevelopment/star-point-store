// src/app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { PageContainer } from "@/src/lib/layout/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />
      <ProductShowcase title="Trending Now" category="exclusive" />
    </PageContainer>
  );
}
