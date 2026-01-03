import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

const Iletisim = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-3xl w-full px-6">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">İletişim</h1>
          <p className="text-muted-foreground mb-8">Bizimle iletişime geçmek için aşağıdaki formu doldurabilirsiniz. En kısa sürede dönüş yapacağız.</p>

          <form className="grid gap-4">
            <input type="text" placeholder="Ad Soyad" className="w-full rounded-md px-4 py-3 bg-white/5 border border-white/5 text-foreground placeholder:text-muted-foreground placeholder:opacity-90 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            <input type="email" placeholder="E-posta" className="w-full rounded-md px-4 py-3 bg-white/5 border border-white/5 text-foreground placeholder:text-muted-foreground placeholder:opacity-90 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            <textarea placeholder="Mesajınız" rows={6} className="w-full rounded-md px-4 py-3 bg-white/5 border border-white/5 text-foreground placeholder:text-muted-foreground placeholder:opacity-90 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            <div className="flex items-center justify-between">
              <Button type="submit" className="bg-primary text-white font-bold px-8">Gönder</Button>
              <div className="flex items-center gap-4">
                {/* Instagram - Glow */}
                <a 
                  href="https://instagram.com/ozgurkuzun" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 group hover:-translate-y-1"
                >
                  <Instagram className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>

                {/* LinkedIn - Boxed Glow */}
                <a 
                  href="https://www.linkedin.com/in/ozgurkuzun/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-[#0077B5]/50 hover:bg-[#0077B5]/10 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)] transition-all duration-300 group hover:-translate-y-1"
                >
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400 group-hover:fill-white">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* GitHub - Glow */}
                <a 
                  href="https://github.com/maykiscofield" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group hover:-translate-y-1"
                >
                  <svg viewBox="0 0 16 16" className="w-5 h-5 fill-slate-400 group-hover:fill-white">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Iletisim;