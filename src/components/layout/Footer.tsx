import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-16 pb-8 px-6 md:px-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1.5">
              <h2 className="text-2xl font-black text-white italic tracking-tighter">
                STAR<span className="text-star-blue">POINT</span>
              </h2>
            </Link>
            <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-xs">
              E-commerce premium especializado en equipamiento de pádel de alto
              rendimiento. Diseñado para jugadores que exigen lo mejor.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-star-blue text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-star-blue text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-star-blue text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-2">
              Tienda
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/palas"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Palas de Pádel
                </Link>
              </li>
              <li>
                <Link
                  href="/indumentaria"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Indumentaria
                </Link>
              </li>
              <li>
                <Link
                  href="/accesorios"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Accesorios & Bolsos
                </Link>
              </li>
              <li>
                <Link
                  href="/ofertas"
                  className="text-star-red hover:text-red-400 text-sm font-bold transition-colors"
                >
                  Ofertas Especiales
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-2">
              Soporte
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Políticas de Envío
                </Link>
              </li>
              <li>
                <Link
                  href="/devoluciones"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-2">
              Contacto
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm font-medium">
                <MapPin className="w-5 h-5 shrink-0 text-star-blue" />
                <span>Av. Libertador 1234, CABA, Argentina.</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                <Phone className="w-5 h-5 shrink-0 text-star-blue" />
                <span>+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                <Mail className="w-5 h-5 shrink-0 text-star-blue" />
                <span>soporte@starpoint.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM LEGAL Y FIRMA DE VERSORI (Ultra Minimalista) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500 font-medium text-center md:text-left order-2 md:order-1">
            © {currentYear} Desarrollado por{" "}
            <a
              href="https://versorisports.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-star-blue font-black tracking-widest transition-colors uppercase"
            >
              VERSORI
            </a>
            . Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium order-1 md:order-2">
            <Link
              href="/privacidad"
              className="hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="hover:text-white transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
