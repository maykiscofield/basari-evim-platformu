import { registerSW } from 'virtual:pwa-register';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Bu satırı ekleyerek PWA kaydını aktif ediyoruz
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(<App />);