import { Search, RotateCcw, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Game {
  id: string;
  name: string;
  slug: string;
}

interface StoreFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGame: string;
  onGameChange: (value: string) => void;
  totalOffers: number;
  onReset: () => void;
  games?: Game[];
}

export const StoreFilters = ({
  searchQuery,
  onSearchChange,
  selectedGame,
  onGameChange,
  totalOffers,
  onReset,
  games = [],
}: StoreFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex">
          <Input
            type="search"
            placeholder="Search listings..."
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
        <Select value={selectedGame} onValueChange={onGameChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
            <SelectValue placeholder="All Games" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Games</SelectItem>
            {games.map((game) => (
              <SelectItem key={game.id} value={game.id}>
                {game.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
