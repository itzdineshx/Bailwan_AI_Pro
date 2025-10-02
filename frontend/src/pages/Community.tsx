import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Trophy, 
  TrendingUp,
  Flame,
  Award,
  Users,
  Target,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const posts = [
    {
      id: 1,
      author: "Sarah M.",
      authorAvatar: "SM",
      time: "2h ago",
      content: "Just crushed a 5K PR! From 28:30 to 25:45 in 3 months. Consistency is key! 🏃‍♀️",
      likes: 234,
      comments: 18,
      image: true,
      badge: "Elite"
    },
    {
      id: 2,
      author: "Mike D.",
      authorAvatar: "MD",
      time: "4h ago",
      content: "50 days streak! The app's AI coach keeps me on track even when motivation is low 💪",
      likes: 189,
      comments: 24,
      badge: "Champion"
    },
    {
      id: 3,
      author: "Emma W.",
      authorAvatar: "EW",
      time: "6h ago",
      content: "Meal prep Sunday complete! High protein, balanced macros. Who else preps on Sundays? 🍱",
      likes: 312,
      comments: 45,
      image: true,
      badge: "Rising Star"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "30-Day Plank Challenge",
      participants: 1234,
      daysLeft: 15,
      reward: "Plank Master Badge",
      icon: <Trophy className="h-5 w-5" />,
      color: "primary"
    },
    {
      id: 2,
      title: "Hydration Hero",
      participants: 892,
      daysLeft: 7,
      reward: "1000 XP",
      icon: <Flame className="h-5 w-5" />,
      color: "accent"
    },
    {
      id: 3,
      title: "Cardio King",
      participants: 567,
      daysLeft: 21,
      reward: "Premium Feature Unlock",
      icon: <Zap className="h-5 w-5" />,
      color: "secondary"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Thunder", points: 12450, badge: "🏆" },
    { rank: 2, name: "Jessica Power", points: 11890, badge: "🥈" },
    { rank: 3, name: "Chris Beast", points: 10234, badge: "🥉" },
    { rank: 4, name: "You", points: 8945, badge: "⭐", isUser: true },
    { rank: 5, name: "Sam Fit", points: 8123, badge: "" }
  ];

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast.success("Post liked! 💙");
    }
  };

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
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Community</h1>
              <p className="text-sm text-muted-foreground">Connect & Compete</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
            <Users className="w-3 h-3 mr-1" />
            10.2K Online
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12 bg-gradient-card">
            <TabsTrigger value="feed" className="text-sm font-semibold">Feed</TabsTrigger>
            <TabsTrigger value="challenges" className="text-sm font-semibold">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-sm font-semibold">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            {/* Quick Stats Banner */}
            <Card className="relative overflow-hidden bg-gradient-hero text-white shadow-glow animate-slide-down">
              <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse" />
              <CardContent className="p-6 relative z-10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="animate-float">
                    <div className="text-3xl font-black mb-1">12</div>
                    <div className="text-sm text-white/80">Day Streak</div>
                  </div>
                  <div className="animate-float" style={{ animationDelay: "0.3s" }}>
                    <div className="text-3xl font-black mb-1">45</div>
                    <div className="text-sm text-white/80">Friends</div>
                  </div>
                  <div className="animate-float" style={{ animationDelay: "0.6s" }}>
                    <div className="text-3xl font-black mb-1">8.9K</div>
                    <div className="text-sm text-white/80">Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="relative overflow-hidden hover:shadow-glow transition-all duration-500 animate-slide-up border-border/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <AvatarFallback className="bg-gradient-premium text-white font-bold">
                        {post.authorAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{post.author}</span>
                        <Badge variant="outline" className="text-xs border-primary/30 bg-primary/10 text-primary">
                          {post.badge}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.time}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-base mb-4 leading-relaxed">{post.content}</p>

                  {/* Mock Image */}
                  {post.image && (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4 flex items-center justify-center border border-border/50 group-hover:scale-[1.02] transition-transform duration-300">
                      <TrendingUp className="h-16 w-16 text-primary/30 animate-pulse" />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`gap-2 hover:scale-110 transition-transform duration-200 ${likedPosts.includes(post.id) ? "text-primary" : ""}`}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current animate-pulse" : ""}`} />
                      <span className="font-semibold">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 transition-transform duration-200">
                      <MessageCircle className="h-4 w-4" />
                      <span className="font-semibold">{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 transition-transform duration-200">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4">
            <Card className="bg-gradient-hero text-white shadow-glow animate-slide-down">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
                    <Target className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">Join Active Challenges</h3>
                    <p className="text-sm text-white/80">Compete, earn rewards, and level up!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {challenges.map((challenge, index) => (
              <Card 
                key={challenge.id} 
                className="relative overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-1 animate-slide-up group border-border/50 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate("/challenges")}
              >
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`h-14 w-14 rounded-2xl bg-${challenge.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{challenge.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {challenge.participants.toLocaleString()} joined
                        </span>
                        <span>•</span>
                        <span>{challenge.daysLeft} days left</span>
                      </div>
                      <Badge variant="outline" className="border-accent/30 bg-accent/10 text-accent">
                        <Award className="w-3 h-3 mr-1" />
                        {challenge.reward}
                      </Badge>
                    </div>
                    <Button variant="premium" size="sm" className="hover:scale-110 transition-transform duration-200" onClick={(e) => {e.stopPropagation(); toast.success("Challenge joined!");}}>
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full mt-4 hover:scale-105 transition-transform duration-200"
              onClick={() => navigate("/challenges")}
            >
              View All Challenges
            </Button>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="bg-gradient-hero text-white shadow-glow animate-slide-down">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
                      <Trophy className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Global Rankings</h3>
                      <p className="text-sm text-white/80">Top performers this month</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 border-white/30 backdrop-blur-md text-lg px-4 py-2 animate-pulse-glow">
                    #4
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {leaderboard.map((user, index) => (
              <Card 
                key={user.rank} 
                className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-1 animate-slide-up ${
                  user.isUser 
                    ? "border-2 border-primary shadow-glow" 
                    : "hover:shadow-card border-border/50"
                }`}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-black text-lg transition-transform duration-300 hover:scale-110 ${
                      user.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white animate-pulse" :
                      user.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white" :
                      user.rank === 3 ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white" :
                      user.isUser ? "bg-gradient-premium text-white" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {user.badge || user.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg flex items-center gap-2">
                        {user.name}
                        {user.isUser && (
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-xs animate-pulse-glow">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.points.toLocaleString()} points
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <Trophy className={`h-6 w-6 animate-float ${
                        user.rank === 1 ? "text-yellow-500" :
                        user.rank === 2 ? "text-gray-400" :
                        "text-orange-500"
                      }`} />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Community;
