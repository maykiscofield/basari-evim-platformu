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
      <section className="py-20 bg-[#f4f4f5] dark:bg-[#020617] transition-colors duration-500 min-h-screen relative overflow-hidden">
        {/* HAFİF ARKA PLAN PARLAMALARI */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          
          {/* BAŞLIK ve AÇIKLAMA: NEON EFEKTLİ */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] dark:drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                Hizmetlerimiz
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl font-medium italic">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] dark:drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                "YKS maratonunda zırvalamaya yer yok. <span className="font-bold">Gerçek başarı</span> için yanınızdayız."
              </span>
            </p>
          </div>

          <Tabs value={currentTab} onValueChange={(value) => setSearchParams({ type: value })} className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="bg-slate-200/50 dark:bg-white/5 p-1.5 rounded-2xl h-auto border border-slate-300/20 dark:border-white/10 backdrop-blur-sm shadow-sm">
                
                {/* TÜMÜ SEKME TETİKLEYİCİ */}
                <TabsTrigger 
                  value="all" 
                  className="px-8 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:shadow-cyan-500/20"
                >
                  <Filter className="w-4 h-4 mr-2" /> Tümü
                </TabsTrigger>
                
                {/* KOÇLUK SEKME TETİKLEYİCİ */}
                <TabsTrigger 
                  value="coaching" 
                  className="px-8 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 hover:scale-105 hover:text-violet-600 dark:hover:text-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:shadow-violet-600/20"
                >
                  <Users className="w-4 h-4 mr-2" /> Koçluk
                </TabsTrigger>
                
                {/* MATERYALLER SEKME TETİKLEYİCİ */}
                <TabsTrigger 
                  value="material" 
                  className="px-8 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:shadow-blue-600/20"
                >
                  <Download className="w-4 h-4 mr-2" /> Materyaller
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={currentTab} className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPackages.map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className="group flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:border-purple-500/20 overflow-hidden"
                    >
                      <CardHeader className="p-8 pb-4">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge className={`${pkg.package_type === 'coaching' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} dark:bg-opacity-10 border-none font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider`}>
                            {pkg.package_type === 'coaching' ? 'Koçluk' : 'Materyal'}
                          </Badge>
                          {pkg.available_slots !== null && pkg.available_slots <= 5 && (
                            <Badge variant="destructive" className="font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider animate-pulse">
                              Son {pkg.available_slots} Kontenjan
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl font-black text-slate-800 dark:text-white transition-colors tracking-tight">
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
                              <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${pkg.package_type === 'coaching' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
                                <Check className="w-3.5 h-3.5 stroke-[3px]" />
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
                            <span className="text-lg text-slate-400 line-through font-bold opacity-50">
                              {formatPrice(pkg.original_price)}
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => handleAddToCart(pkg)}
                          disabled={isInCart(pkg.id)}
                          className={`w-full py-7 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg ${
                            isInCart(pkg.id) 
                            ? 'bg-emerald-500 text-white cursor-default' 
                            : 'bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-purple-500/20'
                          }`}
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