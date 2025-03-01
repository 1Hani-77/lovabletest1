
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Prediction = () => {
  const [quality, setQuality] = useState([5]);
  const [features, setFeatures] = useState([3]);
  const [brand, setBrand] = useState([3]);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = () => {
    // Simple placeholder prediction algorithm
    // In a real application, this would call an API with a trained ML model
    const basePrice = 2000;
    const qualityFactor = quality[0] * 200;
    const featuresFactor = features[0] * 150;
    const brandFactor = brand[0] * 300;
    
    const predictedPrice = basePrice + qualityFactor + featuresFactor + brandFactor;
    setPrediction(predictedPrice);
    
    toast({
      title: "Prediction Complete",
      description: `The estimated price is $${predictedPrice}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Audio Equipment Price Predictor</h1>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Predict Audio Equipment Price</CardTitle>
            <CardDescription>
              Adjust the sliders below based on your equipment specifications to get a price prediction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="quality">Sound Quality</Label>
                <span>{quality[0]}/10</span>
              </div>
              <Slider
                id="quality"
                min={1}
                max={10}
                step={1}
                value={quality}
                onValueChange={setQuality}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="features">Features</Label>
                <span>{features[0]}/5</span>
              </div>
              <Slider
                id="features"
                min={1}
                max={5}
                step={1}
                value={features}
                onValueChange={setFeatures}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="brand">Brand Reputation</Label>
                <span>{brand[0]}/5</span>
              </div>
              <Slider
                id="brand"
                min={1}
                max={5}
                step={1}
                value={brand}
                onValueChange={setBrand}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePredict}>
              Predict Price
            </Button>
          </CardFooter>
        </Card>

        {prediction !== null && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">Estimated Price:</h2>
            <p className="text-3xl font-bold text-primary">${prediction}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Prediction;
