import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, Lock, User, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  initialMode?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, onLoginSuccess, initialMode = "login" }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created!",
        description: mode === "login" ? "You've been logged in successfully." : "Your account has been created successfully.",
      });
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome!",
        description: "You've been logged in with Google successfully.",
      });
      onLoginSuccess();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" });
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-primary/20 max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full glass-card border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground-muted hover:text-primary transition-all duration-300 h-12"
            variant="outline"
          >
            <Chrome className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-foreground-muted">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-foreground-muted" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 glass-card border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground-muted" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 glass-card border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground-muted" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 glass-card border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gradient-primary h-12 font-medium"
            >
              {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="text-center">
            <p className="text-foreground-muted">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={switchMode}
                className="text-primary hover:text-primary-glow ml-1 p-0 h-auto font-medium"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;