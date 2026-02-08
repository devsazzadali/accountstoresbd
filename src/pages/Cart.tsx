import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Header, Footer } from "@/components/storefront";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ArrowRight,
  Shield,
  CreditCard
} from "lucide-react";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to checkout.",
      });
      navigate('/auth');
      return;
    }

    // TODO: Implement Stripe checkout
    toast({
      title: "Coming soon!",
      description: "Checkout functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container py-8 flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some items to get started!</p>
            <Link to="/shop">
              <Button className="btn-success">
                Browse Shop
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''} in cart</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </Button>
              </div>

              {items.map((item) => {
                const itemTotal = (item.price * item.quantity) / 500;
                
                return (
                  <Card key={item.id} className="bg-card border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-warning mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.game} {item.server && `• ${item.server}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${(item.price / 500).toFixed(4)} per M
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -100)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="w-20 text-center">
                          <span className="font-medium text-foreground">{item.quantity}</span>
                          <span className="text-muted-foreground text-sm ml-1">M</span>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 100)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">${itemTotal.toFixed(2)}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive p-0 h-auto mt-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-20 h-fit">
              <Card className="bg-card border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="text-foreground">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full btn-success font-bold text-lg py-6 mb-4"
                  onClick={handleCheckout}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout with Stripe</span>
                </div>
              </Card>

              {/* Continue Shopping */}
              <div className="mt-4 text-center">
                <Link to="/shop" className="text-link hover:underline text-sm">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
