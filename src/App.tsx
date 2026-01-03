import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";

// Sayfa Importları
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Iletisim from "./pages/Iletisim";
import Pomodoro from "./pages/Pomodoro";
import NotFound from "./pages/NotFound";
import Kvkk from "./pages/Kvkk"; 
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/giris" element={<Auth />} />
              <Route path="/kayit" element={<Auth />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/hizmetler" element={<Services />} />
              <Route path="/iletisim" element={<Iletisim />} />
              <Route path="/sepet" element={<Cart />} />
              <Route path="/panel" element={<Dashboard />} />
              <Route path="/kvkk" element={<Kvkk />} />
              <Route path="/kullanim-kosullari" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Analytics />
          <SpeedInsights /> 
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;