"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/Button";
import { Placeholder } from "../ui/Placeholder";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  isExclusive?: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        className="group relative flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-300"
      >
        {product.isExclusive && (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Exclusivo
          </div>
        )}

        {/* Usamos el Placeholder en lugar de next/image */}
        <div className="relative aspect-square w-full overflow-hidden">
          <Placeholder className="group-hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="flex flex-col flex-grow p-5 space-y-4">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <h3 className="text-slate-900 font-semibold text-base leading-tight line-clamp-2">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <span className="text-slate-900 font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="px-3 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span>Añadir</span>
            </Button>
          </div>
        </div>
      </m.article>
    </LazyMotion>
  );
};
