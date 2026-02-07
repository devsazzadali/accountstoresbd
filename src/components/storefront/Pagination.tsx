import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-1 py-6">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 border-border"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant="outline"
          size="icon"
          className={cn(
            "h-9 w-9 border-border",
            currentPage === page && "bg-link border-link text-foreground"
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 border-border"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
