import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Apple, Flame, TrendingUp, Dumbbell, MessageCircle, User, Users, ShoppingBag, Zap, Target, Award, Clock, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const onboarding = localStorage.getItem("onboarding");
    
    if (!user) {
      navigate("/login");
      return;
    }

    if (user) setUserData(JSON.parse(user));
  }, [navigate]);

  const stats = [
    { label: "Calories Burned", value: "1,234", icon: <Flame className="h-5 w-5" />, color: "text-primary" },
    { label: "Workouts This Week", value: "4", icon: <Activity className="h-5 w-5" />, color: "text-secondary" },
    { label: "Current Streak", value: "12 days", icon: <TrendingUp className="h-5 w-5" />, color: "text-accent" },
    { label: "Protein Intake", value: "145g", icon: <Apple className="h-5 w-5" />, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-card border-b sticky top-0 z-50 shadow-card backdrop-blur-xl bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black bg-gradient-premium bg-clip-text text-transparent">
            GymFitAI Pro
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              <Award className="w-3 h-3 mr-1" />
              Premium
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
              className="hover:scale-110 transition-transform duration-200 relative"
            >
              <Bell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="hover:scale-110 transition-transform duration-200"
            >
              <User />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section with Motivational Banner */}
        <div className="mb-8 animate-fade-in">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white shadow-glow">
            <div className="absolute inset-0 bg-gradient-glow opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-2">
                Welcome back, {userData?.name?.split(" ")[0] || "Champion"}! 🔥
              </h2>
              <p className="text-white/90 text-lg mb-4">You're on fire! Keep pushing your limits.</p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md">
                  <Target className="w-4 h-4 mr-1" />
                  12 Day Streak
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md">
                  <Zap className="w-4 h-4 mr-1" />
                  Level 8
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden bg-gradient-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1 animate-scale-in group border-border/50" 
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <CardContent className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.color} p-3 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black group-hover:text-primary transition-colors">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card 
            className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 cursor-pointer group border-border/50 hover:-translate-y-1"
            onClick={() => navigate("/ai-chat")}
          >
            <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-premium flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">AI Coach</h3>
                  <p className="text-sm text-muted-foreground">Get instant advice</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 cursor-pointer group border-border/50 hover:-translate-y-1"
            onClick={() => navigate("/community")}
          >
            <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Community</h3>
                  <p className="text-sm text-muted-foreground">Join challenges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 cursor-pointer group border-border/50 hover:-translate-y-1"
            onClick={() => navigate("/shop")}
          >
            <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Shop</h3>
                  <p className="text-sm text-muted-foreground">Gear & supplements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Workout */}
          <Card className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 border-border/50 group">
            <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    Today's Workout
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">Upper Body Strength</CardDescription>
                </div>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  45 min
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-bold text-primary">0/6 exercises</span>
                </div>
                <Progress value={0} className="h-2.5" />
              </div>
              
              <div className="space-y-2.5 pt-2">
                {[
                  { name: "Bench Press", sets: "4 × 10" },
                  { name: "Dumbbell Rows", sets: "4 × 12" },
                  { name: "Shoulder Press", sets: "3 × 10" }
                ].map((exercise, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/60 hover:bg-muted transition-colors border border-border/30">
                    <span className="font-semibold">{exercise.name}</span>
                    <Badge variant="outline" className="text-xs">{exercise.sets}</Badge>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full mt-4 shadow-card hover:shadow-glow" 
                size="lg"
                variant="premium"
                onClick={() => navigate("/workout-library")}
              >
                <Zap className="mr-2 h-5 w-5" />
                Browse Workout Library
              </Button>
            </CardContent>
          </Card>

          {/* Today's Nutrition */}
          <Card className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500 border-border/50 group">
            <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Apple className="h-5 w-5 text-accent" />
                </div>
                Today's Nutrition
              </CardTitle>
              <CardDescription className="mt-2 text-base">Track your macros and meals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Calories", value: "2,150", color: "primary", progress: 65 },
                  { label: "Protein", value: "145g", color: "secondary", progress: 72 },
                  { label: "Carbs", value: "185g", color: "accent", progress: 58 }
                ].map((macro, i) => (
                  <div key={i} className={`text-center p-4 rounded-xl bg-${macro.color}/10 border border-${macro.color}/20`}>
                    <div className={`text-2xl font-black text-${macro.color}`}>{macro.value}</div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">{macro.label}</div>
                    <Progress value={macro.progress} className="h-1.5 mt-2" />
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  { meal: "Breakfast", desc: "Oats with berries", cal: "450 cal" },
                  { meal: "Lunch", desc: "Chicken & rice bowl", cal: "680 cal" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/60 hover:bg-muted transition-colors border border-border/30">
                    <div>
                      <div className="font-semibold">{item.meal}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <Badge variant="outline">{item.cal}</Badge>
                  </div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 border-2 hover:bg-accent/10 hover:border-accent"
                size="lg"
                onClick={() => navigate("/nutrition")}
              >
                Log Meal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant FAB */}
        <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-40">
          <Button
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full shadow-card hover:shadow-glow hover:scale-110 transition-all duration-300 bg-card/95 backdrop-blur-xl border-border/50"
            onClick={() => navigate("/workout-library")}
          >
            <Dumbbell className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="premium"
            className="h-16 w-16 rounded-full shadow-glow hover:shadow-[0_0_100px_hsl(var(--primary)/0.8)] animate-pulse-glow hover:scale-110 transition-transform duration-300"
            onClick={() => navigate("/ai-chat")}
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
