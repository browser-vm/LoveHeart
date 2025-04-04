// start the app always with '/' route
import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TooltipProvider } from "./components/ui/tooltip";

import { ThemeProvider } from "./components/layout/theme-provider";
import { EncryptionProvider } from "./contexts/encryption-context";
import { Layout } from "./components/layout/layout";
import "./index.css";
import Index from "./pages";
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";
import Logout from "./pages/logout";
import RedirectPage from "./pages/redirect";
import Settings from "./pages/settings";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <EncryptionProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout><Index /></Layout>} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/signup' element={<SignupForm />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/go/:encryptedUrl' element={<RedirectPage />} />
              <Route path='/settings' element={<Layout><Settings /></Layout>} />
            </Routes>
          </BrowserRouter>
          <Sonner />
          <Toaster />
        </EncryptionProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);