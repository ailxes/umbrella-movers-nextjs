"use client";
import { useState } from "react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingDown, Home, DollarSign, Briefcase } from "lucide-react";

const calculatorSchema = z.object({
  californiaCity: z.string().min(1, "Please select a city"),
  annualIncome: z.number().min(10000, "Income must be at least $10,000").max(10000000, "Income must be less than $10,000,000"),
  monthlyHousing: z.number().min(0, "Housing cost cannot be negative").max(50000, "Housing cost must be less than $50,000"),
  housingType: z.enum(["rent", "mortgage"])
});

type CalculatorInput = z.infer<typeof calculatorSchema>;

interface CityData {
  name: string;
  medianHomePrice: number;
  avgRent2Bed: number;
  stateTaxRate: number;
  avgGasPrice: number;
  avgInsurance: number;
}

const californiaGities: Record<string, CityData> = {
  "los-angeles": {
    name: "Los Angeles",
    medianHomePrice: 1000000,
    avgRent2Bed: 3500,
    stateTaxRate: 0.093,
    avgGasPrice: 5.0,
    avgInsurance: 2400
  },
  "san-francisco": {
    name: "San Francisco",
    medianHomePrice: 1600000,
    avgRent2Bed: 4500,
    stateTaxRate: 0.093,
    avgGasPrice: 5.3,
    avgInsurance: 2600
  },
  "san-jose": {
    name: "San Jose",
    medianHomePrice: 1450000,
    avgRent2Bed: 4000,
    stateTaxRate: 0.093,
    avgGasPrice: 5.2,
    avgInsurance: 2500
  },
  "oakland": {
    name: "Oakland",
    medianHomePrice: 850000,
    avgRent2Bed: 3200,
    stateTaxRate: 0.093,
    avgGasPrice: 5.3,
    avgInsurance: 2500
  },
  "san-diego": {
    name: "San Diego",
    medianHomePrice: 900000,
    avgRent2Bed: 3200,
    stateTaxRate: 0.093,
    avgGasPrice: 4.8,
    avgInsurance: 2300
  },
  "sacramento": {
    name: "Sacramento",
    medianHomePrice: 500000,
    avgRent2Bed: 2200,
    stateTaxRate: 0.093,
    avgGasPrice: 4.6,
    avgInsurance: 2100
  }
};

const lasVegasData = {
  medianHomePrice: 462500,
  avgRent2Bed: 1875,
  stateTaxRate: 0,
  avgGasPrice: 3.5,
  avgInsurance: 1600
};

