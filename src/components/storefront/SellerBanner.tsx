export const SellerBanner = () => {
  return (
    <div className="w-full">
      {/* Red Store Banner */}
      <div className="bg-seller py-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Store Logo */}
            <div className="flex items-center">
              <span className="text-[10px] text-seller-foreground/70 tracking-widest">ALL FOR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-warning rotate-45 flex items-center justify-center">
                <span className="text-background font-bold text-xs -rotate-45">A</span>
              </div>
              <span className="text-2xl font-black text-seller-foreground tracking-wide">GAMERS</span>
            </div>
          </div>
          <span className="text-sm text-seller-foreground/90 font-medium">TOP QUALITY SINCE 2012</span>
        </div>
      </div>
      
      {/* Stats Banner */}
      <div className="py-4 bg-background">
        <div className="container flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <StatBadge value="200000+" label="SALES" variant="warning" />
          <StatBadge value="24/7" label="SUPPORT" variant="success" />
          <StatBadge value="99.9%" label="POSITIVE FEEDBACK" variant="warning" />
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-seller text-seller-foreground font-bold rounded text-xs">10+</span>
            <span className="text-foreground font-semibold">YEARS IN ACCOUNT SELLING / BOOSTING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatBadgeProps {
  value: string;
  label: string;
  variant: "warning" | "success";
}

const StatBadge = ({ value, label, variant }: StatBadgeProps) => (
  <div className="flex items-center gap-2 text-sm">
    <span className={`px-2 py-1 font-bold rounded text-xs ${
      variant === "warning" 
        ? "bg-warning text-warning-foreground" 
        : "bg-success text-success-foreground"
    }`}>
      {value}
    </span>
    <span className="text-foreground font-semibold">{label}</span>
  </div>
);
