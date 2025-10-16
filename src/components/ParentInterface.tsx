import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { VideoFeed } from './VideoFeed';
import { PhotoGallery } from './PhotoGallery';
import { AudioControls } from './AudioControls';
import { MilestoneTracker } from './MilestoneTracker';
import { MilestoneTracker } from './MilestoneTracker';
import { 
  Baby, 
  Camera, 
  Heart,
  Volume2, 
  Image, 
  ArrowLeft,
  Phone,
  Video,
  MessageCircle,
  Activity,
  Thermometer,
  Droplets,
  Trophy
} from 'lucide-react';

interface ParentInterfaceProps {
  onBackToSelection: () => void;
}

export function ParentInterface({ onBackToSelection }: ParentInterfaceProps) {
  const [capturedPhotoData, setCapturedPhotoData] = useState<{ id: string; timestamp: Date; liveImage: string } | undefined>();
  const [cryingIntensity, setCryingIntensity] = useState(0);

  const handlePhotoCapture = (photoData: { id: string; timestamp: Date; liveImage: string }) => {
    setCapturedPhotoData(photoData);
    setTimeout(() => setCapturedPhotoData(undefined), 100);
  };

  const handleCryingDetected = (intensity: number) => {
    setCryingIntensity(intensity);
  };

  const handleEmergencyCall = () => {
    // Simulate emergency call
    console.log('Emergency call initiated');
  };

  const handleVideoCall = () => {
    // Simulate video call
    console.log('Video call initiated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBackToSelection}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Baby className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Baby Emma</h1>
                  <p className="text-sm text-muted-foreground">
                    Your precious little one
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Quick Contact */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleVideoCall}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Video className="h-4 w-4 mr-1" />
                  Video Call Staff
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleEmergencyCall}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Emergency
                </Button>
              </div>
              
              {/* Status */}
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Baby is doing well
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Room 204A • Last update: just now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Live View & Talk</span>
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Health & Growth</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Baby className="h-4 w-4" />
              <span className="hidden sm:inline">Milestones</span>
            </TabsTrigger>
            <TabsTrigger value="memories" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Photo Memories</span>
            </TabsTrigger>
          </TabsList>

          {/* Live View & Communication Tab */}
          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Video Feed with Audio Controls */}
              <div className="lg:col-span-3">
                <VideoFeed 
                  onCapturePhoto={handlePhotoCapture} 
                  showAudioControls={true}
                  onCryingDetected={handleCryingDetected}
                />
              </div>

              {/* Quick Info */}
              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-pink-800">Quick Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Heart Rate</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">Normal</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">Stable</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Activity</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">Sleeping</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800">Care Team</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <div className="font-medium">Dr. Sarah Johnson</div>
                        <div className="text-muted-foreground">Primary Neonatologist</div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">Nurse Maria Garcia</div>
                        <div className="text-muted-foreground">Day Shift • On duty</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Heart className="h-8 w-8 text-red-500 mx-auto" />
                  <CardTitle className="text-lg">Heart Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">142</div>
                  <div className="text-sm text-muted-foreground">BPM</div>
                  <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
                    Normal
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Thermometer className="h-8 w-8 text-orange-500 mx-auto" />
                  <CardTitle className="text-lg">Temperature</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">98.6°F</div>
                  <div className="text-sm text-muted-foreground">37.0°C</div>
                  <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
                    Stable
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Activity className="h-8 w-8 text-blue-500 mx-auto" />
                  <CardTitle className="text-lg">Oxygen Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-muted-foreground">SpO2</div>
                  <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
                    Excellent
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Droplets className="h-8 w-8 text-cyan-500 mx-auto" />
                  <CardTitle className="text-lg">Humidity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-600">65%</div>
                  <div className="text-sm text-muted-foreground">RH</div>
                  <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
                    Optimal
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Growth Tracking */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Growth Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">2.1 lbs</div>
                    <div className="text-sm text-muted-foreground">Weight</div>
                    <div className="text-xs text-green-600 mt-1">+0.2 lbs this week</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">14.5"</div>
                    <div className="text-sm text-muted-foreground">Length</div>
                    <div className="text-xs text-green-600 mt-1">+0.5" this week</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12.2"</div>
                    <div className="text-sm text-muted-foreground">Head Circumference</div>
                    <div className="text-xs text-green-600 mt-1">+0.3" this week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones">
            <MilestoneTracker />
          </TabsContent>

          {/* Memories Tab */}
          <TabsContent value="memories">
            <PhotoGallery newPhotoData={capturedPhotoData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}