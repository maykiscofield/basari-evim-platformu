import { Link } from 'react-router-dom';
import { BookOpen, Users, Download, ArrowRight } from 'lucide-react';
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-light bg-clip-text text-transparent">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            YKS yolculuğunuzda ihtiyacınız olan tüm destek ve kaynaklar burada. 
            Size en uygun paketi seçin ve başarıya adım atın.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 text-${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${service.color} mr-2`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" asChild className="w-full group-hover:bg-primary/10 group-hover:text-primary">
                  <Link to={service.link}>
                    Detayları Gör
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-light hover:opacity-90">
            <Link to="/hizmetler">
              Tüm Hizmetleri Gör
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
