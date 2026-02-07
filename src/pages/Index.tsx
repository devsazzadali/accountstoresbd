import { useState } from "react";
import {
  Header,
  SellerBanner,
  StorefrontHeader,
  CategoryTabs,
  StoreFilters,
  ProductTable,
  Footer,
  Listing,
} from "@/components/storefront";

// Mock data for initial display - matches PlayerAuctions style listings
const mockListings: Listing[] = [
  {
    id: "1",
    title: "【GLOBAL】All Nitro · Tiktok · Pigsy · Super Viper | Blue Beetle | Cuteki | Global · Carbon Commando · Rare Skins · Frozen Love · Target 101",
    game: "Fortnite",
    details: "PC",
    stock: 99,
    price: 56.61,
  },
  {
    id: "2",
    title: "❤️ 100-500 Level Account ❤️ Full MMR UNLOCK + 50 Wins ❤️ 1st",
    game: "Wild Rift",
    server: "EU West",
    stock: 50,
    price: 29.99,
  },
  {
    id: "3",
    title: "⚡2018~2022 AFO steam PLATINUM RANKED 24L-27",
    game: "RUST",
    server: "All Regions",
    stock: 15,
    price: 29.99,
  },
  {
    id: "4",
    title: "🔥 Premium Account with all Champions + Skins Bundle + Rare Items + Event Exclusives",
    game: "Fortnite",
    details: "Full Access",
    stock: 5,
    price: 151.55,
  },
  {
    id: "5",
    title: "NA LVL 445 HP: 525 211 - Arena: Apex Attacker 47",
    game: "Summoners War",
    details: "Global",
    stock: 1,
    price: 79.20,
  },
  {
    id: "6",
    title: "[Asia*]*] 7D 3LCS TWO-H | Samsung Moss SAINT-Choco",
    game: "Honkai Star Rail",
    details: "Full Access",
    stock: 3,
    price: 68.89,
  },
  {
    id: "7",
    title: "✔️ Verified Steam Level 50+ | Boosting+No Limit Skins Other Rare P",
    game: "Undisclosed",
    details: "Steam",
    stock: 25,
    price: 26.99,
  },
  {
    id: "8",
    title: "⚡2018~2022 AFO steam PLATINUM RANKED C1-27 Steam+MISC",
    game: "RUST",
    server: "All Regions",
    stock: 8,
    price: 29.99,
  },
  {
    id: "9",
    title: "[***NEW***] Esport Only LVL 44 | 48 HEIRLOOM SHARDS",
    game: "Apex Legends",
    details: "PC/Console",
    stock: 2,
    price: 20.99,
  },
  {
    id: "10",
    title: "[*RANK*] Offerup DARK 231 LVL AR 44 HEIRLOOM CARD/GWD only",
    game: "GTA V Online",
    details: "PC",
    stock: 12,
    price: 28.99,
  },
];

const mockCategoryCounts: Record<string, number> = {
  gold: 127,
  items: 89,
  accounts: 234,
  boosting: 56,
  services: 23,
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("accounts");
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleBuyNow = (listing: Listing) => {
    // TODO: Implement checkout flow
    console.log("Buy now clicked:", listing);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SellerBanner />
      
      <main className="container py-4 space-y-4 flex-1">
        <StorefrontHeader />
        
        <div className="bg-card border border-border rounded-lg">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={mockCategoryCounts}
          />
          
          <div className="px-4">
            <StoreFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedGame={selectedGame}
              onGameChange={setSelectedGame}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          
          <div className="px-4 pb-4">
            <ProductTable
              listings={mockListings}
              isLoading={isLoading}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
