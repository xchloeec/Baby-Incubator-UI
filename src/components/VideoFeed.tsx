import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Camera, CameraOff, Maximize, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoFeedProps {
  onCapturePhoto: (photoData: { id: string; timestamp: Date; liveImage: string }) => void;
  showAudioControls?: boolean;
  onCryingDetected?: (intensity: number) => void;
}

// Array of baby images that simulate different moments
const liveImages = [
  "https://images.unsplash.com/photo-1704649917979-9a23d585da95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMHNsZWVwaW5nfGVufDF8fHx8MTc1OTkyMTg0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1723990140290-1c7c6fd4bc92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTk5MjE4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1757693074716-16795a1650b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMGN1dGV8ZW58MXx8fHwxNzU5OTIxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1685458249619-b78fe5ee7abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwcG9ydHJhaXQlMjBuZXdib3JufGVufDF8fHx8MTc1OTkyMTg2MHww&ixlib=rb-4.1.0&q=80&w=1080"
];

export function VideoFeed({ onCapturePhoto, showAudioControls, onCryingDetected }: VideoFeedProps) {
  const [isLive, setIsLive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastCaptured, setLastCaptured] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulate live feed status and occasional image changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional connection issues
      if (Math.random() < 0.02) {
        setIsLive(false);
        setTimeout(() => setIsLive(true), 2000);
      }
      
      // Occasionally change the image to simulate different moments
      if (Math.random() < 0.1) {
        setCurrentImageIndex(prev => (prev + 1) % liveImages.length);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Simulate audio monitoring
  useEffect(() => {
    if (!isListening || !onCryingDetected) return;

    const interval = setInterval(() => {
      const level = Math.random() * 100;
      setAudioLevel(level);
      
      if (level > 70) {
        onCryingDetected(level);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isListening, onCryingDetected]);

  const handleCapture = () => {
    const timestamp = new Date();
    const photoId = `baby-${Date.now()}`;
    const currentImage = liveImages[currentImageIndex];
    
    setLastCaptured(timestamp.toLocaleString());
    
    // Pass the current live image to the gallery
    onCapturePhoto({
      id: photoId,
      timestamp,
      liveImage: currentImage
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const handleSpeak = () => {
    setIsSpeaking(true);
    // Simulate speaking for 2 seconds
    setTimeout(() => setIsSpeaking(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : ''} bg-card`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Live Video Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">
              {isLive ? 'LIVE' : 'RECONNECTING...'}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            {isLive ? (
              <ImageWithFallback
                src={liveImages[currentImageIndex]}
                alt="Baby in incubator"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CameraOff className="h-16 w-16 text-gray-500" />
              </div>
            )}
            
            {/* Overlay with timestamp */}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {new Date().toLocaleTimeString()}
            </div>

            {/* Overlay with baby vitals */}
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              Room 204A - Incubator #3
            </div>

            {/* Recording indicator */}
            {isLive && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-sm">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                REC
              </div>
            )}

            {/* Audio indicators */}
            {showAudioControls && (
              <>
                {isListening && audioLevel > 50 && (
                  <div className="absolute bottom-2 right-2 bg-orange-600/90 text-white px-2 py-1 rounded text-sm">
                    🔊 Baby sounds detected
                  </div>
                )}
                {isSpeaking && (
                  <div className="absolute bottom-12 right-2 bg-pink-600/90 text-white px-2 py-1 rounded text-sm">
                    🎤 Parent speaking...
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 gap-2">
            <div className="flex gap-2">
              <Button
                onClick={handleCapture}
                disabled={!isLive}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Capture Moment
              </Button>
              <Button
                variant="outline"
                onClick={toggleFullscreen}
                disabled={!isLive}
                className="flex items-center gap-2"
              >
                <Maximize className="h-4 w-4" />
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </Button>
            </div>
            
            {lastCaptured && (
              <p className="text-sm text-muted-foreground">
                Last photo: {lastCaptured}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audio Controls for Parents */}
      {showAudioControls && (
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-800">
              <div className="h-5 w-5 rounded-full bg-pink-600 flex items-center justify-center">
                <span className="text-white text-xs">♪</span>
              </div>
              Talk to Your Baby
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Listen for baby sounds</div>
                <div className="text-xs text-muted-foreground">
                  Monitor crying and movement sounds
                </div>
              </div>
              <Button
                variant={isListening ? "default" : "outline"}
                onClick={toggleListening}
                className={isListening ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isListening ? '🔊 Listening' : '🔇 Start Listening'}
              </Button>
            </div>

            {isListening && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Audio Level:</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      audioLevel > 70 ? 'bg-red-500' : 
                      audioLevel > 50 ? 'bg-orange-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
                {audioLevel > 70 && (
                  <div className="text-sm text-orange-600 font-medium">
                    ⚠️ Baby may need attention
                  </div>
                )}
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Speak to your baby</div>
                  <div className="text-xs text-muted-foreground">
                    Your voice can comfort and soothe
                  </div>
                </div>
                <Button
                  onClick={handleSpeak}
                  disabled={isSpeaking}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  {isSpeaking ? '🎤 Speaking...' : '🎤 Push to Talk'}
                </Button>
              </div>
              
              {isSpeaking && (
                <div className="mt-2 text-sm text-pink-600 font-medium">
                  💕 Your baby can hear your loving voice!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}