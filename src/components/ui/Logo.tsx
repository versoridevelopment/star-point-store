import { cn } from "@/src/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export const Logo = ({ className, onClick }: LogoProps) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-start group select-none", className)}
    >
      <div className="flex items-baseline tracking-tighter">
        {/* Usamos una fuente más pesada y geométrica para STAR POINT */}
        <span className="text-xl md:text-3xl font-black text-star-blue uppercase italic">
          STAR
        </span>
        <span className="text-xl md:text-3xl font-black text-slate-900 dark:text-white uppercase italic">
          POINT
        </span>
      </div>
      {/* Store sutil con el gradiente solicitado */}
      <span className="ml-1 mt-0.5 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-star-yellow to-star-red text-transparent bg-clip-text">
        Store
      </span>
    </Link>
  );
};
