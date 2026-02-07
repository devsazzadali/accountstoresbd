import { Star, ShieldCheck, Clock, MessageCircle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export const StorefrontHeader = () => {
  return (
    <Card className="bg-card border-border p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Avatar and basic info */}
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-seller flex items-center justify-center border-2 border-seller">
              <span className="text-xl md:text-2xl font-bold text-seller-foreground">A</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success flex items-center justify-center border-2 border-card">
              <ShieldCheck className="h-3 w-3 text-success-foreground" />
            </div>
          </div>

          {/* Seller name and status */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-foreground">All4Gamers</h1>
              <span className="px-2 py-0.5 text-xs bg-success/20 text-success rounded">VERIFIED</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success"></span>
                Online
              </span>
              <span>Member since 2014</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <StatCard 
            icon={<TrendingUp className="h-4 w-4" />}
            value="20,547" 
            label="Total Sales" 
          />
          <StatCard 
            icon={<Star className="h-4 w-4 fill-warning text-warning" />}
            value="99.8%" 
            label="Positive" 
            highlight
          />
          <StatCard 
            icon={<Clock className="h-4 w-4" />}
            value="< 5min" 
            label="Avg Delivery" 
          />
          <StatCard 
            icon={<MessageCircle className="h-4 w-4" />}
            value="1,247" 
            label="Reviews" 
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          👋 Welcome to All4Gamers! We specialize in selling & boosting game accounts with over 10 years of experience. 
          All accounts verified with full access. Fast delivery guaranteed!
        </p>
        
        {/* Social links */}
        <div className="flex items-center gap-3 mt-3">
          <SocialButton label="Discord" />
          <SocialButton label="Twitter" />
          <SocialButton label="YouTube" />
        </div>
      </div>

      {/* Sales Performance */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Sales Performance last 30 days</span>
          <span className="text-sm text-success">+12.5%</span>
        </div>
        <div className="h-12 flex items-end gap-1">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="flex-1 bg-success/40 rounded-t"
              style={{ height: `${20 + Math.random() * 80}%` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}

const StatCard = ({ icon, value, label, highlight }: StatCardProps) => (
  <div className="flex flex-col items-center justify-center p-3 bg-background rounded-lg">
    <div className={`flex items-center gap-1 ${highlight ? 'text-warning' : 'text-muted-foreground'}`}>
      {icon}
    </div>
    <div className={`text-lg font-bold ${highlight ? 'text-warning' : 'text-foreground'}`}>
      {value}
    </div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const SocialButton = ({ label }: { label: string }) => (
  <button className="px-3 py-1 text-xs bg-background border border-border rounded hover:border-link hover:text-link transition-colors">
    {label}
  </button>
);
