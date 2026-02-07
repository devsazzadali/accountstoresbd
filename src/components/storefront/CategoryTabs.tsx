import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

const categories = [
  { id: "gold", label: "Gold", color: "from-yellow-500 to-yellow-600" },
  { id: "items", label: "Items", color: "from-pink-500 to-pink-600" },
  { id: "accounts", label: "Accounts", color: "from-purple-500 to-purple-600" },
  { id: "boosting", label: "Boosting", color: "from-cyan-500 to-cyan-600" },
  { id: "topups", label: "Top-ups", color: "from-green-500 to-green-600" },
];

export const CategoryTabs = ({ 
  activeCategory, 
  onCategoryChange, 
  categoryCounts = {} 
}: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const count = categoryCounts[category.id] || 0;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
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
            <div className={cn(
              "w-12 h-12 flex items-center justify-center relative"
            )}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id={`grad-${category.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className={category.color.split(" ")[0].replace("from-", "stop-")} style={{ stopColor: getCategoryColor(category.id).start }} />
                    <stop offset="100%" style={{ stopColor: getCategoryColor(category.id).end }} />
                  </linearGradient>
                </defs>
                <polygon 
                  points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
                  fill="none"
                  stroke={`url(#grad-${category.id})`}
                  strokeWidth="4"
                />
              </svg>
              <span className="absolute text-lg">{getCategoryIcon(category.id)}</span>
            </div>
            
            <span className={cn(
              "text-sm font-medium",
              isActive ? "text-warning" : "text-muted-foreground"
            )}>
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

function getCategoryIcon(id: string): string {
  switch (id) {
    case "gold": return "🪙";
    case "items": return "📦";
    case "accounts": return "👤";
    case "boosting": return "💎";
    case "topups": return "⚡";
    default: return "📦";
  }
}

function getCategoryColor(id: string): { start: string; end: string } {
  switch (id) {
    case "gold": return { start: "#f59e0b", end: "#d97706" };
    case "items": return { start: "#ec4899", end: "#db2777" };
    case "accounts": return { start: "#a855f7", end: "#9333ea" };
    case "boosting": return { start: "#06b6d4", end: "#0891b2" };
    case "topups": return { start: "#22c55e", end: "#16a34a" };
    default: return { start: "#6b7280", end: "#4b5563" };
  }
}
