import { Star, Crown, Award, MessageSquare, ThumbsDown, Package, Smile } from "lucide-react";
import { Card } from "@/components/ui/card";

export const StorefrontHeader = () => {
  return (
    <Card className="bg-card border-border overflow-hidden">
      {/* Main content with diagonal stripes */}
      <div className="relative">
        {/* Left diagonal stripes */}
        <div className="absolute left-0 top-0 bottom-0 w-3 overflow-hidden">
          <div className="h-full w-full" style={{
            background: 'repeating-linear-gradient(-45deg, hsl(var(--seller)) 0px, hsl(var(--seller)) 2px, transparent 2px, transparent 6px)'
          }} />
        </div>
        
        {/* Right diagonal stripes */}
        <div className="absolute right-0 top-0 bottom-0 w-3 overflow-hidden">
          <div className="h-full w-full" style={{
            background: 'repeating-linear-gradient(45deg, hsl(var(--seller)) 0px, hsl(var(--seller)) 2px, transparent 2px, transparent 6px)'
          }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1px,1.2fr,1px,1fr] divide-y lg:divide-y-0 mx-3">
          {/* Left - Seller Profile */}
          <div className="p-6 flex items-center gap-4">
            {/* Avatar with yellow ring */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-full border-4 border-warning flex items-center justify-center bg-transparent">
                <div className="w-14 h-14 bg-seller rounded flex items-center justify-center relative overflow-hidden">
                  {/* White A with red accent */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-seller-foreground z-10">A</span>
                  </div>
                  {/* Red triangle accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[28px] border-l-seller-foreground/20 border-t-[28px] border-t-transparent" />
                </div>
              </div>
            </div>

            {/* Seller info */}
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Crown className="h-4 w-4 text-warning fill-warning" />
                <span className="text-xs text-muted-foreground font-medium">Power Seller</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">All4Gamers</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Award className="h-4 w-4 text-warning" />
                <span className="text-sm text-warning font-medium">Seller Lvl 5</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Member since 2018</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Middle - Stats */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <StatItem 
                icon={<Package className="h-4 w-4 text-muted-foreground" />} 
                value="58,143" 
                label="Total orders" 
              />
              <StatItem 
                icon={<MessageSquare className="h-4 w-4 text-warning" />} 
                value="55,247" 
                label="Total feedback" 
              />
              <StatItem 
                icon={<Smile className="h-4 w-4 text-success" />} 
                value="99.40%" 
                label="Positive feedback" 
                valueColor="text-success"
              />
              <StatItem 
                icon={<ThumbsDown className="h-4 w-4 text-destructive" />} 
                value="0.26%" 
                label="Negative feedback" 
                valueColor="text-destructive"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right - Ratings */}
          <div className="p-6 space-y-3">
            <RatingRow label="Item as described" rating={5} count="11,499" />
            <RatingRow label="Delivery within guarantee period" rating={5} count="11,460" />
            <RatingRow label="Communication" rating={5} count="11,350" />
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="border-t border-border p-6 bg-[hsl(220,20%,6%)]">
        <h3 className="text-lg font-bold text-foreground mb-4">WHY US?</h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li>1. TOP company on various websites Selling / Boosting game accounts with more than 11 years of experience.</li>
          <li>2. Sold and Boosted over 700000+ accounts, with 99.9% positive reviews.</li>
          <li>3. Only the safest accounts with email and full access, you can change any account data immediately after purchase.</li>
        </ol>
      </div>
    </Card>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  valueColor?: string;
}

const StatItem = ({ icon, value, label, valueColor = "text-foreground" }: StatItemProps) => (
  <div className="flex items-start gap-2">
    {icon}
    <div>
      <div className={`text-lg font-bold ${valueColor}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
);

interface RatingRowProps {
  label: string;
  rating: number;
  count: string;
}

const RatingRow = ({ label, rating, count }: RatingRowProps) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-3">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? "text-warning fill-warning" : "text-muted-foreground"}`} 
          />
        ))}
      </div>
      <span className="text-sm text-foreground font-medium min-w-[50px] text-right">{count}</span>
    </div>
  </div>
);
