
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap,
  ShoppingBag,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  DollarSign,
  Users,
  MessageSquare,
  Rocket
} from 'lucide-react';

interface ProductInsightsProps {
  onChatRequest?: (message: string) => void;
  onCreateCampaign?: (products: string[], campaignType: string) => void;
}

const ProductInsights = ({ onChatRequest, onCreateCampaign }: ProductInsightsProps) => {
  const topPerformingProducts = [
    {
      name: 'Wireless Bluetooth Earbuds Pro',
      sales: 1247,
      revenue: '$37,410',
      growth: '+34%',
      suggestion: 'Increase ad spend by 25% for holiday season'
    },
    {
      name: 'Smart Fitness Tracker X1',
      sales: 982,
      revenue: '$49,100',
      growth: '+28%',
      suggestion: 'Target fitness enthusiasts with video campaigns'
    },
    {
      name: 'Eco-Friendly Water Bottle',
      sales: 756,
      revenue: '$15,120',
      growth: '+45%',
      suggestion: 'Expand to sustainability-focused audiences'
    }
  ];

  const underperformingProducts = [
    {
      name: 'Premium Leather Wallet',
      sales: 89,
      revenue: '$4,450',
      decline: '-23%',
      opportunity: 'High margin potential',
      suggestion: 'Target professionals aged 25-45 with luxury positioning'
    },
    {
      name: 'Wireless Charging Pad',
      sales: 156,
      revenue: '$7,800',
      decline: '-15%',
      opportunity: 'Growing market demand',
      suggestion: 'Bundle with phone accessories, emphasize convenience'
    },
    {
      name: 'Smart Home Speaker',
      sales: 203,
      revenue: '$20,300',
      decline: '-8%',
      opportunity: 'Smart home trend',
      suggestion: 'Create demo videos showing integration benefits'
    }
  ];

  const campaignRecommendations = [
    {
      type: 'Holiday Push',
      products: ['Earbuds Pro', 'Fitness Tracker'],
      budget: '$5,000',
      expectedROI: '+240%',
      timeline: '2 weeks',
      audience: 'Gift buyers, Tech enthusiasts'
    },
    {
      type: 'Retargeting Campaign',
      products: ['Leather Wallet', 'Charging Pad'],
      budget: '$2,500',
      expectedROI: '+180%',
      timeline: '1 month',
      audience: 'Cart abandoners, Previous buyers'
    },
    {
      type: 'Video Ad Series',
      products: ['Smart Speaker', 'Water Bottle'],
      budget: '$3,200',
      expectedROI: '+160%',
      timeline: '3 weeks',
      audience: 'Home improvement, Eco-conscious'
    }
  ];

  const handleChatAboutProduct = (productName: string) => {
    const message = `Tell me more about marketing strategies for ${productName}. What specific campaigns would work best and what audience should I target?`;
    onChatRequest?.(message);
  };

  const handleChatAboutCampaign = (campaignType: string) => {
    const message = `I want to create a ${campaignType} campaign. Can you provide detailed steps, ad copy suggestions, and targeting recommendations?`;
    onChatRequest?.(message);
  };

  const handleCreateCampaign = (products: string[], campaignType: string) => {
    onCreateCampaign?.(products, campaignType);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Product Marketing Insights</h2>
        <p className="text-purple-200">AI-powered recommendations to boost your sales</p>
      </div>

      {/* Top Performing Products */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Top Products to Market More
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingProducts.map((product, index) => (
              <div key={index} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{product.name}</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-green-300 text-sm flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        {product.sales} sold
                      </span>
                      <span className="text-blue-300 text-sm flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {product.revenue}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {product.growth}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <p className="text-purple-200 text-sm">{product.suggestion}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleChatAboutProduct(product.name)}
                    className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Chat About This
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleCreateCampaign([product.name], 'Performance Campaign')}
                    className="bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
                  >
                    <Rocket className="w-3 h-3 mr-1" />
                    Create Campaign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Underperforming Products with Opportunity */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            Products with Untapped Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {underperformingProducts.map((product, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{product.name}</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-orange-300 text-sm flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {product.sales} sold
                      </span>
                      <span className="text-yellow-300 text-sm flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {product.revenue}
                      </span>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                        {product.opportunity}
                      </Badge>
                    </div>
                  </div>
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    {product.decline}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <p className="text-purple-200 text-sm">{product.suggestion}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleChatAboutProduct(product.name)}
                    className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Get Strategies
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleCreateCampaign([product.name], 'Recovery Campaign')}
                    className="bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30"
                  >
                    <Rocket className="w-3 h-3 mr-1" />
                    Recovery Campaign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Recommendations */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Recommended Marketing Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaignRecommendations.map((campaign, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-medium">{campaign.type}</h4>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Budget:</span>
                    <span className="text-white font-medium">{campaign.budget}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Expected ROI:</span>
                    <span className="text-green-300 font-medium">{campaign.expectedROI}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Timeline:</span>
                    <span className="text-blue-300 font-medium">{campaign.timeline}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-purple-300 text-xs mb-1">Products:</p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.products.map((product, idx) => (
                      <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-purple-300 text-xs mb-1">Target Audience:</p>
                  <p className="text-purple-200 text-xs">{campaign.audience}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => handleChatAboutCampaign(campaign.type)}
                    className="w-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 text-sm"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Discuss Campaign
                  </Button>
                  <Button 
                    onClick={() => handleCreateCampaign(campaign.products, campaign.type)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm"
                  >
                    <Rocket className="w-3 h-3 mr-1" />
                    Launch Campaign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Products Analyzed</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Campaign Opportunities</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Potential Revenue Lift</p>
                <p className="text-2xl font-bold text-white">+34%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductInsights;
