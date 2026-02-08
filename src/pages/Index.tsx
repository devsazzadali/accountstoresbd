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
  ShopTabs,
  CategoryTabs,
  StoreFilters,
  ProductTable,
  Pagination,
  Footer,
  Listing,
} from "@/components/storefront";

const ITEMS_PER_PAGE = 10;

const Index = () => {
  const [activeTab, setActiveTab] = useState("browse");
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

  const handleReset = () => {
    setSearchQuery("");
    setSelectedGame("");
    setActiveCategory("");
    setCurrentPage(1);
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
          <div className="order-1 lg:order-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Shop Tabs */}
              <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              <div className="p-4">
                {/* Category Tabs */}
                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  categoryCounts={tabCategoryCounts}
                  categories={categories}
                />
                
                {/* Store Filters */}
                <StoreFilters
                  searchQuery={searchQuery}
                  onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
                  selectedGame={selectedGame}
                  onGameChange={(g) => { setSelectedGame(g); setCurrentPage(1); }}
                  totalOffers={transformedListings.length}
                  onReset={handleReset}
                  games={games}
                />
                
                {/* Product Table */}
                <ProductTable
                  listings={paginatedListings}
                  isLoading={isLoading}
                  onBuyNow={handleBuyNow}
                />
                
                {/* Pagination */}
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
