import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-purple-dark font-bold text-lg">YKS</span>
              </div>
              <span className="font-bold text-xl">Koçluk</span>
            </div>
            <p className="text-white/70 text-sm">
              YKS'de başarıya giden yolda yanınızdayız. Bireysel koçluk ve kaliteli materyallerle hedefinize ulaşın.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/hizmetler" className="text-white/70 hover:text-white transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-white/70 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-white/70 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">Hizmetler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hizmetler?type=coaching" className="text-white/70 hover:text-white transition-colors">
                  Bireysel Koçluk
                </Link>
              </li>
              <li>
                <Link to="/hizmetler?type=material" className="text-white/70 hover:text-white transition-colors">
                  Dijital Materyaller
                </Link>
              </li>
              <li>
                <Link to="/hizmetler" className="text-white/70 hover:text-white transition-colors">
                  Tüm Paketler
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-white/70">
                <Mail className="h-5 w-5 text-gold" />
                <span>info@ykskoculuk.com</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="h-5 w-5 text-gold" />
                <span>+90 555 123 45 67</span>
              </li>
              <li className="flex items-start space-x-3 text-white/70">
                <MapPin className="h-5 w-5 text-gold mt-0.5" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} YKS Koçluk. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
