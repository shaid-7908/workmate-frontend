import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "non.geist";
import "./index.css";
//import App from "./app";

import Editor from "./features/editor";

import { TooltipProvider } from "./components/ui/tooltip";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <>
     <h1>

     hello
     </h1>
     </>
    ),
  },
  {
    path: "/editor",
    element: <Editor />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        
      <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);


