import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, GraduationCap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#020617]">
      {/* --- ARKA PLAN (Koyu ve Derin) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.1),transparent)]" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-pulse" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* SOL TARAF: İKNA EDİCİ METİNLER */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <ShieldCheck className="w-4 h-4 mr-2" />
              <span>SINAV SÜRECİNDE UZMAN REHBERLİĞİ</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white">
              Hayallerini <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Şansa
                </span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute bottom-2 left-0 h-4 bg-primary/20 -z-10 rounded-full blur-sm"
                ></motion.span>
              </span>
              <br />
              Bırakma.
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg font-medium leading-relaxed italic">
              "YKS maratonunda tesadüflere yer yok. Profesyonel rehberlikle yolunu netleştir."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-purple-600 group-hover:from-blue-600 group-hover:to-indigo-600 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <Button 
                  size="lg" 
                  asChild 
                  className="relative h-16 bg-primary hover:bg-blue-600 text-white text-lg px-10 rounded-2xl font-bold shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-white/20 overflow-hidden transition-all duration-300"
                >
                  <Link to="/hizmetler" className="flex items-center">
                    Hizmetleri Keşfet
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute -inset-1.5 bg-primary/40 rounded-2xl blur-2xl opacity-0 group-hover:opacity-70 transition duration-500" />
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="relative h-16 border-2 border-primary/50 bg-transparent text-white text-lg px-10 rounded-2xl font-bold hover:bg-primary/10 hover:border-primary transition-all duration-300"
                >
                  <a href="https://wa.me/905555555555">Ücretsiz Danışmanlık</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* SAĞ TARAF: KEP (GRADUATION CAP) EFEKTLİ ROZET KARTI */}
          <div className="relative lg:block hidden">
             <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-square max-w-lg mx-auto"
            >
              {/* Konsantrik Halkalar */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 0.8, 0.6].map((scale, i) => (
                  <div 
                    key={i}
                    style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
                    className="absolute border border-white/10 rounded-full" 
                  />
                ))}
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute w-[40%] h-[40%] border border-primary/30 rounded-full bg-primary/10 blur-[1px]" 
                />
              </div>

              {/* Ana Kart */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-purple-800/30 to-slate-900/50 rounded-[5rem] border border-purple-500/30 backdrop-blur-3xl shadow-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <GraduationCap className="w-48 h-48 text-white group-hover:scale-110 transition-transform duration-1000" />
                </div>
              </motion.div>

              {/* GÖRÜNTÜLE VE PLANLA ROZETİ */}
              <motion.div 
                drag
                dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, rotate: -1 }}
                className="absolute -bottom-10 -right-8 z-30 cursor-pointer"
              >
                <div className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-primary to-transparent shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                  <div className="relative backdrop-blur-3xl bg-slate-900/95 p-8 rounded-[31px] min-w-[340px] border border-white/10">
                    
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                        <Check className="w-9 h-9 text-white" strokeWidth={3} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-emerald-400 text-[11px] font-black uppercase tracking-[2px] mb-1">
                          ANINDA GERİ BİLDİRİM
                        </span>
                        <h3 className="text-white text-2xl font-bold tracking-tight">
                          Başarı Stratejisi
                        </h3>
                        <p className="text-slate-400 text-sm font-medium">
                          Sana özel günlük yol haritası.
                        </p>
                      </div>
                    </div>

                    {/* YÖNLENDİRME EKLENDİ */}
                    <Link to="/hizmetler" className="block w-full">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 rounded-2xl text-white font-black text-sm tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                      >
                        <span className="relative z-10 uppercase tracking-widest">Görüntüle ve Planla</span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;