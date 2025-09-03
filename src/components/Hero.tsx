import { Camera, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nutrition-ai.jpg";

interface HeroProps {
  onCaptureClick: () => void;
  onUploadClick: () => void;
}

export const Hero = ({ onCaptureClick, onUploadClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background with improved contrast */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8 text-left lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-hero-primary">Snap.</span>
                <span className="block text-hero-primary">Analyze.</span>
                <span className="block text-hero-accent font-bold">Optimize.</span>
              </h1>
              <p className="text-xl md:text-2xl text-hero-secondary max-w-2xl font-medium">
                Get instant AI-powered nutrition analysis from any meal photo. 
                Know your macros in seconds, not minutes.
              </p>
            </div>
            
            {/* Action buttons with clear hierarchy */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
                onClick={onCaptureClick}
              >
                <Camera className="w-6 h-6" />
                Capture Photo
              </Button>
              <Button 
                variant="capture" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
                onClick={onUploadClick}
              >
                <Upload className="w-6 h-6" />
                Upload Image
              </Button>
            </div>
            
            {/* Feature highlight - improved visibility */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-hero-accent/20 rounded-full border border-hero-accent/30">
                <Zap className="w-5 h-5 text-hero-accent" />
              </div>
              <span className="text-base font-semibold text-hero-secondary">
                Instant AI analysis • 95% accuracy • Works offline
              </span>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-card">
              <img 
                src={heroImage} 
                alt="AI analyzing a healthy meal on smartphone screen"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-pulse-glow" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};