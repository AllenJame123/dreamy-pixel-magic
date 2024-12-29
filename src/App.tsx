import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import LogoGenerator from "./pages/LogoGenerator";
import FaviconGenerator from "./pages/FaviconGenerator";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/logo-generator" element={<LogoGenerator />} />
            <Route path="/favicon-generator" element={<FaviconGenerator />} />
            <Route path="/:slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;