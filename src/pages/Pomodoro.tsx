import React, { useEffect, useState, useCallback, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Play, Pause, RotateCcw, X, Trophy, Crown, Zap, Music } from "lucide-react"; 
import { Button } from '@/components/ui/button'; 
import { supabase } from '@/integrations/supabase/client'; 
import { toast } from "sonner"; 
import confetti from 'canvas-confetti';

// Sabitler
const CELAL_SOZLERI = [
  "Zırvalama, ders çalış!", 
  "Bilgi güçtür, gerisi safsatadır.", 
  "Senin cahilliğin benim yaşamımı etkiliyor!", 
  "Okumayan adam cahil kalır!",
  "Bak evladım, ders çalışmadan entelektüel olunmaz."
];

const XP_LIMIT = 2500;
const SESSION_XP = 25;
const WORK_TIME = 25 * 60; 
const BREAK_TIME = 5 * 60;  

const Pomodoro = () => {
  // --- State Yönetimi ---
  const [timeLeft, setTimeLeft] = useState(WORK_TIME); 
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(300);
  const [isZirvaPlaying, setIsZirvaPlaying] = useState(false);
  const [rastgeleSoz, setRastgeleSoz] = useState("");
  const [isLegendary, setIsLegendary] = useState(false); 
  
  // Spotify Dinamik State
  const [spotifyConfig, setSpotifyConfig] = useState({
    id: '7DaKTQA8ETlVUUKMRcSmK6',
    type: 'playlist'
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Başlangıç Ayarları ---
  useEffect(() => {
    successAudioRef.current = new Audio('/applepay.mp3');
    
    // Toplam çalışma süresini ve Kayıtlı Playlist'i getir
    const storedTotal = localStorage.getItem('totalWorkMinutes');
    const storedSpotify = localStorage.getItem('savedSpotifyConfig');
    
    if (storedTotal) setTotalWorkMinutes(parseInt(storedTotal));
    if (storedSpotify) setSpotifyConfig(JSON.parse(storedSpotify));
    
    yenileSoz();
  }, []);

  const yenileSoz = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * CELAL_SOZLERI.length);
    setRastgeleSoz(CELAL_SOZLERI[randomIdx]);
  }, []);

  // Spotify Link İşleyici (Playlist, Album, Track destekler)
  const handleSpotifyLink = (input: string) => {
    try {
      // Örnek link: https://open.spotify.com/playlist/7DaKTQA8ETlVUUKMRcSmK6?si=...
      const url = new URL(input);
      const pathParts = url.pathname.split('/'); // ["", "playlist", "ID"]
      
      if (pathParts.length >= 3) {
        const type = pathParts[1]; // playlist, track, album
        const id = pathParts[2];
        
        const newConfig = { id, type };
        setSpotifyConfig(newConfig);
        localStorage.setItem('savedSpotifyConfig', JSON.stringify(newConfig));
        toast.success("Müzik listesi güncellendi! İyi çalışmalar.");
      }
    } catch (e) {
      // Eğer sadece ID yapıştırılırsa veya hatalı format ise
      if (input.length > 15) {
        toast.error("Lütfen geçerli bir Spotify linki yapıştırın.");
      }
    }
  };

  // --- ŞATAFATLI NEON XP BİLDİRİMİ ---
  const showAdvancedXPToast = (puan: number, oldPercent: number, newPercent: number, legendary: boolean) => {
    const mainColor = legendary ? 'from-yellow-400 via-amber-500 to-orange-600' : 'from-purple-500 via-[#bc13fe] to-blue-600';
    const shadowColor = legendary ? 'rgba(251,191,36,0.8)' : 'rgba(188,19,254,0.8)';
    const textColor = legendary ? 'text-yellow-400' : 'text-[#bc13fe]';

    toast.custom((id) => (
      <div className={`relative flex items-center p-6 rounded-3xl overflow-hidden transition-all duration-500 w-full max-w-lg
        bg-[#0a0f1e]/80 backdrop-blur-2xl border-2 border-white/10
        shadow-[0_0_50px_-10px_${shadowColor},inset_0_0_20px_-5px_${shadowColor}]
        animate-in fade-in slide-in-from-right-10 hover:scale-[1.02]`}>
        
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${mainColor} blur-3xl animate-pulse`} style={{ zIndex: -1 }}></div>

        <div className={`flex-shrink-0 p-4 rounded-full mr-6 bg-gradient-to-br ${mainColor} shadow-[0_0_30px_${shadowColor}] relative group`}>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${mainColor} blur-md opacity-70 group-hover:opacity-100 transition-opacity`}></div>
          {legendary ? <Crown className="w-10 h-10 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" /> : <Trophy className="w-10 h-10 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
        </div>
        
        <div className="flex-1 min-w-0 mr-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className={`w-5 h-5 ${textColor} animate-[spin_3s_linear_infinite] drop-shadow-[0_0_10px_${shadowColor}]`} />
            <h3 className={`text-lg font-black uppercase tracking-widest drop-shadow-[0_0_10px_${shadowColor}] ${textColor}`}>
              {legendary ? 'EFSANEVİ BAŞARI!' : 'İLERLEME KAYDEDİLDİ'}
            </h3>
          </div>
          
          <div className="flex items-baseline gap-3 mb-3">
            <span className={`text-5xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-b ${mainColor} drop-shadow-[0_0_20px_${shadowColor}]`}>
              +{puan}
            </span>
            <span className={`font-black text-2xl ${textColor} drop-shadow-[0_0_5px_${shadowColor}]`}>XP</span>
          </div>

          <div className="relative h-4 mt-2 bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            <div 
              className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out bg-gradient-to-r ${mainColor} shadow-[0_0_25px_${shadowColor}]`} 
              style={{ width: `${newPercent}%` }} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50 rounded-full"></div>
          </div>
        </div>
        
        <button onClick={() => toast.dismiss(id)} className="absolute top-3 right-3 p-2 text-white/50 hover:text-white transition-all rounded-full z-20">
          <X size={24} />
        </button>
      </div>
    ), { duration: 5000, position: 'bottom-right' });
  };

  // --- Veritabanı İşlemleri ---
  const saveSessionToSupabase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: sessions } = await (supabase as any).from('pomodoro_sessions').select('score').eq('user_id', user.id);
      const totalScoreOld = sessions?.reduce((sum: number, s: any) => sum + (s.score || 0), 0) || 0;
      
      const oldPercent = Math.floor((totalScoreOld / XP_LIMIT) * 100);
      
      await (supabase as any).from('pomodoro_sessions').insert([{ 
        user_id: user.id, 
        first_name: user.user_metadata?.full_name?.split(" ")[0] || "Öğrenci", 
        score: SESSION_XP, 
        status: 'Tamamlandı' 
      }]);

      const newScore = totalScoreOld + SESSION_XP;
      const newPercent = Math.min(Math.floor((newScore / XP_LIMIT) * 100), 100);
      const legendary = newScore >= XP_LIMIT;

      setIsLegendary(legendary);
      showAdvancedXPToast(SESSION_XP, oldPercent, newPercent, legendary);
      
      successAudioRef.current?.play().catch(() => {});
      confetti({ 
        particleCount: 200, 
        spread: 80, 
        origin: { y: 0.6 }, 
        colors: legendary ? ['#fbbf24', '#ffffff'] : ['#bc13fe', '#ffffff'] 
      });
    } catch (e) { 
      console.error("Supabase Hatası:", e); 
    }
  };

  // --- Timer Döngüsü ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      if (!isBreak) {
        saveSessionToSupabase();
        setTotalWorkMinutes(prev => {
          const newVal = prev + 25;
          localStorage.setItem('totalWorkMinutes', newVal.toString());
          return newVal;
        });
      }
      
      setIsActive(false);
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setTimeLeft(nextIsBreak ? BREAK_TIME : WORK_TIME); 
      yenileSoz();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, yenileSoz]);

  const playZirva = useCallback(() => {
    if (isZirvaPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsZirvaPlaying(false);
      return;
    }
    const audio = new Audio('/zirva.mp3');
    audioRef.current = audio;
    setIsZirvaPlaying(true);
    audio.play().catch(() => setIsZirvaPlaying(false));
    audio.onended = () => setIsZirvaPlaying(false);
  }, [isZirvaPlaying]);

  return (
    <Layout>
      <div className={`min-h-screen py-12 px-4 relative overflow-hidden transition-all duration-1000 ${isLegendary ? 'bg-[#0f0a00]' : 'bg-[#0f172a]'}`}>
        <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 animate-pulse ${isLegendary ? 'bg-yellow-600' : 'bg-[#bc13fe]'}`}></div>
        
        <div className="max-w-7xl w-full mx-auto relative z-10 text-white text-center">
          <h1 className="text-8xl font-black mb-16 italic uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {isBreak ? 'MOLA ZAMANI' : 'ODAKLANMA MODU'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCard label="Odaklanma" color="#bc13fe">
                <div className="text-7xl font-black italic">
                 {Math.floor(totalWorkMinutes / 60)}<span className="text-2xl opacity-40 ml-1">sa</span> : {totalWorkMinutes % 60}<span className="text-2xl opacity-40 ml-1">dk</span>
                </div>
            </StatCard>

            <StatCard label="Günlük Hedef" color="#60a5fa">
                <div className="flex items-center justify-center">
                 <input 
                   type="number" 
                   value={targetMinutes} 
                   onChange={(e) => setTargetMinutes(Math.max(1, parseInt(e.target.value) || 0))} 
                   className="bg-transparent text-7xl font-black text-center w-40 outline-none border-b-2 border-white/10" 
                 />
                 <span className="text-3xl opacity-40 font-bold ml-2 mt-4">dk</span>
               </div>
            </StatCard>

            <StatCard label="Başarı Oranı" color="#f472b6">
                <div className="text-7xl font-black mb-6">%{Math.min(Math.round((totalWorkMinutes / targetMinutes) * 100), 100)}</div>
                <div className="w-full bg-white/5 h-5 rounded-full overflow-hidden">
                 <div 
                   className="h-full transition-all duration-1000 bg-gradient-to-r from-[#bc13fe] to-pink-500 shadow-[0_0_20px_#bc13fe]" 
                   style={{ width: `${Math.min((totalWorkMinutes/targetMinutes)*100, 100)}%` }} 
                 />
               </div>
            </StatCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-1 border border-white/10 h-[550px] overflow-hidden shadow-2xl relative group">
                <img 
                  src={isActive ? "/celal-hoca-gulen.jpg" : "/celal.jpg"} 
                  alt="Celal Hoca" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-12 text-center text-yellow-400 font-bold text-3xl italic leading-tight drop-shadow-lg">
                  "{rastgeleSoz}"
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-[5rem] p-16 border border-white/5 shadow-2xl flex flex-col items-center flex-1 justify-center">
                <div className="text-[14rem] font-mono font-black italic tracking-tighter leading-none mb-16 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-8 w-full px-4">
                  <Button 
                    onClick={() => setIsActive(!isActive)} 
                    className="flex-[3] py-16 rounded-[3rem] font-black text-5xl uppercase bg-gradient-to-br from-[#bc13fe] to-[#8a2be2] text-white shadow-[0_0_50px_rgba(188,19,254,0.4)] hover:scale-[1.02] transition-transform"
                  >
                    {isActive ? <Pause size={56} className="mr-6" /> : <Play size={56} className="mr-6 fill-current" />}
                    {isActive ? 'DURAKLAT' : 'ODAKLAN'}
                  </Button>
                  <Button 
                    onClick={() => { 
                      setIsActive(false); 
                      setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME); 
                    }} 
                    className="flex-1 py-16 rounded-[3rem] border-2 bg-white/5 hover:bg-white/10 text-[#bc13fe] border-[#bc13fe]/50"
                  >
                    <RotateCcw size={56} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-12">
              <div className="bg-black/40 backdrop-blur-md rounded-[4rem] h-[550px] overflow-hidden border border-white/5 shadow-2xl flex flex-col p-6">
                
                {/* DİNAMİK PLAYLIST AYARI */}
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-3xl mb-4 border border-white/10 focus-within:border-[#bc13fe] transition-all">
                  <Music className="w-6 h-6 text-[#bc13fe]" />
                  <input 
                    type="text" 
                    placeholder="Spotify Linkini Buraya Yapıştır..." 
                    className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-white/20"
                    onChange={(e) => handleSpotifyLink(e.target.value)}
                  />
                </div>

                <iframe 
                  style={{ borderRadius: '32px' }}
                  src={`https://open.spotify.com/embed/${spotifyConfig.type}/${spotifyConfig.id}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>
              
              <div 
                className={`group relative h-[550px] p-[2px] rounded-[5rem] cursor-pointer transition-all active:scale-95 bg-gradient-to-br from-yellow-400 via-[#bc13fe] to-red-500 ${isZirvaPlaying ? 'ring-4 ring-yellow-400 ring-offset-8 ring-offset-[#0f172a]' : 'animate-pulse'}`} 
                onClick={playZirva}
              >
                <div className="h-full w-full bg-[#0f172a] rounded-[calc(5rem-2px)] flex flex-col items-center justify-center p-12 text-center relative z-10 overflow-hidden">
                  <span className="text-yellow-400 font-black text-base tracking-[0.6em] mb-8 uppercase">Günlük Doz</span>
                  <h2 className="text-8xl font-black italic tracking-tighter mb-12 text-white">ZIRVALAMA!</h2>
                  <div className={`p-12 rounded-full shadow-3xl transition-all duration-300 ${isZirvaPlaying ? 'bg-[#bc13fe] scale-110 shadow-[0_0_50px_#bc13fe]' : 'bg-white/5 border border-white/10 group-hover:bg-[#bc13fe]'}`}>
                    {isZirvaPlaying ? <Pause size={72} fill="white" /> : <Play size={72} fill="white" className="ml-3" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ label, children, color }: { label: string, children: React.ReactNode, color: string }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center h-[250px] shadow-2xl">
    <span className="text-xs font-black uppercase tracking-[0.5em] mb-4" style={{ color }}>{label}</span>
    {children}
  </div>
);

export default Pomodoro;