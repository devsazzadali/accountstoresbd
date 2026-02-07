import { Clock, Award, Star, Calendar } from "lucide-react";

export const SellerBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-card via-seller/20 to-card border-b border-border">
      {/* Store Name Banner */}
      <div className="bg-seller py-2">
        <div className="container">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-seller-foreground tracking-wide">ALL4GAMERS</span>
            <span className="text-sm text-seller-foreground/80">OFFICIAL STORE</span>
          </div>
        </div>
      </div>
      
      {/* Stats Banner */}
      <div className="py-3 bg-card">
        <div className="container flex flex-wrap items-center gap-4 md:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-warning" />
            <span className="font-bold text-warning">20000+</span>
            <span className="text-muted-foreground">SALES</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-success" />
            <span className="font-bold text-success">24/7</span>
            <span className="text-muted-foreground">SUPPORT</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="font-bold text-warning">99.8%</span>
            <span className="text-muted-foreground">POSITIVE FEEDBACK</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-link" />
            <span className="font-bold text-link">10+</span>
            <span className="text-muted-foreground">YEARS IN ACCOUNT SELLING / BOOSTING</span>
          </div>
        </div>
      </div>
    </div>
  );
};
