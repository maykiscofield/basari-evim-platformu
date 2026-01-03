import Navbar from "@/components/layout/Navbar";

const Kvkk = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <h1 className="text-4xl font-black text-white mb-8 italic uppercase tracking-tighter">
          KVKK <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Aydınlatma Metni</span>
        </h1>
        <div className="space-y-6 text-lg leading-relaxed font-medium">
          <section>
            <h2 className="text-white font-bold text-xl mb-2">1. Veri Sorumlusu</h2>
            <p>BaşarıEvim Online YKS Koçluk Platformu olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. 6698 sayılı Kanun uyarınca verileriniz platformumuz tarafından işlenmektedir.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-2">2. İşleme Amaçları</h2>
            <p>Kişisel verileriniz; sınav hazırlık sürecinizde size özel başarı stratejileri oluşturmak, deneme analizlerinizi gerçekleştirmek ve koçluk hizmetlerimizi size en verimli şekilde sunmak amacıyla işlenir.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-xl mb-2">3. Veri Güvenliği</h2>
            <p>BaşarıEvim, Supabase altyapısını kullanarak verilerinizi modern şifreleme yöntemleriyle korur. Verileriniz, izniniz olmaksızın reklam veya pazarlama amacıyla üçüncü taraflarla paylaşılmaz.</p>
          </section>
        </div>
      </main>
    </div>
  );
};
export default Kvkk;