import Link from "next/link";
import { ShoppingBag, Zap } from "lucide-react";
import { Product } from "../../data/mockProducts";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 w-full">
      {/* CORRECCIÓN 1: aspect-[4/5] fuerza la tarjeta a ser rectangular vertical */}
      <Link
        href={`/producto/${product.slug}`}
        className="relative aspect-[4/5] w-full bg-slate-50 flex items-center justify-center p-6 overflow-hidden"
      >
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-star-yellow text-slate-900 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Zap className="w-3 h-3 fill-slate-900" /> Nuevo
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-star-red text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-out flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-slate-200 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center opacity-50">
            <span className="text-xs font-bold text-slate-400 -rotate-45 select-none uppercase tracking-widest">
              Foto
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {product.brand}
        </span>

        <Link href={`/producto/${product.slug}`} className="mb-2">
          <h3 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-star-blue transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <span className="text-xs text-slate-400 line-through font-medium">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg font-black text-star-red leading-none mt-0.5">
                  {formatPrice(product.discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-lg font-black text-slate-900 leading-none">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            className="shrink-0 w-10 h-10 bg-slate-100 hover:bg-star-blue text-slate-900 hover:text-white rounded-xl flex items-center justify-center transition-colors active:scale-95 group/btn"
            aria-label={`Añadir ${product.name} al carrito`}
            onClick={(e) => {
              e.preventDefault();
              console.log(`Añadido al carrito: ${product.id}`);
            }}
          >
            <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
