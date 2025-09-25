import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AuthModal from "@/components/AuthModal";
import OnboardingFlow from "@/components/OnboardingFlow";
import ChatInterface from "@/components/ChatInterface";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [appState, setAppState] = useState<"landing" | "chat">("landing");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState<string>("");
  const { toast } = useToast();

  const handleLoginClick = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // Show onboarding for new users (in a real app, this would be based on user data)
    if (!userData) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setShowOnboarding(false);
    // If there's a pending chat message, start the chat
    if (chatMessage) {
      setAppState("chat");
    }
    toast({
      title: "Welcome to Aaopadho!",
      description: `Hi ${data.name}! I'm ready to help you find your perfect college match.`,
    });
  };

  const handleChatStart = (message: string) => {
    setChatMessage(message);
    
    if (!isLoggedIn) {
      // Store the message and show login
      setShowAuthModal(true);
      toast({
        title: "Sign in to continue",
        description: "Please log in to start your personalized college counseling session.",
      });
      return;
    }

    if (!userData) {
      // User is logged in but hasn't completed onboarding
      setShowOnboarding(true);
      return;
    }

    // User is ready to chat
    setAppState("chat");
  };

  // Landing Page View
  if (appState === "landing") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
        <HeroSection onChatStart={handleChatStart} />
        
        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          initialMode={authMode}
        />

        {/* Onboarding Flow */}
        <OnboardingFlow
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  // Chat Interface View
  if (appState === "chat") {
    return (
      <ChatInterface
        initialMessage={chatMessage}
        userData={userData}
      />
    );
  }

  return null;
};

export default Index;
