import { ProductCard } from "../product/ProductCard";
import { mockProducts } from "../../data/mockProducts";

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  category?: string;
}

export const ProductShowcase = ({
  title,
  subtitle,
  category,
}: ProductShowcaseProps) => {
  // Reutilización y optimización pura: filtramos directamente sobre la data real.
  const displayedProducts = category
    ? mockProducts
        .filter(
          (p) =>
            p.isNew === (category === "exclusive") ||
            p.category.toLowerCase() === category.toLowerCase(),
        )
        .slice(0, 4) // Limitamos a 4 para mantener la grilla perfecta en la vista de teléfono y PC
    : mockProducts.slice(0, 4);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="flex flex-col items-center mb-12 text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm font-medium text-slate-500 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-screen-2xl mx-auto">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
