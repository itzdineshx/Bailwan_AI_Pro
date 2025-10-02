import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Zap } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = localStorage.getItem("user");
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-pulse" />
      
      <div className="relative z-10 text-center animate-scale-in">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative h-32 w-32 mx-auto bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/30 flex items-center justify-center shadow-glow animate-float">
            <Dumbbell className="h-16 w-16 text-white animate-pulse" />
            <Zap className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-bounce" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl font-black text-white mb-4 animate-fade-in tracking-tight">
          GymFit<span className="text-primary">AI</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-white/90 font-semibold animate-fade-in mb-8" style={{ animationDelay: "300ms" }}>
          Your AI-Powered Fitness Journey
        </p>

        {/* Loading Animation */}
        <div className="flex items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default Splash;
