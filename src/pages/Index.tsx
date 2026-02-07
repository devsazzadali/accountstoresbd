import { useState } from "react";
import {
  Header,
  SellerBanner,
  StorefrontHeader,
  SellerPerformance,
  ShopTabs,
  CategoryTabs,
  StoreFilters,
  ProductTable,
  Pagination,
  Footer,
  Listing,
} from "@/components/storefront";

// Mock data matching the PlayerAuctions style
const mockListings: Listing[] = [
  {
    id: "1",
    title: "STEAM PC CASH BOOST [SAFE+FAST] You can also take a FREE Pack of (LVL BOOST+UNLOCK ALL+FAST RUN)",
    game: "GTA 5 Online",
    platform: "PC - Steam - Legacy",
    stock: 99,
    price: 12.50,
    pricePerUnit: "$0.025",
    deliveryTime: "6 Hours",
  },
  {
    id: "2",
    title: "ENHANCED EG PC CASH BOOST [SAFE+FAST] You can also take a FREE Pack of (LVL BOOST+UNLOCK ALL+FAST RUN)",
    game: "GTA 5 Online",
    platform: "PC - Epic - Enhanced",
    stock: 50,
    price: 19.25,
    pricePerUnit: "$0.039",
    deliveryTime: "6 Hours",
  },
  {
    id: "3",
    title: "EG PC CASH BOOST [SAFE+FAST] You can also take a FREE Pack of (LVL BOOST+UNLOCK ALL+FAST RUN)",
    game: "GTA 5 Online",
    platform: "PC - Epic - Legacy",
    stock: 25,
    price: 13.50,
    pricePerUnit: "$0.027",
    deliveryTime: "6 Hours",
  },
  {
    id: "4",
    title: "ROCKSTAR PC CASH BOOST [SAFE+FAST] You can also take a FREE Pack of (LVL BOOST+UNLOCK ALL+FAST RUN)",
    game: "GTA 5 Online",
    platform: "PC - Rockstar Games Launcher - Legacy",
    stock: 30,
    price: 13.50,
    pricePerUnit: "$0.027",
    deliveryTime: "6 Hours",
  },
];

const mockCategoryCounts: Record<string, number> = {
  gold: 4,
  items: 23,
  accounts: 1103,
  boosting: 696,
  topups: 0,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [activeCategory, setActiveCategory] = useState("gold");
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleBuyNow = (listing: Listing, quantity: number) => {
    console.log("Buy now clicked:", listing, "Quantity:", quantity);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedGame("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SellerBanner />
      
      <main className="container py-4 space-y-4 flex-1">
        <StorefrontHeader />
        <SellerPerformance />
        
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="p-4">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categoryCounts={mockCategoryCounts}
            />
            
            <StoreFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedGame={selectedGame}
              onGameChange={setSelectedGame}
              totalOffers={mockListings.length}
              onReset={handleReset}
            />
            
            <ProductTable
              listings={mockListings}
              isLoading={isLoading}
              onBuyNow={handleBuyNow}
            />
            
            <Pagination 
              currentPage={currentPage}
              totalPages={1}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
