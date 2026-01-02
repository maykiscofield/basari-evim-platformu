import { useEffect, useState, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface WeeklyChartProps {
  isLegendary?: boolean;
}

const WeeklyChart = ({ isLegendary }: WeeklyChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const themeColor = isLegendary ? '#fbbf24' : '#bc13fe';

  const fetchWeeklyData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: sessions } = await supabase
      .from('pomodoro_sessions' as any)
      .select('created_at, score')
      .eq('user_id', user.id);

    if (sessions) {
      const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
      const chartMap: any = {};
      
      sessions.forEach((s: any) => {
        const dayName = days[new Date(s.created_at).getDay()];
        chartMap[dayName] = (chartMap[dayName] || 0) + s.score;
      });

      const formattedData = days.map(day => ({
        name: day,
        puan: chartMap[day] || 0
      }));
      
      setData(formattedData);
    }
  }, []);

  useEffect(() => {
    fetchWeeklyData();

    // Grafiği anlık güncellemek için dinleyici (Real-time)
    const channel = supabase
      .channel('chart-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pomodoro_sessions' }, 
      () => fetchWeeklyData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchWeeklyData]);

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPuan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={themeColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: `1px solid ${themeColor}`, borderRadius: '12px' }}
            itemStyle={{ color: themeColor }}
          />
          <Area type="monotone" dataKey="puan" stroke={themeColor} strokeWidth={4} fillOpacity={1} fill="url(#colorPuan)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;