export const CostOfLivingCalculator = () => {
  const [californiaCity, setCaliforniaCity] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [monthlyHousing, setMonthlyHousing] = useState<string>("");
  const [housingType, setHousingType] = useState<"rent" | "mortgage">("rent");
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateSavings = () => {
    // Clear previous errors
    setErrors({});

    // Validate inputs
    const result = calculatorSchema.safeParse({
      californiaCity,
      annualIncome: Number(annualIncome),
      monthlyHousing: Number(monthlyHousing),
      housingType
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setShowResults(true);
  };

  const getSavingsData = () => {
    if (!californiaCity || !annualIncome || !monthlyHousing) return null;

    const cityData = californiaGities[californiaCity];
    const income = Number(annualIncome);
    const housing = Number(monthlyHousing);

    // Calculate California state income tax (simplified progressive calculation)
    let caTaxAmount = 0;
    if (income <= 20198) {
      caTaxAmount = income * 0.01;
    } else if (income <= 47884) {
      caTaxAmount = 202 + (income - 20198) * 0.02;
    } else if (income <= 75576) {
      caTaxAmount = 755 + (income - 47884) * 0.04;
    } else if (income <= 104910) {
      caTaxAmount = 1863 + (income - 75576) * 0.06;
    } else if (income <= 132590) {
      caTaxAmount = 3623 + (income - 104910) * 0.08;
    } else {
      caTaxAmount = 5837 + (income - 132590) * cityData.stateTaxRate;
    }

    // Housing savings calculation
    const vegasHousingCost = housingType === "rent" ? lasVegasData.avgRent2Bed : (lasVegasData.medianHomePrice * 0.005); // Rough mortgage estimate
    const caHousingCost = housing;
    const annualHousingSavings = (caHousingCost - vegasHousingCost) * 12;

    // Insurance savings
    const insuranceSavings = cityData.avgInsurance - lasVegasData.avgInsurance;

    // Total annual savings
    const totalSavings = caTaxAmount + annualHousingSavings + insuranceSavings;

    return {
      taxSavings: Math.round(caTaxAmount),
      housingSavings: Math.round(annualHousingSavings),
      insuranceSavings: Math.round(insuranceSavings),
      totalAnnualSavings: Math.round(totalSavings),
      totalDecadeSavings: Math.round(totalSavings * 10),
      vegasHousingCost: Math.round(vegasHousingCost),
      cityName: cityData.name
    };
  };

  const savings = showResults ? getSavingsData() : null;

  return (
    <div className="my-12 bg-secondary/50 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent rounded-lg">
          <Calculator className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Cost of Living Calculator</h2>
          <p className="text-muted-foreground">Calculate your potential savings moving from California to Las Vegas</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-background">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* California City */}
          <div className="space-y-2">
            <Label htmlFor="californiaCity" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Current California City
            </Label>
            <Select value={californiaCity} onValueChange={setCaliforniaCity}>
              <SelectTrigger id="californiaCity" className={errors.californiaCity ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="san-jose">San Jose</SelectItem>
                <SelectItem value="oakland">Oakland</SelectItem>
                <SelectItem value="san-diego">San Diego</SelectItem>
                <SelectItem value="sacramento">Sacramento</SelectItem>
              </SelectContent>
            </Select>
            {errors.californiaCity && (
              <p className="text-sm text-destructive">{errors.californiaCity}</p>
            )}
          </div>

          {/* Annual Income */}
          <div className="space-y-2">
            <Label htmlFor="annualIncome" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Annual Household Income
            </Label>
            <Input
              id="annualIncome"
              type="number"
              placeholder="75000"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className={errors.annualIncome ? "border-destructive" : ""}
            />
            {errors.annualIncome && (
              <p className="text-sm text-destructive">{errors.annualIncome}</p>
            )}
          </div>

          {/* Housing Type */}
          <div className="space-y-2">
            <Label htmlFor="housingType" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Housing Type
            </Label>
            <Select value={housingType} onValueChange={(value: "rent" | "mortgage") => setHousingType(value)}>
              <SelectTrigger id="housingType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Renting</SelectItem>
                <SelectItem value="mortgage">Own (Mortgage)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Housing Cost */}
          <div className="space-y-2">
            <Label htmlFor="monthlyHousing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Monthly {housingType === "rent" ? "Rent" : "Mortgage"} Payment
            </Label>
            <Input
              id="monthlyHousing"
              type="number"
              placeholder="3500"
              value={monthlyHousing}
              onChange={(e) => setMonthlyHousing(e.target.value)}
              className={errors.monthlyHousing ? "border-destructive" : ""}
            />
            {errors.monthlyHousing && (
              <p className="text-sm text-destructive">{errors.monthlyHousing}</p>
            )}
          </div>
        </div>

        <Button 
          onClick={calculateSavings}
          className="w-full md:w-auto bg-accent hover:bg-accent-dark text-accent-foreground font-bold"
          size="lg"
        >
          Calculate My Savings
        </Button>

        {/* Results */}
        {showResults && savings && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center gap-2 mb-6">
              <TrendingDown className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Your Potential Savings</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="p-5 bg-secondary">
                <div className="text-sm text-muted-foreground mb-1">Annual Tax Savings</div>
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  ${savings.taxSavings.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Nevada: 0% state income tax</div>
              </Card>

              <Card className="p-5 bg-secondary">
                <div className="text-sm text-muted-foreground mb-1">Annual Housing Savings</div>
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  ${savings.housingSavings.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Vegas avg: ${savings.vegasHousingCost.toLocaleString()}/mo
                </div>
              </Card>

              <Card className="p-5 bg-secondary">
                <div className="text-sm text-muted-foreground mb-1">Insurance Savings</div>
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  ${savings.insuranceSavings.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Per year</div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Total Annual Savings</div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-4">
                  ${savings.totalAnnualSavings.toLocaleString()}
                </div>
                <div className="text-muted-foreground mb-4">
                  Moving from {savings.cityName} to Las Vegas
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">10-Year Savings Projection</div>
                  <div className="text-3xl font-bold">
                    ${savings.totalDecadeSavings.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enough for early retirement, college education, or investment property
                  </p>
                </div>
              </div>
            </Card>

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Note:</strong> This calculator provides estimates based on 2025 average costs and may vary based on individual circumstances. 
                Tax calculations are simplified; consult a tax professional for precise figures.
              </p>
              <p>
                <strong>Sources:</strong> Median home prices from Zillow, rent data from Apartments.com, tax rates from CA Franchise Tax Board, 
                insurance rates from industry averages.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
