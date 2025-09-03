import { useRef, useState } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelect, isAnalyzing }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      // For now, just trigger file input as a fallback
      fileInputRef.current?.click();
    } catch (error) {
      // Fallback to file input
      fileInputRef.current?.click();
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  if (preview) {
    return (
      <Card className="relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="relative">
          <img 
            src={preview} 
            alt="Selected meal"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {!isAnalyzing && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
              onClick={clearPreview}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          {isAnalyzing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="flex items-center gap-3 text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg font-medium">Analyzing nutrition...</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`relative border-2 border-dashed transition-all duration-300 bg-gradient-card backdrop-blur-sm ${
        dragActive 
          ? 'border-primary bg-primary/5 scale-105' 
          : 'border-border/50 hover:border-primary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="p-8 text-center space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Upload Your Meal Photo
            </h3>
            <p className="text-muted-foreground">
              Drag and drop an image, or click to select
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="default" 
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Choose File
          </Button>
          <Button 
            variant="capture" 
            onClick={startCamera}
            className="gap-2"
          >
            <Camera className="w-4 h-4" />
            Use Camera
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Supports JPG, PNG, WebP up to 10MB
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </Card>
  );
};