import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Camera, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import BottomNav from "@/components/BottomNav";

const Diet = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([
    { id: 1, name: "Oats with berries", type: "Breakfast", calories: 450, protein: 15, carbs: 65, fats: 12, time: "8:00 AM" },
    { id: 2, name: "Chicken & rice bowl", type: "Lunch", calories: 680, protein: 48, carbs: 72, fats: 18, time: "1:00 PM" },
  ]);

  const dailyGoals = {
    calories: 2150,
    protein: 145,
    carbs: 250,
    fats: 65
  };

  const consumed = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const [newMeal, setNewMeal] = useState({
    name: "",
    type: "Snack",
    calories: "",
    protein: "",
    carbs: "",
    fats: ""
  });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast.error("Please fill in meal details");
      return;
    }

    const meal = {
      id: meals.length + 1,
      name: newMeal.name,
      type: newMeal.type,
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein) || 0,
      carbs: parseInt(newMeal.carbs) || 0,
      fats: parseInt(newMeal.fats) || 0,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMeals([...meals, meal]);
    setNewMeal({ name: "", type: "Snack", calories: "", protein: "", carbs: "", fats: "" });
    toast.success("Meal logged successfully! 🍽️");
  };

  const getPercentage = (consumed: number, goal: number) => Math.min((consumed / goal) * 100, 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 shadow-card backdrop-blur-xl bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:scale-110 transition-transform duration-200"
          >
            <ArrowLeft />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Diet & Nutrition</h1>
            <p className="text-sm text-muted-foreground">Track your daily intake</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Daily Summary */}
        <Card className="mb-6 shadow-elevated border-border/50 bg-gradient-card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Daily Summary
            </CardTitle>
            <CardDescription>Your macros for today</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Calories */}
              <div className="col-span-2 p-5 rounded-xl bg-primary/10 border-2 border-primary/20 hover:bg-primary/15 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">Calories</span>
                  <span className="text-2xl font-black text-primary">
                    {consumed.calories} / {dailyGoals.calories}
                  </span>
                </div>
                <Progress value={getPercentage(consumed.calories, dailyGoals.calories)} className="h-3" />
              </div>

              {/* Protein */}
              <div className="p-5 rounded-xl bg-secondary/10 border-2 border-secondary/20 hover:bg-secondary/15 transition-colors">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Protein</div>
                <div className="text-3xl font-black text-secondary mb-3">
                  {consumed.protein}g
                </div>
                <Progress value={getPercentage(consumed.protein, dailyGoals.protein)} className="h-2" />
                <div className="text-xs text-muted-foreground mt-2">Goal: {dailyGoals.protein}g</div>
              </div>

              {/* Carbs */}
              <div className="p-5 rounded-xl bg-accent/10 border-2 border-accent/20 hover:bg-accent/15 transition-colors">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Carbs</div>
                <div className="text-3xl font-black text-accent mb-3">
                  {consumed.carbs}g
                </div>
                <Progress value={getPercentage(consumed.carbs, dailyGoals.carbs)} className="h-2" />
                <div className="text-xs text-muted-foreground mt-2">Goal: {dailyGoals.carbs}g</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 shadow-card hover:shadow-glow" size="lg" variant="premium">
                <Plus className="mr-2 h-4 w-4" />
                Log Meal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
                <DialogDescription>Log what you've eaten</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Meal Name</Label>
                  <Input
                    placeholder="e.g. Grilled Chicken Salad"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meal Type</Label>
                  <select
                    className="w-full h-11 rounded-lg border border-input bg-background px-3"
                    value={newMeal.type}
                    onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                  >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Calories</Label>
                    <Input
                      type="number"
                      placeholder="450"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Protein (g)</Label>
                    <Input
                      type="number"
                      placeholder="30"
                      value={newMeal.protein}
                      onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Carbs (g)</Label>
                    <Input
                      type="number"
                      placeholder="45"
                      value={newMeal.carbs}
                      onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fats (g)</Label>
                    <Input
                      type="number"
                      placeholder="15"
                      value={newMeal.fats}
                      onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddMeal} className="w-full">
                  Add Meal
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="lg" className="hover:bg-accent/10 hover:border-accent/50 border-2" onClick={() => toast.info("Barcode scanner coming soon!")}>
            <Camera className="mr-2 h-4 w-4" />
            Scan
          </Button>
        </div>

        {/* Meals List */}
        <div className="space-y-4 mb-20">
          <h3 className="font-bold text-lg">Today's Meals</h3>
          {meals.map((meal) => (
            <Card key={meal.id} className="hover:shadow-glow transition-all duration-300 border-border/50 bg-gradient-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{meal.name}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{meal.type} • {meal.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary">{meal.calories}</div>
                    <div className="text-xs text-muted-foreground font-medium">calories</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center p-3 rounded-lg bg-secondary/10 border border-secondary/20 hover:bg-secondary/15 transition-colors">
                    <div className="font-bold text-lg">{meal.protein}g</div>
                    <div className="text-xs text-muted-foreground font-medium">Protein</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-colors">
                    <div className="font-bold text-lg">{meal.carbs}g</div>
                    <div className="text-xs text-muted-foreground font-medium">Carbs</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors">
                    <div className="font-bold text-lg">{meal.fats}g</div>
                    <div className="text-xs text-muted-foreground font-medium">Fats</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Diet;
