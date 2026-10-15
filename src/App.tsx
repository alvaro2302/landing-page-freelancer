import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactSuccess from "./pages/ContactSuccess";
import LegalPage from "./pages/LegalPage";
import ScrollToTop from "./components/ScrollToTop";
import { LEGAL_ROUTES } from "./content/legal";

const queryClient = new QueryClient();

// Redirects an alias URL while keeping its query (e.g. ?lang=es) and hash.
const RedirectTo = ({ to }: { to: string }) => {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact-success" element={<ContactSuccess />} />
          {/* Legal pages: these URLs are linked from the mobile apps, keep them stable */}
          <Route path={LEGAL_ROUTES.terms} element={<LegalPage key="terms" doc="terms" />} />
          <Route path={LEGAL_ROUTES.privacy} element={<LegalPage key="privacy" doc="privacy" />} />
          <Route path="/terms-of-service" element={<RedirectTo to={LEGAL_ROUTES.terms} />} />
          <Route path="/privacy-policy" element={<RedirectTo to={LEGAL_ROUTES.privacy} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
