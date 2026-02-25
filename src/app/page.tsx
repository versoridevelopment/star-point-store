// src/app/page.tsx
import { HeroSection } from "@/src/components/home/HeroSection";
import { ProductShowcase } from "@/src/components/home/ProductShowcase";
import { PageContainer } from "@/src/components/layout/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />
      <ProductShowcase title="Trending Now" category="exclusive" />
    </PageContainer>
  );
}
