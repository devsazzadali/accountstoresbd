import { useState } from "react";
import {
  Header,
  SellerBanner,
  StorefrontHeader,
  CategoryTabs,
  ProductTable,
  Listing,
} from "@/components/storefront";

// Mock data for initial display
const mockListings: Listing[] = [
  {
    id: "1",
    title: "1 Million Gold - Fast Delivery",
    game: "World of Warcraft",
    server: "US - Illidan",
    stock: 50,
    price: 45.99,
  },
  {
    id: "2",
    title: "500K Gold Bundle",
    game: "World of Warcraft",
    server: "EU - Draenor",
    stock: 25,
    price: 24.99,
  },
  {
    id: "3",
    title: "Legendary Sword +15",
    game: "Lost Ark",
    details: "1490 Item Level",
    stock: 3,
    price: 199.99,
  },
  {
    id: "4",
    title: "Level 70 Account - Full Gear",
    game: "World of Warcraft",
    details: "All Classes Unlocked",
    stock: 1,
    price: 299.99,
  },
  {
    id: "5",
    title: "Mythic+ Boost 20 Key",
    game: "World of Warcraft",
    details: "Self-Play",
    stock: 99,
    price: 34.99,
  },
  {
    id: "6",
    title: "Rare Mount Collection",
    game: "World of Warcraft",
    details: "15 Mounts Included",
    stock: 5,
    price: 149.99,
  },
];

const mockCategoryCounts: Record<string, number> = {
  gold: 127,
  items: 89,
  accounts: 34,
  boosting: 56,
  skins: 23,
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("gold");
  const [isLoading] = useState(false);

  const handleBuyNow = (listing: Listing) => {
    // TODO: Implement checkout flow
    console.log("Buy now clicked:", listing);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SellerBanner />
      
      <main className="container py-6 space-y-6">
        <StorefrontHeader />
        
        <div className="space-y-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={mockCategoryCounts}
          />
          
          <ProductTable
            listings={mockListings}
            isLoading={isLoading}
            onBuyNow={handleBuyNow}
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 Premium Game Store. All rights reserved.</p>
          <p className="mt-2">Secure payments powered by Stripe</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
