
import React from 'react';
import { Smartphone, Zap, Waves, Headphones } from 'lucide-react';
import FeatureCard from './FeatureCard';
import AnimatedText from './AnimatedText';
import ProductImage from './ProductImage';

const Features = () => {
  const features = [
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Superior Sound Quality',
      description: 'Experience crystal clear highs and deep, rich bass with our precision-engineered sound technology.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'All-Day Battery Life',
      description: 'Enjoy up to 40 hours of playtime with a single charge, giving you uninterrupted listening experience.',
    },
    {
      icon: <Waves className="h-6 w-6" />,
      title: 'Active Noise Cancellation',
      description: 'Immerse yourself in your audio while intelligent noise cancellation blocks unwanted ambient sounds.',
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Seamless Connectivity',
      description: 'Connect effortlessly to multiple devices with advanced Bluetooth 5.2 technology.',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedText
            as="span"
            text="Why Choose Us"
            className="inline-block text-sm font-medium px-4 py-1 rounded-full bg-secondary text-secondary-foreground mb-4"
            reveal="fade"
          />
          <AnimatedText
            as="h2"
            text="Premium Features for Discerning Listeners"
            className="text-3xl md:text-4xl font-medium tracking-tight mb-4"
            delay={100}
          />
          <AnimatedText
            as="p"
            text="Every detail is thoughtfully crafted for an exceptional audio experience."
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            delay={200}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-32">
          <div className="order-2 md:order-1">
            <AnimatedText
              as="span"
              text="Minimalist Design"
              className="inline-block text-sm font-medium px-4 py-1 rounded-full bg-secondary text-secondary-foreground mb-4"
              reveal="fade"
            />
            <AnimatedText
              as="h2"
              text="Form Meets Function in Perfect Harmony"
              className="text-3xl md:text-4xl font-medium tracking-tight mb-6"
              delay={100}
            />
            <AnimatedText
              as="p"
              text="Our headphones are crafted with meticulous attention to detail, combining premium materials with ergonomic design for all-day comfort."
              className="text-muted-foreground text-lg mb-8"
              delay={200}
            />
            
            <ul className="space-y-4">
              {[
                'Lightweight, durable construction',
                'Premium materials that feel luxurious',
                'Ergonomic design for extended comfort',
                'Thoughtful details in every aspect'
              ].map((item, index) => (
                <AnimatedText
                  key={index}
                  as="li"
                  text={item}
                  className="flex items-center text-foreground"
                  delay={300 + index * 100}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                </AnimatedText>
              ))}
            </ul>
          </div>
          
          <div className="order-1 md:order-2">
            <ProductImage 
              src="https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop"
              alt="Minimalist headphones design"
              className="max-w-full"
              parallax={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
