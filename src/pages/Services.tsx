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
      {/* ARKA PLAN: 2. fotodaki aydınlık geçiş */}
      <section className="py-20 bg-[#f4f4f5] dark:bg-slate-950 transition-colors duration-500">
        <div className="container mx-auto px-4">
          
          {/* BAŞLIK: 2. fotodaki belirginlik */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
              <span className="text-slate-900 dark:text-white drop-shadow-sm">
                Hizmetlerimiz
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl font-medium italic">
              "YKS başarınız için ihtiyacınız olan her şey burada. Zırvalamadan hedefe odaklanın."
            </p>
          </div>

          <Tabs value={currentTab} onValueChange={(value) => setSearchParams({ type: value })} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-slate-200/50 dark:bg-white/5 p-1 rounded-2xl h-auto">
                <TabsTrigger value="all" className="px-6 py-2.5 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-purple-600 data-[state=active]:shadow-md">
                  <Filter className="w-4 h-4 mr-2" /> Tümü
                </TabsTrigger>
                <TabsTrigger value="coaching" className="px-6 py-2.5 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-purple-600 data-[state=active]:shadow-md">
                  <Users className="w-4 h-4 mr-2" /> Koçluk
                </TabsTrigger>
                <TabsTrigger value="material" className="px-6 py-2.5 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-purple-600 data-[state=active]:shadow-md">
                  <Download className="w-4 h-4 mr-2" /> Materyaller
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={currentTab}>
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredPackages.map((pkg) => (
                    <Card key={pkg.id} className="group flex flex-col bg-white dark:bg-white/5 border-none rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                      
                      <CardHeader className="p-8 pb-4">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge className={`${pkg.package_type === 'coaching' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-100 border-none font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider`}>
                            {pkg.package_type === 'coaching' ? 'Koçluk' : 'Materyal'}
                          </Badge>
                          {pkg.is_subscription && (
                            <Badge className="bg-amber-100 text-amber-600 border-none font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                              Abonelik
                            </Badge>
                          )}
                          {pkg.available_slots !== null && pkg.available_slots <= 5 && (
                            <Badge variant="destructive" className="font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider animate-pulse">
                              Son {pkg.available_slots} Kontenjan
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-primary transition-colors tracking-tight">
                          {pkg.name}
                        </CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 font-medium text-base mt-2 line-clamp-2">
                          {pkg.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-8 flex-1">
                        <ul className="space-y-4">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-300">
                              <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full mr-3 flex-shrink-0">
                                <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      
                      <CardFooter className="p-8 pt-0 flex flex-col gap-6 mt-4">
                        <div className="flex items-baseline gap-2 w-full border-t border-slate-100 dark:border-white/5 pt-6">
                          <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {formatPrice(pkg.price)}
                          </span>
                          {pkg.original_price && (
                            <span className="text-lg text-slate-400 line-through font-bold">
                              {formatPrice(pkg.original_price)}
                            </span>
                          )}
                          {pkg.is_subscription && (
                            <span className="text-slate-500 font-bold text-sm">
                              /{pkg.subscription_interval === 'monthly' ? 'ay' : 'yıl'}
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          className={`w-full py-7 rounded-2xl font-black text-lg transition-all shadow-lg ${
                            isInCart(pkg.id) 
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                            : 'bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-purple-500/20 hover:shadow-purple-500/40'
                          }`}
                          onClick={() => handleAddToCart(pkg)}
                          disabled={isInCart(pkg.id)}
                        >
                          {isInCart(pkg.id) ? (
                            <><Check className="w-6 h-6 mr-2 stroke-[3px]" /> Sepette</>
                          ) : (
                            <><ShoppingCart className="w-6 h-6 mr-2 stroke-[3px]" /> Sepete Ekle</>
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