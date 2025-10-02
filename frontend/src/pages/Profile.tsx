import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  User, 
  LogOut, 
  Bell,
  Moon,
  Zap,
  Heart,
  Crown,
  HelpCircle,
  FileText,
  Share2,
  TrendingUp, 
  TrendingDown,
  Activity,
  Flame,
  Dumbbell,
  Apple,
  Target,
  Calendar,
  Award,
  Settings as SettingsIcon,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const onboarding = localStorage.getItem("onboarding");
    
    if (!user) {
      navigate("/login");
      return;
    }

    if (user) setUserData(JSON.parse(user));
    if (onboarding) setOnboardingData(JSON.parse(onboarding));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const weeklyStats = [
    { day: "Mon", workouts: 1, calories: 2100 },
    { day: "Tue", workouts: 1, calories: 2300 },
    { day: "Wed", workouts: 0, calories: 1900 },
    { day: "Thu", workouts: 1, calories: 2250 },
    { day: "Fri", workouts: 1, calories: 2400 },
    { day: "Sat", workouts: 1, calories: 2150 },
    { day: "Sun", workouts: 1, calories: 2000 }
  ];

  const maxCalories = Math.max(...weeklyStats.map(d => d.calories));

  const insights = [
    {
      title: "Workout Consistency",
      value: "86%",
      change: "+12%",
      trend: "up",
      icon: <Activity className="h-5 w-5" />,
      color: "primary"
    },
    {
      title: "Calories Burned",
      value: "15.2K",
      change: "+8%",
      trend: "up",
      icon: <Flame className="h-5 w-5" />,
      color: "accent"
    },
    {
      title: "Avg Session",
      value: "47 min",
      change: "+5 min",
      trend: "up",
      icon: <Dumbbell className="h-5 w-5" />,
      color: "secondary"
    },
    {
      title: "Protein Intake",
      value: "142g/day",
      change: "-3g",
      trend: "down",
      icon: <Apple className="h-5 w-5" />,
      color: "accent"
    }
  ];

  const goals = [
    { title: "Weight Loss Target", current: 72, target: 68, unit: "kg", progress: 80, icon: <Target className="h-4 w-4" /> },
    { title: "Weekly Workouts", current: 6, target: 7, unit: "sessions", progress: 86, icon: <Dumbbell className="h-4 w-4" /> },
    { title: "Daily Protein", current: 142, target: 150, unit: "g", progress: 95, icon: <Apple className="h-4 w-4" /> }
  ];

  const achievements = [
    { title: "7-Day Streak", unlocked: true, icon: "🔥" },
    { title: "50 Workouts", unlocked: true, icon: "💪" },
    { title: "10K Steps Daily", unlocked: true, icon: "👟" },
    { title: "Nutrition Master", unlocked: false, icon: "🥗" },
    { title: "Early Bird", unlocked: false, icon: "🌅" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 shadow-card backdrop-blur-xl bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Profile</h1>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6 shadow-elevated border-border/50 bg-gradient-card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-premium flex items-center justify-center text-white text-4xl font-bold shadow-glow ring-4 ring-primary/20">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">{userData?.name}</h2>
                <p className="text-muted-foreground text-base">{userData?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
                <div className="text-3xl font-black text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground font-medium">Day Streak</div>
              </div>
              <div className="text-center p-5 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-colors">
                <div className="text-3xl font-black text-accent mb-1">24</div>
                <div className="text-sm text-muted-foreground font-medium">Workouts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 mb-6 bg-muted/50">
            <TabsTrigger value="info" className="text-sm font-semibold">Info</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-semibold">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-semibold">Settings</TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-6">
            {/* Fitness Info */}
            {onboardingData && (
              <Card className="shadow-card border-border/50 bg-gradient-card relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl">Fitness Profile</CardTitle>
                  <CardDescription className="text-base">Your personalized fitness information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  <div className="flex justify-between py-3 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-muted-foreground font-medium">Goal</span>
                    <span className="font-bold text-primary">{onboardingData.goal}</span>
                  </div>
                  <div className="flex justify-between py-3 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-muted-foreground font-medium">Age</span>
                    <span className="font-bold">{onboardingData.age} years</span>
                  </div>
                  <div className="flex justify-between py-3 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-muted-foreground font-medium">Height</span>
                    <span className="font-bold">{onboardingData.height} cm</span>
                  </div>
                  <div className="flex justify-between py-3 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-muted-foreground font-medium">Weight</span>
                    <span className="font-bold">{onboardingData.weight} kg</span>
                  </div>
                  <div className="flex justify-between py-3 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-muted-foreground font-medium">Workout Type</span>
                    <span className="font-bold">{onboardingData.workoutType}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Key Insights */}
            <div className="grid grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <Card 
                  key={index} 
                  className="relative overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-1 animate-scale-in group border-border/50"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <CardContent className="p-5 relative z-10">
                    <div className={`h-10 w-10 rounded-xl bg-${insight.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {insight.icon}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">{insight.title}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-black group-hover:text-primary transition-colors">{insight.value}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          insight.trend === "up" 
                            ? "border-green-500/30 bg-green-500/10 text-green-600" 
                            : "border-orange-500/30 bg-orange-500/10 text-orange-600"
                        }`}
                      >
                        {insight.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {insight.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Activity Chart */}
            <Card className="relative overflow-hidden animate-slide-up border-border/50 group">
              <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-3 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Weekly Activity
                    </CardTitle>
                    <CardDescription>Your workout and nutrition trends</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="w-12 text-sm font-semibold text-muted-foreground">{stat.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-sm font-semibold">{stat.calories} cal</div>
                          {stat.workouts > 0 && (
                            <Badge variant="outline" className="text-xs border-primary/30 bg-primary/10 text-primary">
                              <Dumbbell className="w-3 h-3 mr-1" />
                              {stat.workouts}
                            </Badge>
                          )}
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-premium rounded-full transition-all duration-500 hover:shadow-glow"
                            style={{ 
                              width: `${(stat.calories / maxCalories) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals Progress */}
            <Card className="animate-slide-up border-border/50 relative overflow-hidden group cursor-pointer" onClick={() => navigate("/progress-photos")}>
              <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-3 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Goal Progress
                </CardTitle>
                <CardDescription>Track your fitness milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 relative z-10">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                          {goal.icon}
                        </div>
                        <span className="font-semibold text-sm">{goal.title}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2.5" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="animate-slide-up border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-3 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Achievements
                </CardTitle>
                <CardDescription>Unlock badges as you progress</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-5 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-4 rounded-xl border-2 transition-all duration-300 animate-scale-in ${
                        achievement.unlocked 
                          ? "border-primary/30 bg-primary/10 hover:scale-110 cursor-pointer" 
                          : "border-border bg-muted/50 opacity-50"
                      }`}
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <div className={`text-3xl mb-2 ${achievement.unlocked ? "animate-float" : ""}`}>{achievement.icon}</div>
                      <div className="text-xs font-semibold">{achievement.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Preferences Section */}
            <Card className="border-border/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500">
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

            {/* Support Section */}
            <Card className="border-border/50 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-500">
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

            {/* Logout */}
            <Button 
              variant="destructive" 
              className="w-full hover:scale-105 transition-transform duration-200"
              size="lg"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>

            <div className="text-center text-sm text-muted-foreground py-4">
              App Version 1.0.0
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
