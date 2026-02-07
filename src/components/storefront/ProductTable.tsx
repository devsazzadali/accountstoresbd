import { useState } from "react";
import { Clock, Minus, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface Listing {
  id: string;
  title: string;
  game: string;
  platform?: string;
  server?: string;
  details?: string;
  stock: number;
  price: number;
  pricePerUnit?: string;
  deliveryTime?: string;
}

interface ProductTableProps {
  listings: Listing[];
  isLoading?: boolean;
  onBuyNow?: (listing: Listing, quantity: number) => void;
}

export const ProductTable = ({ listings, isLoading, onBuyNow }: ProductTableProps) => {
  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No listings found in this category.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[minmax(150px,1fr)_minmax(300px,2fr)_100px_minmax(200px,1fr)_120px] gap-4 px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
          Game & SERVER
          <div className="flex flex-col">
            <ChevronUp className="h-3 w-3 -mb-1" />
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
          OFFER
          <div className="flex flex-col">
            <ChevronUp className="h-3 w-3 -mb-1" />
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground justify-center">
          DELIVERY
          <div className="flex flex-col">
            <ChevronUp className="h-3 w-3 -mb-1" />
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
        <div></div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground justify-end">
          PRICE
          <div className="flex flex-col">
            <ChevronUp className="h-3 w-3 -mb-1" />
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="divide-y divide-border">
        {listings.map((listing) => (
          <ProductRow key={listing.id} listing={listing} onBuyNow={onBuyNow} />
        ))}
      </div>
    </div>
  );
};

interface ProductRowProps {
  listing: Listing;
  onBuyNow?: (listing: Listing, quantity: number) => void;
}

const ProductRow = ({ listing, onBuyNow }: ProductRowProps) => {
  const [quantity, setQuantity] = useState(500);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const totalPrice = (listing.price * quantity) / 500; // Assuming base price is per 500M

  return (
    <>
      {/* Desktop Row */}
      <div className="hidden md:grid grid-cols-[minmax(150px,1fr)_minmax(300px,2fr)_100px_minmax(200px,1fr)_120px] gap-4 px-4 py-4 hover:bg-accent/30 transition-colors items-center">
        {/* Game & Server */}
        <div>
          <div className="font-medium text-foreground text-sm">{listing.game}</div>
          <div className="text-xs text-link hover:underline cursor-pointer">
            {listing.platform || listing.server || listing.details || "-"}
          </div>
        </div>

        {/* Offer */}
        <div className="text-sm text-warning font-medium leading-relaxed">
          {listing.title}
        </div>

        {/* Delivery */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <Clock className="h-8 w-8 text-muted-foreground" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">
              6h
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{listing.deliveryTime || "6 Hours"}</span>
        </div>

        {/* Quantity & Price per unit */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 bg-card border border-border rounded">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => handleQuantityChange(-100)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="w-16 text-center">
              <span className="text-sm font-medium text-foreground">{quantity}</span>
              <span className="text-xs text-muted-foreground ml-1">M</span>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => handleQuantityChange(100)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="text-warning">%</span>
            {listing.pricePerUnit || `$${(listing.price / 500).toFixed(3)}`} / M Money
          </div>
        </div>

        {/* Price & Buy Button */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-2xl font-bold text-foreground">
            ${totalPrice.toFixed(2)}
          </div>
          <Button 
            className="btn-success w-full font-bold text-sm"
            onClick={() => onBuyNow?.(listing, quantity)}
          >
            BUY NOW
          </Button>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="font-medium text-foreground text-sm">{listing.game}</div>
            <div className="text-xs text-link">{listing.platform || listing.server || "-"}</div>
          </div>
          <div className="text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</div>
        </div>
        
        <p className="text-sm text-warning">{listing.title}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-card border border-border rounded">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleQuantityChange(-100)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-12 text-center text-sm">{quantity}M</span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => handleQuantityChange(100)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button 
            className="btn-success font-bold"
            onClick={() => onBuyNow?.(listing, quantity)}
          >
            BUY NOW
          </Button>
        </div>
      </div>
    </>
  );
};

const ProductTableSkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    ))}
  </div>
);
