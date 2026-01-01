import { Link } from 'react-router-dom';
import { BookOpen, Users, Download, ArrowRight, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Users,
    title: 'Bireysel Koçluk',
    description: 'Deneyimli koçlarımızla birebir çalışarak kişisel gelişim planınızı oluşturun. Haftalık görüşmeler ve sürekli destek.',
    features: ['Haftalık 1-1 görüşmeler', 'Kişisel çalışma planı', 'Sürekli WhatsApp desteği'],
    color: 'primary',
    link: '/hizmetler?type=coaching',
  },
  {
    icon: Download,
    title: 'Dijital Materyaller',
    description: 'Uzman kadromuz tarafından hazırlanan konu anlatımları, soru bankaları ve deneme sınavlarına anında erişin.',
    features: ['PDF konu özetleri', 'Video dersler', 'Deneme sınavları'],
    color: 'gold',
    link: '/hizmetler?type=material',
  },
  {
    icon: BookOpen,
    title: 'Karma Paketler',
    description: 'Hem bireysel koçluk hem de dijital materyalleri bir arada sunan avantajlı paketlerimizden yararlanın.',
    features: ['Koçluk + Materyaller', 'Özel indirimler', 'Tam destek'],
    color: 'primary',
    link: '/hizmetler',
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Dekoratif Neon Arka Plan parlaması */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter">
            <span className="text-slate-900 dark:text-white inline-block dark:drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]">
              Hizmetlerimiz
            </span>
          </h2>
          <div className="w-48 h-1.5 bg-gradient-to-r from-primary via-purple-light to-primary rounded-full mx-auto mb-6 shadow-[0_0_20px_rgba(124,58,237,0.4)]" />
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium italic">
            YKS yolculuğunuzda ihtiyacınız olan tüm destek ve kaynaklar burada. 
            Zırvalamaya yer yok, sadece başarı var.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-foreground rounded-[2.5rem] shadow-xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 overflow-hidden relative"
            >
              <CardHeader className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black text-slate-800 dark:text-white mb-2">{service.title}</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* --- GÜNCELLENEN NEON BUTONLAR --- */}
                <Button 
                  size="lg" 
                  asChild 
                  // group/btn sınıfı, kartın hover'ından bağımsız olarak butonun kendi hover efektini yönetmesini sağlar
                  className="group/btn relative w-full h-16 text-lg rounded-2xl font-black overflow-hidden transition-all duration-500
                             /* Aydınlık Mod: Solid primary renk, güçlü gölge */
                             bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-primary/40
                             /* Karanlık Mod: Koyu zemin, neon kenarlık ve yoğun parlama */
                             dark:bg-[#1e1b4b] dark:hover:bg-[#2e1065] dark:border-2 dark:border-primary/30 dark:hover:border-primary dark:shadow-[0_0_25px_rgba(124,58,237,0.3)] dark:hover:shadow-[0_0_50px_rgba(124,58,237,0.7)]"
                >
                  <Link to={service.link} className="flex items-center justify-center relative z-10">
                    Detayları Gör
                    {/* Ok ikonu büyütüldü ve kalınlaştırıldı */}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 transition-transform duration-300 stroke-[3px]" />

                    {/* Buton içinden geçen ışık hüzmesi efekti (tek child olur) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>
                {/* -------------------------------- */}

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alt Kısımdaki Ana Neon Buton (Aynı kalıyor) */}
        <div className="flex justify-center mt-20 relative group">
          <div className="absolute inset-0 bg-primary/25 blur-[50px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
          
          <Button 
            size="lg" 
            asChild 
            className="relative h-20 bg-slate-900 dark:bg-[#1e1b4b] hover:bg-black dark:hover:bg-[#2e1065] text-white text-xl px-14 rounded-[2rem] font-black transition-all duration-500 border-2 border-primary/20 hover:border-primary shadow-[0_0_30px_rgba(124,58,237,0.25)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] overflow-hidden active:scale-95"
          >
            <Link to="/hizmetler" className="flex items-center gap-4">
              <LayoutGrid className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform duration-500" />
              <span className="tracking-tighter uppercase">
                TÜM HİZMETLERİ GÖR
              </span>
              <ArrowRight className="w-7 h-7 text-white group-hover:translate-x-3 transition-transform duration-500 stroke-[3px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;