import { Home, Activity, ShoppingBag, Apple, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Home" },
    { path: "/workout", icon: <Activity className="h-5 w-5" />, label: "Workout" },
    { path: "/shop", icon: <ShoppingBag className="h-5 w-5" />, label: "Shop" },
    { path: "/diet", icon: <Apple className="h-5 w-5" />, label: "Diet" },
    { path: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 z-50 safe-area-bottom shadow-card">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all duration-300 ${
                isActive(item.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className={`transition-transform duration-300 ${isActive(item.path) ? "scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
