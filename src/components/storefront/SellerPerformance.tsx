import { Award, DollarSign, FileText, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export const SellerPerformance = () => {
  return (
    <Card className="bg-card border-border p-6">
      <h3 className="text-sm font-medium text-foreground mb-4">Seller Performance (last 30 days):</h3>
      
      <div className="flex flex-wrap items-center gap-6 lg:gap-10">
        {/* Level Progress */}
        <div className="flex items-center gap-0">
          {[1, 2, 3, 4, 5].map((level, index) => (
            <div key={level} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  level === 5 
                    ? "bg-warning text-warning-foreground" 
                    : level < 5 
                      ? "bg-link text-foreground" 
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {level}
              </div>
              {index < 4 && (
                <div className={`w-4 h-0.5 ${level < 5 ? "bg-link" : "bg-muted"}`} style={{ margin: "0 -2px" }} />
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6">
          <PerformanceStat 
            icon={<Award className="h-4 w-4 text-warning" />} 
            value="5" 
            label="Seller Lvl" 
          />
          <PerformanceStat 
            icon={<DollarSign className="h-4 w-4 text-success" />} 
            value="≥ 15000" 
            label="30-day sales" 
          />
          <PerformanceStat 
            icon={<FileText className="h-4 w-4 text-muted-foreground" />} 
            value="≥ 100" 
            label="30-day feedback rate" 
          />
          <PerformanceStat 
            icon={<CheckCircle className="h-4 w-4 text-success" />} 
            value="≥ 99%" 
            label="30-day feedback rate" 
          />
        </div>
      </div>
    </Card>
  );
};

interface PerformanceStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const PerformanceStat = ({ icon, value, label }: PerformanceStatProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <div className="text-sm font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
);
