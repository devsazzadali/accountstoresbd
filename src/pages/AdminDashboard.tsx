import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Package, ShoppingCart, Plus, Edit, Trash2, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ListingForm {
  title: string;
  description: string;
  details: string;
  price: number;
  stock: number;
  server: string;
  game_id: string;
  category_id: string;
}

const defaultForm: ListingForm = {
  title: '',
  description: '',
  details: '',
  price: 0,
  stock: 1,
  server: '',
  game_id: '',
  category_id: ''
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ListingForm>(defaultForm);
  const [deliveryInfo, setDeliveryInfo] = useState('');

  // Fetch listings
  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['admin-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`*, game:games(name), category:categories(name)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });

  type ListingType = NonNullable<typeof listings>[number];

  // Fetch games
  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase.from('games').select('*').order('name');
      if (error) throw error;
      return data;
    }
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });

  // Fetch orders
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, listing:listings(title)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });

  // Create/Update listing mutation
  const saveMutation = useMutation({
    mutationFn: async (data: ListingForm) => {
      const payload = {
        title: data.title,
        description: data.description || null,
        details: data.details || null,
        price: data.price,
        stock: data.stock,
        server: data.server || null,
        game_id: data.game_id || null,
        category_id: data.category_id || null
      };
      
      if (editingId) {
        const { error } = await supabase
          .from('listings')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('listings')
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-listings'] });
      toast({ title: editingId ? 'Listing updated' : 'Listing created' });
      setIsDialogOpen(false);
      setForm(defaultForm);
      setEditingId(null);
    },
    onError: (error: Error) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  });

  // Delete listing mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('listings').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-listings'] });
      toast({ title: 'Listing deleted' });
    },
    onError: (error: Error) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  });

  type OrderStatus = 'pending' | 'processing' | 'delivered' | 'refunded' | 'cancelled';
  
  // Update order status mutation
  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, status, delivery_info }: { id: string; status: OrderStatus; delivery_info?: string }) => {
      const updateData: { status: OrderStatus; delivery_info?: string | null } = { status };
      if (delivery_info) updateData.delivery_info = delivery_info;
      
      const { error } = await supabase.from('orders').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Order updated' });
      setDeliveryInfo('');
    },
    onError: (error: Error) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  });

  const openEditDialog = (listing: ListingType) => {
    setEditingId(listing.id);
    setForm({
      title: listing.title,
      description: listing.description || '',
      details: listing.details || '',
      price: listing.price,
      stock: listing.stock,
      server: listing.server || '',
      game_id: listing.game_id || '',
      category_id: listing.category_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(form);
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
        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <Card className="bg-card border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Manage Listings</h2>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) {
                    setForm(defaultForm);
                    setEditingId(null);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-success hover:bg-success/90 text-success-foreground gap-2">
                      <Plus className="h-4 w-4" />
                      Add Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingId ? 'Edit Listing' : 'Create Listing'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Game</Label>
                          <Select value={form.game_id || undefined} onValueChange={(v) => setForm({ ...form, game_id: v })}>
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="Select game" />
                            </SelectTrigger>
                            <SelectContent>
                              {games?.map((game) => (
                                <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={form.category_id || undefined} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          className="bg-background border-border"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Details</Label>
                        <Textarea
                          value={form.details}
                          onChange={(e) => setForm({ ...form, details: e.target.value })}
                          className="bg-background border-border"
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                            required
                            className="bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            min="0"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                            required
                            className="bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Server</Label>
                          <Input
                            value={form.server}
                            onChange={(e) => setForm({ ...form, server: e.target.value })}
                            placeholder="e.g. NA, EU"
                            className="bg-background border-border"
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-success hover:bg-success/90 text-success-foreground"
                        disabled={saveMutation.isPending}
                      >
                        {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {editingId ? 'Update Listing' : 'Create Listing'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {listingsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : listings && listings.length > 0 ? (
                <div className="space-y-3">
                  {listings.map((listing) => (
                    <div key={listing.id} className="border border-border rounded-lg p-4 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {listing.game?.name || 'No game'} • {listing.category?.name || 'No category'} • Stock: {listing.stock}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-success">${listing.price.toFixed(2)}</p>
                        <Badge variant={listing.is_active ? 'default' : 'secondary'}>
                          {listing.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(listing)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => deleteMutation.mutate(listing.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No listings yet. Create your first listing!</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-card border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Manage Orders</h2>

              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-medium text-foreground">{order.listing?.title || 'Unknown'}</h3>
                          <p className="text-sm text-muted-foreground">
                            Order ID: {order.id.slice(0, 8)}...
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-success">${order.total_price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                          <div className="mt-1">{getStatusBadge(order.status)}</div>
                        </div>
                      </div>
                      
                      {order.status === 'pending' || order.status === 'processing' ? (
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                          <Input
                            placeholder="Enter delivery info (account details, keys, etc.)"
                            value={deliveryInfo}
                            onChange={(e) => setDeliveryInfo(e.target.value)}
                            className="flex-1 bg-background border-border text-sm"
                          />
                          <Button
                            size="sm"
                            className="bg-success hover:bg-success/90 text-success-foreground"
                            onClick={() => updateOrderMutation.mutate({ 
                              id: order.id, 
                              status: 'delivered',
                              delivery_info: deliveryInfo 
                            })}
                            disabled={updateOrderMutation.isPending}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Deliver
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateOrderMutation.mutate({ id: order.id, status: 'refunded' })}
                            disabled={updateOrderMutation.isPending}
                          >
                            Refund
                          </Button>
                        </div>
                      ) : order.delivery_info ? (
                        <div className="pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">Delivery Info:</p>
                          <p className="text-sm font-mono text-foreground">{order.delivery_info}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet.</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
