import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, TrendingUp, Star, Trophy, Crown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import SuccessTable from '@/components/SuccessTable';
import WeeklyChart from '@/components/WeeklyChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- EFSANEVİ MOD KONTROLÜ ---
  const isLegendary = totalScore >= 2500;
  const themeColor = isLegendary ? '#fbbf24' : '#bc13fe'; // Altın vs Mor

  useEffect(() => {
    if (!authLoading && !user) navigate('/giris');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();

      // --- 2. İSTEK: REAL-TIME (ANLIK) GÜNCELLEME ---
      const channel = supabase
        .channel('dashboard-updates')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'pomodoro_sessions', filter: `user_id=eq.${user.id}` },
          () => {
            console.log('Puan artışı algılandı!');
            fetchDashboardData(); // Sayfayı yenilemeden verileri tekrar çeker
          }
        )
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      const { data: sessions } = await (supabase as any).from('pomodoro_sessions').select('score').eq('user_id', user.id);
      setProfile(prof);
      setTotalScore(sessions?.reduce((sum: number, s: any) => sum + s.score, 0) || 0);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  if (authLoading || loading) return (
    <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div></Layout>
  );

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 transition-all duration-1000 ${isLegendary ? 'bg-[#0f0a00]' : ''}`}>
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white text-left">
              Hoş Geldin, <span style={{ color: themeColor }}>{profile?.full_name || 'Öğrenci'}</span>!
              {isLegendary && <Crown className="inline-block ml-3 text-yellow-500 animate-bounce" size={28} />}
            </h1>
            <p className="text-muted-foreground italic tracking-tight">"Bilgi güçtür, gerisi safsatadır."</p>
          </div>
          {isLegendary && <div className="bg-yellow-500/10 border border-yellow-500/50 px-4 py-1 rounded-full text-[10px] font-black text-yellow-500 animate-pulse tracking-widest">EFSANEVİ MOD</div>}
        </div>

        {/* Rütbe Kartı - Dinamik Renk */}
        <Card className={`mb-8 transition-all duration-1000 border-2 ${isLegendary ? 'border-yellow-500/40 shadow-[0_0_30px_rgba(251,191,36,0.1)]' : 'border-[#bc13fe]/30'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2 text-white">
              <Award className="w-5 h-5 animate-pulse" style={{ color: themeColor }} />
              Celal Şengör Rütbe Yolculuğu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>{totalScore} Puan</span>
                <span>Hedef: 2500 Puan</span>
              </div>
              <Progress 
                value={Math.min((totalScore / 2500) * 100, 100)} 
                className="h-3 bg-slate-800" 
                style={{ '--progress-foreground': themeColor } as any} 
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="success" className="space-y-6">
          <TabsList className="bg-background/50 border border-border text-white">
            <TabsTrigger value="success">Başarı Tablosu</TabsTrigger>
          </TabsList>
          <TabsContent value="success" className="space-y-6">
            <Card className="bg-card/50 border-border">
              <CardHeader><CardTitle className="text-white flex items-center gap-2"><TrendingUp className="w-5 h-5" style={{ color: themeColor }} /> Performans Analizi</CardTitle></CardHeader>
              <CardContent><WeeklyChart isLegendary={isLegendary} /></CardContent>
            </Card>
            <Card className="bg-card/50 border-border"><CardContent className="pt-6"><SuccessTable /></CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;