import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Moon,
  Shield, 
  Heart, 
  Zap,
  Crown,
  LogOut,
  ChevronRight,
  Settings as SettingsIcon,
  HelpCircle,
  FileText,
  Share2,
  Watch,
  Smartphone,
  CreditCard,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 backdrop-blur-xl bg-card/95 shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Settings</h1>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Account Section */}
        <Card className="border-border/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 animate-slide-down">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account
            </CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button 
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group"
              onClick={() => navigate("/profile")}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-premium flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="text-left">
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card className="border-border/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Preferences
            </CardTitle>
            <CardDescription>Customize app behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Get notified about updates</div>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={(checked) => {
                  setNotifications(checked);
                  toast.success(checked ? "Notifications enabled" : "Notifications disabled");
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Always enabled</div>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Workout Reminders</div>
                  <div className="text-sm text-muted-foreground">Daily workout notifications</div>
                </div>
              </div>
              <Switch checked={workoutReminders} onCheckedChange={setWorkoutReminders} />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Meal Reminders</div>
                  <div className="text-sm text-muted-foreground">Track your nutrition</div>
                </div>
              </div>
              <Switch checked={mealReminders} onCheckedChange={setMealReminders} />
            </div>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card className="border-border/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Watch className="h-5 w-5 text-primary" />
              Connected Devices
            </CardTitle>
            <CardDescription>Sync with wearables and apps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group" onClick={() => toast.info("Connect Apple Watch coming soon!")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white">
                  <Watch className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Apple Watch</div>
                  <div className="text-sm text-muted-foreground">Not connected</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group" onClick={() => toast.info("Connect Fitbit coming soon!")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-white">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Fitbit</div>
                  <div className="text-sm text-muted-foreground">Not connected</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-premium flex items-center justify-center text-white">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Apple Health</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Connected
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">Disconnect</Button>
            </button>
          </CardContent>
        </Card>

        {/* Subscription Management */}
        <Card className="border-primary/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 animate-slide-up relative overflow-hidden" style={{ animationDelay: "200ms" }}>
          <div className="absolute inset-0 bg-gradient-premium opacity-5" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your plan and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl bg-gradient-hero text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="h-5 w-5" />
                    <span className="font-bold text-lg">Pro Plan</span>
                  </div>
                  <p className="text-sm text-white/80">Full access to all features</p>
                </div>
                <Badge className="bg-white/20 border-white/30 backdrop-blur-md">
                  Active
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-white/80">Next billing</div>
                  <div className="font-bold">Feb 15, 2025</div>
                </div>
                <div>
                  <div className="text-white/80">Amount</div>
                  <div className="font-bold">$9.99/mo</div>
                </div>
                <div>
                  <div className="text-white/80">Renewal</div>
                  <div className="font-bold">Auto</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => toast.info("Manage billing coming soon!")}>
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive" onClick={() => toast.info("Cancel subscription coming soon!")}>
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-border/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Support
            </CardTitle>
            <CardDescription>Help and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">Help Center</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">Terms & Privacy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group">
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">Share App</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 bg-gradient-card shadow-card animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Account Actions
            </CardTitle>
            <CardDescription>Manage your account status</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              className="w-full hover:scale-105 transition-transform duration-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground py-4">
          App Version 1.0.0
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
