import React from "react";
import { cn } from "@/lib/utils";
import {
  Store,
  Search,
  TrendingUp,
  Palette,
  FolderOpen,
  Home,
  FlipHorizontal2,
ImagePlus
} from "lucide-react";
import { Link } from "react-router-dom";

//import { Settings } from "lucide-react";

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    id: "dashboard",
    route: "/dashboard",
  },
  {
    icon: Store,
    label: "Shopify Connect",
    id: "shopify",
    route: "/dashboard/shopify-connect",
  },
  {
    icon: Search,
    label: "Product Explorer",
    id: "products",
    route: "/dashboard/product-explorer",
  },
  {
    icon: TrendingUp,
    label: "Competitor Insights",
    id: "insights",
    route: "/dashboard/competitor-insight",
  },
  {
    icon: Palette,
    label: "Ad Studio",
    id: "studio",
    route: "/dashboard/ad-studio",
  },
  {
    icon: FolderOpen,
    label: "Saved Projects",
    id: "projects",
    route: "/dashboard/saved-project",
  },
  {
    icon: FlipHorizontal2,
    label: "Video Editor",
    id: "editor",
    route: "/editor", // This is outside of /dashboard
  },
  {
    icon: ImagePlus,
    label: "Image Editor",
    id: "image-editor",
    route: "/ai-image-editor",
  },
  // {
  //   icon: Settings,
  //   label: "Settings",
  //   id: "settings",
  //   route: "/dashboard/settings", 
  // },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggle,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r border-gray-700 bg-gray-900/95 shadow-xl backdrop-blur-xl transition-all duration-300",
          // Mobile behavior
          "lg:translate-x-0",
          isCollapsed ? "-translate-x-full lg:w-16" : "w-64",
        )}
      >
        <div className="p-6">
          <div
            className={cn(
              "mb-8 flex items-center space-x-3 transition-all duration-300",
              isCollapsed && "lg:justify-center lg:space-x-0",
            )}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
              <Palette className="h-6 w-6 text-white" />
            </div>
            {(!isCollapsed || window.innerWidth < 1024) && (
              <div className="lg:block">
                <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                  AdCraft
                </h1>
                <p className="text-sm text-muted-foreground">
                  Shopify Ad Studio
                </p>
              </div>
            )}
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link to={item.route} >
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "group flex w-full my-2 items-center space-x-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-gray-800",
                    activeTab === item.id &&
                      "border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400",
                    isCollapsed && "lg:justify-center lg:space-x-0",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      activeTab === item.id
                        ? "text-purple-400"
                        : "text-gray-400 group-hover:text-purple-400",
                    )}
                  />
                  {(!isCollapsed || window.innerWidth < 1024) && (
                    <span
                      className={cn(
                        "font-medium transition-colors lg:block",
                        activeTab === item.id
                          ? "text-purple-400"
                          : "text-gray-300 group-hover:text-purple-400",
                      )}
                    >
                      {item.label}
                    </span>
                  )} 
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
