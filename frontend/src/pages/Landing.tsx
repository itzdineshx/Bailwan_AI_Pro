import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Apple, TrendingUp, Users, Zap, Target, Sparkles, Brain, Award, Shield, Heart, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "AI-Powered Plans",
      description: "Personalized workout and nutrition plans generated instantly by advanced AI"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Smart Tracking",
      description: "Track workouts, meals, and progress with intelligent analytics and insights"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Real Results",
      description: "Data-driven approach to help you achieve your fitness goals faster"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Powered",
      description: "Join challenges, share progress, and stay motivated with like-minded athletes"
    },
    {
      icon: <Apple className="h-8 w-8" />,
      title: "Nutrition Mastery",
      description: "Smart meal planning with barcode scanner and macro tracking"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Adaptive Training",
      description: "Workouts that evolve with you based on performance and recovery"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Fitness transformation journey with AI coaching" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in space-y-8">
            {/* Badge */}
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md px-4 py-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Fitness Revolution
            </Badge>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              Transform Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/80 animate-pulse-glow">
                Body & Mind
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto font-medium text-white/95 leading-relaxed">
              Your personal AI fitness coach with real-time workout tracking, smart nutrition plans, 
              and a thriving community to keep you crushing your goals
            </p>
            
            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">AI Support</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto text-lg px-12"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="glass"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto text-lg"
              >
                Sign In
              </Button>
            </div>
            
            <p className="text-sm text-white/70 mt-4">No credit card required • 7-day free trial</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete fitness ecosystem designed to help you reach your goals faster than ever
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in border-border/50 bg-gradient-card overflow-hidden relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-premium flex items-center justify-center text-white mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md px-4 py-2 text-sm font-semibold">
              <Award className="w-4 h-4 mr-2" />
              Join 10,000+ Success Stories
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
              Ready to Start Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Epic Transformation?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of athletes who are already crushing their goals with AI-powered coaching
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-white">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>7-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                <span>Instant AI Plan</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="glass"
                onClick={() => navigate("/signup")}
                className="text-lg px-12 hover:scale-110"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-lg bg-white text-primary hover:bg-white/90 border-0"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-3xl font-black mb-3 bg-gradient-premium bg-clip-text text-transparent">
                GymFitAI Pro
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your AI-powered fitness companion for workouts, nutrition, and community support
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">iOS</Button>
                <Button size="sm" variant="outline">Android</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-foreground">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI Workouts</li>
                <li>Meal Planning</li>
                <li>Progress Tracking</li>
                <li>Community</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 GymFitAI Pro. All rights reserved. Built with AI excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
