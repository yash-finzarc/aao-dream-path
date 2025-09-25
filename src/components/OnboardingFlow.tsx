import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ChevronLeft, User, BookOpen, MapPin, DollarSign, Award, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: (data: OnboardingData) => void;
}

interface OnboardingData {
  name: string;
  course: string;
  location: string;
  budget: string;
  scholarships: boolean;
  exams: string[];
}

const OnboardingFlow = ({ isOpen, onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    course: "",
    location: "",
    budget: "",
    scholarships: false,
    exams: [],
  });
  const { toast } = useToast();

  const steps = [
    {
      id: "name",
      title: "What's your name?",
      icon: User,
      type: "input" as const,
    },
    {
      id: "course",
      title: "Which course excites you most?",
      icon: BookOpen,
      type: "mcq" as const,
      options: ["Engineering", "Medicine", "Law", "MBA", "Arts", "Science", "Commerce", "Other"],
    },
    {
      id: "location",
      title: "Any dream location or country?",
      icon: MapPin,
      type: "input" as const,
    },
    {
      id: "budget",
      title: "What's your budget range?",
      icon: DollarSign,
      type: "mcq" as const,
      options: ["Under ₹5 Lakhs", "₹5-10 Lakhs", "₹10-20 Lakhs", "₹20+ Lakhs"],
    },
    {
      id: "scholarships",
      title: "Do you need scholarships?",
      icon: Award,
      type: "boolean" as const,
    },
    {
      id: "exams",
      title: "Have you taken entrance exams?",
      icon: FileText,
      type: "checkbox" as const,
      options: ["JEE Main/Advanced", "NEET", "SAT", "GMAT", "GRE", "IELTS", "TOEFL", "CAT", "None yet"],
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      toast({
        title: "Profile Complete!",
        description: "Let's find your perfect college matches.",
      });
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: string) => {
    setData({ ...data, [currentStepData.id]: value });
  };

  const handleMCQSelect = (option: string) => {
    setData({ ...data, [currentStepData.id]: option });
  };

  const handleBooleanSelect = (value: boolean) => {
    setData({ ...data, [currentStepData.id]: value });
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentExams = data.exams || [];
    if (checked) {
      setData({ ...data, exams: [...currentExams, option] });
    } else {
      setData({ ...data, exams: currentExams.filter(exam => exam !== option) });
    }
  };

  const canProceed = () => {
    const current = data[currentStepData.id as keyof OnboardingData];
    if (currentStepData.type === "input") {
      return typeof current === "string" && current.trim().length > 0;
    }
    if (currentStepData.type === "mcq" || currentStepData.type === "boolean") {
      return current !== undefined && current !== "";
    }
    if (currentStepData.type === "checkbox") {
      return Array.isArray(current) && current.length > 0;
    }
    return false;
  };

  const IconComponent = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="glass-card border-primary/20 max-w-lg animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-foreground">
            Let's personalize your experience
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-foreground-muted">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Card */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{currentStepData.title}</h3>
              </div>

              {/* Input Field */}
              {currentStepData.type === "input" && (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder={`Enter your ${currentStepData.id}...`}
                    value={data[currentStepData.id as keyof OnboardingData] as string || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="glass-card border-border/50 focus:border-primary text-center text-lg"
                    autoFocus
                  />
                </div>
              )}

              {/* MCQ Options */}
              {currentStepData.type === "mcq" && (
                <div className="grid grid-cols-2 gap-3">
                  {currentStepData.options?.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      onClick={() => handleMCQSelect(option)}
                      className={`p-4 h-auto glass-card border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 ${
                        data[currentStepData.id as keyof OnboardingData] === option
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-foreground-muted"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {/* Boolean Options */}
              {currentStepData.type === "boolean" && (
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => handleBooleanSelect(true)}
                    className={`px-8 py-4 glass-card border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 ${
                      data[currentStepData.id as keyof OnboardingData] === true
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-foreground-muted"
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleBooleanSelect(false)}
                    className={`px-8 py-4 glass-card border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 ${
                      data[currentStepData.id as keyof OnboardingData] === false
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-foreground-muted"
                    }`}
                  >
                    No
                  </Button>
                </div>
              )}

              {/* Checkbox Options */}
              {currentStepData.type === "checkbox" && (
                <div className="space-y-3">
                  {currentStepData.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={option}
                        checked={data.exams?.includes(option) || false}
                        onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                        className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor={option}
                        className="text-foreground-muted cursor-pointer hover:text-primary transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="glass-card border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-gradient-primary"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;