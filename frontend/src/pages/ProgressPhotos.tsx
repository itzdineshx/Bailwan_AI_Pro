import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon,
  Calendar,
  TrendingUp,
  Upload,
  Trash2,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgressPhoto {
  id: number;
  date: string;
  weight: number;
  notes: string;
  type: "front" | "side" | "back";
}

const ProgressPhotos = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<ProgressPhoto[]>([
    { id: 1, date: "2025-09-01", weight: 76, notes: "Starting point", type: "front" },
    { id: 2, date: "2025-09-15", weight: 74.5, notes: "2 weeks in - feeling stronger", type: "front" },
    { id: 3, date: "2025-10-01", weight: 72, notes: "1 month progress - amazing results!", type: "front" }
  ]);

  const handleUploadPhoto = () => {
    toast.success("Photo uploaded successfully!");
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast.success("Photo deleted");
  };

  const weightLost = photos.length > 1 ? photos[0].weight - photos[photos.length - 1].weight : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-card border-b sticky top-0 z-50 backdrop-blur-xl bg-card/95 shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/analytics")}
              className="hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">Progress Photos</h1>
              <p className="text-sm text-muted-foreground">Track your transformation</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Camera className="w-3 h-3 mr-1" />
            {photos.length} Photos
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="relative overflow-hidden bg-gradient-hero text-white shadow-glow animate-slide-down">
            <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Total Weight Lost</p>
                  <p className="text-4xl font-black">{weightLost.toFixed(1)} kg</p>
                </div>
                <TrendingUp className="h-12 w-12 text-white/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-glow transition-all duration-500 animate-slide-down border-border/50" style={{ animationDelay: '75ms' }}>
            <div className="absolute inset-0 bg-gradient-premium opacity-5" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Days Tracking</p>
                  <p className="text-4xl font-black text-primary">30</p>
                </div>
                <Calendar className="h-12 w-12 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-glow transition-all duration-500 animate-slide-down border-border/50" style={{ animationDelay: '150ms' }}>
            <div className="absolute inset-0 bg-gradient-premium opacity-5" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Photos Taken</p>
                  <p className="text-4xl font-black text-accent">{photos.length}</p>
                </div>
                <ImageIcon className="h-12 w-12 text-accent/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="shadow-card border-border/50 bg-gradient-card relative overflow-hidden animate-slide-down">
          <div className="absolute inset-0 bg-gradient-premium opacity-5" />
          <CardContent className="p-8 text-center relative z-10">
            <Camera className="h-16 w-16 mx-auto mb-4 text-primary/40 animate-pulse" />
            <h3 className="text-xl font-bold mb-2">Take a Progress Photo</h3>
            <p className="text-muted-foreground mb-6">Track your journey with regular photos</p>
            <div className="flex gap-4 justify-center">
              <Button variant="premium" className="shadow-glow hover:scale-105" onClick={handleUploadPhoto}>
                <Camera className="mr-2 h-5 w-5" />
                Take Photo
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform duration-200" onClick={handleUploadPhoto}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-gradient-card">
            <TabsTrigger value="timeline" className="text-sm font-semibold">Timeline</TabsTrigger>
            <TabsTrigger value="comparison" className="text-sm font-semibold">Comparison</TabsTrigger>
            <TabsTrigger value="grid" className="text-sm font-semibold">Grid View</TabsTrigger>
          </TabsList>

          {/* Timeline View */}
          <TabsContent value="timeline" className="space-y-4 mt-6">
            {photos.map((photo, index) => (
              <Card 
                key={photo.id}
                className="relative overflow-hidden hover:shadow-glow transition-all duration-500 animate-slide-up group border-border/50"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex gap-6">
                    {/* Photo Placeholder */}
                    <div className="h-32 w-32 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 border-2 border-border/50 group-hover:scale-105 transition-transform duration-300">
                      <ImageIcon className="h-16 w-16 text-primary/40" />
                    </div>

                    {/* Photo Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{new Date(photo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">{photo.weight} kg</h3>
                          <Badge variant="outline" className="mt-2 text-xs capitalize">{photo.type} view</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="hover:text-destructive hover:scale-110 transition-all duration-200"
                            onClick={() => handleDeletePhoto(photo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{photo.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Comparison View */}
          <TabsContent value="comparison" className="mt-6">
            <Card className="shadow-glow border-border/50 bg-gradient-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-premium opacity-5" />
              <CardHeader className="relative z-10">
                <CardTitle>Before & After Comparison</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="space-y-3">
                    <Badge className="bg-muted">Before - {photos[0]?.date}</Badge>
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border/50">
                      <ImageIcon className="h-24 w-24 text-primary/40" />
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary">{photos[0]?.weight} kg</p>
                      <p className="text-sm text-muted-foreground">{photos[0]?.notes}</p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-3">
                    <Badge className="bg-primary text-primary-foreground">Current - {photos[photos.length - 1]?.date}</Badge>
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/50">
                      <ImageIcon className="h-24 w-24 text-primary/40" />
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary">{photos[photos.length - 1]?.weight} kg</p>
                      <p className="text-sm text-muted-foreground">{photos[photos.length - 1]?.notes}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-hero rounded-xl text-white text-center">
                  <p className="text-sm text-white/80 mb-2">Total Transformation</p>
                  <p className="text-4xl font-black">-{weightLost.toFixed(1)} kg</p>
                  <p className="text-sm text-white/80 mt-2">in 30 days</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <Card 
                  key={photo.id}
                  className="relative overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in group border-border/50 cursor-pointer"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-b border-border/50 group-hover:scale-105 transition-transform duration-300">
                    <ImageIcon className="h-16 w-16 text-primary/40" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{new Date(photo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p className="font-bold text-primary">{photo.weight} kg</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProgressPhotos;
