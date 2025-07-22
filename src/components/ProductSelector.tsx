
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, TrendingUp, Target, Globe } from 'lucide-react';

const ProductSelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const sampleProducts = [
    {
      id: '1',
      name: 'Wireless Earbuds Pro',
      price: '$29.99',
      sales: 156,
      trend: '+15%',
      category: 'Electronics',
      competitorPrice: '$34.99',
      marketTrend: 'Rising'
    },
    {
      id: '2',
      name: 'Smart Fitness Tracker',
      price: '$49.99',
      sales: 134,
      trend: '+22%',
      category: 'Health & Wellness',
      competitorPrice: '$59.99',
      marketTrend: 'Hot'
    },
    {
      id: '3',
      name: 'Eco-Friendly Water Bottle',
      price: '$19.99',
      sales: 98,
      trend: '+8%',
      category: 'Lifestyle',
      competitorPrice: '$24.99',
      marketTrend: 'Stable'
    },
    {
      id: '4',
      name: 'Bluetooth Speaker Mini',
      price: '$39.99',
      sales: 87,
      trend: '+12%',
      category: 'Electronics',
      competitorPrice: '$44.99',
      marketTrend: 'Rising'
    }
  ];

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getMarketTrendBadge = (trend: string) => {
    switch (trend) {
      case 'Hot':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Rising':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Manual Product Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
            <Input
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder-purple-300"
            />
          </div>

          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white/5 border-purple-500/20 hover:bg-white/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleProductSelect(product.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-white font-medium">{product.name}</h4>
                          <p className="text-purple-200 text-sm">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{product.price}</p>
                          <p className="text-green-300 text-sm">{product.trend}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {product.sales} sold
                        </Badge>
                        <Badge variant="secondary" className={getMarketTrendBadge(product.marketTrend)}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {product.marketTrend}
                        </Badge>
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          <Globe className="w-3 h-3 mr-1" />
                          Comp: {product.competitorPrice}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Selected Products</h4>
                    <p className="text-purple-200 text-sm">{selectedProducts.length} products selected for campaign analysis</p>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Generate Campaign Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {selectedProducts.length > 0 && (
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Competitive Analysis & Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Market Positioning</h4>
                <p className="text-green-200 text-sm">
                  Your selected products are competitively priced 12-15% below market average, creating strong value proposition for campaigns.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Trend Analysis</h4>
                <p className="text-blue-200 text-sm">
                  Electronics category showing 18% growth. Health & Wellness up 25%. Optimal timing for campaign launch.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductSelector;
