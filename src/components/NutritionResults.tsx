import { TrendingUp, Zap, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface NutritionResultsProps {
  data: NutritionData;
  confidence: number;
}

export const NutritionResults = ({ data, confidence }: NutritionResultsProps) => {
  const MacroCard = ({ 
    label, 
    value, 
    unit, 
    percentage, 
    color 
  }: { 
    label: string; 
    value: number; 
    unit: string; 
    percentage: number; 
    color: string; 
  }) => (
    <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          
          <div className="w-full bg-muted/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${color}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );

  const totalMacros = data.protein + data.carbs + data.fat;
  const proteinPercentage = (data.protein / totalMacros) * 100;
  const carbsPercentage = (data.carbs / totalMacros) * 100;
  const fatPercentage = (data.fat / totalMacros) * 100;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Nutrition Analysis</h2>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Target className="w-4 h-4" />
          <span>{confidence}% AI Confidence</span>
        </div>
      </div>

      {/* Calories */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-soft">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-medium">Total Calories</span>
          </div>
          <div className="text-4xl font-bold">{data.calories}</div>
          <div className="text-sm opacity-90">kcal</div>
        </div>
      </Card>

      {/* Macronutrients */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MacroCard
          label="Protein"
          value={data.protein}
          unit="g"
          percentage={proteinPercentage}
          color="bg-primary"
        />
        <MacroCard
          label="Carbs"
          value={data.carbs}
          unit="g"
          percentage={carbsPercentage}
          color="bg-accent"
        />
        <MacroCard
          label="Fat"
          value={data.fat}
          unit="g"
          percentage={fatPercentage}
          color="bg-primary-glow"
        />
      </div>

      {/* Additional nutrients */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
          <div className="text-center space-y-1">
            <div className="text-lg font-bold text-foreground">{data.fiber}g</div>
            <div className="text-sm text-muted-foreground">Fiber</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
          <div className="text-center space-y-1">
            <div className="text-lg font-bold text-foreground">{data.sugar}g</div>
            <div className="text-sm text-muted-foreground">Sugar</div>
          </div>
        </Card>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
        Results are estimates based on AI visual analysis. For precise tracking, 
        consider weighing ingredients individually.
      </div>
    </div>
  );
};