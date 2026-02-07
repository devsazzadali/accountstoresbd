import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Package, User, ShoppingCart, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user profile
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      
      if (error) throw error;
      if (data) setDisplayName(data.display_name || '');
      return data;
    },
    enabled: !!user
  });

  // Fetch user orders
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          listing:listings(title, game:games(name))
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('user_id', user!.id);
    
    setIsUpdating(false);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: error.message
      });
    } else {
      toast({
        title: 'Profile updated',
        description: 'Your display name has been updated.'
      });
      refetchProfile();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'processing':
        return <Badge className="bg-link text-white"><Package className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'cancelled':
      case 'refunded':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Dashboard</h1>
        
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              My Purchases
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="bg-card border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order History</h2>
              
              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-border rounded-lg p-4 hover:border-link/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            {order.listing?.title || 'Unknown Item'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {order.listing?.game?.name || 'Unknown Game'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-success">${order.total_price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                          <div className="mt-2">{getStatusBadge(order.status)}</div>
                        </div>
                      </div>
                      {order.delivery_info && order.status === 'delivered' && (
                        <div className="mt-3 p-3 bg-background rounded border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Delivery Info:</p>
                          <p className="text-sm text-foreground font-mono">{order.delivery_info}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>You haven't made any purchases yet.</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-card border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Settings</h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted border-border"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter display name"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <p className="text-sm text-muted-foreground">
                    {profile?.created_at 
                      ? format(new Date(profile.created_at), 'MMMM dd, yyyy')
                      : 'Unknown'}
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
