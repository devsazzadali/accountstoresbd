import { ThumbsUp, ThumbsDown, UserPlus, Play, Globe, Award, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SellerSidebar = () => {
  // Dark sidebar theme colors
  const darkBg = "bg-[hsl(218,30%,12%)]";
  const darkBorder = "border-[hsl(218,30%,20%)]";
  
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className={`${darkBg} ${darkBorder} border rounded-lg overflow-hidden`}>
        {/* Avatar overlapping the banner */}
        <div className="relative pt-6 pb-4 flex flex-col items-center">
          {/* Avatar with seller ring */}
          <div className={`w-20 h-20 rounded-full border-4 border-seller flex items-center justify-center ${darkBg}`}>
            <div className="w-14 h-14 bg-seller rounded flex items-center justify-center relative overflow-hidden">
              <span className="text-3xl font-black text-seller-foreground z-10">A</span>
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[28px] border-l-seller-foreground/20 border-t-[28px] border-t-transparent" />
            </div>
          </div>
          
          {/* Name & Level */}
          <h2 className="mt-3 text-lg font-bold text-white">All4Gamers</h2>
          <span className="text-sm text-[hsl(218,10%,60%)]">Level 133</span>
          
          {/* Follow & Chat buttons */}
          <div className="flex gap-2 mt-4 w-full px-6">
            <Button className="flex-1 bg-seller hover:bg-seller/90 text-seller-foreground gap-2">
              <UserPlus className="h-4 w-4" />
              Follow
            </Button>
            <Button className="flex-1 bg-success hover:bg-success/90 text-success-foreground gap-2">
              <span>💬</span>
              Chat
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className={`border-t ${darkBorder} px-6 py-4 space-y-3`}>
          <StatRow label="Member since" value="October, 2018" />
          <StatRow 
            label="Successful delivery" 
            value={
              <div>
                <span className="text-white font-semibold">99.37%</span>
                <span className="text-xs text-[hsl(218,10%,50%)] block">(Total lifetime orders: 58,143)</span>
              </div>
            } 
          />
          <StatRow 
            label="Last 90 Days" 
            value={
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-success">
                  <ThumbsUp className="h-3 w-3" /> 99.6%
                </span>
                <span className="flex items-center gap-1 text-destructive">
                  <ThumbsDown className="h-3 w-3" /> 0.4%
                </span>
              </div>
            } 
          />
          <StatRow 
            label="All time rating" 
            value={
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-success">
                  <ThumbsUp className="h-3 w-3" /> 99.31%
                </span>
                <span className="flex items-center gap-1 text-destructive">
                  <ThumbsDown className="h-3 w-3" /> 0.69%
                </span>
              </div>
            } 
          />
        </div>
        
        {/* Followers Section */}
        <div className={`border-t ${darkBorder} px-6 py-4`}>
          <div className="flex justify-around text-center">
            <div>
              <div className="text-xl font-bold text-white">2.3k</div>
              <div className="text-xs text-[hsl(218,10%,50%)]">Followers</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">1</div>
              <div className="text-xs text-[hsl(218,10%,50%)]">Following</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Thumbnail Card */}
      <div className={`${darkBg} ${darkBorder} border rounded-lg overflow-hidden`}>
        <div className="relative aspect-video bg-[hsl(218,30%,8%)] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270,50%,30%)] to-[hsl(210,50%,30%)]" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            11:00
          </div>
        </div>
      </div>
      
      {/* Description Card */}
      <div className={`${darkBg} ${darkBorder} border rounded-lg p-4`}>
        <h3 className="font-bold text-white mb-3">Description</h3>
        <div className="text-sm text-[hsl(218,10%,60%)] space-y-2">
          <p className="flex items-start gap-2">
            <span>🎮</span>
            <span>Level Up Your Game with All4Gamers! 🎮<br />Your Trusted Gaming Partner Since 2018</span>
          </p>
          <p className="flex items-start gap-2">
            <span>💡</span>
            <span className="font-medium text-white">Why Choose Us?</span>
          </p>
          <ul className="space-y-1.5 ml-6">
            <li className="flex items-start gap-2">
              <span>💰</span>
              <span>Bulk Deals with Special Discounts – Save big on large orders!</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>Exclusive Perks for Loyal Customers – Rewards that keep you winning.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>Trusted by Pro Gamers & Streamers – Gear up like the elites.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>24/7 Instant Delivery – No waiting, just play.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>Live Chat Support – Real help, right when you need it.</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Languages Card */}
      <div className={`${darkBg} ${darkBorder} border rounded-lg p-4`}>
        <h3 className="font-bold text-white mb-3">Languages</h3>
        <div className="inline-flex items-center gap-2 bg-[hsl(218,30%,18%)] text-[hsl(218,10%,70%)] px-3 py-1.5 rounded text-sm">
          <Globe className="h-3 w-3" />
          English
          <span className="text-xs text-[hsl(218,10%,50%)]">Native</span>
        </div>
      </div>
      
      {/* Ranking Card */}
      <div className={`${darkBg} ${darkBorder} border rounded-lg p-4`}>
        <h3 className="font-bold text-white mb-3">Ranking</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning to-[hsl(25,90%,50%)] flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-seller">Rare Seller</div>
            <div className="text-xs text-[hsl(218,10%,50%)]">Seller Ranking</div>
          </div>
        </div>
      </div>
      
      {/* Block User */}
      <button className="flex items-center gap-2 text-sm text-destructive hover:underline w-full justify-center py-2">
        <Ban className="h-4 w-4" />
        Block this user
      </button>
    </div>
  );
};

interface StatRowProps {
  label: string;
  value: React.ReactNode;
}

const StatRow = ({ label, value }: StatRowProps) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-sm text-[hsl(218,10%,50%)] shrink-0">{label}</span>
    <div className="text-sm text-right">{value}</div>
  </div>
);
