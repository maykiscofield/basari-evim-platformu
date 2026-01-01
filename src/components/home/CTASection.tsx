import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      {/* Arka Plan ve Efektler - AYNI KALIYOR */}
      <div className="absolute inset-0 bg-[#0f172a] dark:bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-primary/30 to-blue-900/40" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* SINIRLI KONTENJAN: Daha büyük, parlayan ve hareketli rozet */}
          <div className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600/10 to-purple-500/6 backdrop-blur-3xl border border-purple-500/30 rounded-full mb-12 shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:shadow-[0_0_70px_rgba(168,85,247,0.7)] transition-all duration-500 group cursor-default transform hover:scale-105">
            <div className="relative mr-4 flex items-center justify-center">
              <div className="absolute -inset-2 rounded-full blur-xl bg-purple-600/30 opacity-60 animate-pulse" />
              <Sparkles className="relative w-6 h-6 text-purple-300 animate-spin-slow" />
            </div>
            <span className="text-base md:text-lg lg:text-xl font-extrabold text-white uppercase tracking-widest drop-shadow-[0_0_18px_rgba(168,85,247,0.85)]">
              Sınırlı Kontenjan
            </span>
          </div>
          
          {/* BAŞLIK: leading-tight ile satır arası açıldı */}
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight tracking-tight">
            Hayalinizdeki Üniversiteye
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(192,132,252,0.4)]">
              Bir Adım Daha Yakın Olun
            </span>
          </h2>
          
          {/* Metin - AYNI KALIYOR */}
          <p className="text-lg md:text-xl text-slate-300/90 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
            2025 YKS hazırlığında zırvalamaya yer yok. <span className="text-white font-bold">Gerçek başarı</span> için şimdi harekete geçin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* HEMEN BAŞLA: Güçlü Neon Gradyan ve Parlama */}
            <Button size="lg" asChild className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-12 py-8 rounded-2xl font-black transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_rgba(124,58,237,0.8)] border border-white/10">
              <Link to="/kayit" className="flex items-center">
                Hemen Başla
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* PAKETLERİ İNCELE: Neon Kenarlık (Outline) ve Parlama */}
            <Button size="lg" variant="outline" asChild className="border-2 border-purple-500/50 text-purple-300 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-400 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-xl text-lg px-12 py-8 rounded-2xl font-bold transition-all duration-300">
              <Link to="/hizmetler">
                Paketleri İncele
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;