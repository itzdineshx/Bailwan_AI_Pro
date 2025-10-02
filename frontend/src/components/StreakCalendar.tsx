import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Calendar as CalendarIcon } from "lucide-react";

export const StreakCalendar = () => {
  // Generate calendar for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Mock workout data - days where user worked out
  const workoutDays = [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 26, 27, 29, 31];
  const currentDay = today.getDate();
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const currentStreak = 12;
  const longestStreak = 18;

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getDayStatus = (day: number | null) => {
    if (!day) return 'empty';
    if (day > currentDay) return 'future';
    if (workoutDays.includes(day)) return 'completed';
    return 'missed';
  };

  const getDayClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary text-primary-foreground font-bold hover:scale-110 shadow-card';
      case 'missed':
        return 'bg-muted/50 text-muted-foreground hover:bg-muted';
      case 'future':
        return 'bg-background text-muted-foreground border border-border/30';
      default:
        return 'invisible';
    }
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-glow transition-all duration-500 border-border/50 bg-gradient-card group">
      <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Workout Calendar
            </CardTitle>
            <CardDescription>{monthNames[currentMonth]} {currentYear}</CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
            <Flame className="h-3 w-3 mr-1" />
            {currentStreak} Day Streak
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Current Streak</span>
            </div>
            <div className="text-3xl font-black text-primary">{currentStreak} days</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/15 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">Longest Streak</span>
            </div>
            <div className="text-3xl font-black text-secondary">{longestStreak} days</div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-3">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center text-xs font-bold text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const status = getDayStatus(day);
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-300 cursor-pointer ${getDayClasses(status)}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/30">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-primary"></div>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-muted/50"></div>
            <span className="text-xs text-muted-foreground">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-border/30"></div>
            <span className="text-xs text-muted-foreground">Future</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
