import { Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-warning">PlayerAuctions</span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 max-w-md">
          <div className="relative w-full flex">
            <Input
              type="search"
              placeholder="Find a game..."
              className="w-full bg-card border-border rounded-r-none focus:border-link text-sm h-9"
            />
            <Button 
              size="sm" 
              className="rounded-l-none h-9 px-3 bg-success hover:bg-success/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">English</span>
          </button>

          {/* Auth buttons */}
          <Link to="/auth">
            <Button 
              variant="outline" 
              size="sm"
              className="text-foreground border-border hover:bg-accent h-8"
            >
              LOG IN
            </Button>
          </Link>
          <Link to="/auth">
            <Button 
              size="sm"
              className="btn-success h-8"
            >
              SIGN UP
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
