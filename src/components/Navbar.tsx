import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Menu, X } from "lucide-react";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar = ({ onLoginClick, onSignupClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-card border-0 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-glow rounded-full animate-glow-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Aaopadho
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground-muted hover:text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-glow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onLoginClick}
              className="text-foreground-muted hover:text-primary hover:bg-accent/50"
            >
              Login
            </Button>
            <Button
              onClick={onSignupClick}
              className="btn-gradient-primary px-6 hover:shadow-lg hover:shadow-primary/25"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground-muted hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-up">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-foreground-muted hover:text-primary transition-colors duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-border/30">
              <Button
                variant="ghost"
                onClick={() => {
                  onLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                className="text-foreground-muted hover:text-primary hover:bg-accent/50"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  onSignupClick();
                  setIsMobileMenuOpen(false);
                }}
                className="btn-gradient-primary hover:shadow-lg hover:shadow-primary/25"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;