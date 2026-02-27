// 1. Definición de Tipos (El contrato estricto de nuestra Base de Datos)
export type ProductCategory =
  | "palas"
  | "indumentaria"
  | "calzado"
  | "bolsos"
  | "pelotas"
  | "accesorios";
export type ProductBrand =
  | "Bullpadel"
  | "Nox"
  | "Adidas"
  | "Head"
  | "Trexx"
  | "Star Point"
  | "Asics"
  | "Babolat";
export type PalaShape = "Diamante" | "Lágrima" | "Redonda" | "Híbrida";

export interface Product {
  id: string;
  slug: string; // Identificador único para la URL (ej: bullpadel-vertex-04)
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  price: number; // Precio base
  discountPrice?: number; // Precio con descuento (opcional)
  stock: number;
  isNew: boolean; // Para mostrar la etiqueta de "Novedad"
  image: string; // Ruta de la imagen (usaremos un placeholder por ahora)
  tags: string[]; // Etiquetas para filtros rápidos

  images?: string[]; // Galería de imágenes secundarias
  description?: string; // Párrafo de descripción
  features?: string[]; // Lista de características (ej. "Peso: 365g", "Balance: Alto")

  // Especificaciones técnicas (Opcionales dependiendo del producto)
  specs?: {
    peso?: string;
    forma?: PalaShape;
    balance?: "Alto" | "Medio" | "Bajo";
    materialCara?: string;
    genero?: "Masculino" | "Femenino" | "Unisex";
  };
}

