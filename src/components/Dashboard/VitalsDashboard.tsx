import { Heart, Droplets, Moon, Activity, Brain, Thermometer } from "lucide-react";
import HealthMetricCard from "./HealthMetricCard";

const VitalsDashboard = () => {
  const vitalsData = [
    {
      title: "Heart Rate",
      value: 72,
      unit: "BPM",
      icon: <Heart className="h-5 w-5" />,
      trend: "stable" as const,
      status: "normal" as const,
      description: "Resting heart rate is optimal"
    },
    {
      title: "Blood Oxygen",
      value: 98,
      unit: "%",
      icon: <Droplets className="h-5 w-5" />,
      trend: "up" as const,
      status: "excellent" as const,
      description: "Excellent oxygen saturation"
    },
    {
      title: "Sleep Quality",
      value: 85,
      unit: "Score",
      icon: <Moon className="h-5 w-5" />,
      trend: "up" as const,
      status: "excellent" as const,
      description: "8.2 hours with great deep sleep"
    },
    {
      title: "Activity Level",
      value: "8,247",
      unit: "steps",
      icon: <Activity className="h-5 w-5" />,
      trend: "up" as const,
      status: "normal" as const,
      description: "67% of daily goal achieved"
    },
    {
      title: "Stress Level",
      value: "Low",
      icon: <Brain className="h-5 w-5" />,
      trend: "down" as const,
      status: "excellent" as const,
      description: "HRV indicates excellent recovery"
    },
    {
      title: "Body Temp",
      value: 98.6,
      unit: "°F",
      icon: <Thermometer className="h-5 w-5" />,
      trend: "stable" as const,
      status: "normal" as const,
      description: "Normal body temperature"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Health Dashboard</h2>
          <p className="text-muted-foreground">Real-time vitals and wellness metrics</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-primary">VitalScore: 87</div>
          <p className="text-sm text-success">Excellent health status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitalsData.map((vital, index) => (
          <HealthMetricCard
            key={index}
            title={vital.title}
            value={vital.value}
            unit={vital.unit}
            icon={vital.icon}
            trend={vital.trend}
            status={vital.status}
            description={vital.description}
          />
        ))}
      </div>
    </div>
  );
};

export default VitalsDashboard;