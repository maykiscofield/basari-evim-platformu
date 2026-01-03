import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Dekoratif Arka Plan Parlaması */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* LOGO ALANI */}
          <div className="space-y-6">
            <h3 className="text-4xl font-black text-white tracking-tighter italic uppercase">
              BAŞARI<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">EVİM</span>
            </h3>
            <p className="text-[16px] text-slate-400 font-medium leading-relaxed max-w-xs">
              YKS maratonunda zırvalamaya yer yok. <span className="text-white font-bold">Gerçek başarı</span> için yanınızdayız.
            </p>
            <div className="flex gap-4">
              {/* Instagram - Mor/Pembe Parlama */}
              <a 
                href="https://www.instagram.com/ozgurkuzun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 group hover:-translate-y-1"
              >
                <Instagram className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn - Orijinal Mavi Parlama */}
              <a 
                href="https://www.linkedin.com/in/ozgurkuzun/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-[#0077B5]/50 hover:bg-[#0077B5]/10 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)] transition-all duration-300 group hover:-translate-y-1"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 fill-slate-400 group-hover:fill-white transition-colors"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* GitHub - Beyaz/Gri Parlama */}
              <a 
                href="https://github.com/maykiscofield" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group hover:-translate-y-1"
              >
                <svg 
                  viewBox="0 0 16 16" 
                  className="w-6 h-6 fill-slate-400 group-hover:fill-white transition-colors"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* NAVİGASYON */}
          <div>
            <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">NAVİGASYON</h4>
            <ul className="space-y-3">
              {[
                { label: 'Ana Sayfa', path: '/' },
                { label: 'Hizmetlerimiz', path: '/hizmetler' },
                { label: 'Pomodoro', path: '/pomodoro' },
                { label: 'İletişim', path: '/iletisim' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="group flex items-center text-[16px] text-slate-300 hover:text-purple-400 font-bold transition-all">
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HİZMETLERİMİZ */}
          <div>
            <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">HİZMETLERİMİZ</h4>
            <ul className="space-y-3">
              {['Bireysel Koçluk', 'Dijital Materyaller', 'Deneme Analizi', 'Tüm Paketler'].map((link) => (
                <li key={link}>
                  <Link to="/hizmetler" className="group flex items-center text-[16px] text-slate-300 hover:text-blue-400 font-bold transition-all">
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BİZE ULAŞIN */}
          <div>
            <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">BİZE ULAŞIN</h4>
            <div className="space-y-4">
              <a href="mailto:info@basarievim.com" className="group flex items-center gap-4 cursor-pointer">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-all">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-[16px] text-slate-300 font-bold group-hover:text-white transition-colors">info@basarievim.com</span>
              </a>
              <a href="tel:+905555555555" className="group flex items-center gap-4 cursor-pointer">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-blue-500/50 transition-all">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-[16px] text-slate-300 font-bold group-hover:text-white transition-colors">+90 555 555 55 55</span>
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-bold">
          <p>© 2026 BaşarıEvim. Tüm Hakları Saklıdır.</p>
          <div className="flex gap-8">
            <Link to="/kvkk" className="hover:text-white transition-colors underline-offset-4 hover:underline">KVKK</Link>
            <Link to="/kullanim-kosullari" className="hover:text-white transition-colors underline-offset-4 hover:underline">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;