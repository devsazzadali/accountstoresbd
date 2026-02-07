import { Star, Calendar, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export const StorefrontHeader = () => {
  return (
    <Card className="bg-card border-border p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-success to-link flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">PA</span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success flex items-center justify-center border-2 border-card">
            <ShieldCheck className="h-3 w-3 text-success-foreground" />
          </div>
        </div>

        {/* Seller info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Premium Game Store
          </h1>
          <p className="text-muted-foreground text-sm mb-3">
            Your trusted source for gaming goods since 2014
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-foreground">20,547</div>
              <span className="text-sm text-muted-foreground">Sales</span>
            </div>
            
            <div className="h-8 w-px bg-border hidden md:block" />
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">99.8%</span>
                <Star className="h-4 w-4 gold-star fill-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Positive</span>
            </div>
            
            <div className="h-8 w-px bg-border hidden md:block" />
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Member since Jan 2014</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
