import { ProductCard, type Product } from "./ProductCard";

// Inventario actualizado: Equipamiento premium de Pádel
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Pala Star Point Pro Carbon 12K",
    price: 349.0,
    category: "Palas",
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop", // Pala
    isExclusive: true,
  },
  {
    id: "2",
    name: "Zapatillas AeroGrip Elite",
    price: 159.9,
    category: "Calzado",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop", // Zapatillas (Rojas, encajan con la paleta)
  },
  {
    id: "3",
    name: "Bolso Paletero Tour 2.0",
    price: 119.5,
    category: "Accesorios",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", // Bolso deportivo
  },
  {
    id: "4",
    name: "Caja x24 Pelotas Tournament",
    price: 89.0,
    category: "Equipamiento",
    imageUrl:
      "https://images.unsplash.com/photo-1526468604246-88f5dae7b9b1?q=80&w=1000&auto=format&fit=crop", // Pelotas
    isExclusive: true,
  },
];

// Corregimos la interfaz para aceptar 'category'
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
  // Simulación de filtrado a nivel servidor.
  // En producción, esto sería una query SQL filtrando por 'category'
  const displayedProducts = category
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.isExclusive === (category === "exclusive") ||
          p.category.toLowerCase() === category.toLowerCase(),
      )
    : MOCK_PRODUCTS;

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col items-center mb-12 text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {displayedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};
