import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Trophy, 
  Flame, 
  Users, 
  Target,
  Calendar,
  Crown,
  TrendingUp,
  Medal,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Challenges = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  const activeChallenges = [
    {
      id: 1,
      title: "30-Day Fitness Challenge",
      description: "Complete 30 workouts in 30 days",
      progress: 18,
      total: 30,
      participants: 1247,
      reward: "500 XP + Gold Badge",
      daysLeft: 12,
      icon: <Flame className="h-6 w-6" />,
      color: "primary"
    },
    {
      id: 2,
      title: "Protein Power Week",
      description: "Hit protein goals 7 days straight",
      progress: 4,
      total: 7,
      participants: 892,
      reward: "300 XP + Nutrition Badge",
      daysLeft: 3,
      icon: <Target className="h-6 w-6" />,
      color: "secondary"
    },
    {
      id: 3,
      title: "10K Steps Daily",
      description: "Walk 10,000 steps every day this week",
      progress: 5,
      total: 7,
      participants: 2134,
      reward: "400 XP + Walker Badge",
      daysLeft: 2,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "accent"
    }
  ];

  const availableChallenges = [
    {
      id: 4,
      title: "Beast Mode: 100 Workouts",
      description: "Complete 100 workouts in 90 days",
      participants: 3421,
      reward: "1000 XP + Diamond Badge",
      difficulty: "Hard",
      duration: "90 days"
    },
    {
      id: 5,
      title: "Early Bird Special",
      description: "Workout before 7 AM for 14 days",
      participants: 567,
      reward: "600 XP + Morning Warrior Badge",
      difficulty: "Medium",
      duration: "14 days"
    },
    {
      id: 6,
      title: "Hydration Hero",
      description: "Drink 8 glasses of water daily for 21 days",
      participants: 1891,
      reward: "350 XP + Hydration Badge",
      difficulty: "Easy",
      duration: "21 days"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Johnson", points: 15420, streak: 47, avatar: "AJ" },
    { rank: 2, name: "Sarah Miller", points: 14890, streak: 42, avatar: "SM" },
    { rank: 3, name: "Mike Chen", points: 13567, streak: 38, avatar: "MC" },
    { rank: 4, name: "Emma Davis", points: 12234, streak: 35, avatar: "ED" },
    { rank: 5, name: "You", points: 11890, streak: 32, avatar: "JD", isUser: true },
    { rank: 6, name: "Chris Lee", points: 10456, streak: 28, avatar: "CL" },
    { rank: 7, name: "Lisa Wang", points: 9823, streak: 25, avatar: "LW" }
  ];

  const handleJoinChallenge = (challengeId: number) => {
    toast.success("Challenge joined! Let's crush it! 💪");
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-primary";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-500";
    return "text-muted-foreground";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-primary" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-500" />;
    return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 backdrop-blur-xl bg-card/95 shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/community")}
              className="hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Challenges</h1>
              <p className="text-sm text-muted-foreground">Compete and earn rewards</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Trophy className="w-3 h-3 mr-1" />
            Rank #5
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        {/* Hero Stats */}
        <Card className="relative overflow-hidden bg-gradient-hero text-white shadow-glow animate-slide-down">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse" />
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center animate-float">
                <div className="h-12 w-12 mx-auto rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="text-2xl font-black">3</div>
                <div className="text-sm text-white/80">Active</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.2s" }}>
                <div className="h-12 w-12 mx-auto rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                  <Star className="h-6 w-6" />
                </div>
                <div className="text-2xl font-black">11.8K</div>
                <div className="text-sm text-white/80">XP Points</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.4s" }}>
                <div className="h-12 w-12 mx-auto rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                  <Medal className="h-6 w-6" />
                </div>
                <div className="text-2xl font-black">12</div>
                <div className="text-sm text-white/80">Badges</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50">
            <TabsTrigger value="active" className="text-sm font-semibold">Active</TabsTrigger>
            <TabsTrigger value="available" className="text-sm font-semibold">Available</TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-sm font-semibold">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Active Challenges */}
          <TabsContent value="active" className="space-y-4 mt-6">
            {activeChallenges.map((challenge, index) => (
              <Card 
                key={challenge.id}
                className="relative overflow-hidden hover:shadow-glow transition-all duration-500 animate-slide-up border-border/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-${challenge.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {challenge.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {challenge.daysLeft}d left
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progress</span>
                      <span className="text-sm font-bold text-primary">
                        {challenge.progress}/{challenge.total} days
                      </span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span>{challenge.reward}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Available Challenges */}
          <TabsContent value="available" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {availableChallenges.map((challenge, index) => (
                <Card 
                  key={challenge.id}
                  className="relative overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in border-border/50 group"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{challenge.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={
                          challenge.difficulty === "Hard" 
                            ? "border-red-500/30 bg-red-500/10 text-red-600" 
                            : challenge.difficulty === "Medium"
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-green-500/30 bg-green-500/10 text-green-600"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants.toLocaleString()} joined</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{challenge.duration}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border/30">
                      <div className="text-sm font-semibold mb-3 flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-primary" />
                        {challenge.reward}
                      </div>
                      <Button 
                        className="w-full hover:scale-105 transition-transform duration-200" 
                        variant="premium"
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        Join Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="mt-6">
            <Card className="border-border/50 bg-gradient-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-premium opacity-3" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up ${
                      user.isUser 
                        ? "bg-primary/10 border-2 border-primary/30 shadow-glow" 
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    <Avatar className="h-10 w-10 border-2 border-primary/30">
                      <AvatarFallback className="bg-gradient-premium text-white font-bold text-sm">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className={`font-bold ${user.isUser ? "text-primary" : ""}`}>
                        {user.name}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {user.points.toLocaleString()} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          {user.streak} day streak
                        </span>
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <div className={`text-2xl ${getRankColor(user.rank)}`}>
                        {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Challenges;
