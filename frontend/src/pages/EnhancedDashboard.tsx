import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Apple, Flame, TrendingUp, MessageCircle, User, Users, ShoppingBag, Zap, Target, Award, Clock, Bell, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedCard, GlassCard, StaggerContainer, StaggerItem, FloatingElement } from "@/components/AnimatedCard";

const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (!user) {
      navigate("/login");
      return;
    }

    if (user) setUserData(JSON.parse(user));
  }, [navigate]);

  const stats = [
    { label: "Calories Burned", value: "1,234", icon: <Flame className="h-5 w-5" />, color: "primary" },
    { label: "Workouts This Week", value: "4", icon: <Activity className="h-5 w-5" />, color: "secondary" },
    { label: "Current Streak", value: "12 days", icon: <TrendingUp className="h-5 w-5" />, color: "accent" },
    { label: "Protein Intake", value: "145g", icon: <Apple className="h-5 w-5" />, color: "primary" }
  ];

  const quickActions = [
    { icon: <MessageCircle className="h-7 w-7 text-white" />, title: "AI Coach", desc: "Get instant advice", path: "/ai-chat", gradient: "from-primary to-accent" },
    { icon: <Users className="h-7 w-7 text-secondary" />, title: "Community", desc: "Join challenges", path: "/community", gradient: "from-secondary to-muted" },
    { icon: <ShoppingBag className="h-7 w-7 text-accent" />, title: "Shop", desc: "Gear & supplements", path: "/shop", gradient: "from-accent to-primary" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 smooth-scroll">
      {/* Animated Header with Glass Effect */}
      <motion.header 
        style={{ y: headerY, opacity: headerOpacity }}
        className="glass sticky top-0 z-50 border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-2xl font-black bg-gradient-premium bg-clip-text text-transparent"
            >
              GymFitAI Pro
            </motion.h1>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge variant="outline" className="glass border-primary/30 bg-primary/10 text-primary">
                  <Award className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/notifications")}
                  className="hover:scale-110 transition-transform duration-200 relative"
                >
                  <Bell />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/profile")}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <User />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Banner with Parallax Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-3xl glass-card p-8 text-white">
            <motion.div 
              className="absolute inset-0 bg-gradient-hero opacity-90"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            />
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-black mb-2"
              >
                Welcome back, {userData?.name?.split(" ")[0] || "Champion"}! 🔥
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/90 text-lg mb-4"
              >
                You're on fire! Keep pushing your limits.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <FloatingElement>
                  <Badge className="glass text-white border-white/30">
                    <Target className="w-4 h-4 mr-1" />
                    12 Day Streak
                  </Badge>
                </FloatingElement>
                <FloatingElement>
                  <Badge className="glass text-white border-white/30">
                    <Zap className="w-4 h-4 mr-1" />
                    Level 8
                  </Badge>
                </FloatingElement>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with Stagger Animation */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <GlassCard delay={index * 0.1} className="p-5 rounded-2xl border-border/50 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`text-${stat.color} p-3 rounded-xl bg-${stat.color}/10 mb-3 w-fit`}
                >
                  {stat.icon}
                </motion.div>
                <motion.p 
                  className="text-3xl font-black group-hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quick Access with Hover Effects */}
        <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <GlassCard 
                  delay={index * 0.1}
                  className="p-6 rounded-2xl cursor-pointer border-border/50"
                  onClick={() => navigate(action.path)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-glow`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {action.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Main Content with Glass Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Workout */}
          <AnimatedCard delay={0.2}>
            <GlassCard className="p-6 rounded-2xl border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <motion.div 
                      className="p-2 bg-primary/10 rounded-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </motion.div>
                    Today's Workout
                  </h3>
                  <p className="text-muted-foreground mt-2">Upper Body Strength</p>
                </div>
                <Badge variant="outline" className="glass border-primary/30 text-primary flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  45 min
                </Badge>
              </div>
              <div className="space-y-4">
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
                    <motion.div 
                      key={i} 
                      className="glass-card p-3 rounded-xl hover:bg-muted/40 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{exercise.name}</span>
                        <Badge variant="outline" className="text-xs">{exercise.sets}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    variant="premium"
                    onClick={() => navigate("/workout")}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Workout
                  </Button>
                </motion.div>
              </div>
            </GlassCard>
          </AnimatedCard>

          {/* Today's Nutrition */}
          <AnimatedCard delay={0.3}>
            <GlassCard className="p-6 rounded-2xl border-border/50">
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <motion.div 
                    className="p-2 bg-accent/10 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Apple className="h-5 w-5 text-accent" />
                  </motion.div>
                  Today's Nutrition
                </h3>
                <p className="text-muted-foreground mt-2">Track your macros and meals</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Calories", value: "2,150", color: "primary", progress: 65 },
                    { label: "Protein", value: "145g", color: "secondary", progress: 72 },
                    { label: "Carbs", value: "185g", color: "accent", progress: 58 }
                  ].map((macro, i) => (
                    <motion.div 
                      key={i} 
                      className={`glass-card text-center p-4 rounded-xl`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`text-2xl font-black text-${macro.color}`}>{macro.value}</div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">{macro.label}</div>
                      <Progress value={macro.progress} className="h-1.5 mt-2" />
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    { meal: "Breakfast", desc: "Oats with berries", cal: "450 cal" },
                    { meal: "Lunch", desc: "Chicken & rice bowl", cal: "680 cal" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="glass-card p-3 rounded-xl hover:bg-muted/40 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{item.meal}</div>
                          <div className="text-sm text-muted-foreground">{item.desc}</div>
                        </div>
                        <Badge variant="outline">{item.cal}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-2 hover:bg-accent/10 hover:border-accent"
                    size="lg"
                    onClick={() => navigate("/diet")}
                  >
                    Log Meal
                  </Button>
                </motion.div>
              </div>
            </GlassCard>
          </AnimatedCard>
        </div>

        {/* Floating AI Chatbot Button */}
        <motion.div 
          className="fixed bottom-24 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.3)",
                "0 0 40px hsl(var(--primary) / 0.6)",
                "0 0 20px hsl(var(--primary) / 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Button
              size="icon"
              variant="premium"
              className="h-16 w-16 rounded-full"
              onClick={() => navigate("/ai-chat")}
            >
              <MessageCircle className="h-7 w-7" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EnhancedDashboard;
