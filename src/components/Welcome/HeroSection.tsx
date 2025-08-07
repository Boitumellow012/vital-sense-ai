import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Shield, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge className="bg-gradient-to-r from-primary to-accent text-white border-none px-4 py-2 text-sm font-medium">
            🎉 Advanced AI Health Companion - Now Live
          </Badge>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Vitalsense
              </span>
              <br />
              <span className="text-foreground">Your AI Health Companion</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Monitor your vitals, predict health patterns, and receive personalized coaching 
              from an AI that truly understands your body and wellness journey.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Heart, label: "Real-time Vitals", color: "text-danger" },
              { icon: Brain, label: "AI Insights", color: "text-accent" },
              { icon: Zap, label: "Smart Alerts", color: "text-warning" },
              { icon: Shield, label: "Privacy First", color: "text-success" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/50">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Health Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-medium transition-all duration-300"
            >
              View Demo
            </Button>
          </div>

          {/* Health score preview */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-card via-card/95 to-card border border-border/50 shadow-lg">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">87</div>
                <div className="text-sm text-muted-foreground">VitalScore</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-success">Excellent</div>
                <div className="text-sm text-muted-foreground">Health Status</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-info">24/7</div>
                <div className="text-sm text-muted-foreground">AI Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;