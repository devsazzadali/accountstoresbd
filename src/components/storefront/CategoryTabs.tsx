import { Coins, Sword, UserCircle, Zap, Wrench } from "lucide-react";
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
  { id: "services", label: "Services", icon: Wrench },
];

export const CategoryTabs = ({ 
  activeCategory, 
  onCategoryChange, 
  categoryCounts = {} 
}: CategoryTabsProps) => {
  return (
    <div className="flex items-center border-b border-border">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const count = categoryCounts[category.id] || 0;
        const Icon = category.icon;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px",
              isActive
                ? "text-warning border-warning"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
            
            {/* Count badge */}
            {count > 0 && (
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                isActive ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"
              )}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
