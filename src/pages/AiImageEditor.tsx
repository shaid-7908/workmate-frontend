//A basic recat page for the ai image editor
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import AiImageSidebar, { AiImageTool } from "@/components/AiImageSidebar";
import EditorCanvas512 from "@/components/ai-image/EditorCanvas512";
import PreviewBox from "@/components/ai-image/PreviewBox";
import AiProductPanel from "@/components/ai-image/AiProductPanel";

const AiImageEditor = () => {
  const [activeTab, setActiveTab] = useState("image-editor");
  const [activeTool, setActiveTool] = useState<AiImageTool>("generate");
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return window.innerWidth < 1024;
  });

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isCollapsed) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative flex">
        {/* Left icon sidebar */}
        <div className="fixed left-0 top-0 z-50 h-full w-16 border-r border-gray-800 bg-gray-950/90 shadow-xl backdrop-blur-xl">
          <AiImageSidebar active={activeTool} onChange={setActiveTool} />
        </div>

        {/* Main content */}
        <div
          className={cn(
            "min-h-screen flex-1 transition-all duration-300",
            isCollapsed ? "lg:ml-16" : "lg:ml-16",
          )}
        >
          {/* Mobile header with toggle */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-800 bg-gray-900/80 p-4 backdrop-blur-xl lg:hidden">
            <button
              onClick={handleToggle}
              className="rounded-lg p-2 text-gray-200 transition-colors hover:bg-gray-800/80"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="font-semibold text-gray-100">AdCraft</span>
            </div>
          </div>

          {/* Content area matching the screenshot: left control panel + right canvas */}
          <div className="flex gap-6 p-4 pt-4 lg:p-8 lg:pt-8">
            {/* Left panel switches by active tool */}
            {activeTool === "generate" && (
              <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900/60 p-4 shadow-lg">
                <h2 className="text-lg font-semibold text-gray-100">Generate Photoshoot</h2>

                <div className="mt-4 space-y-3">
                  <textarea
                    className="h-20 w-full resize-none rounded-md border border-gray-800 bg-gray-950/60 p-3 text-gray-100 placeholder-gray-400 outline-none focus:border-purple-600"
                    placeholder="a yellow container with cherries, in front of a golden brown and yellow background"
                  />
                  <button className="w-full rounded-md bg-lime-400 px-4 py-2 font-semibold text-gray-900 transition hover:bg-lime-300">
                    Generate
                  </button>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Real-Time Generation</span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-lime-400 peer-checked:after:translate-x-5" />
                    </label>
                  </div>

                  <div className="mt-2 grid grid-cols-2 rounded-lg border border-gray-800 bg-gray-950/60 text-sm text-gray-300">
                    <button className="rounded-l-lg bg-gray-900/60 px-3 py-2 font-medium text-gray-100">Templates</button>
                    <button className="rounded-r-lg px-3 py-2 hover:bg-gray-900/40">Prompt Builder</button>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Recently Used</span>
                      <button className="text-xs text-gray-400 hover:text-gray-200">View all</button>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-700 bg-gray-950/40 text-gray-500">+</div>
                      <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-700 bg-gray-950/40 text-gray-500">View All</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-sm text-gray-300">Select a template below.</span>
                    <div className="mt-2">
                      <input
                        placeholder="Search by keyword ('flowers', 'sunset', etc)"
                        className="w-full rounded-md border border-gray-800 bg-gray-950/60 p-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-400">Merchandise</div>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className="h-24 rounded-md bg-gray-800/40 ring-1 ring-gray-800" />
                        <div className="h-24 rounded-md bg-gray-800/40 ring-1 ring-gray-800" />
                        <div className="h-24 rounded-md bg-gray-800/40 ring-1 ring-gray-800" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-400">Clean</div>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className="h-24 rounded-md bg-gray-800/40 ring-1 ring-gray-800" />
                        <div className="h-24 rounded-md bg-gray-800/40 ring-1 ring-gray-800" />
                        <div className="h-24 rounded-md bg-gray-800/40 ring-1 ring-gray-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTool === "products" && (
              <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900/60 p-4 shadow-lg">
                <h2 className="text-lg font-semibold text-gray-100">Add Products</h2>
                <AiProductPanel />
              </div>
            )}

            {/* Canvas area */}
            <div className="flex min-h-[560px] flex-1 flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/40 p-4 shadow-lg">
              <div className="">
                <EditorCanvas512 className="flex items-start justify-center" />
                
              </div>
              <div className="flex items-center gap-2 self-end">
                <button className="inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-950/70 px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-900">
                  Save
                </button>
                <button className="inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-950/70 px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-900">
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiImageEditor;
