// import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import LinkDetail from "./pages/LinkDetail";
// import Signup from "./pages/Signup";
// import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/link/:linkId" element={<LinkDetail />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
