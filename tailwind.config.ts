import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        star: {
          blue: "#0A192F", // Un azul noche profundo para fondos o texto principal
          yellow: "#FFC107", // Dorado vibrante para botones de compra (CTA)
          red: "#E63946", // Rojo elegante para etiquetas de descuento o alertas
          background: "#040B14", // Fondo general ultra oscuro para destacar las tarjetas
        },
      },
    },
  },
  plugins: [],
};
export default config;
