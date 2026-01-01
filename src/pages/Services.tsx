import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Download, Filter, ShoppingCart, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  package_type: string;
  is_subscription: boolean;
  subscription_interval: string | null;
  features: string[];
  capacity: number | null;
  available_slots: number | null;
  image_url: string | null;
}

// Demo packages for initial display
const demoPackages: Package[] = [
  {
    id: 'demo-1',
    name: 'Başlangıç Koçluk Paketi',
    description: 'YKS hazırlığına yeni başlayanlar için ideal paket. Haftalık görüşmeler ve temel planlama.',
    price: 1500,
    original_price: 2000,
    package_type: 'coaching',
    is_subscription: true,
    subscription_interval: 'monthly',
    features: ['Haftalık 1 saat görüşme', 'Kişisel çalışma planı', 'WhatsApp desteği', 'Aylık rapor'],
    capacity: 20,
    available_slots: 8,
    image_url: null,
  },
  {
    id: 'demo-2',
    name: 'Profesyonel Koçluk Paketi',
    description: 'Yoğun hazırlık isteyenler için kapsamlı koçluk programı. Birebir takip ve motivasyon.',
    price: 2500,
    original_price: 3500,
    package_type: 'coaching',
    is_subscription: true,
    subscription_interval: 'monthly',
    features: ['Haftalık 2 saat görüşme', 'Detaylı analiz raporları', '7/24 WhatsApp desteği', 'Özel soru çözümü', 'Deneme analizi'],
    capacity: 10,
    available_slots: 3,
    image_url: null,
  },
  {
    id: 'demo-3',
    name: 'TYT Konu Anlatımları',
    description: 'TYT için tüm konuların özet anlatımları. PDF formatında indirilebilir.',
    price: 299,
    original_price: 499,
    package_type: 'material',
    is_subscription: false,
    subscription_interval: null,
    features: ['40+ konu özeti', 'PDF formatı', 'Örnek sorular', 'Formül kartları'],
    capacity: null,
    available_slots: null,
    image_url: null,
  },
  {
    id: 'demo-4',
    name: 'AYT Matematik Soru Bankası',
    description: 'AYT Matematik için kapsamlı soru bankası. Zorluk seviyesine göre kategorize edilmiş.',
    price: 399,
    original_price: 599,
    package_type: 'material',
    is_subscription: false,
    subscription_interval: null,
    features: ['1000+ soru', 'Çözümlü örnekler', 'Zorluk seviyeleri', 'Konu bazlı sınıflandırma'],
    capacity: null,
    available_slots: null,
    image_url: null,
  },
  {
    id: 'demo-5',
    name: 'Deneme Sınavı Paketi',
    description: '12 adet TYT ve AYT deneme sınavı. Gerçek sınav formatında.',
    price: 199,
    original_price: 349,
    package_type: 'material',
    is_subscription: false,
    subscription_interval: null,
    features: ['6 TYT denemesi', '6 AYT denemesi', 'Detaylı çözümler', 'Performans analizi'],
    capacity: null,
    available_slots: null,
    image_url: null,
  },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState<Package[]>(demoPackages);
  const [loading, setLoading] = useState(true);
  const { addItem, items } = useCart();
  const { toast } = useToast();
  
  const currentTab = searchParams.get('type') || 'all';

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedPackages: Package[] = data.map(pkg => ({
          ...pkg,
          features: Array.isArray(pkg.features) 
            ? (pkg.features as unknown as string[]) 
            : [],
        }));
        setPackages(formattedPackages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      // Keep demo packages on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (pkg: Package) => {
    addItem({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.original_price || undefined,
      packageType: pkg.package_type as 'coaching' | 'material',
    });
    toast({
      title: 'Sepete Eklendi',
      description: `${pkg.name} sepetinize eklendi.`,
    });
  };

  const isInCart = (packageId: string) => {
    return items.some(item => item.id === packageId);
  };

  const filteredPackages = currentTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.package_type === currentTab);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-purple-light bg-clip-text text-transparent">
                Hizmetlerimiz
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              YKS başarınız için ihtiyacınız olan tüm kaynaklar burada. 
              Size en uygun paketi seçin.
            </p>
          </div>

          <Tabs value={currentTab} onValueChange={(value) => setSearchParams({ type: value })} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  Tümü
                </TabsTrigger>
                <TabsTrigger value="coaching" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  Koçluk
                </TabsTrigger>
                <TabsTrigger value="material" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Materyaller
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={currentTab}>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPackages.map((pkg) => (
                    <Card key={pkg.id} className="flex flex-col border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={pkg.package_type === 'coaching' ? 'default' : 'secondary'}>
                                {pkg.package_type === 'coaching' ? 'Koçluk' : 'Materyal'}
                              </Badge>
                              {pkg.is_subscription && (
                                <Badge variant="outline" className="border-gold text-gold">
                                  Abonelik
                                </Badge>
                              )}
                              {pkg.available_slots !== null && pkg.available_slots <= 5 && (
                                <Badge variant="destructive">
                                  Son {pkg.available_slots} Kontenjan
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{pkg.name}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {pkg.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-1">
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      
                      <CardFooter className="flex flex-col gap-4 pt-4 border-t border-border">
                        <div className="flex items-baseline gap-2 w-full">
                          <span className="text-3xl font-bold text-foreground">
                            {formatPrice(pkg.price)}
                          </span>
                          {pkg.original_price && (
                            <span className="text-lg text-muted-foreground line-through">
                              {formatPrice(pkg.original_price)}
                            </span>
                          )}
                          {pkg.is_subscription && (
                            <span className="text-sm text-muted-foreground">
                              /{pkg.subscription_interval === 'monthly' ? 'ay' : 'yıl'}
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-purple-light hover:opacity-90"
                          onClick={() => handleAddToCart(pkg)}
                          disabled={isInCart(pkg.id)}
                        >
                          {isInCart(pkg.id) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Sepette
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Sepete Ekle
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
