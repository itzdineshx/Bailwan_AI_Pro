import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Dumbbell, Clock, Flame, Search, Filter, Play, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Workout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("library");
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const exercises = [
    { id: 1, name: "Bench Press", sets: "4 × 10", weight: "60 kg" },
    { id: 2, name: "Dumbbell Rows", sets: "4 × 12", weight: "25 kg" },
    { id: 3, name: "Shoulder Press", sets: "3 × 10", weight: "40 kg" },
    { id: 4, name: "Bicep Curls", sets: "3 × 12", weight: "15 kg" },
    { id: 5, name: "Tricep Extensions", sets: "3 × 12", weight: "20 kg" },
    { id: 6, name: "Face Pulls", sets: "3 × 15", weight: "10 kg" }
  ];

  const workoutPrograms = [
    {
      id: 1,
      title: "Full Body Blast",
      difficulty: "Beginner",
      duration: "30 min",
      calories: 250,
      exercises: 8,
      equipment: "Bodyweight",
      description: "Perfect for beginners, no equipment needed",
      category: "strength"
    },
    {
      id: 2,
      title: "Upper Body Power",
      difficulty: "Intermediate",
      duration: "45 min",
      calories: 320,
      exercises: 10,
      equipment: "Gym",
      description: "Build upper body strength with compound movements",
      category: "strength"
    },
    {
      id: 3,
      title: "HIIT Cardio Burn",
      difficulty: "Advanced",
      duration: "25 min",
      calories: 400,
      exercises: 12,
      equipment: "Bodyweight",
      description: "High-intensity intervals for maximum fat burn",
      category: "cardio"
    },
    {
      id: 4,
      title: "Leg Day Destroyer",
      difficulty: "Intermediate",
      duration: "50 min",
      calories: 380,
      exercises: 9,
      equipment: "Gym",
      description: "Complete leg workout for strength and size",
      category: "strength"
    },
    {
      id: 5,
      title: "Yoga Flow",
      difficulty: "Beginner",
      duration: "40 min",
      calories: 150,
      exercises: 15,
      equipment: "Mat",
      description: "Relaxing yoga flow for flexibility and mindfulness",
      category: "flexibility"
    },
    {
      id: 6,
      title: "Core Crusher",
      difficulty: "Intermediate",
      duration: "20 min",
      calories: 180,
      exercises: 8,
      equipment: "Bodyweight",
      description: "Intense ab workout for a strong core",
      category: "core"
    }
  ];

  const categories = [
    { value: "all", label: "All" },
    { value: "strength", label: "Strength" },
    { value: "cardio", label: "Cardio" },
    { value: "flexibility", label: "Flexibility" },
    { value: "core", label: "Core" }
  ];

  const filteredWorkouts = workoutPrograms.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExercise = (id: number) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(e => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
      toast.success("Exercise completed! 💪");
    }
  };

  const progress = (completedExercises.length / exercises.length) * 100;

  const handleFinish = () => {
    if (completedExercises.length === exercises.length) {
      toast.success("Workout completed! Great job! 🎉");
      navigate("/dashboard");
    } else {
      toast.error("Please complete all exercises");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Beginner": return "border-green-500/30 bg-green-500/10 text-green-600";
      case "Intermediate": return "border-primary/30 bg-primary/10 text-primary";
      case "Advanced": return "border-red-500/30 bg-red-500/10 text-red-600";
      default: return "border-border/30 bg-muted/10";
    }
  };

  const startWorkout = () => {
    setActiveTab("current");
    toast.success("Workout started! Let's go! 💪");
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
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Workouts</h1>
              <p className="text-sm text-muted-foreground">Train & achieve your goals</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Dumbbell className="w-3 h-3 mr-1" />
            {filteredWorkouts.length} Programs
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 mb-6 bg-muted/50">
            <TabsTrigger value="library" className="text-sm font-semibold">Workout Library</TabsTrigger>
            <TabsTrigger value="current" className="text-sm font-semibold">Current Workout</TabsTrigger>
          </TabsList>

          {/* Workout Library Tab */}
          <TabsContent value="library" className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-card border-border/50 bg-gradient-card relative overflow-hidden animate-slide-down">
              <div className="absolute inset-0 bg-gradient-premium opacity-5" />
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search workouts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-border/50 focus:border-primary focus:shadow-card transition-all duration-300"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="h-12 w-12 hover:scale-110 transition-transform duration-200">
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map(cat => (
                    <Button
                      key={cat.value}
                      variant={selectedCategory === cat.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.value)}
                      className="whitespace-nowrap"
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workout Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout, index) => (
                <Card 
                  key={workout.id} 
                  className="relative overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in group border-border/50 cursor-pointer"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  {/* Workout Image Placeholder */}
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-pulse" />
                    <Dumbbell className="h-16 w-16 text-primary/40 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <Badge className={`absolute top-3 right-3 ${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </Badge>
                  </div>

                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{workout.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{workout.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold">{workout.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Flame className="h-3 w-3 text-primary" />
                        <span className="font-semibold">{workout.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Dumbbell className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold">{workout.exercises} ex</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <Badge variant="outline" className="text-xs">{workout.equipment}</Badge>
                      <Button 
                        size="sm" 
                        variant="premium" 
                        className="group-hover:scale-110 transition-transform duration-200"
                        onClick={startWorkout}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorkouts.length === 0 && (
              <Card className="shadow-card border-border/50 bg-gradient-card p-12 text-center">
                <Dumbbell className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No workouts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </Card>
            )}
          </TabsContent>

          {/* Current Workout Tab */}
          <TabsContent value="current" className="space-y-6">
            {/* Progress */}
            <Card className="shadow-glow border-border/50 relative overflow-hidden bg-gradient-card animate-slide-down">
              <div className="absolute inset-0 bg-gradient-premium opacity-5" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-semibold">Workout Progress</span>
                  <span className="text-sm font-black text-primary">
                    {completedExercises.length}/{exercises.length} completed
                  </span>
                </div>
                <Progress value={progress} className="h-3 shadow-inner" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progress === 100 ? "🎉 All exercises completed!" : `${Math.round(progress)}% complete - Keep pushing!`}
                </p>
              </CardContent>
            </Card>

            {/* Exercises */}
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <Card 
                  key={exercise.id}
                  className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-scale-in group ${
                    completedExercises.includes(exercise.id) 
                      ? "border-2 border-primary bg-primary/10 shadow-glow" 
                      : "hover:border-primary/50 hover:shadow-card border-border/50"
                  }`}
                  style={{ animationDelay: `${index * 75}ms` }}
                  onClick={() => toggleExercise(exercise.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-premium transition-opacity duration-500 ${
                    completedExercises.includes(exercise.id) ? "opacity-10" : "opacity-0 group-hover:opacity-5"
                  }`} />
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 ${
                          completedExercises.includes(exercise.id)
                            ? "bg-gradient-premium text-white shadow-glow animate-pulse scale-110"
                            : "bg-muted/60 text-muted-foreground group-hover:scale-110"
                        }`}>
                          {completedExercises.includes(exercise.id) ? (
                            <Check className="h-6 w-6 animate-scale-in" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <div className={`text-lg font-bold transition-colors ${
                            completedExercises.includes(exercise.id) ? "text-primary" : "group-hover:text-primary"
                          }`}>
                            {exercise.name}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                            <span>{exercise.sets}</span>
                            <span>•</span>
                            <span>{exercise.weight}</span>
                          </div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Finish Button */}
            <Button 
              variant={completedExercises.length === exercises.length ? "premium" : "outline"}
              className="w-full mt-8 mb-20 shadow-card hover:shadow-glow" 
              size="lg"
              onClick={handleFinish}
              disabled={completedExercises.length !== exercises.length}
            >
              {completedExercises.length === exercises.length ? "🏆 Finish Workout" : `Complete ${exercises.length - completedExercises.length} More`}
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Workout;
