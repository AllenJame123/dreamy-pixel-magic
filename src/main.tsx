import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { supabase } from './integrations/supabase/client';

// Make supabase available in console for debugging
declare global {
  interface Window {
    supabase: typeof supabase;
  }
}

if (import.meta.env.DEV) {
  window.supabase = supabase;
}

createRoot(document.getElementById("root")!).render(<App />);