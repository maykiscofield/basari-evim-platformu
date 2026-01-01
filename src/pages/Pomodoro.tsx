import React, { useEffect, useState, useCallback, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Play, Pause, RotateCcw, Square } from "lucide-react"; 

const Pomodoro = () => {
  // --- STATE'LER ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(300);
  const [isZirvaPlaying, setIsZirvaPlaying] = useState(false);
  const [rastgeleSoz, setRastgeleSoz] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistId = '7DaKTQA8ETlVUUKMRcSmK6';

  const celalSozleri = [
    "Zırvalama, ders çalış!",
    "Bilgi güçtür, gerisi safsatadır.",
    "Cehalet mazeret değildir, odaklan!",
    "Masa başında zırvalanmaz, öğrenilir.",
    "Senin cahilliğin benim yaşamımı etkiliyor!",
    "Okumayan adam cahil kalır, dersine dön!"
  ];

  useEffect(() => {
    setRastgeleSoz(celalSozleri[Math.floor(Math.random() * celalSozleri.length)]);
    const storedTotal = localStorage.getItem('totalWorkMinutes');
    if (storedTotal) setTotalWorkMinutes(parseInt(storedTotal));
  }, []);

  // --- SES FONKSİYONU (DURDURMA DESTEKLİ) ---
  const playZirva = useCallback(() => {
    if (isZirvaPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsZirvaPlaying(false);
      return;
    }

    const audioUrl = `${window.location.origin}/zirva.mp3?v=${new Date().getTime()}`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    setIsZirvaPlaying(true);
    audio.play().catch(() => setIsZirvaPlaying(false));
    audio.onended = () => setIsZirvaPlaying(false);
  }, [isZirvaPlaying]);

  // --- SAYAÇ MANTIĞI ---
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
      setIsBreak(!isBreak);
      setTimeLeft(!isBreak ? 5 * 60 : 25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(Math.round((totalWorkMinutes / targetMinutes) * 100), 100);

  return (
    <Layout>
      <div className={`min-h-screen transition-all duration-1000 flex flex-col items-center py-12 px-4 relative overflow-hidden ${isBreak ? 'bg-slate-950' : 'bg-[#0f172a]'}`}>
        
        {/* Neon Glow Arka Plan Efektleri */}
        <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse ${isBreak ? 'bg-emerald-500' : 'bg-purple-600'}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse ${isBreak ? 'bg-cyan-500' : 'bg-blue-600'}`}></div>

        <div className="max-w-7xl w-full relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-black mb-8 tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] uppercase italic">
              {isBreak ? 'MOLA ZAMANI' : 'ODAKLANMA'}
            </h1>
            
            {/* İstatistik Panelleri */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center min-h-[200px]">
                 <span className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-4 text-center">Odaklanma</span>
                 <div className="text-center text-white italic">
                   <span className="text-6xl font-black">{Math.floor(totalWorkMinutes / 60)}</span><span className="text-xl opacity-50">sa</span>
                   <span className="mx-2 text-4xl opacity-30">:</span>
                   <span className="text-6xl font-black">{totalWorkMinutes % 60}</span><span className="text-xl opacity-50">dk</span>
                 </div>
               </div>
               
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center min-h-[200px]">
                 <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-4 text-center">Günlük Hedef</span>
                 <div className="flex items-center justify-center gap-2">
                   <input type="number" value={targetMinutes} onChange={(e) => setTargetMinutes(parseInt(e.target.value) || 0)} className="bg-transparent w-32 text-center text-6xl font-black text-white outline-none border-b-2 border-white/20 focus:border-blue-500 transition-colors" />
                   <span className="text-2xl text-white/40 font-bold mt-4">dk</span>
                 </div>
               </div>

               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center min-h-[200px]">
                 <span className="text-pink-400 text-xs font-black uppercase tracking-[0.3em] mb-4 text-center">Başarı Oranı</span>
                 <div className="text-center">
                   <span className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">%{progressPercent}</span>
                 </div>
                 <div className="w-full bg-white/10 h-4 rounded-full mt-6 overflow-hidden">
                   <div className={`h-full rounded-full bg-gradient-to-r ${isBreak ? 'from-emerald-400 to-cyan-400' : 'from-pink-600 to-purple-500'}`} style={{ width: `${progressPercent}%` }} />
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* SOL SÜTUN */}
            <div className="flex flex-col gap-10">
              <div className="p-1 rounded-[3rem] bg-gradient-to-b from-purple-500/50 to-transparent shadow-2xl h-[550px]">
                <div className="bg-[#0f172a] p-4 rounded-[2.9rem] overflow-hidden h-full">
                  <div className="relative h-full rounded-[2rem] overflow-hidden bg-slate-900 group">
                    <img src={isActive ? "/celal-hoca-gulen.jpg" : "/celal.jpg"} alt="Celal Şengör" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-center">
                        <p className="text-yellow-400 font-bold text-xl italic drop-shadow-md">{rastgeleSoz}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MODERN NEON SAYAÇ */}
              <div className={`relative p-[3px] rounded-[3.5rem] h-[400px] transition-all duration-700 bg-gradient-to-br ${isActive ? 'from-rose-500 via-purple-500 to-blue-500 animate-pulse' : 'from-slate-700 to-slate-800'}`}>
                <div className="bg-[#0f172a] h-full w-full rounded-[3.3rem] flex flex-col items-center justify-center relative z-10 overflow-hidden">
                  <div className={`text-[10rem] leading-none font-mono font-black italic tracking-tighter mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-white`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex gap-6 w-full px-12">
                    <button onClick={() => setIsActive(!isActive)} className={`flex-[3] py-8 rounded-3xl font-black text-2xl uppercase transition-all transform active:scale-95 flex items-center justify-center gap-4 ${isActive ? 'bg-rose-600 text-white shadow-rose-900/50' : 'bg-white text-slate-950'}`}>
                      {isActive ? <Pause size={28}/> : <Play size={28}/>} {isActive ? 'DURAKLAT' : 'ODAKLAN'}
                    </button>
                    <button onClick={() => { setIsActive(false); setTimeLeft(25*60); }} className="flex-1 py-8 bg-white/5 text-white rounded-3xl font-bold border border-white/10 hover:bg-white/10 flex items-center justify-center">
                      <RotateCcw size={32} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SAĞ SÜTUN */}
            <div className="flex flex-col gap-10">
              {/* SPOTIFY PANELI (Düzeltildi) */}
              <div className="bg-slate-950/50 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 p-8 flex flex-col h-[550px] backdrop-blur-xl">
                <div className="flex-1 rounded-[2.5rem] overflow-hidden bg-black border border-white/5 shadow-2xl">
                  <iframe 
                    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  ></iframe>
                </div>
              </div>

              {/* GÜNLÜK DOZ (Ses Durdurma Özellikli) */}
              <div 
                className={`group relative overflow-hidden p-[2px] rounded-[3.5rem] transition-all duration-500 h-[400px] flex items-center
                  ${isZirvaPlaying ? 'bg-gradient-to-br from-red-600 via-rose-700 to-red-900' : 'bg-gradient-to-br from-yellow-500 via-orange-600 to-red-600 shadow-[0_0_40px_rgba(234,179,8,0.2)] cursor-pointer active:scale-95'}`}
                onClick={playZirva}
              >
                <div className={`h-full w-full backdrop-blur-3xl p-10 rounded-[calc(3.5rem-2px)] flex flex-col items-center justify-center border border-white/5 text-center relative overflow-hidden transition-colors duration-500
                  ${isZirvaPlaying ? 'bg-red-950/40' : 'bg-[#0f172a]/95'}`}>
                  
                  <span className={`text-xs font-black uppercase tracking-[0.4em] mb-4 relative z-10 w-full block
                    ${isZirvaPlaying ? 'text-red-400 animate-pulse' : 'text-yellow-500'}`}>
                    {isZirvaPlaying ? 'CELAL HOCA KONUŞUYOR...' : 'GÜNLÜK DOZ'}
                  </span>
                  
                  <div className="relative z-10 space-y-4">
                    <h2 className={`text-6xl font-black italic tracking-tighter transition-all duration-500 ${isZirvaPlaying ? 'text-red-200' : 'text-white'}`}>ZIRVALAMA!</h2>
                    <div className={`h-1 mx-auto rounded-full transition-all duration-500 ${isZirvaPlaying ? 'w-48 bg-red-500' : 'w-16 bg-yellow-500 group-hover:w-32'}`} />
                  </div>

                  <div className={`mt-8 p-6 rounded-full border transition-all duration-500
                    ${isZirvaPlaying ? 'bg-red-600 border-red-400 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)]' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-[#0f172a]'}`}>
                    {isZirvaPlaying ? <Square size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" />}
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