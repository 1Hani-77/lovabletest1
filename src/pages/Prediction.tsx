
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { Headphones, Volume2, Music, Zap } from 'lucide-react';

// This is a simplified ML model for demonstration
// In a real app, this would be replaced with an API call to a real ML service
const predictPrice = (
  quality: number, 
  features: number, 
  brand: number
): number => {
  // Simple weighted formula - would be replaced by actual ML model
  const basePrice = 199;
  const qualityFactor = quality * 100;
  const featuresFactor = features * 50;
  const brandFactor = brand * 75;
  
  return basePrice + qualityFactor + featuresFactor + brandFactor;
};

const Prediction = () => {
  const [audioQuality, setAudioQuality] = useState<number>(5);
  const [features, setFeatures] = useState<number>(3);
  const [brandValue, setBrandValue] = useState<number>(3);
  const [price, setPrice] = useState<number | null>(null);

  const handlePredict = () => {
    const predictedPrice = predictPrice(audioQuality / 10, features / 10, brandValue / 10);
    setPrice(predictedPrice);
    toast("Price prediction complete!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center">
          <AnimatedText 
            as="h1" 
            text="AI Price Prediction" 
            className="text-4xl md:text-5xl font-bold mb-4"
            reveal="up"
          />
          <AnimatedText 
            as="p" 
            text="Find out the ideal price point for your premium audio device" 
            className="text-xl text-muted-foreground"
            reveal="up"
            delay={100}
          />
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-soft">
          <div className="grid gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                <Label htmlFor="audio-quality" className="text-lg font-medium">Audio Quality</Label>
              </div>
              <Slider
                id="audio-quality"
                min={1}
                max={10}
                step={1}
                value={[audioQuality]}
                onValueChange={(value) => setAudioQuality(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Basic</span>
                <span>Premium</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Music className="h-5 w-5 text-primary" />
                <Label htmlFor="features" className="text-lg font-medium">Feature Set</Label>
              </div>
              <Slider
                id="features"
                min={1}
                max={10}
                step={1}
                value={[features]}
                onValueChange={(value) => setFeatures(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Basic</span>
                <span>Advanced</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Headphones className="h-5 w-5 text-primary" />
                <Label htmlFor="brand-value" className="text-lg font-medium">Brand Value</Label>
              </div>
              <Slider
                id="brand-value"
                min={1}
                max={10}
                step={1}
                value={[brandValue]}
                onValueChange={(value) => setBrandValue(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>New Brand</span>
                <span>Established</span>
              </div>
            </div>
            
            <Button 
              onClick={handlePredict}
              className="w-full mt-4 py-6 text-lg"
              size="lg"
            >
              <Zap className="mr-2" /> Generate Price Prediction
            </Button>
            
            {price !== null && (
              <div className="mt-6 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <h3 className="text-xl font-medium mb-2">Recommended Price Point</h3>
                <p className="text-4xl font-bold text-primary">${price.toFixed(2)}</p>
                <p className="mt-2 text-muted-foreground">Based on your specifications</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Prediction;
