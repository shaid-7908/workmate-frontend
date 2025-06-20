import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Image,
  Video,
  Users,
  Palette,
  Wand2,
  Download,
  Share,
  Eye,
} from "lucide-react";

export const AdStudio = () => {
  const [selectedFormat, setSelectedFormat] = useState("image");

  const adFormats = [
    {
      id: "image",
      label: "Image Ads",
      icon: Image,
      description: "Static visual ads",
    },
    {
      id: "video",
      label: "Video Ads",
      icon: Video,
      description: "Engaging motion content",
    },
    {
      id: "ugc",
      label: "UGC Ads",
      icon: Users,
      description: "User-generated content",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Ad Creation Studio
        </h1>
        <p className="text-lg text-muted-foreground">
          Create stunning ads with AI-powered tools and templates
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {adFormats.map((format) => (
          <Card
            key={format.id}
            className={`cursor-pointer border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
              selectedFormat === format.id
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-white/80 backdrop-blur-sm hover:bg-purple-50"
            }`}
            onClick={() => setSelectedFormat(format.id)}
          >
            <CardContent className="p-6 text-center">
              <format.icon
                className={`mx-auto mb-4 h-12 w-12 ${
                  selectedFormat === format.id
                    ? "text-white"
                    : "text-purple-600"
                }`}
              />
              <h3 className="mb-2 text-xl font-semibold">{format.label}</h3>
              <p
                className={`text-sm ${
                  selectedFormat === format.id
                    ? "text-purple-100"
                    : "text-muted-foreground"
                }`}
              >
                {format.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-purple-600" />
              <span>Ad Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="Summer Sale 2024"
                className="border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                placeholder="Discover Amazing Deals"
                className="border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell your audience about your amazing products..."
                rows={4}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Target Audience</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fashion Lovers",
                  "Tech Enthusiasts",
                  "Young Adults",
                  "Professionals",
                ].map((audience) => (
                  <Badge
                    key={audience}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50"
                  >
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Ad with AI
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <span>Live Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 p-6">
              <div className="max-w-sm space-y-4 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-blue-400">
                  {selectedFormat === "image" && (
                    <Image className="h-12 w-12 text-white" />
                  )}
                  {selectedFormat === "video" && (
                    <Video className="h-12 w-12 text-white" />
                  )}
                  {selectedFormat === "ugc" && (
                    <Users className="h-12 w-12 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    Your Ad Preview
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Configure your ad settings to see the live preview here
                  </p>
                  <Badge className="bg-purple-100 text-purple-800">
                    {adFormats.find((f) => f.id === selectedFormat)?.label}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-purple-200 hover:bg-purple-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-purple-200 hover:bg-purple-50"
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
