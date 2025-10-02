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
    <div className="min-h-screen flex items-center justify-center text-center px-4" style={{ background: "var(--gradient-hero-light)" }}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-xs text-foreground-muted">
            AI-Powered College Counseling
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          <span className="text-foreground">Find your dream college</span>
          <br />
          <span className="gradient-text">with Aaopadho!</span>
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-base text-foreground-muted max-w-2xl mx-auto">
          Get personalized college recommendations, scholarship guidance, and admission insights powered by advanced AI
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-foreground-muted">
          <div className="flex items-center space-x-1">
            <GraduationCap className="h-3 w-3 text-primary" />
            <span>10,000+ Colleges</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-3 w-3 text-primary" />
            <span>Personalized Matches</span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>AI-Driven Insights</span>
          </div>
        </div>

        {/* Input */}
        <div className="max-w-lg mx-auto space-y-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-foreground/5 border border-foreground/20 rounded-3xl px-3 py-2 backdrop-blur-sm shadow-md">
              <Input
                type="text"
                placeholder="Type your dream course or college..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-0 text-sm placeholder:text-foreground-muted/70 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                className="ml-2 px-4 py-1 rounded-lg text-sm font-medium"
                disabled={!inputValue.trim()}
              >
                <Send className="h-3 w-3 mr-1" />
                Go
              </Button>
            </div>
          </form>

          {/* Suggestions */}
          <div className="space-y-2">
            <p className="text-xs text-foreground-muted">Try asking:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setInputValue(query);
                    onChatStart(query);
                  }}
                  className="rounded-lg px-3 py-1 text-xs shadow-sm hover:scale-105 transition-transform"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;