import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "non.geist";
import "./index.css";
//import App from "./app";

import Editor from "./features/editor";

import { TooltipProvider } from "./components/ui/tooltip";
import IndexDashboard from "./pages/IndexDashboard";
import { DashboardOverview } from "./components/DashboardOverview";
import { ShopifyConnect } from "./components/ShopifyConnect";
import { ProductExplorer } from "./components/ProductExplorer";
import { CompetitorInsights } from "./components/CompetitorInsights";
import { AdStudio } from "./components/AdStudio";
import { SavedProjects } from "./components/SavedProjects";
import ImageEditor from "./components/editor/editor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AiImageEditor from "./pages/AiImageEditor";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/editor" element={<Editor />} />
              <Route path="/image-editor" element={<ImageEditor />} />
              <Route path="/ai-image-editor" element={<AiImageEditor />} />
              <Route path="/dashboard" element={<IndexDashboard />}>
                <Route index element={<DashboardOverview />} />
                <Route path="shopify-connect" element={<ShopifyConnect />} />
                <Route path="product-explorer" element={<ProductExplorer />} />
                <Route
                  path="competitor-insight"
                  element={<CompetitorInsights />}
                />
                <Route path="ad-studio" element={<AdStudio />} />
                <Route path="saved-project" element={<SavedProjects />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);


