import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, MessageCircle, Users, Linkedin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/aaopadho",
      hoverColor: "hover:text-blue-400"
    },
    {
      name: "Discord",
      icon: MessageCircle,
      href: "https://discord.gg/aaopadho",
      hoverColor: "hover:text-indigo-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/aaopadho",
      hoverColor: "hover:text-blue-500"
    },
    {
      name: "Community",
      icon: Users,
      href: "https://community.aaopadho.com",
      hoverColor: "hover:text-green-400"
    }
  ];

  const footerLinks = [
    {
      name: "Contact Us",
      href: "#contact",
      icon: ExternalLink
    },
    {
      name: "Privacy Policy",
      href: "#privacy",
      icon: ExternalLink
    },
    {
      name: "Terms of Service",
      href: "#terms",
      icon: ExternalLink
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 glass-card border-0 border-t border-border/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Footer Links */}
          <div className="flex items-center space-x-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-1 text-sm text-foreground-muted hover:text-primary transition-colors duration-300 group"
              >
                <link.icon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          {/* Center - Powered by Finzarc */}
          <div className="hidden md:flex items-center space-x-2 glass-card px-3 py-1.5 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <span className="text-sm text-foreground-muted">
              Powered by{" "}
              <span className="font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Finzarc
              </span>
            </span>
          </div>

          {/* Right - Social Media Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                asChild
                className={`h-8 w-8 text-foreground-muted ${social.hoverColor} hover:bg-accent/50 transition-all duration-300`}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile - Powered by Finzarc */}
        <div className="md:hidden flex justify-center mt-2">
          <div className="flex items-center space-x-2 glass-card px-3 py-1.5 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <span className="text-xs text-foreground-muted">
              Powered by{" "}
              <span className="font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Finzarc
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;