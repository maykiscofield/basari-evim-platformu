import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Sun, Moon, LayoutDashboard, Timer } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [celalSozu, setCelalSozu] = useState("");
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const celalSozleri = [
    "Zırvalama, ders çalış!",
    "Bilgi güçtür, gerisi safsatadır.",
    "Senin cahilliğin benim yaşamımı etkiliyor!",
    "Okumayan adam cahil kalır!",
    "Coğrafya kaderdir derler, ama bilgi o kaderi değiştirir."
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    setCelalSozu(celalSozleri[Math.floor(Math.random() * celalSozleri.length)]);
    setIsOpen(false);
  }, [location]);

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

  // PANEL BURADA HER ZAMAN VAR:
  // Giriş yapılmışsa /panel'e, yapılmamışsa /giris'e yönlendirir.
  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/hizmetler', label: 'Hizmetler' },
    { href: '/pomodoro', label: 'Pomodoro', isNew: true }, 
    { href: '/iletisim', label: 'İletişim' },
    { href: user ? '/panel' : '/giris', label: 'PANEL', isSpecial: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 transition-all duration-500">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO VE CELAL HOCA TOOLTIP --- */}
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Link to="/" className="group flex items-center gap-3">
                  <div className="relative flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <img 
                      src="/logo.png" 
                      alt="BaşarıEvim" 
                      className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                    />
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="flex flex-col text-left"> 
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
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                sideOffset={15}
                className="z-[60] bg-[#0f172a]/95 backdrop-blur-3xl border-2 border-[#bc13fe] p-4 rounded-2xl shadow-[0_0_30px_rgba(188,19,254,0.4)] w-[260px]"
              >
                <div className="relative flex flex-col items-center text-center">
                  <p className="text-xl font-black italic text-white leading-tight">"{celalSozu}"</p>
                  <div className="w-full h-[1px] bg-white/10 my-3" />
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#bc13fe]">CELAL ŞENGÖR</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Desktop Navigasyon */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label} // Key'i href yerine label yaptık çünkü href değişebiliyor
                to={link.href}
                className={`relative group text-sm font-black tracking-[0.2em] uppercase transition-all duration-300
                  ${link.isSpecial 
                    ? 'text-[#bc13fe] italic drop-shadow-[0_0_12px_rgba(188,19,254,0.7)] hover:text-white scale-110 ml-2' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {link.isSpecial && <LayoutDashboard size={16} className="animate-pulse" />}
                  {link.label}
                  {link.isNew && <span className="absolute -top-3 -right-4 text-[8px] bg-purple-600 text-white px-1 rounded animate-bounce">YENİ</span>}
                </span>
                <span className={`absolute -bottom-2 left-0 w-0 h-[2.5px] transition-all duration-300 group-hover:w-full
                  ${link.isSpecial ? 'bg-[#bc13fe]' : 'bg-gradient-to-r from-primary to-blue-500'}`} 
                />
              </Link>
            ))}
          </div>

          {/* Sağ Aksiyonlar */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-2xl w-10 h-10 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-yellow-500 transition-all"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link to="/sepet" className="relative">
              <Button variant="ghost" size="icon" className="rounded-2xl w-10 h-10 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {!user ? (
                <>
                  <Button variant="outline" asChild className="h-10 border-primary/30 text-primary hover:bg-primary/5 text-xs font-black uppercase rounded-xl">
                    <Link to="/giris">Giriş</Link>
                  </Button>
                  <Button asChild className="h-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-xs uppercase rounded-xl shadow-lg shadow-purple-500/20">
                    <Link to="/kayit">Kayıt</Link>
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 p-0 overflow-hidden">
                      <User className="h-5 w-5 text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10" align="end">
                    <DropdownMenuItem onClick={() => navigate('/panel')} className="cursor-pointer">Panelim</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-500 cursor-pointer">Çıkış Yap</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobil Menü Butonu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-2xl w-10 h-10 text-slate-600 dark:text-slate-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobil Menü Paneli */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-lg font-bold transition-colors ${link.isSpecial ? 'text-[#bc13fe]' : 'text-slate-700 dark:text-slate-300'}`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <Button variant="outline" asChild className="w-full"><Link to="/giris">Giriş</Link></Button>
                <Button asChild className="w-full bg-primary"><Link to="/kayit">Kayıt</Link></Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;