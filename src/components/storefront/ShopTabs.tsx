import { cn } from "@/lib/utils";

interface ShopTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ShopTabs = ({ activeTab, onTabChange }: ShopTabsProps) => {
  return (
    <div className="flex border-b border-border">
      <button
        onClick={() => onTabChange("browse")}
        className={cn(
          "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
          activeTab === "browse"
            ? "text-foreground border-foreground bg-card"
            : "text-muted-foreground border-transparent hover:text-foreground"
        )}
      >
        Browse Shop
      </button>
      <button
        onClick={() => onTabChange("feedback")}
        className={cn(
          "px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
          activeTab === "feedback"
            ? "text-foreground border-foreground bg-card"
            : "text-muted-foreground border-transparent hover:text-foreground"
        )}
      >
        Seller Feedback
      </button>
    </div>
  );
};
