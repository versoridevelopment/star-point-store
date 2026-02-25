import { cn } from "@/src/lib/utils";
import { Image as ImageIcon } from "lucide-react";

interface PlaceholderProps {
  className?: string;
  text?: string;
}

export const Placeholder = ({
  className,
  text = "Imagen pendiente",
}: PlaceholderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full bg-slate-100 text-slate-400 border border-slate-200",
        className,
      )}
    >
      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
      <span className="text-xs font-medium uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
};
