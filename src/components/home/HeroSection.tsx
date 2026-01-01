import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background transition-colors duration-500">
      {/* Arka Plan Efektleri */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-primary to-purple-light opacity-[0.03] dark:opacity-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/10 dark:bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold font-bold text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              2025 Başarı Oranı: %94
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900 dark:text-white">
              <span>YKS'de </span>
              <span className="text-primary dark:text-purple-light inline-block drop-shadow-sm dark:drop-shadow-[0_20px_50px_rgba(124,58,237,0.45)]">
                Başarıya
              </span>
              <br />
              <span>Giden Yol</span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
              Deneyimli koçlarımız ve özel hazırlanmış materyallerimizle hayalinizdeki 
              üniversiteye giden yolda yanınızdayız.
            </p>
            
            {/* BUTONLAR: Modern, Neon ve Hata Arındırılmış */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                asChild 
                className="group relative h-20 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-500 hover:to-blue-500 text-white text-xl px-12 rounded-2xl font-black transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.7)] border border-white/10 active:scale-95 overflow-hidden"
              >
                <Link to="/hizmetler" className="flex items-center">
                  Hizmetleri Keşfet
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 stroke-[3px]" />
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="group relative h-20 border-2 border-purple-600 text-purple-700 bg-white hover:bg-purple-50 dark:border-purple-500/40 dark:text-purple-200 dark:bg-purple-500/5 dark:hover:bg-purple-500/10 dark:hover:text-white text-xl px-12 rounded-2xl font-black transition-all duration-300 shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-md active:scale-95"
              >
                <a 
                  href="https://wa.me/905555555555" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Ücretsiz Danışmanlık
                </a>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-white/10">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">500+</div>
                <div className="text-sm font-black text-slate-500 dark:text-slate-400 tracking-tighter uppercase">Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gold">15+</div>
                <div className="text-sm font-black text-slate-500 dark:text-slate-400 tracking-tighter uppercase">Uzman Koç</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary">94%</div>
                <div className="text-sm font-black text-slate-500 dark:text-slate-400 tracking-tighter uppercase">Başarı</div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-dark rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="w-40 h-40 text-white/20" />
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