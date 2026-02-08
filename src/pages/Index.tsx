import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Header,
  SellerBanner,
  SellerSidebar,
  FeaturedOffers,
  CategoryTabs,
  ProductTable,
  Pagination,
  Footer,
  GameCards,
  Listing,
} from "@/components/storefront";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch categories from database
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

  // Fetch games from database
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

  // Fetch listings from database
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', activeCategory, selectedGame, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select(`
          *,
          game:games(id, name, slug),
          category:categories(id, name, slug)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Filter by category if selected
      if (activeCategory) {
        const category = categories?.find(c => c.slug === activeCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      // Filter by game if selected
      if (selectedGame) {
        const game = games?.find(g => g.id === selectedGame);
        if (game) {
          query = query.eq('game_id', game.id);
        }
      }

      // Search filter
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled: true
  });

  // Count listings per category
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

  // Transform listings to match the Listing interface
  const transformedListings: Listing[] = useMemo(() => {
    if (!listings) return [];
    
    return listings.map(item => ({
      id: item.id,
      title: item.title,
      game: item.game?.name || 'Unknown Game',
      platform: item.server || undefined,
      server: item.server || undefined,
      details: item.details || undefined,
      stock: item.stock,
      price: Number(item.price),
      pricePerUnit: `$${(Number(item.price) / 500).toFixed(3)}`,
      deliveryTime: "6 Hours"
    }));
  }, [listings]);

  // Pagination
  const totalPages = Math.ceil(transformedListings.length / ITEMS_PER_PAGE);
  const paginatedListings = transformedListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Build category counts for tabs (use slug as key)
  const tabCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (categoryCounts && categories) {
      categories.forEach(cat => {
        counts[cat.slug] = categoryCounts[cat.slug] || 0;
      });
    }
    return counts;
  }, [categoryCounts, categories]);

  // Transform games for GameCards
  const gameCards = useMemo(() => {
    if (!games) return [];
    return games.map(g => ({
      id: g.id,
      name: g.name,
      offers: listings?.filter(l => l.game_id === g.id).length || 0
    }));
  }, [games, listings]);

  const handleBuyNow = (listing: Listing, quantity: number) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to make a purchase.",
      });
      navigate('/auth');
      return;
    }
    
    console.log("Buy now clicked:", listing, "Quantity:", quantity);
    toast({
      title: "Coming soon!",
      description: "Checkout functionality will be available soon.",
    });
  };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SellerBanner />
      
      <main className="container py-6 flex-1">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left Sidebar - Seller Info */}
          <aside className="order-2 lg:order-1">
            <SellerSidebar />
          </aside>
          
          {/* Right Content - Products */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Featured Offers */}
            <FeaturedOffers />
            
            {/* All Services Section */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">All services</h2>
              </div>
              
              {/* Category Tabs */}
              <div className="border-b border-border">
                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  categoryCounts={tabCategoryCounts}
                  categories={categories}
                />
              </div>
              
              {/* Search and Filter Row */}
              <div className="p-4 border-b border-border">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={`Find all brands in ${activeCategory || 'All Categories'}`}
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      className="pl-9"
                    />
                  </div>
                  
                  {/* Sort Select */}
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Game Cards */}
              <div className="p-4 border-b border-border">
                <GameCards 
                  games={gameCards}
                  selectedGame={selectedGame}
                  onGameSelect={(g) => { 
                    setSelectedGame(g === selectedGame ? "" : g); 
                    setCurrentPage(1); 
                  }}
                />
              </div>
              
              {/* Products */}
              <div className="p-4">
                <ProductTable
                  listings={paginatedListings}
                  isLoading={isLoading}
                  onBuyNow={handleBuyNow}
                />
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
