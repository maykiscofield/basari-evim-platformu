import Navbar from "@/components/layout/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <h1 className="text-4xl font-black text-white mb-8 italic uppercase tracking-tighter">
          Kullanım <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Koşulları</span>
        </h1>
        <div className="space-y-6 text-lg leading-relaxed font-medium">
          <section>
            <h2 className="text-white font-bold text-xl mb-2">1. Hizmet Kapsamı</h2>
            <p>BaşarıEvim, YKS öğrencilerine yönelik dijital koçluk, planlama ve analiz araçları sunan bir platformdur. Platformda sunulan içerikler kişisel kullanım içindir.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-2">2. Fikri Mülkiyet</h2>
            <p>BaşarıEvim bünyesinde geliştirilen başarı algoritmaları, ders çalışma programı şablonları ve dijital materyallerin tüm hakları saklıdır. Bu içeriklerin izinsiz kopyalanması veya dağıtılması yasaktır.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-2">3. Sorumluluk Reddi</h2>
            <p>Platform başarıya giden yolda bir rehberdir; ancak nihai sınav başarısı öğrencinin bireysel performansına ve çalışma disiplinine bağlıdır.</p>
          </section>
        </div>
      </main>
    </div>
  );
};
export default Terms;