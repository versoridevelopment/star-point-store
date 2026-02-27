"use client";

import { useState, use } from "react"; // IMPORTANTE: Importamos 'use' de React
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { mockProducts } from "@/src/data/mockProducts";
import { ProductCard } from "@/src/components/product/ProductCard";

// Definimos la interfaz correcta para los props en Next.js App Router modernos
interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // EL FIX: "Desenvolvemos" la promesa usando el hook 'use()'
  const resolvedParams = use(params);

  // Simulamos la búsqueda en la BD
  const product = mockProducts.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // --- ESTADOS LOCALES ---
  const allImages = [product.image, ...(product.images || [])];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // --- HANDLERS ---
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () =>
    setQuantity((prev) => Math.min(product.stock, prev + 1));

  // Productos relacionados
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="flex flex-col w-full min-h-screen pt-20 md:pt-24 bg-white pb-16">
      {/* BREADCRUMBS */}
      <div className="w-full border-b border-slate-100 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-star-blue transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/catalogo?categoria=${product.category.toLowerCase()}`}
            className="hover:text-star-blue transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">{product.brand}</span>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          {/* 1. COLUMNA IZQUIERDA: GALERÍA */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
              {product.discountPrice && (
                <div className="absolute top-4 left-4 z-10 bg-star-red text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                  Oferta
                </div>
              )}
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain p-8 mix-blend-multiply"
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl border-2 flex items-center justify-center overflow-hidden transition-all ${
                      activeImage === img
                        ? "border-star-blue"
                        : "border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-contain p-2 mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. COLUMNA DERECHA: INFORMACIÓN */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <span className="text-sm font-black text-star-blue uppercase tracking-widest">
                {product.brand}
              </span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Agregar a favoritos"
                className="p-2 -mt-2 -mr-2 text-slate-400 hover:text-star-red transition-colors group"
              >
                <Heart
                  className={`w-6 h-6 transition-all active:scale-95 ${isWishlisted ? "fill-star-red text-star-red" : "group-hover:fill-star-red/20"}`}
                />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-[1.1] mb-6">
              {product.name}
            </h1>

            <div className="mb-8">
              {product.discountPrice ? (
                <div className="flex flex-col">
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-black text-slate-900">
                      ${product.discountPrice.toLocaleString("es-AR")}
                    </span>
                    <span className="text-lg font-bold text-slate-400 line-through mb-1">
                      ${product.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-star-red mt-1">
                    Ahorras $
                    {(product.price - product.discountPrice).toLocaleString(
                      "es-AR",
                    )}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-black text-slate-900">
                  ${product.price.toLocaleString("es-AR")}
                </span>
              )}
            </div>

            <div className="h-px w-full bg-slate-100 mb-8"></div>

            {/* Controles de Compra */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest w-24">
                  Cantidad
                </span>

                <div className="flex items-center border border-slate-200 rounded-lg bg-white h-12">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-900 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-medium text-slate-400 ml-2">
                  {product.stock} disponibles
                </span>
              </div>

              <button
                disabled={product.stock === 0}
                className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:active:scale-100"
              >
                <ShoppingBag className="w-5 h-5" />
                {product.stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 bg-slate-50 border border-slate-100 rounded-xl p-4 mb-10">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-star-blue shrink-0" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Envíos a todo el país
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-star-blue shrink-0" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Garantía de fábrica
                </span>
              </div>
            </div>

            {/* Detalles */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Descripción del Producto
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {product.description ||
                    "Equipamiento de alto rendimiento diseñado para llevar tu juego al siguiente nivel. Construido con materiales de primera calidad para garantizar máxima durabilidad y confort en la pista."}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                    Especificaciones
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600 font-medium"
                      >
                        <div className="w-1 h-1 rounded-full bg-star-blue shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {relatedProducts.length > 0 && (
        <div className="w-full bg-slate-50 border-t border-slate-100 mt-16 py-16">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
              Te podría <span className="text-star-blue">interesar</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
