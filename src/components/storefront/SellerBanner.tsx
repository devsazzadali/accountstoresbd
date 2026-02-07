export const SellerBanner = () => {
  return (
    <div className="w-full">
      {/* Red Store Banner */}
      <div className="bg-seller py-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Store Logo */}
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] text-seller-foreground/80 tracking-[0.3em] font-medium">ALL FOR</span>
              <div className="flex items-center gap-1">
                <div className="w-7 h-7 bg-warning rotate-45 flex items-center justify-center -mt-1">
                  <span className="text-background font-black text-sm -rotate-45">A</span>
                </div>
                <span className="text-2xl font-black text-seller-foreground tracking-wide italic">GAMERS</span>
              </div>
            </div>
          </div>
          <span className="text-sm text-seller-foreground/90 font-medium tracking-wide">TOP QUALITY SINCE 2012</span>
        </div>
      </div>
      
      {/* Stats Banner - Dark background with red skewed badges */}
      <div className="py-5 bg-[hsl(220,25%,8%)]">
        <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <SkewedBadge value="200000+" label="SALES" />
          <SkewedBadge value="24/7" label="SUPPORT" />
          <SkewedBadge value="99.9%" label="POSITIVE FEEDBACK" />
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="bg-seller text-seller-foreground font-black text-sm px-2 py-1 transform -skew-x-12">
                10+
              </div>
            </div>
            <span className="text-foreground font-bold tracking-wide">YEARS IN ACCOUNT SELLING / BOOSTING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkewedBadgeProps {
  value: string;
  label: string;
}

const SkewedBadge = ({ value, label }: SkewedBadgeProps) => (
  <div className="flex items-center gap-2">
    <div className="relative">
      <div className="bg-seller text-seller-foreground font-black text-sm px-2 py-1 transform -skew-x-12">
        {value}
      </div>
    </div>
    <span className="text-foreground font-bold tracking-wide">{label}</span>
  </div>
);
