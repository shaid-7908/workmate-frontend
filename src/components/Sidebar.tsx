
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Palette, 
  Folder,
  Store,
  Zap ,
  FileVideo2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
//import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'insights', label: 'Competitor Insights', icon: TrendingUp },
    { id: 'studio', label: 'Ad Studio', icon: Palette },
    { id: 'projects', label: 'Saved Projects', icon: Folder },
    {id:'editor',label:"Video Editor",icon:FileVideo2}
  ];

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-sm border-r border-gray-200/50 h-screen fixed left-0 top-16 z-40">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <Store className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Shopify Connected</p>
              <p className="text-xs text-green-600">My Store</p>
            </div>
            <Zap className="w-4 h-4 text-green-500 ml-auto" />
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link to={item.id}>
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-all duration-200 hover:bg-blue-50 hover:text-blue-700",
                    activeTab === item.id &&
                      "border-r-2 border-blue-500 bg-blue-50 text-blue-700",
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
