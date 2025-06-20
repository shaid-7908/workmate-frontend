import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  Image,
  Video,
  Users,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
} from "lucide-react";

const savedProjects = [
  {
    id: 1,
    name: "Summer Fashion Campaign",
    type: "Image",
    created: "2024-06-10",
    status: "Active",
    performance: { impressions: "45.2K", clicks: "1.8K", ctr: "3.9%" },
    thumbnail:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
  },
  {
    id: 2,
    name: "Tech Product Launch",
    type: "Video",
    created: "2024-06-08",
    status: "Draft",
    performance: { impressions: "0", clicks: "0", ctr: "0%" },
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
  },
  {
    id: 3,
    name: "Customer Testimonials",
    type: "UGC",
    created: "2024-06-05",
    status: "Completed",
    performance: { impressions: "32.1K", clicks: "2.1K", ctr: "6.5%" },
    thumbnail:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
  },
  {
    id: 4,
    name: "Holiday Special Offers",
    type: "Image",
    created: "2024-06-03",
    status: "Paused",
    performance: { impressions: "28.9K", clicks: "1.2K", ctr: "4.1%" },
    thumbnail:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Video":
      return Video;
    case "UGC":
      return Users;
    default:
      return Image;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-gray-100 text-gray-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "Paused":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const SavedProjects = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Saved Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage and track your ad campaigns and creative projects
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <FolderOpen className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {savedProjects.map((project) => {
          const TypeIcon = getTypeIcon(project.type);

          return (
            <Card
              key={project.id}
              className="group border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute right-3 top-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
                    <TypeIcon className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </div>

              <CardContent className="space-y-4 p-6">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Created on {project.created}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-purple-50 p-3">
                    <p className="text-lg font-bold text-purple-600">
                      {project.performance.impressions}
                    </p>
                    <p className="text-xs text-gray-600">Impressions</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-lg font-bold text-blue-600">
                      {project.performance.clicks}
                    </p>
                    <p className="text-xs text-gray-600">Clicks</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-lg font-bold text-green-600">
                      {project.performance.ctr}
                    </p>
                    <p className="text-xs text-gray-600">CTR</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-200 hover:bg-purple-50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Ready to create more?
              </h3>
              <p className="mb-4 text-muted-foreground">
                Start a new ad campaign and reach more customers with AI-powered
                creativity
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create New Campaign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
