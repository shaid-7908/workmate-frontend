import React from "react";
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
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
          Welcome to AdCraft
        </h1>
        <p className="text-lg text-gray-400">
          Create stunning ads from your Shopify products with AI-powered
          insights
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-[0.2px] border-gray-700 bg-gray-800/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 flex items-center text-sm text-green-400">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-[0.2px] border-gray-700 bg-gray-800/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Store className="h-5 w-5 text-purple-400" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Connect Shopify Store
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Create New Ad Campaign
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Analyze Competitors
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-0 border-gray-700 bg-gray-800/80 shadow-lg backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Ad Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-blue-400">
                      <Palette className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        Summer Collection Ad #{i}
                      </p>
                      <p className="text-sm text-gray-400">Fashion & Apparel</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">+{12 + i}% CTR</p>
                    <p className="text-sm text-gray-400">
                      ${(1234 * i).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
