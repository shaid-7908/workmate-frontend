import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Calendar,
  Clock,
  Users,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

import { useFetchRevenueAnalitics } from '@/apihooks/useFetchRevenueAnalitics';

const OrderAnalytics = () => {
  // Sample order data
  const orderTrendData = [
    { month: 'Jan', orders: 245, revenue: 12450, avgOrder: 51 },
    { month: 'Feb', orders: 189, revenue: 9870, avgOrder: 52 },
    { month: 'Mar', orders: 356, revenue: 18900, avgOrder: 53 },
    { month: 'Apr', orders: 423, revenue: 22315, avgOrder: 53 },
    { month: 'May', orders: 387, revenue: 20385, avgOrder: 53 },
    { month: 'Jun', orders: 512, revenue: 28160, avgOrder: 55 },
    { month: 'Jul', orders: 478, revenue: 26290, avgOrder: 55 },
    { month: 'Aug', orders: 625, revenue: 34375, avgOrder: 55 },
    { month: 'Sep', orders: 589, revenue: 32395, avgOrder: 55 },
    { month: 'Oct', orders: 698, revenue: 41880, avgOrder: 60 },
    { month: 'Nov', orders: 756, revenue: 45360, avgOrder: 60 },
    { month: 'Dec', orders: 892, revenue: 53520, avgOrder: 60 }
  ];

  const dailyOrderData = [
    { day: 'Mon', orders: 45, spikes: false },
    { day: 'Tue', orders: 52, spikes: false },
    { day: 'Wed', orders: 38, spikes: false },
    { day: 'Thu', orders: 67, spikes: true },
    { day: 'Fri', orders: 89, spikes: true },
    { day: 'Sat', orders: 124, spikes: true },
    { day: 'Sun', orders: 98, spikes: true }
  ];

  const orderStatusData = [
    { name: 'Completed', value: 78, color: '#10b981' },
    { name: 'Processing', value: 15, color: '#f59e0b' },
    { name: 'Pending', value: 5, color: '#6b7280' },
    { name: 'Cancelled', value: 2, color: '#ef4444' }
  ];

  const seasonalTrends = [
    { season: 'Q1', orders: 790, growth: -12, trend: 'down' },
    { season: 'Q2', orders: 1322, growth: 67, trend: 'up' },
    { season: 'Q3', orders: 1692, growth: 28, trend: 'up' },
    { season: 'Q4', orders: 2346, growth: 39, trend: 'up' }
  ];

  const orderSpikes = [
    { date: '2024-11-25', orders: 234, reason: 'Black Friday', increase: '+345%' },
    { date: '2024-12-15', orders: 189, reason: 'Holiday Campaign', increase: '+167%' },
    { date: '2024-10-31', orders: 156, reason: 'Halloween Sale', increase: '+123%' }
  ];

  // Custom bar color function
  const getBarColor = (entry: any) => {
    return entry.spikes ? '#10b981' : '#6366f1';
  };
  const {data:totalOrders}=useFetchRevenueAnalitics()
  console.log(totalOrders)

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{totalOrders?.data?.data?.total_orders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">+18% vs last month</span>
                </div>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Avg Order Value</p>
                <p className="text-2xl font-bold text-white">${totalOrders?.data?.insights?.revenue_per_order}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">+5% vs last month</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Order Frequency</p>
                <p className="text-2xl font-bold text-white">89/day</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">+12% vs last week</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Peak Order Day</p>
                <p className="text-2xl font-bold text-white">Saturday</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span className="text-orange-400 text-xs">124 avg orders</span>
                </div>
              </div>
              <Calendar className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-purple-500/20">
          <TabsTrigger value="trends" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            Order Trends
          </TabsTrigger>
          <TabsTrigger value="spikes" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            Spikes & Drops
          </TabsTrigger>
          <TabsTrigger value="patterns" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            Patterns
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-purple-200 data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Monthly Order Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={orderTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Weekly Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyOrderData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Bar 
                      dataKey="orders" 
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                    >
                      {dailyOrderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Quarterly Growth Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {seasonalTrends.map((quarter, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-200 font-medium">{quarter.season}</span>
                      {quarter.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{quarter.orders.toLocaleString()}</p>
                    <p className={`text-sm ${quarter.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {quarter.growth > 0 ? '+' : ''}{quarter.growth}% growth
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spikes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Recent Order Spikes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderSpikes.map((spike, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{spike.date}</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {spike.increase}
                        </Badge>
                      </div>
                      <p className="text-purple-200 text-sm mb-1">{spike.reason}</p>
                      <p className="text-2xl font-bold text-white">{spike.orders} orders</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Order Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {orderStatusData.map((status, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <span className="text-purple-200 text-sm">{status.name}: {status.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Peak Hours Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Morning Rush (9-11 AM)</span>
                      <span className="text-green-300 font-bold">23% of orders</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Lunch Peak (12-2 PM)</span>
                      <span className="text-green-300 font-bold">31% of orders</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Evening Shopping (7-9 PM)</span>
                      <span className="text-green-300 font-bold">28% of orders</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Customer Behavior
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Repeat Customers</span>
                      <span className="text-green-300 font-bold">67%</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Cart Abandonment</span>
                      <span className="text-red-300 font-bold">23%</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Mobile Orders</span>
                      <span className="text-blue-300 font-bold">72%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Strong Growth Momentum</h4>
                      <p className="text-green-200 text-sm">
                        Orders have increased by 45% over the last quarter, with consistent weekend spikes indicating strong customer engagement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Opportunity Alert</h4>
                      <p className="text-yellow-200 text-sm">
                        Wednesday shows consistently lower order volumes. Consider running mid-week promotions to boost sales.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Peak Performance</h4>
                      <p className="text-blue-200 text-sm">
                        Your highest performing campaigns align with order spikes during holiday periods. Replicate this strategy for upcoming seasons.
                      </p>
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

export default OrderAnalytics;
