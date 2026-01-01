import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../layout/Layout';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const Pomodoro = () => {
  // --- SÖZLER ---
  const celalSozleri = [
    "Zırvalama, ders çalış!",
    "Bilgi güçtür, gerisi safsatadır.",
    "Cehalet mazeret değildir, odaklan!",
    "Masa başında zırvalanmaz, öğrenilir.",
    "Senin cahilliğin benim yaşamımı etkiliyor!",
    "Okumayan adam cahil kalır, dersine dön!"
  ];

  // --- STATE'LER ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [rastgeleSoz, setRastgeleSoz] = useState("");
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(300);

  const playlistId = '7DaKTQA8ETlVUUKMRcSmK6';

  // SES ÇALMA FONKSİYONU: Kesin Çözüm
  const playZirva = useCallback(() => {
    try {
      // Tarayıcıya dosyanın tam web adresini veriyoruz (Hataları önlemek için en güvenli yol)
      const audioPath = window.location.origin + "/zirva.mp3"; 
      const audio = new Audio(audioPath);
      
      audio.load(); // Sesi ön yükle
      audio.currentTime = 0; // Başa sar
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Ses çalma hatası (Tarayıcı engeli olabilir):", error);
        });
      }
    } catch (err) {
      console.error("Audio objesi oluşturulamadı:", err);
    }
  }, []);

  useEffect(() => {
    setRastgeleSoz(celalSozleri[Math.floor(Math.random() * celalSozleri.length)]);
    const storedTotal = localStorage.getItem('totalWorkMinutes');
    if (storedTotal) setTotalWorkMinutes(parseInt(storedTotal));
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (!isBreak && timeLeft % 60 === 0 && timeLeft !== 25 * 60) {
          setTotalWorkMinutes(prev => {
            const newVal = prev + 1;
            localStorage.setItem('totalWorkMinutes', newVal.toString());
            return newVal;
          });
        }
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const nextModeIsBreak = !isBreak;
      setIsBreak(nextModeIsBreak);
      setTimeLeft(nextModeIsBreak ? 5 * 60 : 25 * 60);
      playZirva(); // Süre bitince uyarı çalar
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, playZirva]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(Math.round((totalWorkMinutes / targetMinutes) * 100), 100);

  return (
    <Layout>
      <div className={`min-h-screen transition-all duration-1000 flex flex-col items-center py-12 px-4 relative overflow-hidden ${isBreak ? 'bg-slate-950' : 'bg-[#0f172a]'}`}>
        
        {/* Glow Efektleri */}
        <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse ${isBreak ? 'bg-emerald-500' : 'bg-purple-600'}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse ${isBreak ? 'bg-cyan-500' : 'bg-blue-600'}`}></div>

        <div className="max-w-7xl w-full relative z-10">
          <div className="text-center mb-16 text-white uppercase italic">
            <h1 className="text-7xl font-black mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {isBreak ? 'MOLA ZAMANI' : 'ODAKLANMA'}
            </h1>

            {/* İSTATİSTİK PANELLERİ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] min-h-[250px] flex flex-col justify-center">
                <div className="flex items-center justify-between mb-6 text-purple-400 text-xs font-black tracking-[0.3em]">
                  <span>Odaklanma Süresi</span>
                  <div className="h-3 w-3 rounded-full bg-purple-500 animate-ping" />
                </div>
                <div className="flex items-center justify-center gap-6 text-white italic">
                   <div className="flex flex-col items-center">
                     <span className="text-7xl md:text-8xl font-black">{Math.floor(totalWorkMinutes / 60)}</span>
                     <span className="text-[10px] opacity-60 uppercase">Saat</span>
                   </div>
                   <div className="text-5xl font-black text-purple-500/30 self-start mt-2">:</div>
                   <div className="flex flex-col items-center">
                     <span className="text-7xl md:text-8xl font-black">{totalWorkMinutes % 60}</span>
                     <span className="text-[10px] opacity-60 uppercase">Dakika</span>
                   </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] min-h-[250px] flex flex-col justify-center">
                <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-8 block text-center">Günlük Hedef</span>
                <div className="flex items-center justify-center gap-4 text-white">
                  <input type="number" value={targetMinutes} onChange={(e) => setTargetMinutes(parseInt(e.target.value) || 0)} className="bg-transparent w-48 text-center text-8xl font-mono font-black outline-none border-b-4 border-white/10 focus:border-blue-500 transition-colors" />
                  <span className="text-blue-300/40 text-2xl font-black italic mt-8 uppercase">dk</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] min-h-[250px] flex flex-col justify-center">
                <span className="text-pink-400 text-xs font-black uppercase tracking-[0.3em] mb-6 block text-center">Başarı Oranı</span>
                <div className="text-center mb-8 text-white italic">
                  <span className="text-8xl font-black drop-shadow-[0_0_25px_rgba(236,72,153,0.4)]">%{progressPercent}</span>
                </div>
                <div className="w-full bg-white/5 h-6 rounded-full overflow-hidden border border-white/10 p-1">
                  <div className={`h-full rounded-full bg-gradient-to-r transition-all duration-1000 ${isBreak ? 'from-emerald-400 to-cyan-400' : 'from-pink-600 to-purple-500'}`} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* SOL SÜTUN */}
            <div className="flex flex-col gap-10">
              <div className="p-1 rounded-[3rem] bg-gradient-to-b from-purple-500/50 to-transparent shadow-2xl h-[550px]">
                <div className="bg-[#0f172a] p-4 rounded-[2.9rem] overflow-hidden h-full">
                  <div className="relative h-full rounded-[2rem] overflow-hidden bg-slate-900">
                    <img src={isActive ? "/celal-hoca-gulen.jpg" : "/celal.jpg"} alt="Celal Şengör" className="w-full h-full object-cover transition-all duration-1000" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-center">
                        <p className="text-yellow-400 font-bold text-xl italic drop-shadow-md">{rastgeleSoz}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SAYAÇ */}
              <div className="relative group rounded-[3.5rem] bg-slate-900/50 border border-white/10 shadow-2xl overflow-hidden h-[400px] flex items-center justify-center">
                <div className="relative z-10 flex flex-col items-center w-full px-10">
                  <div className={`text-9xl font-mono font-black tracking-tighter mb-10 italic text-white`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex gap-4 w-full">
                    <Button onClick={() => setIsActive(!isActive)} className={`flex-[3] py-10 rounded-2xl font-black text-2xl uppercase tracking-[0.2em] shadow-xl ${isActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white text-slate-950 hover:bg-slate-200'}`}>
                      {isActive ? <Pause className="mr-4 h-8 w-8" /> : <Play className="mr-4 h-8 w-8" />}
                      {isActive ? 'DURAKLAT' : 'ODAKLAN'}
                    </Button>
                    <Button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} variant="outline" className="flex-1 py-10 rounded-2xl border-white/10 hover:bg-white/10 text-white">
                      <RotateCcw className="h-8 w-8 text-white" />
                    </Button>
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 transition-all duration-1000 ${isActive ? 'w-full bg-rose-500' : 'w-0'}`} />
              </div>
            </div>

            {/* SAĞ SÜTUN */}
            <div className="flex flex-col gap-10">
              <div className="bg-slate-950/50 rounded-[3rem] border border-white/10 p-8 flex flex-col h-[550px] backdrop-blur-xl">
                <div className="flex-1 rounded-[2.5rem] overflow-hidden bg-black shadow-2xl">
                  <iframe src={`https://open.spotify.com/embed/playlist/${playlistId}`} width="100%" height="100%" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </div>
              </div>

              {/* GÜNLÜK DOZ (ZIRVALAMA BUTONU) */}
              <div 
                className="group cursor-pointer relative overflow-hidden p-[2px] rounded-[3.5rem] bg-gradient-to-br from-yellow-500 via-orange-600 to-red-600 shadow-[0_0_30px_rgba(234,179,8,0.1)] h-[400px] flex items-center transition-all duration-500 active:scale-95"
                onClick={playZirva}
              >
                <div className="h-full w-full bg-[#0f172a]/95 backdrop-blur-3xl p-10 rounded-[calc(3.5rem-2px)] flex flex-col items-center justify-center border border-white/5 text-center relative overflow-hidden text-white italic">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-white/[0.02] uppercase pointer-events-none">ZIRVA</span>
                  <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.4em] mb-4 relative z-10 w-full block">Günlük Doz</span>
                  <div className="relative z-10 space-y-4">
                    <h2 className="text-6xl font-black tracking-tighter">ZIRVALAMA!</h2>
                    <div className="h-1 w-16 bg-yellow-500 mx-auto rounded-full group-hover:w-32 transition-all duration-500" />
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest text-center">Ders çalışmak yerine hayal kuruyorsan tıkla.</p>
                  </div>
                  <div className="mt-8 p-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-[#0f172a] transition-all">
                    <Play className="h-8 w-8" />
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