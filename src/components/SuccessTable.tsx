import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Eğer lib/supabase.ts dosyan yoksa oluşturmalısın

const SuccessTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    // Veritabanındaki pomodoro_sessions tablosundan verileri çekiyoruz
    const { data: sessions, error } = await supabase
      .from("pomodoro_sessions")
      .select("*");

    if (!error && sessions) {
      setData(sessions);
    } else {
      console.error("Veri çekilemedi:", error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="text-[#bc13fe] animate-pulse p-4">Veriler yükleniyor...</div>;

  return (
    <div className="p-6 bg-[#0a0a0c] border border-[#3a0066] rounded-xl shadow-[0_0_20px_rgba(188,19,254,0.1)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#bc13fe] text-xl font-bold drop-shadow-[0_0_8px_#bc13fe]">
          🚀 Başarı Tablosu
        </h2>
        <button 
          onClick={fetchData} 
          className="text-xs text-[#8a2be2] hover:text-[#bc13fe] transition-colors"
        >
          Yenile
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#3a0066]">
              {/* Türkçe başlıklar */}
              <th className="p-4 text-[#8a2be2] font-semibold">No</th>
              <th className="p-4 text-[#8a2be2] font-semibold">İsim</th>
              <th className="p-4 text-[#8a2be2] font-semibold">Soyisim</th>
              <th className="p-4 text-[#8a2be2] font-semibold">Durum</th>
              <th className="p-4 text-[#8a2be2] font-semibold">Puan</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="border-b border-[#1a1a1a] hover:bg-[#1a0033] transition-colors group">
                  <td className="p-4 text-gray-400 group-hover:text-white">{row.id}</td> 
                  <td className="p-4 text-gray-300 group-hover:text-white">{row.first_name}</td> 
                  <td className="p-4 text-gray-300 group-hover:text-white">{row.last_name}</td>
                  <td className="p-4">
                    <span className="bg-[#2d004d] text-[#e0b0ff] px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-[#3a0066]">
                      {row.status || 'Aktif'}
                    </span>
                  </td>
                  <td className="p-4 text-[#bc13fe] font-bold drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">
                    {row.score}
                  </td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-500 italic">
                  Henüz veri bulunamadı veya giriş yapmadınız.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuccessTable;