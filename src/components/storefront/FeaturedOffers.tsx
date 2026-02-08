import { ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeaturedOffer {
  id: string;
  title: string;
  rating: number;
  soldCount: number;
  price: number;
  priceUnit?: string;
}

interface FeaturedOffersProps {
  offers?: FeaturedOffer[];
}

const defaultOffers: FeaturedOffer[] = [
  {
    id: "1",
    title: "For Demacia: Act 1 Pass 1650RP - Prime RP ( EUW )",
    rating: 100,
    soldCount: 834,
    price: 7.99,
    priceUnit: "USD"
  },
  {
    id: "2",
    title: "customize Bundle Service / 1RP = .0055$ - Prime RP - All Here ! ( EUW )",
    rating: 100,
    soldCount: 64,
    price: 0.0055,
    priceUnit: "USD"
  },
  {
    id: "3",
    title: "Any Osrs Boost - Best Quality - Best Price / Custom Deal - Contact US - Deadman Annihilation",
    rating: 97,
    soldCount: 0,
    price: 1.90,
    priceUnit: "USD"
  },
  {
    id: "4",
    title: "Old school",
    rating: 97,
    soldCount: 7,
    price: 0.22,
    priceUnit: "USD"
  }
];

export const FeaturedOffers = ({ offers = defaultOffers }: FeaturedOffersProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Featured offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <Card 
            key={offer.id} 
            className="bg-card border-border p-4 hover:border-seller transition-colors cursor-pointer"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-warning line-clamp-2 mb-2">
                  {offer.title}
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-success">
                    <ThumbsUp className="h-3 w-3" />
                    {offer.rating}%
                  </span>
                  {offer.soldCount > 0 && (
                    <span className="text-muted-foreground">({offer.soldCount} Sold)</span>
                  )}
                </div>
              </div>
              <div className="mt-3 text-right">
                <span className="text-lg font-bold text-foreground">
                  {offer.price < 1 ? offer.price.toFixed(4) : offer.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground ml-1">{offer.priceUnit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
