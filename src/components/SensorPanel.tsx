import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Heart, Thermometer, Droplets, Compass, AlertTriangle } from 'lucide-react';

interface SensorData {
  heartRate: number;
  temperature: number;
  humidity: number;
  gyroscope: { x: number; y: number; z: number };
  oxygenLevel: number;
}

interface SensorPanelProps {
  onEmergencyAlert: (message: string) => void;
}

export function SensorPanel({ onEmergencyAlert }: SensorPanelProps) {
  const [sensorData, setSensorData] = useState<SensorData>({
    heartRate: 145,
    temperature: 36.8,
    humidity: 65,
    gyroscope: { x: 0.2, y: -0.1, z: 9.8 },
    oxygenLevel: 98
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => {
        const newData = {
          heartRate: Math.max(120, Math.min(180, prev.heartRate + (Math.random() - 0.5) * 10)),
          temperature: Math.max(35.5, Math.min(38.5, prev.temperature + (Math.random() - 0.5) * 0.3)),
          humidity: Math.max(40, Math.min(80, prev.humidity + (Math.random() - 0.5) * 5)),
          gyroscope: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
            z: 9.8 + (Math.random() - 0.5) * 0.5
          },
          oxygenLevel: Math.max(92, Math.min(100, prev.oxygenLevel + (Math.random() - 0.5) * 2))
        };

        // Check for alerts
        const newAlerts: string[] = [];
        if (newData.heartRate > 170 || newData.heartRate < 130) {
          newAlerts.push('Heart rate abnormal');
        }
        if (newData.temperature > 37.5 || newData.temperature < 36.2) {
          newAlerts.push('Temperature alert');
        }
        if (newData.oxygenLevel < 95) {
          newAlerts.push('Low oxygen levels');
        }

        if (newAlerts.length > 0 && newAlerts.some(alert => !alerts.includes(alert))) {
          newAlerts.forEach(alert => {
            if (!alerts.includes(alert)) {
              onEmergencyAlert(alert);
            }
          });
        }

        setAlerts(newAlerts);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [alerts, onEmergencyAlert]);

  const getHeartRateStatus = (hr: number) => {
    if (hr < 130) return { status: 'Low', color: 'destructive' };
    if (hr > 170) return { status: 'High', color: 'destructive' };
    return { status: 'Normal', color: 'default' };
  };

  const getTempStatus = (temp: number) => {
    if (temp < 36.2) return { status: 'Low', color: 'destructive' };
    if (temp > 37.5) return { status: 'High', color: 'destructive' };
    return { status: 'Normal', color: 'default' };
  };

  const getOxygenStatus = (level: number) => {
    if (level < 95) return { status: 'Low', color: 'destructive' };
    return { status: 'Normal', color: 'default' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Heart Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Heart Rate
          </CardTitle>
          <Badge variant={getHeartRateStatus(sensorData.heartRate).color as any}>
            {getHeartRateStatus(sensorData.heartRate).status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{Math.round(sensorData.heartRate)} BPM</div>
            <Progress 
              value={(sensorData.heartRate - 120) / (180 - 120) * 100} 
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">Normal: 130-170 BPM</p>
          </div>
        </CardContent>
      </Card>

      {/* Temperature */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-orange-500" />
            Temperature
          </CardTitle>
          <Badge variant={getTempStatus(sensorData.temperature).color as any}>
            {getTempStatus(sensorData.temperature).status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{sensorData.temperature.toFixed(1)}°C</div>
            <Progress 
              value={(sensorData.temperature - 35) / (38 - 35) * 100} 
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">Normal: 36.2-37.5°C</p>
          </div>
        </CardContent>
      </Card>

      {/* Humidity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Humidity
          </CardTitle>
          <Badge variant="default">Normal</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{Math.round(sensorData.humidity)}%</div>
            <Progress value={sensorData.humidity} className="h-2" />
            <p className="text-sm text-muted-foreground">Target: 50-70%</p>
          </div>
        </CardContent>
      </Card>

      {/* Oxygen Level */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-500" />
            Oxygen Level
          </CardTitle>
          <Badge variant={getOxygenStatus(sensorData.oxygenLevel).color as any}>
            {getOxygenStatus(sensorData.oxygenLevel).status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{Math.round(sensorData.oxygenLevel)}%</div>
            <Progress value={sensorData.oxygenLevel} className="h-2" />
            <p className="text-sm text-muted-foreground">Normal: 95-100%</p>
          </div>
        </CardContent>
      </Card>

      {/* Gyroscope */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-purple-500" />
            Position & Movement
          </CardTitle>
          <Badge variant="default">Stable</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">X-Axis</div>
              <div className="text-lg font-semibold">{sensorData.gyroscope.x.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Y-Axis</div>
              <div className="text-lg font-semibold">{sensorData.gyroscope.y.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Z-Axis</div>
              <div className="text-lg font-semibold">{sensorData.gyroscope.z.toFixed(2)}</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Movement detection for automatic position adjustment
          </p>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {alerts.map((alert, index) => (
                <div key={index} className="text-sm font-medium text-destructive">
                  • {alert}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}