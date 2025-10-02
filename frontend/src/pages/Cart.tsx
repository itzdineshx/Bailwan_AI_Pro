import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  Package,
  CreditCard,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Premium Whey Protein", price: 49.99, quantity: 2, category: "Supplements" },
    { id: 2, name: "Resistance Bands Set", price: 29.99, quantity: 1, category: "Equipment" },
    { id: 3, name: "Performance T-Shirt", price: 34.99, quantity: 1, category: "Apparel" }
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    setTimeout(() => {
      navigate("/shop");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 backdrop-blur-xl bg-card/95 shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/shop")}
              className="hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground">{cartItems.length} items in cart</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <ShoppingCart className="w-3 h-3 mr-1" />
            {cartItems.length}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {cartItems.length === 0 ? (
          <Card className="shadow-card border-border/50 bg-gradient-card p-16 text-center animate-slide-down">
            <ShoppingCart className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button variant="premium" onClick={() => navigate("/shop")}>
              Browse Shop
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="relative overflow-hidden hover:shadow-glow transition-all duration-500 animate-slide-up group border-border/50"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex gap-4">
                      {/* Product Image Placeholder */}
                      <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <Package className="h-10 w-10 text-primary/40" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                            <Badge variant="outline" className="text-xs mt-1">{item.category}</Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="hover:text-destructive hover:scale-110 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-2xl font-black text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-glow border-border/50 bg-gradient-card relative overflow-hidden animate-slide-down">
                <div className="absolute inset-0 bg-gradient-premium opacity-5" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-600 text-xs">
                            FREE
                          </Badge>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>

                    {shipping > 0 && (
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                        <p className="text-xs text-primary font-semibold">
                          Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Button 
                    variant="premium" 
                    className="w-full mt-4 h-14 text-lg shadow-glow hover:scale-105"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>

                  <div className="pt-4 space-y-2 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Free returns within 30 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Ships within 2-3 business days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Cart;
