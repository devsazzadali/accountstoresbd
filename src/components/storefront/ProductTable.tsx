import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Listing {
  id: string;
  title: string;
  game: string;
  server?: string;
  details?: string;
  stock: number;
  price: number;
}

interface ProductTableProps {
  listings: Listing[];
  isLoading?: boolean;
  onBuyNow?: (listing: Listing) => void;
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
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Description</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Game</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">Server</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-center">Delivery</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-center">Stock</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-right">Price</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow 
                key={listing.id} 
                className="border-border hover:bg-accent/50 transition-colors"
              >
                <TableCell className="font-medium text-foreground max-w-[300px]">
                  <span className="line-clamp-2 text-sm">{listing.title}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-warning">{listing.game}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {listing.server || listing.details || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-xs text-success">Instant</span>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {listing.stock}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-base font-bold text-warning">
                    ${listing.price.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm"
                    className="btn-success w-full text-xs font-bold"
                    onClick={() => onBuyNow?.(listing)}
                  >
                    BUY NOW
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {listings.map((listing) => (
          <div 
            key={listing.id}
            className="bg-card border border-border rounded-lg p-3 space-y-2"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">{listing.title}</h3>
                <p className="text-xs text-warning mt-0.5">{listing.game}</p>
              </div>
              <span className="text-base font-bold text-warning shrink-0">
                ${listing.price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{listing.server || listing.details || "-"}</span>
              <div className="flex items-center gap-3">
                <span className="text-success">Instant</span>
                <span>Stock: {listing.stock}</span>
              </div>
            </div>
            
            <Button 
              size="sm"
              className="btn-success w-full text-xs font-bold"
              onClick={() => onBuyNow?.(listing)}
            >
              BUY NOW
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

const ProductTableSkeleton = () => (
  <>
    {/* Desktop skeleton */}
    <div className="hidden md:block space-y-1">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 bg-card rounded">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
    
    {/* Mobile skeleton */}
    <div className="md:hidden space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-lg p-3 space-y-2">
          <div className="flex justify-between">
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  </>
);
