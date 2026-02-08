import { Search, Globe, ChevronDown, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          {/* Flame icon */}
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-8 h-8">
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path 
                d="M16 2C16 2 8 10 8 18c0 4.4 3.6 8 8 8s8-3.6 8-8c0-8-8-16-8-16zm0 22c-2.2 0-4-1.8-4-4 0-2 2-5 4-8 2 3 4 6 4 8 0 2.2-1.8 4-4 4z" 
                fill="url(#flameGradient)"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-foreground">PlayerAuctions</span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 max-w-lg">
          <div className="relative w-full flex">
            <Input
              type="search"
              placeholder="Find your games..."
              className="w-full bg-secondary border-border rounded-r-none focus:border-link text-sm h-10 placeholder:text-muted-foreground"
            />
            <Button 
              size="sm" 
              className="rounded-l-none h-10 px-4 bg-secondary hover:bg-accent border-l-0"
            >
              <Search className="h-4 w-4 text-link" />
            </Button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language */}
          <button className="flex items-center gap-2 text-sm text-foreground hover:text-link transition-colors">
            <Globe className="h-4 w-4" />
            <span>English</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-link gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    My Dashboard
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="gap-2 cursor-pointer">
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="gap-2 cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-link font-medium"
                >
                  LOG IN
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6"
                >
                  SIGN UP
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
