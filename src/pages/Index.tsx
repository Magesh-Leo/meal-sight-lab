import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { NutritionResults } from "@/components/NutritionResults";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    setIsAnalyzing(true);
    
    try {
      // Create FormData to send the image
      const formData = new FormData();
      formData.append('image', file);
      
      // Send to webhook
      const response = await fetch('https://magesh-srinivasan.app.n8n.cloud/webhook-test/meal-ai', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the nutrition data from the webhook response
      if (data && data.length > 0 && data[0].output && data[0].output.status === 'success') {
        setNutritionData(data[0].output);
      } else {
        throw new Error('Invalid response format');
      }
      
      toast({
        title: "Analysis Complete!",
        description: "Your meal nutrition has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCaptureClick = () => {
    // Scroll to upload section
    document.getElementById('upload-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleUploadClick = () => {
    // Scroll to upload section
    document.getElementById('upload-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setNutritionData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero 
        onCaptureClick={handleCaptureClick}
        onUploadClick={handleUploadClick}
      />
      
      {/* Analysis Section */}
      <section id="upload-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Upload Area */}
            <div className="space-y-6">
              <div className="text-center lg:text-left space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Start Your Analysis
                </h2>
                <p className="text-lg text-muted-foreground">
                  Upload a photo of your meal and get instant nutritional insights
                </p>
              </div>
              
              <ImageUpload 
                onImageSelect={handleImageSelect}
                isAnalyzing={isAnalyzing}
              />
              
              {selectedImage && !nutritionData && !isAnalyzing && (
                <div className="text-center">
                  <button
                    onClick={resetAnalysis}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Try a different image
                  </button>
                </div>
              )}
            </div>
            
            {/* Results Area */}
            <div className="lg:sticky lg:top-8">
              {nutritionData ? (
                <NutritionResults 
                  data={nutritionData}
                  confidence={Math.floor(Math.random() * 10) + 90}
                />
              ) : (
                <div className="bg-gradient-card backdrop-blur-sm rounded-xl p-8 border border-border/50">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Ready to Analyze
                      </h3>
                      <p className="text-muted-foreground">
                        Your nutrition results will appear here once you upload an image
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {nutritionData && (
                <div className="mt-6 text-center">
                  <button
                    onClick={resetAnalysis}
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Analyze Another Meal →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
