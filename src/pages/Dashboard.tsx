import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BookOpen, Award, TrendingUp, Download, Settings, 
  ChevronRight, Trophy, Target, Clock 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
}

interface UserProgress {
  id: string;
  category: string;
  topic: string;
  progress_value: number;
}

interface UserBadge {
  id: string;
  earned_at: string;
  badge: {
    id: string;
    name: string;
    description: string | null;
    icon: string;
  };
}

interface Purchase {
  id: string;
  is_active: boolean;
  package: {
    id: string;
    name: string;
    package_type: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/giris');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressData) {
        setProgress(progressData);
      }

      // Fetch badges with badge details
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select(`
          id,
          earned_at,
          badge:badges (
            id,
            name,
            description,
            icon
          )
        `)
        .eq('user_id', user.id);

      if (badgesData) {
        setBadges(badgesData as unknown as UserBadge[]);
      }

      // Fetch purchases
      const { data: purchasesData } = await supabase
        .from('user_purchases')
        .select(`
          id,
          is_active,
          package:packages (
            id,
            name,
            package_type
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (purchasesData) {
        setPurchases(purchasesData as unknown as Purchase[]);
      }
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOverallProgress = () => {
    if (progress.length === 0) return 0;
    const total = progress.reduce((sum, p) => sum + p.progress_value, 0);
    return Math.round(total / progress.length);
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Hoş Geldin, <span className="text-primary">{profile?.full_name || 'Öğrenci'}</span>!
          </h1>
          <p className="text-muted-foreground">
            YKS yolculuğundaki ilerlemenizi buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Genel İlerleme</p>
                  <p className="text-2xl font-bold text-primary">%{getOverallProgress()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Kazanılan Rozet</p>
                  <p className="text-2xl font-bold text-gold">{badges.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Paket</p>
                  <p className="text-2xl font-bold">{purchases.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Konu Sayısı</p>
                  <p className="text-2xl font-bold">{progress.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList>
            <TabsTrigger value="progress">İlerleme</TabsTrigger>
            <TabsTrigger value="badges">Rozetler</TabsTrigger>
            <TabsTrigger value="materials">Materyallerim</TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            {progress.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {progress.map((item) => (
                  <Card key={item.id} className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-medium">{item.topic}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <span className="text-sm font-bold text-primary">%{item.progress_value}</span>
                      </div>
                      <Progress value={item.progress_value} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">Henüz ilerleme kaydı yok</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Koçunuz çalışma ilerlemenizi buraya ekleyecek.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-4">
            {badges.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {badges.map((item) => (
                  <Card key={item.id} className="border-border text-center">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center text-3xl">
                        {item.badge.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{item.badge.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.badge.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(item.earned_at).toLocaleDateString('tr-TR')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">Henüz rozet kazanmadınız</h3>
                  <p className="text-sm text-muted-foreground">
                    Hedeflerinize ulaştıkça rozetler kazanacaksınız!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-4">
            {purchases.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {purchases.map((item) => (
                  <Card key={item.id} className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant={item.package.package_type === 'coaching' ? 'default' : 'secondary'} className="mb-2">
                            {item.package.package_type === 'coaching' ? 'Koçluk' : 'Materyal'}
                          </Badge>
                          <h3 className="font-medium">{item.package.name}</h3>
                        </div>
                        {item.package.package_type === 'material' && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            İndir
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">Henüz satın aldığınız paket yok</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Hizmetlerimizi keşfedin ve YKS yolculuğunuza başlayın.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-primary to-purple-light">
                    <Link to="/hizmetler">
                      Hizmetleri Keşfet
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
