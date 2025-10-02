import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { TrendingDown, TrendingUp, Plus, Scale } from "lucide-react";
import { toast } from "sonner";

interface WeightEntry {
  date: string;
  weight: number;
}

export const WeightTracker = () => {
  const [entries, setEntries] = useState<WeightEntry[]>([
    { date: "2025-01-01", weight: 76.0 },
    { date: "2025-01-08", weight: 75.2 },
    { date: "2025-01-15", weight: 74.5 },
    { date: "2025-01-22", weight: 73.8 },
    { date: "2025-01-29", weight: 73.0 },
    { date: "2025-02-05", weight: 72.3 }
  ]);
  
  const [newWeight, setNewWeight] = useState("");
  const [open, setOpen] = useState(false);

  const currentWeight = entries[entries.length - 1]?.weight || 0;
  const startWeight = entries[0]?.weight || 0;
  const totalLoss = startWeight - currentWeight;
  const goalWeight = 68;
  const remaining = currentWeight - goalWeight;

  const handleAddWeight = () => {
    if (!newWeight) {
      toast.error("Please enter your weight");
      return;
    }

    const weight = parseFloat(newWeight);
    if (isNaN(weight) || weight < 30 || weight > 300) {
      toast.error("Please enter a valid weight");
      return;
    }

    const entry: WeightEntry = {
      date: new Date().toISOString().split('T')[0],
      weight
    };

    setEntries([...entries, entry]);
    setNewWeight("");
    setOpen(false);
    toast.success("Weight logged successfully! 📊");
  };

  const maxWeight = Math.max(...entries.map(e => e.weight));
  const minWeight = Math.min(...entries.map(e => e.weight));

  return (
    <Card className="relative overflow-hidden hover:shadow-glow transition-all duration-500 border-border/50 bg-gradient-card group">
      <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Weight Progress
            </CardTitle>
            <CardDescription>Track your weight journey</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="premium" className="hover:scale-110 transition-transform duration-200">
                <Plus className="h-4 w-4 mr-1" />
                Log
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Your Weight</DialogTitle>
                <DialogDescription>Track your progress by logging your current weight</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="72.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button onClick={handleAddWeight} className="w-full" variant="premium">
                  Save Weight
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* Current Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
            <div className="text-2xl font-black text-primary mb-1">{currentWeight} kg</div>
            <div className="text-xs text-muted-foreground font-medium">Current</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/15 transition-colors">
            <div className="text-2xl font-black text-secondary mb-1 flex items-center justify-center gap-1">
              {totalLoss > 0 ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
              {Math.abs(totalLoss).toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Lost</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-colors">
            <div className="text-2xl font-black text-accent mb-1">{remaining.toFixed(1)} kg</div>
            <div className="text-xs text-muted-foreground font-medium">To Goal</div>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Progress Chart</span>
            <span className="text-muted-foreground">Goal: {goalWeight} kg</span>
          </div>
          <div className="space-y-3">
            {entries.slice(-6).map((entry, index) => {
              const percentage = ((maxWeight - entry.weight) / (maxWeight - minWeight)) * 100;
              return (
                <div key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="w-20 text-xs text-muted-foreground font-medium">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1 h-8 bg-muted/50 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-premium rounded-full transition-all duration-500 flex items-center justify-end pr-3 hover:shadow-glow"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs font-bold text-white drop-shadow-lg">
                        {entry.weight} kg
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prediction */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm">AI Prediction</span>
          </div>
          <p className="text-sm text-muted-foreground">
            At your current pace, you'll reach your goal weight of {goalWeight} kg in approximately{" "}
            <span className="font-bold text-primary">
              {Math.ceil((remaining / (totalLoss / entries.length)) * 7)} days
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
