import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";

// Cambiamos a Inter para un look más atlético y de e-commerce tradicional
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimización para que el texto no parpadee al cargar
});

export const metadata: Metadata = {
  title: "Star Point Store | Equipamiento Multimarca de Pádel",
  description:
    "Encuentra las mejores palas, calzado y accesorios de las marcas líderes del circuito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <div className="flex-grow pt-16 md:pt-20">{children}</div>
      </body>
    </html>
  );
}
