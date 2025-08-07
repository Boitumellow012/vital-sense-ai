import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Calendar, Target } from "lucide-react";

const HealthInsights = () => {
  const insights = [
    {
      id: 1,
      type: "positive",
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Sleep Quality Improvement",
      description: "Your sleep quality has improved by 15% over the past week. The consistent bedtime routine is working!",
      action: "Keep maintaining your current sleep schedule",
      trend: "up"
    },
    {
      id: 2,
      type: "attention",
      icon: <AlertCircle className="h-5 w-5" />,
      title: "Stress Pattern Detected",
      description: "Your stress levels tend to spike around 3 PM on weekdays. Consider taking a short break.",
      action: "Try the 5-minute breathing exercise at 2:45 PM",
      trend: "stable"
    },
    {
      id: 3,
      type: "goal",
      icon: <Target className="h-5 w-5" />,
      title: "Activity Goal Progress",
      description: "You're 85% toward your weekly step goal. Just 2,400 more steps to reach it!",
      action: "Take a 20-minute walk today",
      trend: "up"
    },
    {
      id: 4,
      type: "reminder",
      icon: <Calendar className="h-5 w-5" />,
      title: "Health Check Reminder",
      description: "It's been 6 months since your last comprehensive health checkup.",
      action: "Schedule an appointment with your doctor",
      trend: "stable"
    }
  ];

  const getInsightStyle = (type: string) => {
    switch (type) {
      case "positive":
        return {
          bg: "bg-success/5 border-success/20",
          badge: "bg-success/10 text-success border-success/20",
          icon: "text-success"
        };
      case "attention":
        return {
          bg: "bg-warning/5 border-warning/20",
          badge: "bg-warning/10 text-warning border-warning/20",
          icon: "text-warning"
        };
      case "goal":
        return {
          bg: "bg-info/5 border-info/20",
          badge: "bg-info/10 text-info border-info/20",
          icon: "text-info"
        };
      case "reminder":
        return {
          bg: "bg-muted/50 border-border",
          badge: "bg-muted text-muted-foreground border-border",
          icon: "text-muted-foreground"
        };
      default:
        return {
          bg: "bg-card border-border",
          badge: "bg-muted text-muted-foreground border-border",
          icon: "text-muted-foreground"
        };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">AI Health Insights</h2>
        <p className="text-muted-foreground">Personalized recommendations based on your health patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => {
          const style = getInsightStyle(insight.type);
          return (
            <Card key={insight.id} className={`${style.bg} transition-all duration-300 hover:shadow-md`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span className={style.icon}>
                      {insight.icon}
                    </span>
                    <span>{insight.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    {insight.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                    {insight.trend === "down" && <TrendingDown className="h-4 w-4 text-danger" />}
                    <Badge variant="outline" className={style.badge}>
                      {insight.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground">{insight.description}</p>
                <div className="p-3 rounded-lg bg-card/50">
                  <p className="text-sm font-medium text-primary">💡 Recommended Action:</p>
                  <p className="text-sm text-muted-foreground mt-1">{insight.action}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HealthInsights;