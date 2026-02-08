import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header, Footer, SellerBanner, CategoryTabs, Pagination } from "@/components/storefront";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid, List, Clock, ThumbsUp } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data ?? [];
    }
  });

  // Fetch games
  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('name');
      if (error) throw error;
      return data ?? [];
    }
  });

  // Fetch listings
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', activeCategory, selectedGame, searchQuery, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select(`
          *,
          game:games(id, name, slug),
          category:categories(id, name, slug)
        `)
        .eq('is_active', true);

      // Filter by category
      if (activeCategory) {
        const category = categories?.find(c => c.slug === activeCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      // Filter by game
      if (selectedGame) {
        query = query.eq('game_id', selectedGame);
      }

      // Search filter
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      // Sorting
      if (sortBy === "newest") {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === "price-low") {
        query = query.order('price', { ascending: true });
      } else if (sortBy === "price-high") {
        query = query.order('price', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    }
  });

  // Category counts
  const { data: categoryCounts } = useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      const counts: Record<string, number> = {};
      if (categories) {
        for (const cat of categories) {
          const { count, error } = await supabase
            .from('listings')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id)
            .eq('is_active', true);
          if (!error && count !== null) {
            counts[cat.slug] = count;
          }
        }
      }
      return counts;
    },
    enabled: !!categories && categories.length > 0
  });

  // Pagination
  const totalPages = Math.ceil((listings?.length || 0) / ITEMS_PER_PAGE);
  const paginatedListings = useMemo(() => {
    if (!listings) return [];
    return listings.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [listings, currentPage]);

  const tabCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (categoryCounts && categories) {
      categories.forEach(cat => {
        counts[cat.slug] = categoryCounts[cat.slug] || 0;
      });
    }
    return counts;
  }, [categoryCounts, categories]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SellerBanner />
      
      <main className="container py-6 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shop</h1>
          <p className="text-muted-foreground">Browse all available products and services</p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Category Tabs */}
          <div className="border-b border-border">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              categoryCounts={tabCategoryCounts}
              categories={categories}
            />
          </div>

          {/* Filters Row */}
          <div className="p-4 border-b border-border">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="pl-9"
                  />
                </div>

                {/* Game Filter */}
                <Select value={selectedGame || "all"} onValueChange={(v) => { setSelectedGame(v === "all" ? "" : v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Games" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    {games?.map((game) => (
                      <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode & Results Count */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  <span className="text-warning font-bold">{listings?.length || 0}</span> products
                </span>
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="p-4">
            {isLoading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}>
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-[200px] rounded-lg" />
                ))}
              </div>
            ) : paginatedListings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No products found. Try adjusting your filters.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedListings.map((listing) => (
                  <ProductCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedListings.map((listing) => (
                  <ProductListItem key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface ProductCardProps {
  listing: any;
}

const ProductCard = ({ listing }: ProductCardProps) => {
  const pricePerUnit = (Number(listing.price) / 500).toFixed(4);
  
  return (
    <Link to={`/product/${listing.id}`}>
      <Card className="bg-card border-border overflow-hidden hover:border-seller transition-colors cursor-pointer h-full flex flex-col">
        {/* Product Image */}
        <div className="aspect-video bg-muted relative overflow-hidden">
          {listing.image_url ? (
            <img 
              src={listing.image_url} 
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
              <span className="text-4xl font-bold text-muted-foreground/30">
                {listing.game?.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="text-xs text-white bg-black/60 px-2 py-0.5 rounded">
              {listing.game?.name || 'Unknown'}
            </span>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1 text-xs text-success">
              <ThumbsUp className="h-3 w-3" />
              99%
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-warning line-clamp-2 mb-2 flex-1">
            {listing.title}
          </h3>
          
          {listing.server && (
            <p className="text-xs text-muted-foreground mb-2">{listing.server}</p>
          )}
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Clock className="h-3 w-3" />
            <span>6 Hours</span>
          </div>
          
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-border">
            <div>
              <span className="text-xs text-muted-foreground">${pricePerUnit}/M</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">${Number(listing.price).toFixed(2)}</div>
              <span className="text-xs text-muted-foreground">per 500M</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const ProductListItem = ({ listing }: ProductCardProps) => {
  const pricePerUnit = (Number(listing.price) / 500).toFixed(4);
  
  return (
    <Link to={`/product/${listing.id}`}>
      <Card className="bg-card border-border p-4 hover:border-seller transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
            {listing.image_url ? (
              <img 
                src={listing.image_url} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                <span className="text-2xl font-bold text-muted-foreground/30">
                  {listing.game?.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                {listing.game?.name || 'Unknown'}
              </span>
              {listing.server && (
                <span className="text-xs text-link">{listing.server}</span>
              )}
            </div>
            <h3 className="text-sm font-medium text-warning truncate">{listing.title}</h3>
          </div>
          
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>6 Hours</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">${Number(listing.price).toFixed(2)}</div>
              <span className="text-xs text-muted-foreground">${pricePerUnit}/M</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Shop;
