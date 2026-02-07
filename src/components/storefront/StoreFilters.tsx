import { Search, RotateCcw, ChevronDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StoreFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGame: string;
  onGameChange: (value: string) => void;
  totalOffers: number;
  onReset: () => void;
}

export const StoreFilters = ({
  searchQuery,
  onSearchChange,
  selectedGame,
  onGameChange,
  totalOffers,
  onReset,
}: StoreFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex">
          <Input
            type="search"
            placeholder="Separate words with commas"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-[240px] bg-card border-border pr-10"
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-0 h-full px-3 text-muted-foreground hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Game Dropdown */}
        <button 
          onClick={() => onGameChange(selectedGame === "all" ? "" : "all")}
          className="flex items-center justify-between gap-2 px-4 py-2 bg-card border border-border rounded-md text-sm text-muted-foreground hover:border-muted-foreground transition-colors min-w-[160px]"
        >
          <span>{selectedGame || "Game"}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground">
          <span className="text-warning font-bold">{totalOffers}</span> Offers found
        </span>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="border-border text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
        
        <Button 
          size="icon" 
          variant="outline"
          className="border-border text-muted-foreground hover:text-foreground rounded-full"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
