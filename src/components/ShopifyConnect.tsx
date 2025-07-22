import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Store, CheckCircle} from "lucide-react";
import OrderAnalytics from "@/components/OrderAnaletics";

export const ShopifyConnect = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [storeUrl, setStoreUrl] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">
          Shopify Integration
        </h1>
        <p className="text-lg text-gray-400">
          Connect your Shopify store to start creating ads from your products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card
          style={{ border: "0.2 px solid white" }}
          className="border-0 border-gray-700 bg-gray-800/80 shadow-xl backdrop-blur-sm"
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Store className="h-6 w-6 text-purple-400" />
              <span>Store Connection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isConnected ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="store-url" className="text-gray-300">
                    Shopify Store URL
                  </Label>
                  <Input
                    id="store-url"
                    placeholder="your-store.myshopify.com"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    className="border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => setIsConnected(true)}
                >
                  Connect Shopify Store
                </Button>
              </>
            ) : (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-900/30">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Connected Successfully!
                  </h3>
                  <p className="text-gray-400">
                    Your store data is now syncing
                  </p>
                </div>
                <Badge className="border border-green-500/30 bg-green-900/30 text-green-400">
                  Active Connection
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-[0.2px] border-gray-700 bg-gray-800/80 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Integration Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Automatic product data sync",
                "Real-time inventory updates",
                "Sales performance tracking",
                "Customer behavior insights",
                "Automated ad optimization",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isConnected && (
        <Card className="border-0 border-gray-700 bg-gradient-to-r from-purple-900/30 to-blue-900/30 shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
              <div>
                <p className="text-3xl font-bold text-purple-400">247</p>
                <p className="text-gray-400">Products Synced</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">12</p>
                <p className="text-gray-400">Collections</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">98%</p>
                <p className="text-gray-400">Sync Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <OrderAnalytics />
    </div>
  );
};
