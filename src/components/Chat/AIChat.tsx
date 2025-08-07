import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "Hi! I'm Vitalsense 💙 Your personal AI health companion. I noticed you had great sleep quality last night - 8.2 hours with excellent deep sleep phases. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "I understand your concern. Based on your recent vitals, everything looks normal. Your heart rate has been stable around 72 BPM. Would you like me to explain what this means for your health?",
      "That's a great question! Your sleep patterns show you're getting quality rest. I recommend maintaining your current bedtime routine as it's working well for you.",
      "I see you're interested in improving your fitness. Based on your activity data, you're doing well with 8,247 steps today. Let's work on gradually increasing your daily goal.",
      "Your stress levels are looking good - HRV indicates excellent recovery. Keep up whatever you're doing for stress management!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <span>AI Health Coach</span>
            <Badge variant="outline" className="ml-2 text-xs">Online</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-2",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.type === "ai" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {message.content}
              </div>
              
              {message.type === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your health, symptoms, or wellness..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;