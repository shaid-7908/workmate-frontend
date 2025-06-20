import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star,  Eye } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 199.99,
    category: "Electronics",
    rating: 4.8,
    views: 1250,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    performance: "High",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    category: "Fashion",
    rating: 4.6,
    views: 890,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    performance: "Medium",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 299.99,
    category: "Electronics",
    rating: 4.9,
    views: 2100,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    performance: "High",
  },
  {
    id: 4,
    name: "Artisan Coffee Beans",
    price: 24.99,
    category: "Food & Beverage",
    rating: 4.7,
    views: 650,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    performance: "Medium",
  },
];

export const ProductExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Food & Beverage",
    "Home & Garden",
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Product Explorer
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse and analyze your products to create targeted ad campaigns
        </p>
      </div>

      <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-purple-200 pl-10 focus:border-purple-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-600"
                      : "border-purple-200 hover:bg-purple-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge
                className={`absolute right-3 top-3 ${
                  product.performance === "High"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {product.performance}
              </Badge>
            </div>
            <CardContent className="space-y-3 p-4">
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">
                  {product.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">
                  ${product.price}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{product.views} views</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Ad
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
