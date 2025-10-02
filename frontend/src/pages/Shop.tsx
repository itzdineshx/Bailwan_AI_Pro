import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Star, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  badge?: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Whey Protein",
      category: "Supplements",
      price: 49.99,
      rating: 4.8,
      reviews: 1234,
      description: "25g protein per serving, chocolate flavor",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Resistance Bands Set",
      category: "Equipment",
      price: 29.99,
      rating: 4.6,
      reviews: 856,
      description: "5 bands with different resistance levels",
      badge: "New"
    },
    {
      id: 3,
      name: "Pre-Workout Energizer",
      category: "Supplements",
      price: 39.99,
      rating: 4.7,
      reviews: 2341,
      description: "Clean energy, no crash, fruit punch flavor"
    },
    {
      id: 4,
      name: "Yoga Mat Premium",
      category: "Equipment",
      price: 34.99,
      rating: 4.9,
      reviews: 567,
      description: "Extra thick, non-slip, eco-friendly",
      badge: "Eco"
    },
    {
      id: 5,
      name: "BCAA Recovery",
      category: "Supplements",
      price: 27.99,
      rating: 4.5,
      reviews: 789,
      description: "Muscle recovery, 2:1:1 ratio, lemon flavor"
    },
    {
      id: 6,
      name: "Adjustable Dumbbells",
      category: "Equipment",
      price: 299.99,
      rating: 4.8,
      reviews: 1567,
      description: "5-50 lbs per dumbbell, space-saving design",
      badge: "Premium"
    }
  ];

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success("Added to cart! 🛒");
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-primary text-primary-foreground";
      case "New":
        return "bg-secondary text-secondary-foreground";
      case "Eco":
        return "bg-green-500 text-white";
      case "Premium":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filterProducts = (category: string) => {
    if (category === "all") return products;
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 shadow-card backdrop-blur-xl bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="hover:bg-primary/10"
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Shop</h1>
              <p className="text-sm text-muted-foreground">Gear up for success</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-primary/10 hover:scale-110 transition-transform duration-200"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-premium text-white text-xs flex items-center justify-center font-bold animate-pulse-glow">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* AI Recommendations Banner */}
        <Card className="mb-6 bg-gradient-hero text-white shadow-glow animate-slide-down relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 animate-float">
                <Star className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">AI Recommendations For You</h3>
                <p className="text-sm text-white/90">
                  Based on your muscle gain goals, we recommend protein supplements and resistance equipment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 h-12 bg-gradient-card">
            <TabsTrigger value="all" className="font-semibold">All Products</TabsTrigger>
            <TabsTrigger value="supplements" className="font-semibold">Supplements</TabsTrigger>
            <TabsTrigger value="equipment" className="font-semibold">Equipment</TabsTrigger>
          </TabsList>

          {["all", "supplements", "equipment"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterProducts(category).map((product, index) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-scale-in border-border/50 bg-gradient-card relative overflow-hidden group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ShoppingCart className="h-8 w-8 text-primary" />
                        </div>
                        {product.badge && (
                          <Badge className={`${getBadgeColor(product.badge)} animate-pulse-glow`}>
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
                      <CardDescription className="text-base">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-black text-primary">
                          ${product.price}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product.id)}
                          disabled={cart.includes(product.id)}
                          variant={cart.includes(product.id) ? "outline" : "premium"}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          {cart.includes(product.id) ? "In Cart" : "Add"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
