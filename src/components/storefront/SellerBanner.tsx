export const SellerBanner = () => {
  return (
    <div className="w-full">
      {/* Red Store Banner */}
      <div className="bg-seller py-2.5">
        <div className="container flex items-center justify-between">
          {/* Store Logo - "ALL FOR A GAMERS" */}
          <div className="flex items-center gap-0">
            <div className="flex flex-col items-end leading-none mr-0.5">
              <span className="text-[8px] text-seller-foreground/90 tracking-[0.2em] font-medium mb-0.5">ALL FOR</span>
            </div>
            {/* Stylized A logo */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                {/* White A shape */}
                <path 
                  d="M20 4 L32 36 L26 36 L24 28 L16 28 L14 36 L8 36 L20 4 Z M20 12 L17 24 L23 24 L20 12 Z" 
                  fill="white"
                />
                {/* Red accent triangle on bottom left */}
                <path 
                  d="M8 36 L14 36 L14 26 Z" 
                  fill="hsl(var(--seller-primary))"
                  opacity="0.9"
                />
              </svg>
            </div>
            <span className="text-2xl font-black text-seller-foreground tracking-wide italic ml-0.5">GAMERS</span>
          </div>
          <span className="text-sm text-seller-foreground/90 font-medium tracking-wide">TOP QUALITY SINCE 2012</span>
        </div>
      </div>
      
      {/* Stats Banner - Dark background with red skewed badges */}
      <div className="py-4 bg-[hsl(218,30%,12%)]">
        <div className="container">
          {/* First row - red badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-2">
            <SkewedBadge value="200000+" label="SALES" />
            <SkewedBadge value="24/7" label="SUPPORT" />
            <SkewedBadge value="99.9%" label="POSITIVE FEEDBACK" />
          </div>
          {/* Second row - years badge */}
          <div className="flex items-center justify-center gap-2">
            <div className="relative inline-block">
              <div className="bg-warning text-warning-foreground font-black text-sm px-3 py-1 transform -skew-x-12">
                <span className="inline-block skew-x-12">10+</span>
              </div>
            </div>
            <span className="text-white font-bold tracking-wide text-sm">YEARS IN ACCOUNT SELLING / BOOSTING</span>
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
  <div className="flex items-center gap-1.5">
    <div className="relative inline-block">
      <div className="bg-seller text-seller-foreground font-black text-sm px-3 py-1 transform -skew-x-12">
        <span className="inline-block skew-x-12">{value}</span>
      </div>
    </div>
    <span className="text-white font-bold tracking-wide text-sm">{label}</span>
  </div>
);
