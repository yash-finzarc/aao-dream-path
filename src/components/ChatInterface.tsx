import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import ChatSidebar from "./ChatSidebar";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  initialMessage?: string;
  userData?: any;
}

const ChatInterface = ({ initialMessage, userData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message and initial user message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      type: "ai",
      content: `Hello ${userData?.name || "there"}! 👋 I'm your AI college counselor. I'm here to help you find the perfect college based on your preferences. Let me analyze your query and provide personalized recommendations.`,
      timestamp: new Date(),
    };

    const initialMessages = [welcomeMessage];

    if (initialMessage) {
      const userMessage: Message = {
        id: "initial",
        type: "user",
        content: initialMessage,
        timestamp: new Date(),
      };
      initialMessages.push(userMessage);
      
      // Simulate AI response
      setTimeout(() => {
        handleAIResponse(initialMessage);
      }, 1000);
    }

    setMessages(initialMessages);
  }, [initialMessage, userData]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAIResponse = (userMessage: string) => {
    setIsLoading(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: generateAIResponse(userMessage, userData),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (message: string, userData: any) => {
    // Mock AI responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('engineering') || lowerMessage.includes('iit') || lowerMessage.includes('nit')) {
      return `Based on your interest in engineering and your profile, here are some excellent recommendations:

🎓 **Top Engineering Colleges:**
• IIT Delhi - Computer Science (Cutoff: JEE Rank 63)
• NIT Trichy - Mechanical Engineering (Cutoff: JEE Rank 1,200)
• BITS Pilani - Electronics & Communication (BITSAT: 350+)

💰 **Budget Analysis:** Most of these fit within your budget range of ${userData?.budget || '₹10-20 Lakhs'}

🏆 **Scholarship Opportunities:**
${userData?.scholarships ? '• Merit-cum-Means scholarships available\n• Industry-sponsored programs for top performers' : '• Consider merit scholarships if your scores improve'}

📝 **Next Steps:**
1. Focus on JEE Main preparation
2. Apply for college-specific entrance tests
3. Keep backup options ready

Would you like me to provide more details about any specific college or explore other engineering branches?`;
    }
    
    if (lowerMessage.includes('medical') || lowerMessage.includes('mbbs') || lowerMessage.includes('neet')) {
      return `Great choice! Medical education is rewarding. Here are top recommendations:

🏥 **Top Medical Colleges:**
• AIIMS Delhi - MBBS (NEET: 99.9+ percentile)
• Christian Medical College, Vellore (NEET: 99.5+ percentile)
• Armed Forces Medical College, Pune (NEET + Interview)

💰 **Cost Analysis:**
• Government colleges: ₹50K-2L per year
• Private colleges: ₹8L-25L per year
• Matches your budget: ${userData?.budget || '₹10-20 Lakhs'}

🎯 **NEET Preparation Tips:**
${userData?.exams?.includes('NEET') ? '✅ Great that you\'ve taken NEET! Focus on improving your score.' : '• Start NEET preparation immediately\n• Physics, Chemistry, Biology (PCB) focus'}

Want to know about specific medical specializations or college admission processes?`;
    }

    if (lowerMessage.includes('abroad') || lowerMessage.includes('international') || lowerMessage.includes('usa') || lowerMessage.includes('uk') || lowerMessage.includes('canada')) {
      return `Studying abroad is an excellent choice! Here's what I recommend:

🌍 **Top Study Destinations:**
• USA: MIT, Stanford, Harvard (SAT/GRE required)
• UK: Oxford, Cambridge, Imperial College (IELTS required)
• Canada: University of Toronto, UBC (IELTS/TOEFL)

📋 **Entrance Exams Status:**
${userData?.exams?.includes('SAT') ? '✅ SAT completed - great!' : '• Consider SAT for US universities'}
${userData?.exams?.includes('IELTS') ? '✅ IELTS completed - perfect!' : '• IELTS/TOEFL needed for English proficiency'}

💰 **Financial Planning:**
• Tuition: $20K-60K per year
• Living costs: $15K-25K per year  
• Scholarships can reduce costs by 30-70%

🎓 **Scholarships Available:**
• Merit-based scholarships
• Need-based financial aid
• Country-specific programs

Would you like me to help you shortlist universities based on your course preference: ${userData?.course || 'your chosen field'}?`;
    }

    // Default response
    return `I understand you're looking for guidance about "${message}". Based on your profile:

👤 **Your Preferences:**
• Course Interest: ${userData?.course || 'Not specified'}
• Budget Range: ${userData?.budget || 'Not specified'}
• Location Preference: ${userData?.location || 'Flexible'}
• Scholarship Interest: ${userData?.scholarships ? 'Yes' : 'No'}

Let me provide some tailored recommendations and help you explore the best options. Could you be more specific about:

1. What type of program you're most interested in?
2. Any particular colleges you've heard about?
3. Your preferred mode of study (full-time, part-time, online)?

I'm here to help you make the best decision for your future! 🌟`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    handleAIResponse(inputValue.trim());
    setInputValue("");
  };

  const startNewChat = () => {
    setMessages([]);
    setInputValue("");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar onNewChat={startNewChat} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-card border-0 border-b border-border/30 p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Aaopadho AI Counselor</h2>
              <p className="text-sm text-foreground-muted">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "glass-card border border-border/50 rounded-bl-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === "user" ? "text-primary-foreground/70" : "text-foreground-muted"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.type === "user" && (
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-5 w-5 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="glass-card border border-border/50 p-4 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-foreground-muted">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="glass-card border-0 border-t border-border/30 p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative glass-card p-3 rounded-xl border border-primary/20">
              <Input
                type="text"
                placeholder="Ask about colleges, courses, admissions..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="bg-transparent border-0 text-base placeholder:text-foreground-muted/70 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 btn-gradient-primary h-8 w-8 rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;