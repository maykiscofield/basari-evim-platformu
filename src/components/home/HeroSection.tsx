import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-primary to-purple-light opacity-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold font-medium text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              2024 Başarı Oranı: %94
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">YKS'de </span>
              <span className="bg-gradient-to-r from-primary to-purple-light bg-clip-text text-transparent">
                Başarıya
              </span>
              <br />
              <span className="text-foreground">Giden Yol</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Deneyimli koçlarımız ve özel hazırlanmış materyallerimizle YKS'de hayalinizdeki 
              üniversiteye giden yolda yanınızdayız. Bireysel koçluk programımızla potansiyelinizi keşfedin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-light hover:opacity-90 text-lg px-8">
                <Link to="/hizmetler">
                  Hizmetleri Keşfet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-gold text-gold hover:bg-gold/10 text-lg px-8">
                <Link to="/iletisim">
                  Ücretsiz Danışmanlık
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Mutlu Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">15+</div>
                <div className="text-sm text-muted-foreground">Uzman Koç</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">94%</div>
                <div className="text-sm text-muted-foreground">Başarı Oranı</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-dark rounded-3xl shadow-2xl transform rotate-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="w-32 h-32 text-white/20" />
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Başarı Rozeti</div>
                    <div className="text-sm text-muted-foreground">Kazanıldı!</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Bireysel Koçluk</div>
                    <div className="text-sm text-muted-foreground">Birebir Destek</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
