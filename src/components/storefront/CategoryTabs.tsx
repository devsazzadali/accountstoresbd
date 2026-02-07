import { Coins, Sword, UserCircle, Zap, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

const categories = [
  { id: "gold", label: "Gold", icon: Coins },
  { id: "items", label: "Items", icon: Sword },
  { id: "accounts", label: "Accounts", icon: UserCircle },
  { id: "boosting", label: "Boosting", icon: Zap },
  { id: "skins", label: "Skins", icon: Palette },
];

export const CategoryTabs = ({ 
  activeCategory, 
  onCategoryChange, 
  categoryCounts = {} 
}: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const count = categoryCounts[category.id] || 0;
        const Icon = category.icon;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all",
              "text-sm font-medium",
              isActive
                ? "bg-success text-success-foreground border-success"
                : "bg-card text-muted-foreground border-border hover:border-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
            
            {/* Count badge */}
            {count > 0 && (
              <span className="badge-count absolute -top-2 -right-2">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
