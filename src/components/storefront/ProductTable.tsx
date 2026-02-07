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
              <TableHead className="text-muted-foreground">Product</TableHead>
              <TableHead className="text-muted-foreground">Game</TableHead>
              <TableHead className="text-muted-foreground">Server/Details</TableHead>
              <TableHead className="text-muted-foreground text-center">Stock</TableHead>
              <TableHead className="text-muted-foreground text-right">Price</TableHead>
              <TableHead className="w-[120px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow 
                key={listing.id} 
                className="border-border hover:bg-accent transition-colors"
              >
                <TableCell className="font-medium text-foreground">
                  {listing.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {listing.game}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {listing.server || listing.details || "-"}
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {listing.stock}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="h-6 w-px bg-border" />
                    <span className="text-lg font-bold text-foreground">
                      ${listing.price.toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    className="btn-success w-full"
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
      <div className="md:hidden space-y-3">
        {listings.map((listing) => (
          <div 
            key={listing.id}
            className="bg-card border border-border rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">{listing.game}</p>
              </div>
              <span className="text-lg font-bold text-foreground">
                ${listing.price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{listing.server || listing.details || "-"}</span>
              <span>Stock: {listing.stock}</span>
            </div>
            
            <Button 
              className="btn-success w-full"
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
    <div className="hidden md:block space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      ))}
    </div>
    
    {/* Mobile skeleton */}
    <div className="md:hidden space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  </>
);
