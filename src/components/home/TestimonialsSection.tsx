import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Elif Yılmaz',
    role: 'Tıp Fakültesi Öğrencisi',
    content: 'YKS Koçluk sayesinde hayalimdeki Tıp Fakültesi\'ni kazandım! Koçum her adımda yanımdaydı ve motivasyonumu hiç kaybetmedim.',
    rating: 5,
    avatar: 'EY',
  },
  {
    name: 'Ahmet Kaya',
    role: 'Mühendislik Öğrencisi',
    content: 'Dijital materyaller gerçekten çok kaliteli. Özellikle deneme sınavları gerçek sınava çok yakındı. Teşekkürler!',
    rating: 5,
    avatar: 'AK',
  },
  {
    name: 'Zeynep Demir',
    role: 'Hukuk Öğrencisi',
    content: 'Bireysel koçluk programı benim için dönüm noktası oldu. Kişisel çalışma planım sayesinde düzenli ve verimli çalıştım.',
    rating: 5,
    avatar: 'ZD',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Öğrencilerimiz </span>
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Ne Diyor?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Başarı hikayelerini doğrudan öğrencilerimizden dinleyin.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative border-border hover:border-gold/50 transition-colors">
              <CardContent className="pt-8">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-gold/20" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-light flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
