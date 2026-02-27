import Link from "next/link";
import { type Product } from "@/src/data/mockProducts";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const precioFinal = product.discountPrice || product.price;

  return (
    // LA MAGIA DEL ENRUTAMIENTO ESTÁ ACÁ: Envolvemos todo en un Link
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-star-blue/30 transition-all duration-300"
    >
      {/* Contenedor de Imagen */}
      <div className="relative w-full aspect-square bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
        {product.discountPrice && (
          <div className="absolute top-3 left-3 z-10 bg-star-red text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
            Oferta
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Información del Producto */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {product.brand}
        </span>
        <h3 className="text-sm font-bold text-slate-900 leading-tight mb-3 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product.discountPrice && (
              <span className="text-xs text-slate-400 line-through font-bold">
                ${product.price.toLocaleString("es-AR")}
              </span>
            )}
            <span className="text-lg font-black text-slate-900">
              ${precioFinal.toLocaleString("es-AR")}
            </span>
          </div>

          {/* Este botón visualmente invita a comprar, pero como es un Link, lleva al detalle */}
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-star-blue group-hover:text-white transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
