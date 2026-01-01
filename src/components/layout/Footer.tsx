import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* LOGO ALANI */}
          <div className="space-y-6">
            <h3 className="text-4xl font-black text-white tracking-tighter italic">
              YKS <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">KOÇLUK</span>
            </h3>
            <p className="text-[16px] text-slate-400 font-medium leading-relaxed max-w-xs">
              YKS maratonunda zırvalamaya yer yok. <span className="text-white font-bold">Gerçek başarı</span> yanınızdayız.
            </p>
            <a href="https://www.instagram.com/ozgurkuzun" target="_blank" className="inline-block p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all">
              <Instagram className="w-6 h-6 text-slate-400 hover:text-white" />
            </a>
          </div>

          {/* BAĞLANTILI NAVİGASYON */}
          <div>
            <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">
              NAVİGASYON
            </h4>
            <ul className="space-y-3"> {/* Boşluk düşürüldü */}
              {['Ana Sayfa', 'Hizmetlerimiz', 'Hakkımızda', 'İletişim'].map((link) => (
                <li key={link}>
                  <Link to="#" className="group flex items-center text-[16px] text-slate-300 hover:text-purple-400 font-bold transition-all">
                    {/* Bağlantı Belirteci */}
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BAĞLANTILI HİZMETLER */}
          <div>
            <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">
              HİZMETLERİMİZ
            </h4>
            <ul className="space-y-3">
              {['Bireysel Koçluk', 'Dijital Materyaller', 'Deneme Analizi', 'Tüm Paketler'].map((link) => (
                <li key={link}>
                  <Link to="#" className="group flex items-center text-[16px] text-slate-300 hover:text-blue-400 font-bold transition-all">
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BİZE ULAŞIN */}
          <div>
            <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">
              BİZE ULAŞIN
            </h4>
            <div className="space-y-4">
              <div className="group flex items-center gap-4 cursor-pointer">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-all">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-[16px] text-slate-300 font-bold group-hover:text-white transition-colors">
                  info@deneme.com
                </span>
              </div>
              <div className="group flex items-center gap-4 cursor-pointer">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-blue-500/50 transition-all">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-[16px] text-slate-300 font-bold group-hover:text-white transition-colors">
                  +90 555 555 55 55
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;