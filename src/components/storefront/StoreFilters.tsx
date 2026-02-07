import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StoreFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGame: string;
  onGameChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const games = [
  { id: "all", name: "All Games" },
  { id: "wow", name: "World of Warcraft" },
  { id: "lostark", name: "Lost Ark" },
  { id: "rust", name: "RUST" },
  { id: "fortnite", name: "Fortnite" },
  { id: "valorant", name: "Valorant" },
  { id: "csgo", name: "Counter-Strike 2" },
  { id: "gta", name: "GTA V Online" },
];

export const StoreFilters = ({
  searchQuery,
  onSearchChange,
  selectedGame,
  onGameChange,
  sortBy,
  onSortChange,
}: StoreFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 py-3">
      {/* Game Filter */}
      <Select value={selectedGame} onValueChange={onGameChange}>
        <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
          <SelectValue placeholder="Select a game" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {games.map((game) => (
            <SelectItem key={game.id} value={game.id}>
              {game.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search within store */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search within store..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Sort */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-[160px] bg-card border-border">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
