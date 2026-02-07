import { Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success">
            <span className="text-lg font-bold text-success-foreground">PA</span>
          </div>
          <span className="hidden text-lg font-bold text-foreground sm:inline-block">
            PlayerAuctions
          </span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for games, items, accounts..."
              className="w-full pl-10 bg-background border-border focus:border-link"
            />
          </div>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Link to="/auth">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="btn-success hidden sm:inline-flex">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
