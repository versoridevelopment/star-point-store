import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer"; // Importamos el Footer

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Star Point Store",
  description: "E-commerce premium de equipamiento deportivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.className} bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}
      >
        <Navbar />

        {/* El flex-1 asegura que el contenido empuje al footer hacia abajo */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* NUEVO: Footer global */}
        <Footer />
      </body>
    </html>
  );
}
