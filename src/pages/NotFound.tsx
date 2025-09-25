import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
          <p className="text-foreground-muted max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. Let's get you back to discovering your dream college.
          </p>
        </div>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium btn-gradient-primary rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
