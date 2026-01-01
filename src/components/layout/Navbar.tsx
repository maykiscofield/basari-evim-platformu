import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/hizmetler', label: 'Hizmetler' },
    { href: '/iletisim', label: 'İletişim' },
    { href: '/pomodoro', label: 'Pomodoro' }, 
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 transition-all duration-500">
      <div className="container mx-auto px-6">
        {/* Navbar yüksekliği standart h-20 (80px) olarak sabitlendi */}
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO KISMI: Optimize Edilmiş Boyut --- */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex items-center justify-center transition-all duration-500 group-hover:scale-105">
              {/* Logo boyutu w-16 h-16 (64px) olarak ayarlandı, Navbar dışına taşmaz */}
              <img 
                src="/logo.png" 
                alt="BaşarıEvim" 
                className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              />
              {/* Hafif neon parlama */}
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex flex-col"> 
              <span className="text-xl font-black tracking-tighter leading-none text-slate-900 dark:text-white transition-colors uppercase italic">
                BAŞARI<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">EVİM</span>
              </span>
              <div className="flex items-center gap-1 mt-1">
                <div className="h-[1px] w-3 bg-primary/50" />
                <span className="text-[9px] font-black tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase italic">
                  YKS KOÇLUK
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative group text-sm font-black tracking-[0.2em] uppercase text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all duration-300"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="group relative rounded-2xl w-10 h-10 bg-white/5 border border-white/10 text-slate-400 hover:text-yellow-400 transition-all duration-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link to="/sepet" className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-2xl w-10 h-10 bg-white/5 border border-white/10 text-slate-400 group-hover:text-primary transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {!user && (
              <div className="flex items-center space-x-3">
                <Button variant="outline" asChild className="h-10 border-primary/30 text-primary hover:bg-primary/5 text-xs font-black uppercase px-4 rounded-xl transition-all">
                  <Link to="/giris">Giriş Yap</Link>
                </Button>
                <Button asChild className="h-10 bg-gradient-to-r from-primary to-purple-600 text-white font-black text-xs uppercase px-5 rounded-xl shadow-md transition-all active:scale-95">
                  <Link to="/kayit">Kayıt Ol</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;