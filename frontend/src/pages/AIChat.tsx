import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI fitness coach. How can I help you today? 💪",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("workout") || lowerMessage.includes("exercise")) {
      return "Great question! Based on your profile, I recommend focusing on compound movements. Would you like me to suggest a specific routine for today?";
    }
    if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition") || lowerMessage.includes("meal")) {
      return "Nutrition is key! Based on your goals, you should aim for a high-protein diet. Are you tracking your macros consistently?";
    }
    if (lowerMessage.includes("tired") || lowerMessage.includes("fatigue")) {
      return "It sounds like you might need a rest day or active recovery. Have you been getting enough sleep? I can adjust your workout intensity if needed.";
    }
    if (lowerMessage.includes("weight") || lowerMessage.includes("progress")) {
      return "Progress takes time! Based on your current trajectory, you're on track to reach your goals. Keep up the consistency! 📈";
    }
    if (lowerMessage.includes("motivation") || lowerMessage.includes("give up")) {
      return "Remember why you started! Every workout counts, even the tough ones. You've got a 12-day streak going - that's amazing! 🔥";
    }
    
    return "That's a great question! I'm here to help with workouts, nutrition, motivation, and tracking your progress. What specific aspect would you like to discuss?";
  };

  const handleSend = () => {
    if (!inputText.trim()) {
      toast.error("Please type a message");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputText),
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-gradient-card border-b sticky top-0 z-50 shadow-card backdrop-blur-xl bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft />
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-premium flex items-center justify-center shadow-glow animate-pulse">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AI Coach</h1>
              <p className="text-xs text-muted-foreground">Always here to help 24/7</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-card ${
                    message.sender === "ai" 
                      ? "bg-gradient-premium animate-pulse" 
                      : "bg-secondary"
                  }`}>
                    {message.sender === "ai" ? (
                      <Bot className="h-5 w-5 text-white" />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <Card className={`p-4 border-border/50 ${
                    message.sender === "ai" 
                      ? "bg-gradient-card shadow-card" 
                      : "bg-gradient-premium text-white shadow-glow"
                  }`}>
                    <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                    <p className={`text-xs mt-2 font-medium ${
                      message.sender === "ai" ? "text-muted-foreground" : "text-white/70"
                    }`}>
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </Card>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-gradient-card sticky bottom-0 shadow-card backdrop-blur-xl bg-card/95">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          <div className="flex gap-3">
            <Input
              placeholder="Ask me anything about fitness..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 border-2 focus:border-primary"
            />
            <Button size="lg" onClick={handleSend} className="px-6 shadow-card hover:shadow-glow" variant="premium">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="border-2 hover:border-primary hover:bg-primary/10"
              onClick={() => {
                setInputText("Suggest a workout for today");
                setTimeout(handleSend, 100);
              }}
            >
              💪 Workout suggestions
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-2 hover:border-primary hover:bg-primary/10"
              onClick={() => {
                setInputText("What should I eat?");
                setTimeout(handleSend, 100);
              }}
            >
              🍎 Meal ideas
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-2 hover:border-primary hover:bg-primary/10"
              onClick={() => {
                setInputText("How's my progress?");
                setTimeout(handleSend, 100);
              }}
            >
              📈 Check progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
