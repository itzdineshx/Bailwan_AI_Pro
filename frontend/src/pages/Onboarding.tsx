import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    workoutType: ""
  });

  const [medicalInfo, setMedicalInfo] = useState({
    injuries: "",
    conditions: "",
    activityLevel: ""
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save all onboarding data including medical info
      const completeData = {
        ...formData,
        ...medicalInfo
      };
      localStorage.setItem("onboarding", JSON.stringify(completeData));
      localStorage.setItem("onboardingComplete", "true");
      toast.success("Profile created! Generating your personalized plan...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-2xl animate-scale-in relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-center mb-3 bg-gradient-premium bg-clip-text text-transparent">Let's Get to Know You</h1>
          <p className="text-center text-muted-foreground mb-4 text-lg">
            Step {step} of {totalSteps}
          </p>
          <Progress value={progress} className="h-3 shadow-inner" />
        </div>

        <Card className="shadow-glow border-border/50 bg-gradient-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-premium opacity-5" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-black">
              {step === 1 && "Your Fitness Goals"}
              {step === 2 && "Your Stats"}
              {step === 3 && "Medical History"}
              {step === 4 && "Workout Preferences"}
            </CardTitle>
            <CardDescription className="text-base">
              {step === 1 && "What do you want to achieve?"}
              {step === 2 && "Help us personalize your plan"}
              {step === 3 && "Any injuries or conditions we should know about?"}
              {step === 4 && "How do you prefer to train?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <RadioGroup value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                {["Fat Loss", "Muscle Gain", "Strength", "Endurance", "Overall Health"].map((goal) => (
                  <div key={goal} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={goal} id={goal} />
                    <Label htmlFor={goal} className="cursor-pointer flex-1 font-medium">{goal}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {step === 2 && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="injuries">Any Current Injuries? (Optional)</Label>
                  <Input
                    id="injuries"
                    placeholder="e.g., Lower back pain, knee injury..."
                    value={medicalInfo.injuries}
                    onChange={(e) => setMedicalInfo({ ...medicalInfo, injuries: e.target.value })}
                    className="h-12 border-border/50 focus:border-primary focus:shadow-card transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conditions">Medical Conditions? (Optional)</Label>
                  <Input
                    id="conditions"
                    placeholder="e.g., Asthma, diabetes..."
                    value={medicalInfo.conditions}
                    onChange={(e) => setMedicalInfo({ ...medicalInfo, conditions: e.target.value })}
                    className="h-12 border-border/50 focus:border-primary focus:shadow-card transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current Activity Level</Label>
                  <RadioGroup value={medicalInfo.activityLevel} onValueChange={(value) => setMedicalInfo({ ...medicalInfo, activityLevel: value })}>
                    {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"].map((level) => (
                      <div key={level} className="flex items-center space-x-3 border border-border/50 rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                        <RadioGroupItem value={level} id={level} />
                        <Label htmlFor={level} className="cursor-pointer flex-1 font-semibold">{level}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 4 && (
              <RadioGroup value={formData.workoutType} onValueChange={(value) => setFormData({ ...formData, workoutType: value })}>
                {["Gym", "Home", "Bodyweight", "Cardio", "Yoga"].map((type) => (
                  <div key={type} className="flex items-center space-x-3 border border-border/50 rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="cursor-pointer flex-1 font-semibold">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            <div className="flex gap-4 pt-6 relative z-10">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12 hover:scale-105 transition-transform duration-200">
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                variant="premium"
                className="flex-1 h-12 shadow-glow hover:scale-105"
                disabled={
                  (step === 1 && !formData.goal) ||
                  (step === 2 && (!formData.age || !formData.gender || !formData.height || !formData.weight)) ||
                  (step === 3 && !medicalInfo.activityLevel) ||
                  (step === 4 && !formData.workoutType)
                }
              >
                {step === totalSteps ? "🎉 Complete Setup" : "Next →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
