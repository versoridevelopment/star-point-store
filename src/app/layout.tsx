import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Importamos el Navbar que construimos
import { Navbar } from "../components/layout/Navbar";

// Configuramos la fuente
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
        className={`${montserrat.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white antialiased flex flex-col min-h-screen`}
      >
        {/* El Navbar global se renderiza en todas las páginas */}
        <Navbar />

        {/* El contenido específico de cada página (como el Home) se inyecta aquí */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Aquí agregaremos el Footer global más adelante */}
      </body>
    </html>
  );
}
