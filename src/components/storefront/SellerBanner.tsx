import { Shield, Clock, Award } from "lucide-react";

export const SellerBanner = () => {
  const stats = [
    { icon: Award, label: "20000+ SALES", highlight: true },
    { icon: Clock, label: "24/7 SUPPORT", highlight: false },
    { icon: Shield, label: "10+ YEARS", highlight: false },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-seller via-destructive to-seller py-3">
      <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-seller-foreground"
          >
            <stat.icon className="h-5 w-5" />
            <span className="text-sm font-bold tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
