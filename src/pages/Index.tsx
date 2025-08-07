import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Welcome/HeroSection";
import VitalsDashboard from "@/components/Dashboard/VitalsDashboard";
import AIChat from "@/components/Chat/AIChat";
import HealthInsights from "@/components/Insights/HealthInsights";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Button 
              onClick={() => setHasStarted(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enter Vitalsense Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="chat">AI Coach</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <VitalsDashboard />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <HealthInsights />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">AI Health Coach</h2>
                <p className="text-muted-foreground">
                  Chat with your personal AI health companion for guidance and support
                </p>
              </div>
              <AIChat />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;