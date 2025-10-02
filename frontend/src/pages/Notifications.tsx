import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Trophy,
  Heart,
  Users,
  Zap,
  TrendingUp,
  CheckCircle2,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "achievement",
      icon: <Trophy className="h-5 w-5" />,
      title: "Achievement Unlocked!",
      message: "You've completed 10 workouts this month",
      time: "5 min ago",
      read: false,
      color: "primary"
    },
    {
      id: 2,
      type: "social",
      icon: <Heart className="h-5 w-5" />,
      title: "Sarah liked your post",
      message: "Your progress photo got 15 new likes",
      time: "1 hour ago",
      read: false,
      color: "destructive"
    },
    {
      id: 3,
      type: "community",
      icon: <Users className="h-5 w-5" />,
      title: "New Challenge Available",
      message: "30-Day Plank Challenge starts tomorrow",
      time: "3 hours ago",
      read: false,
      color: "accent"
    },
    {
      id: 4,
      type: "workout",
      icon: <Zap className="h-5 w-5" />,
      title: "Time for your workout!",
      message: "Today's workout: Upper Body Strength",
      time: "5 hours ago",
      read: true,
      color: "primary"
    },
    {
      id: 5,
      type: "progress",
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Weekly Progress Report",
      message: "You burned 15% more calories this week!",
      time: "1 day ago",
      read: true,
      color: "accent"
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast.success("Marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconBgColor = (color: string) => {
    switch(color) {
      case "primary": return "bg-primary/10";
      case "destructive": return "bg-destructive/10";
      case "accent": return "bg-accent/10";
      default: return "bg-muted";
    }
  };

  const getIconColor = (color: string) => {
    switch(color) {
      case "primary": return "text-primary";
      case "destructive": return "text-destructive";
      case "accent": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 backdrop-blur-xl bg-card/95 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
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
                <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-sm text-muted-foreground">Stay updated</p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
              {unreadCount} New
            </Badge>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="w-full hover:scale-[1.02] transition-transform duration-200"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12 bg-gradient-card">
            <TabsTrigger value="all" className="text-sm font-semibold">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-sm font-semibold">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" className="text-sm font-semibold">
              Read
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.length === 0 ? (
              <Card className="border-border/50 bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up!
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notif, index) => (
                <Card 
                  key={notif.id} 
                  className={`relative overflow-hidden border-border/50 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 animate-slide-up group cursor-pointer ${
                    notif.read ? "opacity-60" : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => !notif.read && markAsRead(notif.id)}
                >
                  {!notif.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  )}
                  <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-full ${getIconBgColor(notif.color)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={getIconColor(notif.color)}>
                          {notif.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                            {notif.title}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {notifications.filter(n => !n.read).map((notif, index) => (
              <Card 
                key={notif.id} 
                className="relative overflow-hidden border-border/50 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 animate-slide-up group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <CardContent className="p-4 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full ${getIconBgColor(notif.color)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={getIconColor(notif.color)}>
                        {notif.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                          {notif.title}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="read" className="space-y-3">
            {notifications.filter(n => n.read).map((notif, index) => (
              <Card 
                key={notif.id} 
                className="relative overflow-hidden border-border/50 opacity-60 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full ${getIconBgColor(notif.color)} flex items-center justify-center flex-shrink-0`}>
                      <div className={getIconColor(notif.color)}>
                        {notif.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-sm">{notif.title}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
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

export default Notifications;
