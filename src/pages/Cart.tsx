import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal, discount, total, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setCouponLoading(true);
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: 'Geçersiz Kupon',
          description: 'Bu kupon kodu bulunamadı.',
          variant: 'destructive',
        });
        return;
      }

      // Check validity
      const now = new Date();
      if (data.valid_until && new Date(data.valid_until) < now) {
        toast({
          title: 'Süresi Dolmuş',
          description: 'Bu kuponun geçerlilik süresi dolmuş.',
          variant: 'destructive',
        });
        return;
      }

      if (data.max_uses && data.current_uses >= data.max_uses) {
        toast({
          title: 'Kullanım Limiti',
          description: 'Bu kupon kullanım limitine ulaşmış.',
          variant: 'destructive',
        });
        return;
      }

      if (data.min_order_amount && subtotal < data.min_order_amount) {
        toast({
          title: 'Minimum Tutar',
          description: `Bu kupon için minimum ${formatPrice(data.min_order_amount)} tutarında alışveriş yapmalısınız.`,
          variant: 'destructive',
        });
        return;
      }

      applyCoupon(data.code, data.discount_type as 'percentage' | 'fixed', Number(data.discount_value));
      toast({
        title: 'Kupon Uygulandı!',
        description: `${data.discount_type === 'percentage' ? `%${data.discount_value}` : formatPrice(Number(data.discount_value))} indirim kazandınız.`,
      });
      setCouponCode('');
    } catch (error) {
      console.error('Coupon error:', error);
      toast({
        title: 'Hata',
        description: 'Kupon uygulanırken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Giriş Yapın',
        description: 'Ödeme yapmak için lütfen giriş yapın.',
      });
      navigate('/giris');
      return;
    }
    
    // TODO: Implement Stripe checkout
    toast({
      title: 'Ödeme Sistemi',
      description: 'Stripe ödeme entegrasyonu yakında aktif olacak.',
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Sepetiniz Boş</h1>
            <p className="text-muted-foreground mb-6">
              Henüz sepetinize ürün eklemediniz. Hizmetlerimizi keşfedin!
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-purple-light">
              <Link to="/hizmetler">
                Hizmetleri Keşfet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          <span className="bg-gradient-to-r from-primary to-purple-light bg-clip-text text-transparent">
            Sepetim
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${item.packageType === 'coaching' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>
                          {item.packageType === 'coaching' ? 'Koçluk' : 'Materyal'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-foreground">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {item.packageType === 'material' && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-24">
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kupon Kodu</label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{appliedCoupon}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={removeCoupon}>
                        Kaldır
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Kupon kodunuz"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                      >
                        Uygula
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ara Toplam</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-primary">
                      <span>İndirim</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Toplam</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-purple-light hover:opacity-90"
                  onClick={handleCheckout}
                >
                  Ödemeye Geç
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/hizmetler">Alışverişe Devam Et</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
