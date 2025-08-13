import React from "react";
import {
  Package,
  Wand2,
  Shapes,
  SlidersHorizontal,
  Video,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type AiImageTool = "products" | "generate" | "props" | "edit" | "video";

const navItems: { id: AiImageTool; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "products", label: "Products", icon: Package },
  { id: "generate", label: "Generate", icon: Wand2 },
  { id: "props", label: "Props", icon: Shapes },
  { id: "edit", label: "Edit", icon: SlidersHorizontal },
  { id: "video", label: "Video", icon: Video },
];

interface AiImageSidebarProps {
  active: AiImageTool;
  onChange: (tool: AiImageTool) => void;
}

const AiImageSidebar = ({ active, onChange }: AiImageSidebarProps) => {

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col items-center gap-2 py-4">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChange(id)}
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-md transition-colors " +
                    (isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
                      : "text-gray-300 hover:bg-gray-800/80 hover:text-white")
                  }
                >
                  <Icon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-900 text-gray-100">
                {label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default AiImageSidebar;