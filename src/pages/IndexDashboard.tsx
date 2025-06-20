import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
//import { Dashboard } from "@/components/Dashboard";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu} from "lucide-react";

const IndexDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  // Start expanded on large screens, collapsed on mobile
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return window.innerWidth < 1024; // Collapsed only on mobile
  });

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle window resize to ensure proper responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isCollapsed) {
        // On large screens, default to expanded
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
        />
        <div
          className={cn(
            "min-h-screen flex-1 transition-all duration-300",
            isCollapsed ? "lg:ml-16" : "lg:ml-64",
          )}
        >
          {/* Mobile header with toggle */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-purple-100 bg-white/80 p-4 backdrop-blur-xl lg:hidden">
            <button
              onClick={handleToggle}
              className="rounded-lg p-2 transition-colors hover:bg-purple-50"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="font-semibold text-gray-800">AdCraft</span>
            </div>
          </div>

          <div className="p-4 pt-4 lg:p-8 lg:pt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexDashboard;
