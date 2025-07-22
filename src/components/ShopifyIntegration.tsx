
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, TrendingUp, Users, DollarSign, Globe, Zap } from 'lucide-react';

const ShopifyIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [shopifyUrl, setShopifyUrl] = useState('');

  const handleConnect = () => {
    if (shopifyUrl.trim()) {
      setIsConnected(true);
    }
  };

  const sampleMetrics = {
    totalSales: '$45,678',
    orders: '1,234',
    customers: '892',
    topProducts: [
      { name: 'Wireless Earbuds Pro', sales: 156, revenue: '$4,680' },
      { name: 'Smart Fitness Tracker', sales: 134, revenue: '$6,700' },
      { name: 'Eco Water Bottle', sales: 98, revenue: '$1,960' }
    ]
  };

  if (!isConnected) {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            Connect Your Shopify Store
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-200">
            Connect your Shopify store to start getting AI-powered insights and campaign recommendations.
          </p>
          <div className="space-y-3">
            <Input
              placeholder="your-store.myshopify.com"
              value={shopifyUrl}
              onChange={(e) => setShopifyUrl(e.target.value)}
              className="bg-white/10 border-purple-500/30 text-white placeholder-purple-300"
            />
            <Button 
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Connect Store
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-green-400" />
            Store Connected
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 ml-auto">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-200">Successfully connected to {shopifyUrl}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-purple-500/20">
          <TabsTrigger value="overview" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            Products
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Total Sales</p>
                    <p className="text-2xl font-bold text-white">{sampleMetrics.totalSales}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Orders</p>
                    <p className="text-2xl font-bold text-white">{sampleMetrics.orders}</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Customers</p>
                    <p className="text-2xl font-bold text-white">{sampleMetrics.customers}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Top Performing Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleMetrics.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {product.sales} sold
                      </Badge>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                        {product.revenue}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                AI Campaign Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Holiday Season Campaign</h4>
                      <p className="text-purple-200 text-sm mb-2">
                        Based on market trends, focus on gift-worthy electronics and wellness products.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          High Potential
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          ROI: +35%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Fitness Trend Campaign</h4>
                      <p className="text-blue-200 text-sm mb-2">
                        Capitalize on the fitness trend with targeted ads for your wellness products.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          Trending
                        </Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          ROI: +28%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopifyIntegration;
