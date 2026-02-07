import { Star, Crown, Award, MessageSquare, ThumbsUp, ThumbsDown, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

export const StorefrontHeader = () => {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1px,1fr,1px,1fr] divide-y lg:divide-y-0">
        {/* Left - Seller Profile */}
        <div className="p-6 flex items-center gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full border-4 border-warning bg-card flex items-center justify-center">
              <div className="w-12 h-12 bg-seller rounded flex items-center justify-center">
                <span className="text-2xl font-black text-seller-foreground">A</span>
              </div>
            </div>
          </div>

          {/* Seller info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="h-4 w-4 text-warning fill-warning" />
              <span className="text-xs text-warning font-medium">Power Seller</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">All4Gamers</h1>
            <div className="flex items-center gap-2 mt-1">
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
          <div className="grid grid-cols-2 gap-4">
            <StatItem icon={<Package className="h-4 w-4 text-warning" />} value="58,143" label="Total orders" />
            <StatItem icon={<MessageSquare className="h-4 w-4 text-warning" />} value="55,247" label="Total feedback" />
            <StatItem 
              icon={<ThumbsUp className="h-4 w-4 text-success" />} 
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
    <div className="flex items-center gap-2">
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
