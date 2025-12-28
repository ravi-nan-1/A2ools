import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { useLanguage } from "@/hooks/use-language";

export type ToolWithImage = Tool & {
  image: string;
  imageHint: string;
};

interface ToolCardProps {
  tool: Omit<ToolWithImage, "icon">;
  featured?: boolean;
  priority?: boolean;
}

export function ToolCard({
  tool,
  featured = false,
  priority = false,
}: ToolCardProps) {
  const { translate } = useLanguage();

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`
        group relative flex h-full flex-col overflow-hidden
        rounded-xl border bg-card text-card-foreground
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        ${featured ? "ring-2 ring-primary/30 shadow-lg" : "shadow-sm"}
      `}
    >
      {/* FEATURED BADGE */}
      {featured && (
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full
                        bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow">
          <Sparkles className="h-3.5 w-3.5" />
          Best Tool
        </div>
      )}

      {/* IMAGE */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={tool.image}
          alt={tool.name}
          fill
          priority={priority}
          data-ai-hint={tool.imageHint}
          className="
            object-cover transition-transform duration-500
            group-hover:scale-105
          "
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-base font-semibold leading-snug tracking-tight">
          {tool.name}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-5">
          {tool.description}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center text-sm font-semibold text-primary
                           transition-colors group-hover:underline">
            {translate("use_tool")}
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform
                         group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
