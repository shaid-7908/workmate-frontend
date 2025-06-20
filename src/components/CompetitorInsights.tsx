import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, Target, BarChart3 } from "lucide-react";

const competitorData = [
  {
    name: "TechGear Plus",
    category: "Electronics",
    adSpend: "$45K",
    reach: "2.1M",
    engagement: "4.2%",
    trend: "up",
    topProducts: ["Wireless Earbuds", "Smart Watches", "Phone Cases"],
  },
  {
    name: "Fashion Forward",
    category: "Fashion",
    adSpend: "$32K",
    reach: "1.8M",
    engagement: "3.8%",
    trend: "down",
    topProducts: ["Summer Dresses", "Sneakers", "Accessories"],
  },
  {
    name: "Home Essential",
    category: "Home & Garden",
    adSpend: "$28K",
    reach: "1.5M",
    engagement: "5.1%",
    trend: "up",
    topProducts: ["Kitchen Tools", "Decor Items", "Storage Solutions"],
  },
];

export const CompetitorInsights = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Competitor Insights
        </h1>
        <p className="text-lg text-muted-foreground">
          Analyze competitor strategies and identify market opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Market Share</p>
                <p className="text-3xl font-bold">23.4%</p>
              </div>
              <BarChart3 className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg. Ad Performance</p>
                <p className="text-3xl font-bold">4.3%</p>
              </div>
              <Target className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Opportunity Score</p>
                <p className="text-3xl font-bold">8.7/10</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Top Competitors</h2>

        {competitorData.map((competitor, index) => (
          <Card
            key={index}
            className="border-0 bg-white/80 shadow-lg backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-blue-400">
                    <span className="text-lg font-bold text-white">
                      {competitor.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {competitor.name}
                    </h3>
                    <Badge variant="outline">{competitor.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {competitor.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      competitor.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {competitor.trend === "up" ? "Growing" : "Declining"}
                  </span>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {competitor.adSpend}
                  </p>
                  <p className="text-sm text-gray-600">Monthly Ad Spend</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {competitor.reach}
                  </p>
                  <p className="text-sm text-gray-600">Monthly Reach</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {competitor.engagement}
                  </p>
                  <p className="text-sm text-gray-600">Avg. Engagement</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Top Performing Products:
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {competitor.topProducts.map((product, idx) => (
                    <Badge key={idx} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-purple-200 hover:bg-purple-50"
              >
                Analyze Ad Strategy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
