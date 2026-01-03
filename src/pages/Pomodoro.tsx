import React, { useEffect, useState, useCallback, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Play, Pause, RotateCcw, X, Trophy, Crown, Zap } from "lucide-react"; 
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
    setRastgeleSoz(celalSozleri[Math.floor(Math.random() * celalSozleri.length)]);
  }, []);

  const showAdvancedXPToast = (puan: number, oldPercent: number, newPercent: number, legendary: boolean) => {
    toast.custom((t: any) => (
      <div className={`relative group mb-10 mr-10 overflow-hidden bg-[#0a0f1e]/95 backdrop-blur-3xl border-[3px] p-2 rounded-[3.5rem] transition-all duration-700 max-w-[680px] w-full pointer-events-auto
        ${legendary ? 'border-yellow-500 shadow-[0_0_80px_rgba(251,191,36,0.6)]' : 'border-[#bc13fe] shadow-[0_0_80px_rgba(188,19,254,0.6)]'}
        ${t.visible ? 'animate-in fade-in slide-in-from-bottom-10' : 'animate-out fade-out'}`}>
        <div className="relative z-10 p-10 flex items-center gap-12 text-left">
          <div className="flex-shrink-0 relative">
            <div className={`p-8 rounded-[2.5rem] relative z-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br ${legendary ? 'from-yellow-400 via-amber-500 to-orange-600' : 'from-[#bc13fe] via-purple-500 to-blue-600'}`}>
              {legendary ? <Crown className="w-16 h-16 text-white" /> : <Trophy className="w-16 h-16 text-white" />}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-4">
              <Zap className={`w-8 h-8 animate-pulse ${legendary ? 'text-yellow-400' : 'text-[#bc13fe]'}`} />
              <h3 className="text-base font-black text-white italic tracking-[0.4em] uppercase">{legendary ? 'EFSANEVİ BAŞARI!' : 'İLERLEME KAYDEDİLDİ'}</h3>
            </div>
            <div className="flex items-center gap-10">
              <span className={`text-[9rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${legendary ? 'from-yellow-300 to-amber-600' : 'from-white to-[#bc13fe]'}`}>
                +{puan}
              </span>
              <div className="flex flex-col justify-center flex-1">
                <span className="text-white font-black text-4xl italic leading-none mb-4">XP</span>
                <div className="relative h-8 bg-black/60 rounded-full border-2 border-white/10 overflow-hidden min-w-[240px]">
                  <div className={`absolute inset-y-0 left-0 transition-all duration-1000 ${legendary ? 'bg-gradient-to-r from-yellow-400 to-amber-600' : 'bg-gradient-to-r from-[#bc13fe] to-blue-600'}`} style={{ width: `${newPercent}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-black uppercase tracking-widest text-white z-10">
                    <span>% {oldPercent}</span><span>→</span><span>% {newPercent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => toast.dismiss(t)} className="flex-shrink-0 self-start p-3 text-white/50 hover:text-white transition-all"><X size={32} /></button>
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
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: legendary ? ['#fbbf24', '#ffffff'] : ['#bc13fe', '#ffffff'] });
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
      setRastgeleSoz(celalSozleri[Math.floor(Math.random() * celalSozleri.length)]);
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
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 animate-pulse bg-[#bc13fe]"></div>
        
        <div className="max-w-7xl w-full mx-auto relative z-10 text-white text-center">
          <h1 className="text-8xl font-black mb-16 italic uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">{isBreak ? 'MOLA' : 'ODAKLANMA'}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center h-[250px] shadow-2xl">
              <span className="text-[#bc13fe] text-xs font-black uppercase tracking-[0.5em] mb-4">Odaklanma</span>
              <div className="text-7xl font-black italic">{Math.floor(totalWorkMinutes / 60)}<span className="text-2xl opacity-40 ml-1">sa</span> : {totalWorkMinutes % 60}<span className="text-2xl opacity-40 ml-1">dk</span></div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center h-[250px] shadow-2xl">
              <span className="text-blue-400 text-xs font-black uppercase tracking-[0.5em] mb-4">Günlük Hedef</span>
              <div className="flex items-center justify-center">
                <input type="number" value={targetMinutes} onChange={(e) => setTargetMinutes(parseInt(e.target.value) || 0)} className="bg-transparent text-7xl font-black text-center w-40 outline-none border-b-2 border-white/10" />
                <span className="text-3xl opacity-40 font-bold ml-2 mt-4">dk</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center h-[250px] shadow-2xl">
              <span className="text-pink-400 text-xs font-black uppercase tracking-[0.5em] mb-4">Başarı Oranı</span>
              <div className="text-7xl font-black mb-6">%{Math.min(Math.round((totalWorkMinutes / targetMinutes) * 100), 100)}</div>
              <div className="w-full bg-white/5 h-5 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-1000 bg-gradient-to-r from-[#bc13fe] to-pink-500 shadow-[0_0_20px_#bc13fe]" style={{ width: `${Math.min((totalWorkMinutes/targetMinutes)*100, 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12 text-left">
              <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-1 border border-white/10 h-[600px] overflow-hidden shadow-2xl relative group">
                <img 
                  src={isActive ? "/celal-hoca-gulen.jpg" : "/celal.jpg"} 
                  alt="Celal" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-12 text-center text-yellow-400 font-bold text-3xl italic leading-tight">"{rastgeleSoz}"</div>
              </div>

              <div className="bg-[#0f172a] rounded-[5rem] p-16 border border-white/5 shadow-2xl flex flex-col items-center">
                <div className="text-[14rem] font-mono font-black italic tracking-tighter leading-none mb-16 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-8 w-full px-4">
                  <Button onClick={() => setIsActive(!isActive)} className={`flex-[3] py-16 rounded-[3rem] font-black text-5xl uppercase bg-gradient-to-br from-[#bc13fe] to-[#8a2be2] text-white shadow-[0_0_50px_#bc13fe]`}>
                    {isActive ? <Pause size={56} className="mr-6" /> : <Play size={56} className="mr-6 fill-current" />}
                    {isActive ? 'DURAKLAT' : 'ODAKLAN'}
                  </Button>
                  <Button onClick={() => {setIsActive(false); setTimeLeft(25*60);}} className="flex-1 py-16 rounded-[3rem] border-2 bg-white/5 hover:bg-white/10 text-[#bc13fe] border-[#bc13fe]/50">
                    <RotateCcw size={56} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="bg-black/40 backdrop-blur-md rounded-[4rem] h-[600px] overflow-hidden border border-white/5 shadow-2xl">
                {/* --- SPOTIFY EMBED DÜZELTİLDİ --- */}
                <iframe 
                  style={{ borderRadius: '24px' }}
                  src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>
              <div className={`group relative h-[480px] p-[2px] rounded-[5rem] cursor-pointer transition-all active:scale-95 bg-gradient-to-br from-yellow-400 via-[#bc13fe] to-red-500 animate-pulse`} onClick={playZirva}>
                <div className="h-full w-full bg-[#0f172a] rounded-[calc(5rem-2px)] flex flex-col items-center justify-center p-12 text-center relative z-10 overflow-hidden">
                  <span className="text-yellow-400 font-black text-base tracking-[0.6em] mb-8 uppercase">Günlük Doz</span>
                  <h2 className="text-8xl font-black italic tracking-tighter mb-12 text-white">ZIRVALAMA!</h2>
                  <div className={`p-12 rounded-full shadow-3xl bg-white/5 border border-white/10 group-hover:bg-[#bc13fe]`}>
                    <Play size={72} fill="white" className="ml-3" />
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