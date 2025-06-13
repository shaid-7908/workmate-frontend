import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  Eye,
  Users,
  ArrowUp,
  ArrowDown,
  Brain,
  Target,
  Zap,
  PlayCircle,
} from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Ad Impressions",
      value: "2.4M",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Click-through Rate",
      value: "3.2%",
      change: "-0.3%",
      trend: "down",
      icon: TrendingUp,
    },
    {
      title: "Conversions",
      value: "1,429",
      change: "+15.7%",
      trend: "up",
      icon: Users,
    },
  ];

  const aiRecommendations = [
    {
      type: "optimization",
      title: "Increase UGC Video Budget",
      description: "UGC videos are performing 24% better than static ads",
      impact: "High",
      action: "Reallocate $500 to UGC campaigns",
    },
    {
      type: "targeting",
      title: "Expand Age Targeting",
      description: "35-44 age group showing strong engagement",
      impact: "Medium",
      action: "Test broader age ranges",
    },
    {
      type: "creative",
      title: "Test New AI Avatar",
      description: 'Avatar "Sarah" has 18% higher conversion rate',
      impact: "High",
      action: "Create 3 new ads with Sarah",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">AI Dashboard</h1>
        <div className="flex space-x-2">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
            <Brain className="mr-2 h-4 w-4" />
            AI Insights
          </Button>
          <div className="text-sm text-gray-500">
            Last updated: 2 minutes ago
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white/60 backdrop-blur-sm transition-shadow duration-200 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        rec.impact === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {rec.impact} Impact
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">
                    {rec.description}
                  </p>
                  <Button size="sm" className="text-xs">
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "UGC Summer Collection",
                  type: "Video",
                  status: "Active",
                  performance: "+31%",
                  spend: "$3,120",
                  platform: "TikTok",
                },
                {
                  name: "AI Avatar Flash Sale",
                  type: "UGC",
                  status: "Active",
                  performance: "+24%",
                  spend: "$2,340",
                  platform: "Instagram",
                },
                {
                  name: "Static Product Showcase",
                  type: "Static",
                  status: "Completed",
                  performance: "+18%",
                  spend: "$1,890",
                  platform: "Facebook",
                },
              ].map((campaign, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">
                        {campaign.name}
                      </p>
                      {campaign.type === "Video" && (
                        <PlayCircle className="h-4 w-4 text-blue-500" />
                      )}
                      {campaign.type === "UGC" && (
                        <Users className="h-4 w-4 text-purple-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {campaign.status} • {campaign.platform}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      {campaign.performance}
                    </p>
                    <p className="text-sm text-gray-500">{campaign.spend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Zap className="mr-2 h-4 w-4" />
              Create AI Ad from URL
            </Button>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Users className="mr-2 h-4 w-4" />
              Generate UGC Video
            </Button>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <Target className="mr-2 h-4 w-4" />
              Launch Campaign
            </Button>
            <div className="border-t border-gray-200 pt-2">
              <h4 className="mb-2 font-medium text-gray-700">Top Performing</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>AI Avatar "Sarah"</span>
                  <span className="text-green-600">+24% CTR</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>UGC Style Template</span>
                  <span className="text-green-600">+18% Conv</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
