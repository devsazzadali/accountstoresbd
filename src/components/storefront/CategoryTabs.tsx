import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts?: Record<string, number>;
  categories?: Category[];
}

const defaultCategories = [
  { id: "gold", slug: "gold", name: "Gold" },
  { id: "items", slug: "items", name: "Items" },
  { id: "accounts", slug: "accounts", name: "Accounts" },
  { id: "boosting", slug: "boosting", name: "Boosting" },
  { id: "topups", slug: "topups", name: "Top-ups" },
];

export const CategoryTabs = ({ 
  activeCategory, 
  onCategoryChange, 
  categoryCounts = {},
  categories
}: CategoryTabsProps) => {
  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      {/* All category */}
      <button
        onClick={() => onCategoryChange("")}
        className={cn(
          "relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all min-w-[100px]",
          activeCategory === ""
            ? "border-warning bg-warning/10"
            : "border-transparent bg-card hover:border-muted-foreground"
        )}
      >
        <div className="w-12 h-12 flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
              fill="none"
              stroke="#6b7280"
              strokeWidth="4"
            />
          </svg>
          <span className="absolute text-lg">📋</span>
        </div>
        <span className={cn(
          "text-sm font-medium",
          activeCategory === "" ? "text-warning" : "text-muted-foreground"
        )}>
          All
        </span>
      </button>

      {displayCategories.map((category) => {
        const isActive = activeCategory === category.slug;
        const count = categoryCounts[category.slug] || 0;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className={cn(
              "relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all min-w-[100px]",
              isActive
                ? "border-warning bg-warning/10"
                : "border-transparent bg-card hover:border-muted-foreground"
            )}
          >
            {/* Count badge */}
            {count > 0 && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-destructive text-destructive-foreground rounded-full">
                {count > 999 ? `${Math.floor(count / 1000)}k+` : count}
              </span>
            )}
            
            {/* Hexagon Icon */}
            <div className="w-12 h-12 flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id={`grad-${category.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: getCategoryColor(category.slug).start }} />
                    <stop offset="100%" style={{ stopColor: getCategoryColor(category.slug).end }} />
                  </linearGradient>
                </defs>
                <polygon 
                  points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
                  fill="none"
                  stroke={`url(#grad-${category.slug})`}
                  strokeWidth="4"
                />
              </svg>
              <span className="absolute text-lg">{getCategoryIcon(category.slug)}</span>
            </div>
            
            <span className={cn(
              "text-sm font-medium",
              isActive ? "text-warning" : "text-muted-foreground"
            )}>
              {category.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

function getCategoryIcon(slug: string): string {
  switch (slug) {
    case "gold": return "🪙";
    case "items": return "📦";
    case "accounts": return "👤";
    case "boosting": return "💎";
    case "topups": return "⚡";
    default: return "📦";
  }
}

function getCategoryColor(slug: string): { start: string; end: string } {
  switch (slug) {
    case "gold": return { start: "#f59e0b", end: "#d97706" };
    case "items": return { start: "#ec4899", end: "#db2777" };
    case "accounts": return { start: "#a855f7", end: "#9333ea" };
    case "boosting": return { start: "#06b6d4", end: "#0891b2" };
    case "topups": return { start: "#22c55e", end: "#16a34a" };
    default: return { start: "#6b7280", end: "#4b5563" };
  }
}
