import React,{useState} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatWindow from '@/components/ChatWindow';
import ShopifyIntegration from '@/components/ShopifyIntegration';
import ProductSelector from '@/components/ProductSelector';
import OrderAnalytics from '@/components/OrderAnaletics';
import ProductInsights from '@/components/ProductInsights';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Store,
  TrendingUp,
  Palette,
  BarChart3,
  Users,
  DollarSign,
  ArrowUpRight,
  MessageSquare, ShoppingBag, Target, Lightbulb 
} from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    label: "Revenue This Month",
    value: "$24,567",
    change: "+12%",
  },
  { icon: Users, label: "Ad Impressions", value: "1.2M", change: "+8%" },
  { icon: BarChart3, label: "Conversion Rate", value: "3.4%", change: "+0.2%" },
  { icon: TrendingUp, label: "Active Campaigns", value: "8", change: "+2" },
];

export const DashboardOverview = () => {

 const [chatMessage, setChatMessage] = useState<string>('');
  //const { toast } = useToast();

  const handleChatRequest = (message: string) => {
    setChatMessage(message);
    // Auto-switch to chat tab when a chat request is made
    const chatTab = document.querySelector('[value="chat"]') as HTMLElement;
    chatTab?.click();
  };

  const handleCreateCampaign = (products: string[], campaignType: string) => {
    // toast({
    //   title: "Campaign Creation Started",
    //   description: `Creating ${campaignType} for ${products.join(', ')}. Check the Analytics tab for progress.`,
    // });
    
    // Here you could implement actual campaign creation logic
    console.log('Creating campaign:', { products, campaignType });
  };

  const handleMessageProcessed = () => {
    setChatMessage('');
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Shopify Analytics AI
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-Powered Campaign Insights & Product Recommendations
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
            <TabsTrigger 
              value="insights" 
              className="text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Product Insights
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger 
              value="shopify" 
              className="text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shopify Data
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Target className="w-4 h-4 mr-2" />
              Product Selection
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="text-muted-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            <ProductInsights 
              onChatRequest={handleChatRequest}
              onCreateCampaign={handleCreateCampaign}
            />
            
            {/* Chat Section for Deep Dive */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-card-foreground font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Ask AI for Deep Dive Analysis
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Get detailed insights about specific products or campaign strategies
                </p>
              </div>
              <div className="h-[400px]">
                <ChatWindow 
                  incomingMessage={chatMessage}
                  onMessageProcessed={handleMessageProcessed}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden h-[600px]">
              <ChatWindow 
                incomingMessage={chatMessage}
                onMessageProcessed={handleMessageProcessed}
              />
            </div>
          </TabsContent>

          <TabsContent value="shopify" className="space-y-4">
            <ShopifyIntegration />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <ProductSelector />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <OrderAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
