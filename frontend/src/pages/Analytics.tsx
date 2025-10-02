import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Flame,
  Dumbbell,
  Apple,
  Target,
  Calendar,
  Award,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import { WeightTracker } from "@/components/WeightTracker";
import { StreakCalendar } from "@/components/StreakCalendar";

const Analytics = () => {
  const navigate = useNavigate();

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
      <header className="bg-gradient-card border-b sticky top-0 z-50 backdrop-blur-xl bg-card/95 shadow-card">
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
            <div>
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Analytics</h1>
              <p className="text-sm text-muted-foreground">Track your progress</p>
            </div>
          </div>
          <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-600 animate-pulse-glow">
            <TrendingUp className="w-3 h-3 mr-1" />
            On Track
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* Overview Banner */}
        <Card className="relative overflow-hidden bg-gradient-hero text-white shadow-glow animate-slide-down">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-black mb-1">Great Progress!</h2>
                <p className="text-white/90">You're 80% to your weight goal</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center animate-float">
                <div className="text-3xl font-black">12</div>
                <div className="text-sm text-white/80">Day Streak</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.3s" }}>
                <div className="text-3xl font-black">24</div>
                <div className="text-sm text-white/80">Workouts</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.6s" }}>
                <div className="text-3xl font-black">4kg</div>
                <div className="text-sm text-white/80">Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                        <Badge variant="outline" className="text-xs border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
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

        {/* Weight Tracker */}
        <WeightTracker />

        {/* Streak Calendar */}
        <StreakCalendar />

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
      </div>

      <BottomNav />
    </div>
  );
};

export default Analytics;
