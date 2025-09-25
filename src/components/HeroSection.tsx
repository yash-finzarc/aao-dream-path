import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, GraduationCap, Target } from "lucide-react";

interface HeroSectionProps {
  onChatStart: (message: string) => void;
}

const HeroSection = ({ onChatStart }: HeroSectionProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onChatStart(inputValue.trim());
    }
  };

  const suggestedQueries = [
    "Best engineering colleges in India",
    "MBA programs in Europe under 15 lakhs",
    "Medical colleges with low NEET cutoffs",
    "Computer Science courses abroad",
  ];

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
            <span className="text-sm text-foreground-muted">AI-Powered College Counseling</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">Find your</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary-glow bg-clip-text text-transparent animate-glow-pulse">
              dream college
            </span>
            <br />
            <span className="text-foreground">with Aaopadho!</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Get personalized college recommendations, scholarship guidance, and admission insights powered by advanced AI
          </p>

          {/* Features Row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>10,000+ Colleges</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <span>Personalized Matches</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Driven Insights</span>
            </div>
          </div>

          {/* Chat Input */}
          <div className="max-w-2xl mx-auto space-y-4">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative glass-card p-2 rounded-xl border border-primary/20 glow-primary">
                <Input
                  type="text"
                  placeholder="Type your dream course or college..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-transparent border-0 text-lg placeholder:text-foreground-muted/70 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn-gradient-primary h-10 w-10 rounded-lg"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Suggested Queries */}
            <div className="space-y-3">
              <p className="text-sm text-foreground-muted">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputValue(query);
                      onChatStart(query);
                    }}
                    className="glass-card border-primary/30 text-foreground-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;