// 2. Base de Datos Simulada (Mock Data)
export const mockProducts: Product[] = [
  // --- PALAS BULLPADEL ---
  {
    id: "p-001",
    slug: "bullpadel-vertex-04-2026",
    name: "Bullpadel Vertex 04 2026",
    brand: "Bullpadel",
    category: "palas",
    price: 350000,
    discountPrice: 315000,
    stock: 12,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["potencia", "profesional", "oferta"],
    specs: {
      peso: "365-375g",
      forma: "Diamante",
      balance: "Alto",
      materialCara: "Xtend Carbon 12K",
    },
  },
  {
    id: "p-002",
    slug: "bullpadel-hack-03-2026",
    name: "Bullpadel Hack 03 2026",
    brand: "Bullpadel",
    category: "palas",
    price: 345000,
    stock: 8,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["potencia", "profesional"],
    specs: {
      peso: "365-375g",
      forma: "Diamante",
      balance: "Alto",
      materialCara: "Tricarbon",
    },
  },
  {
    id: "p-003",
    slug: "bullpadel-neuron-2026",
    name: "Bullpadel Neuron 2026",
    brand: "Bullpadel",
    category: "palas",
    price: 290000,
    stock: 15,
    isNew: false,
    image: "/images/placeholder-pala.png",
    tags: ["hibrida", "avanzado"],
    specs: {
      peso: "360-370g",
      forma: "Híbrida",
      balance: "Medio",
      materialCara: "Carbono 3K",
    },
  },

  // --- PALAS NOX ---
  {
    id: "p-004",
    slug: "nox-at10-genius-18k-2026",
    name: "Nox AT10 Genius 18K",
    brand: "Nox",
    category: "palas",
    price: 320000,
    stock: 5,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["control", "polivalente", "profesional"],
    specs: {
      peso: "360-375g",
      forma: "Lágrima",
      balance: "Medio",
      materialCara: "Carbono 18K",
    },
  },
  {
    id: "p-005",
    slug: "nox-ml10-pro-cup",
    name: "Nox ML10 Pro Cup",
    brand: "Nox",
    category: "palas",
    price: 210000,
    discountPrice: 185000,
    stock: 22,
    isNew: false,
    image: "/images/placeholder-pala.png",
    tags: ["control", "clasica", "oferta"],
    specs: {
      peso: "360-375g",
      forma: "Redonda",
      balance: "Bajo",
      materialCara: "Fibra de Vidrio",
    },
  },

  // --- PALAS ADIDAS ---
  {
    id: "p-006",
    slug: "adidas-metalbone-3-3",
    name: "Adidas Metalbone 3.3",
    brand: "Adidas",
    category: "palas",
    price: 360000,
    stock: 3,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["potencia", "ale-galan"],
    specs: {
      peso: "345-360g",
      forma: "Diamante",
      balance: "Alto",
      materialCara: "Carbon Aluminized 2-to-1",
    },
  },
  {
    id: "p-007",
    slug: "adidas-adipower-ctrl-3-3",
    name: "Adidas Adipower CTRL 3.3",
    brand: "Adidas",
    category: "palas",
    price: 310000,
    stock: 9,
    isNew: false,
    image: "/images/placeholder-pala.png",
    tags: ["control", "avanzado"],
    specs: {
      peso: "360-375g",
      forma: "Redonda",
      balance: "Medio",
      materialCara: "Carbon Aluminized 15K",
    },
  },

  // --- PALAS HEAD ---
  {
    id: "p-008",
    slug: "head-speed-pro-x",
    name: "Head Speed Pro X",
    brand: "Head",
    category: "palas",
    price: 295000,
    stock: 7,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["polivalente", "profesional"],
    specs: {
      peso: "375g",
      forma: "Lágrima",
      balance: "Medio",
      materialCara: "Carbono 12K",
    },
  },
  {
    id: "p-009",
    slug: "head-extreme-pro",
    name: "Head Extreme Pro",
    brand: "Head",
    category: "palas",
    price: 280000,
    discountPrice: 250000,
    stock: 14,
    isNew: false,
    image: "/images/placeholder-pala.png",
    tags: ["potencia", "arturo-coello", "oferta"],
    specs: {
      peso: "370g",
      forma: "Diamante",
      balance: "Alto",
      materialCara: "Hybrid Woven",
    },
  },

  // --- PALAS TREXX (Tu Marca) ---
  {
    id: "p-010",
    slug: "trexx-carbon-pro-v1",
    name: "Trexx Carbon Pro V1",
    brand: "Trexx",
    category: "palas",
    price: 220000,
    stock: 30,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["polivalente", "fibra-carbono", "exclusivo"],
    specs: {
      peso: "365-370g",
      forma: "Lágrima",
      balance: "Medio",
      materialCara: "Carbono 3K",
    },
  },
  {
    id: "p-011",
    slug: "trexx-control-master",
    name: "Trexx Control Master",
    brand: "Trexx",
    category: "palas",
    price: 195000,
    discountPrice: 175000,
    stock: 25,
    isNew: true,
    image: "/images/placeholder-pala.png",
    tags: ["control", "punto-dulce-amplio", "oferta"],
    specs: {
      peso: "360-365g",
      forma: "Redonda",
      balance: "Bajo",
      materialCara: "Carbono 3K",
    },
  },
  {
    id: "p-012",
    slug: "trexx-power-max",
    name: "Trexx Power Max",
    brand: "Trexx",
    category: "palas",
    price: 240000,
    stock: 10,
    isNew: false,
    image: "/images/placeholder-pala.png",
    tags: ["potencia", "ataque"],
    specs: {
      peso: "370-375g",
      forma: "Diamante",
      balance: "Alto",
      materialCara: "Carbono 12K",
    },
  },

  // --- OTROS PRODUCTOS (Para rellenar categorías) ---
  {
    id: "c-001",
    slug: "zapatillas-bullpadel-hack-vibram",
    name: "Bullpadel Hack Vibram 2026",
    brand: "Bullpadel",
    category: "calzado",
    price: 180000,
    stock: 15,
    isNew: true,
    image: "/images/placeholder-shoe.png",
    tags: ["calzado", "paquito-navarro"],
    specs: { genero: "Masculino" },
  },
  {
    id: "i-001",
    slug: "remera-trexx-competicion",
    name: "Remera Trexx Competición",
    brand: "Trexx",
    category: "indumentaria",
    price: 350000,
    discountPrice: 28000,
    stock: 50,
    isNew: true,
    image: "/images/placeholder-shirt.png",
    tags: ["ropa", "transpirable"],
    specs: { genero: "Unisex" },
  },
  {
    id: "pe-001",
    slug: "tubo-pelotas-head-pro-s",
    name: "Tubo Head Pro S (3 pelotas)",
    brand: "Head",
    category: "pelotas",
    price: 12000,
    stock: 150,
    isNew: false,
    image: "/images/placeholder-balls.png",
    tags: ["accesorios", "alta-presion"],
  },
];
