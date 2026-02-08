import { Card } from "@/components/ui/card";

interface GameCard {
  id: string;
  name: string;
  offers: number;
  imageUrl?: string;
}

interface GameCardsProps {
  games?: GameCard[];
  selectedGame?: string;
  onGameSelect?: (gameId: string) => void;
}

const defaultGames: GameCard[] = [
  { id: "lol", name: "League of Legends", offers: 1 },
  { id: "wow", name: "World Of Warcraft", offers: 1 },
  { id: "apex", name: "Apex Legends", offers: 1 },
];

export const GameCards = ({ games = defaultGames, selectedGame, onGameSelect }: GameCardsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {games.map((game) => (
        <Card
          key={game.id}
          className={`
            px-6 py-4 cursor-pointer transition-all
            ${selectedGame === game.id 
              ? 'bg-seller text-seller-foreground border-seller' 
              : 'bg-muted/50 hover:bg-muted border-border hover:border-muted-foreground/30'
            }
          `}
          onClick={() => onGameSelect?.(game.id)}
        >
          <div className="text-center">
            <div className="font-medium text-sm mb-1">{game.name}</div>
            <div className={`text-xs ${selectedGame === game.id ? 'bg-seller-foreground/20' : 'bg-seller/80'} text-seller-foreground px-2 py-0.5 rounded`}>
              {game.offers} offer{game.offers !== 1 ? 's' : ''}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
