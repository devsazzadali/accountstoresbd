import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Header, Footer, SellerBanner } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Star,
  Shield,
  Truck,
  MessageCircle
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(500);

  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          game:games(id, name, slug),
          category:categories(id, name, slug)
        `)
        .eq('id', id!)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(100, quantity + delta));
  };

  const handleAddToCart = () => {
    if (!listing) return;
    
    addItem({
      listingId: listing.id,
      title: listing.title,
      game: listing.game?.name || 'Unknown Game',
      server: listing.server || undefined,
      price: Number(listing.price),
      quantity,
      stock: listing.stock
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity}M added to your cart.`,
    });
  };

  const totalPrice = listing ? (Number(listing.price) * quantity) / 500 : 0;
  const pricePerUnit = listing ? (Number(listing.price) / 500).toFixed(4) : "0.0000";

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container py-12 flex-1 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">This listing may have been removed or is no longer available.</p>
          <Link to="/shop">
            <Button>Browse Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <SellerBanner />
      
      <main className="container py-6 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          {listing?.game && (
            <>
              <span>/</span>
              <span>{listing.game.name}</span>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <Skeleton className="h-[400px] rounded-lg" />
            <Skeleton className="h-[500px] rounded-lg" />
          </div>
        ) : listing ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Left - Product Info */}
            <div className="space-y-6">
              {/* Product Image */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  {listing.image_url ? (
                    <img 
                      src={listing.image_url} 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                      <span className="text-6xl font-bold text-muted-foreground/30">
                        {listing.game?.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {listing.category?.name || 'Uncategorized'}
                    </Badge>
                    <h1 className="text-2xl font-bold text-warning mb-2">{listing.title}</h1>
                    <p className="text-muted-foreground">
                      {listing.game?.name} {listing.server && `• ${listing.server}`}
                    </p>
                  </div>
                </div>

                {listing.description && (
                  <div className="border-t border-border pt-4 mt-4">
                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
                  </div>
                )}

                {listing.details && (
                  <div className="border-t border-border pt-4 mt-4">
                    <h3 className="font-semibold text-foreground mb-2">Details</h3>
                    <p className="text-muted-foreground">{listing.details}</p>
                  </div>
                )}
              </Card>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card border-border p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Secure Payment</div>
                    <div className="text-xs text-muted-foreground">Protected checkout</div>
                  </div>
                </Card>
                <Card className="bg-card border-border p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Fast Delivery</div>
                    <div className="text-xs text-muted-foreground">Within 6 hours</div>
                  </div>
                </Card>
                <Card className="bg-card border-border p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-link/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-link" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">24/7 Support</div>
                    <div className="text-xs text-muted-foreground">Always available</div>
                  </div>
                </Card>
              </div>

              {/* Seller Info */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-seller rounded flex items-center justify-center">
                    <span className="text-2xl font-black text-seller-foreground">A</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">All4Gamers</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-warning fill-warning" />
                        ))}
                      </div>
                      <span>99.4% positive</span>
                      <span>•</span>
                      <span>58,143 orders</span>
                    </div>
                  </div>
                  <Button variant="outline">View Shop</Button>
                </div>
              </Card>
            </div>

            {/* Right - Purchase Card */}
            <div className="lg:sticky lg:top-20 h-fit">
              <Card className="bg-card border-border p-6 space-y-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">Delivery within 6 hours</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price per 1M</span>
                    <span className="font-semibold text-foreground">${pricePerUnit}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Stock</span>
                    <span className="font-semibold text-success">{listing.stock.toLocaleString()} M</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Quantity (M)</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-100)}
                      disabled={quantity <= 100}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(100, parseInt(e.target.value) || 100))}
                        className="w-full text-center bg-transparent border border-border rounded-md py-2 text-foreground font-semibold"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(100)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-3xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full btn-success font-bold text-lg py-6"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        handleAddToCart();
                        navigate('/cart');
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
