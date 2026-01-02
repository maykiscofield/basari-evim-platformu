import React, { useEffect, useState, useCallback, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Play, Pause, RotateCcw, X, TrendingUp, Trophy, Crown, Zap } from "lucide-react"; 
import { Button } from '@/components/ui/button'; 
import { supabase } from '@/integrations/supabase/client'; 
import { toast } from "sonner"; 
import confetti from 'canvas-confetti';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(300);
  const [isZirvaPlaying, setIsZirvaPlaying] = useState(false);
  const [rastgeleSoz, setRastgeleSoz] = useState("");
  const [isLegendary, setIsLegendary] = useState(false); 
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const playlistId = '7DaKTQA8ETlVUUKMRcSmK6';

  const celalSozleri = [
    "Zırvalama, ders çalış!", "Bilgi güçtür, gerisi safsatadır.", 
    "Senin cahilliğin benim yaşamımı etkiliyor!", "Okumayan adam cahil kalır!"
  ];

  useEffect(() => {
    successAudioRef.current = new Audio('/applepay.mp3');
    const storedTotal = localStorage.getItem('totalWorkMinutes');
    if (storedTotal) setTotalWorkMinutes(parseInt(storedTotal));
  }, []);

  // --- ULTRA MODERN NEON BİLDİRİM (TAMAMEN YENİLENDİ) ---
  const showAdvancedXPToast = (puan: number, oldPercent: number, newPercent: number, legendary: boolean) => {
    toast.custom((t: any) => (
      <div className={`relative group overflow-hidden bg-[#0a0f1e]/95 backdrop-blur-3xl border-[3px] p-1.5 rounded-[3rem] transition-all duration-700 max-w-[600px] w-full pointer-events-auto
        ${legendary
          ? 'border-yellow-500/80 shadow-[0_0_80px_rgba(251,191,36,0.5),_inset_0_0_30px_rgba(251,191,36,0.2)]'
          : 'border-[#bc13fe]/80 shadow-[0_0_80px_rgba(188,19,254,0.5),_inset_0_0_30px_rgba(188,19,254,0.2)]'
        }
        ${t.visible ? 'animate-in fade-in slide-in-from-bottom-10 zoom-in-95' : 'animate-out fade-out zoom-out-95 duration-500'}`}>
        
        {/* Hareketli Arka Plan Işıkları */}
        <div className={`absolute -top-20 -left-20 w-60 h-60 rounded-full blur-[120px] opacity-40 animate-pulse ${legendary ? 'bg-yellow-600' : 'bg-[#bc13fe]'}`}></div>
        <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-[120px] opacity-40 animate-pulse ${legendary ? 'bg-orange-600' : 'bg-blue-600'}`}></div>

        <div className="relative z-10 p-8 flex items-center gap-10 text-left">
          {/* Sol: Dev İkon Alanı */}
          <div className="flex-shrink-0 relative">
            <div className={`absolute inset-0 blur-3xl opacity-70 animate-pulse ${legendary ? 'bg-yellow-500' : 'bg-[#bc13fe]'}`}></div>
            <div className={`p-6 rounded-[2rem] relative z-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br ${legendary ? 'from-yellow-400 via-amber-500 to-orange-600' : 'from-[#bc13fe] via-purple-500 to-blue-600'}`}>
              {legendary ? <Crown className="w-14 h-14 text-white drop-shadow-lg" /> : <Trophy className="w-14 h-14 text-white drop-shadow-lg" />}
            </div>
          </div>

          {/* Sağ: Devasa XP ve İlerleme */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <Zap className={`w-6 h-6 animate-pulse ${legendary ? 'text-yellow-400' : 'text-[#bc13fe]'}`} />
              <h3 className="text-sm font-black text-white italic tracking-[0.3em] uppercase opacity-90">
                {legendary ? 'EFSANEVİ BAŞARI!' : 'İLERLEME KAYDEDİLDİ'}
              </h3>
            </div>
            
            <div className="flex items-center gap-8">
              {/* DEVASA XP SAYISI */}
              <span className={`text-8xl font-black whitespace-nowrap leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b 
                ${legendary ? 'from-yellow-300 to-amber-600 drop-shadow-[0_0_30px_#fbbf24]' : 'from-white to-[#bc13fe] drop-shadow-[0_0_30px_#bc13fe]'}`}>
                +{puan}
              </span>
              
              <div className="flex flex-col justify-center flex-1">
                <span className="text-white font-black text-3xl italic leading-none mb-3">XP</span>
                {/* RÜTBE İLERLEME ÇUBUĞU */}
                <div className="relative h-6 bg-black/50 rounded-full border border-white/10 overflow-hidden shadow-inner min-w-[180px]">
                  <div className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out
                    ${legendary ? 'bg-gradient-to-r from-yellow-400 to-amber-600' : 'bg-gradient-to-r from-[#bc13fe] to-blue-600'}`}
                    style={{ width: `${newPercent}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-shine"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-black uppercase tracking-widest text-white z-10">
                    <span>% {oldPercent}</span>
                    <span>→</span>
                    <span>% {newPercent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => toast.dismiss(t)} className="flex-shrink-0 self-start -mt-2 -mr-2 p-2 text-white/50 hover:text-white transition-all rounded-full hover:bg-white/10">
            <X size={28} />
          </button>
        </div>
      </div>
    ), { duration: 8000, position: 'bottom-right' });
  };

  const saveSessionToSupabase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: sessions } = await (supabase as any).from('pomodoro_sessions').select('score').eq('user_id', user.id);
      const totalScoreOld = sessions?.reduce((sum: number, s: any) => sum + s.score, 0) || 0;
      const oldPercent = Math.floor((totalScoreOld / 2500) * 100);

      await (supabase as any).from('pomodoro_sessions').insert([{ 
        user_id: user.id, first_name: user.user_metadata?.full_name?.split(" ")[0] || "Öğrenci", score: 25, status: 'Tamamlandı' 
      }]);

      const newPercent = Math.floor(((totalScoreOld + 25) / 2500) * 100);
      const legendary = (totalScoreOld + 25) >= 2500;
      setIsLegendary(legendary);
      showAdvancedXPToast(25, oldPercent, newPercent, legendary);
      successAudioRef.current?.play().catch(() => {});
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: legendary ? ['#fbbf24', '#f59e0b', '#ffffff'] : ['#bc13fe', '#00d4ff', '#ffffff'] });
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    let interval: any = null;
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
      setTimeLeft(nextIsBreak ? 5 * 60 : 25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const playZirva = useCallback(() => {
    const audio = new Audio('/zirva.mp3');
    if (isZirvaPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsZirvaPlaying(false);
      return;
    }
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
          <h1 className="text-7xl font-black mb-16 tracking-tighter italic uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {isBreak ? 'MOLA' : 'ODAKLANMA'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center h-[220px] shadow-2xl">
              <span className={`${isLegendary ? 'text-yellow-500' : 'text-[#bc13fe]'} text-[10px] font-black uppercase tracking-[0.4em] mb-4`}>Odaklanma</span>
              <div className="text-6xl font-black italic">{Math.floor(totalWorkMinutes / 60)}<span className="text-xl opacity-40 ml-1">sa</span> : {totalWorkMinutes % 60}<span className="text-xl opacity-40 ml-1">dk</span></div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center h-[220px] shadow-2xl">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Günlük Hedef</span>
              <div className="flex items-center justify-center">
                <input type="number" value={targetMinutes} onChange={(e) => setTargetMinutes(parseInt(e.target.value) || 0)} className="bg-transparent text-6xl font-black text-center w-32 outline-none border-b-2 border-white/10 focus:border-[#bc13fe] transition-all" />
                <span className="text-2xl opacity-40 font-bold ml-2 mt-4">dk</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center h-[220px] shadow-2xl">
              <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Başarı Oranı</span>
              <div className="text-6xl font-black mb-6">%{Math.min(Math.round((totalWorkMinutes / targetMinutes) * 100), 100)}</div>
              <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${isLegendary ? 'bg-gradient-to-r from-yellow-400 to-amber-600 shadow-[0_0_15px_#fbbf24]' : 'bg-gradient-to-r from-[#bc13fe] to-pink-500 shadow-[0_0_15px_#bc13fe]'}`} style={{ width: `${Math.min((totalWorkMinutes/targetMinutes)*100, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-10 text-left">
              <div className="bg-white/5 backdrop-blur-xl rounded-[3.5rem] p-1 border border-white/10 h-[550px] overflow-hidden shadow-2xl relative group">
                <img src="/celal.jpg" alt="Celal" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-10 text-center text-yellow-400 font-bold text-2xl italic leading-tight">"Bilgi güçtür, gerisi safsatadır."</div>
              </div>
              <div className="bg-[#0f172a] rounded-[4.5rem] p-12 border border-white/5 shadow-2xl flex flex-col items-center">
                <div className="text-[12rem] font-mono font-black italic tracking-tighter leading-none mb-12 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-6 w-full px-4">
                  <Button onClick={() => setIsActive(!isActive)} className={`flex-[3] py-14 rounded-[2.5rem] font-black text-4xl uppercase tracking-wider transition-all duration-300 border-2 relative overflow-hidden group/btn ${isLegendary ? 'bg-gradient-to-br from-yellow-400 to-amber-600 border-yellow-300 text-black shadow-[0_0_40px_#fbbf2499]' : 'bg-gradient-to-br from-[#bc13fe] to-[#8a2be2] border-[#d946ef] text-white shadow-[0_0_40px_#bc13fe99]'}`}>
                    <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      {isActive ? <Pause size={44} className="mr-4" /> : <Play size={44} className="mr-4 fill-current" />}
                      {isActive ? 'DURAKLAT' : 'ODAKLAN'}
                    </div>
                  </Button>
                  <Button onClick={() => {setIsActive(false); setTimeLeft(25*60);}} className={`flex-1 py-14 rounded-[2.5rem] border-2 bg-white/5 hover:bg-white/10 group/reset ${isLegendary ? 'border-yellow-500/50 text-yellow-500' : 'border-[#bc13fe]/50 text-[#bc13fe]'}`}>
                    <RotateCcw size={44} className="group-hover/reset:-rotate-90 transition-transform duration-500" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="bg-black/40 backdrop-blur-md rounded-[3.5rem] h-[550px] overflow-hidden border border-white/5 shadow-2xl">
                <iframe src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} width="100%" height="100%" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
              </div>
              <div className={`group relative h-[450px] p-[2px] rounded-[4rem] cursor-pointer transition-all active:scale-95 ${isLegendary ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-gradient-to-br from-yellow-400 via-[#bc13fe] to-red-500 animate-pulse'}`} onClick={playZirva}>
                <div className="h-full w-full bg-[#0f172a] rounded-[calc(4rem-2px)] flex flex-col items-center justify-center p-12 text-center relative z-10 overflow-hidden">
                  <span className="text-yellow-400 font-black text-sm tracking-[0.5em] mb-6 uppercase">Günlük Doz</span>
                  <h2 className="text-7xl font-black italic tracking-tighter mb-10">ZIRVALAMA!</h2>
                  <div className={`p-10 rounded-full transition-all duration-500 shadow-2xl bg-white/5 border border-white/10 ${isLegendary ? 'group-hover:bg-yellow-500 group-hover:text-black' : 'group-hover:bg-[#bc13fe]'}`}>
                    <Play size={64} fill="white" className="ml-2" />
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

export default Pomodoro;