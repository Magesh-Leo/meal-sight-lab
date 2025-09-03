import { TrendingUp, Zap, Target, Apple } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Food {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Total {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ApiNutritionData {
  status: string;
  food: Food[];
  total: Total;
}

interface NutritionResultsProps {
  data: ApiNutritionData;
  confidence?: number;
}

export const NutritionResults = ({ data, confidence = 95 }: NutritionResultsProps) => {
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
          <span className="text-xs text-muted-foreground ml-2">{percentage.toFixed(2)}%</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{value.toFixed(1)}</span>
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

  const FoodItem = ({ food }: { food: Food }) => (
    <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Apple className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{food.name}</h4>
            <p className="text-sm text-muted-foreground">{food.quantity}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-foreground">{food.calories} cal</div>
          <div className="text-xs text-muted-foreground">
            P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
          </div>
        </div>
      </div>
    </Card>
  );

  if (!data || !data.total || !data.food) {
    return (
      <div className="text-center text-muted-foreground">
        Invalid nutrition data received
      </div>
    );
  }

  const totalMacros = data.total.protein + data.total.carbs + data.total.fat;
  const proteinPercentage = totalMacros > 0 ? (data.total.protein / totalMacros) * 100 : 0;
  const carbsPercentage = totalMacros > 0 ? (data.total.carbs / totalMacros) * 100 : 0;
  const fatPercentage = totalMacros > 0 ? (data.total.fat / totalMacros) * 100 : 0;

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

      {/* Total Calories */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-soft">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-medium">Total Calories</span>
          </div>
          <div className="text-4xl font-bold">{data.total.calories}</div>
          <div className="text-sm opacity-90">kcal</div>
        </div>
      </Card>

      {/* Macronutrients */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MacroCard
          label="Protein"
          value={data.total.protein}
          unit="g"
          percentage={proteinPercentage}
          color="bg-primary"
        />
        <MacroCard
          label="Carbs"
          value={data.total.carbs}
          unit="g"
          percentage={carbsPercentage}
          color="bg-accent"
        />
        <MacroCard
          label="Fat"
          value={data.total.fat}
          unit="g"
          percentage={fatPercentage}
          color="bg-primary-glow"
        />
      </div>

      {/* Food Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Apple className="w-5 h-5 text-primary" />
          Detected Foods ({data.food.length})
        </h3>
        <div className="space-y-3">
          {data.food.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
        Results are estimates based on AI visual analysis. For precise tracking, 
        consider weighing ingredients individually.
      </div>
    </div>
  );
};