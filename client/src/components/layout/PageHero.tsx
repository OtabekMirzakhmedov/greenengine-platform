import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description?: string;
  imageUrl?: string;
  height?: "default" | "large";
  children?: ReactNode;
}

export default function PageHero({
  title,
  description,
  imageUrl,
  height = "default",
  children,
}: PageHeroProps) {
  const heightClass = height === "large" ? "h-[70vh] min-h-[500px]" : "h-[40vh] min-h-[300px]";

  return (
    <div className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </>
      )}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
            imageUrl ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              imageUrl ? "text-white/90" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
