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
              <Button type="submit" className="bg-primary text-white">Gönder</Button>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/ozgurkuzun" target="_blank" rel="noopener noreferrer" aria-label="Instagram - ozgurkuzun" title="ozgurkuzun" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <div className="text-sm text-muted-foreground">  <a href={`mailto:info@deneme.com`} className="underline">info@deneme.com</a></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Iletisim;
