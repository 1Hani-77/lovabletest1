
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import AnimatedText from './AnimatedText';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;
      heroRef.current.style.opacity = Math.max(opacity, 0).toString();
      heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen pt-32 pb-16 relative overflow-hidden"
      ref={heroRef}
    >
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/50 rounded-full filter blur-3xl opacity-20 animate-pulse-subtle" />
      <div className="absolute top-96 -left-20 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30 animate-pulse-subtle" />
      
      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <AnimatedText
              as="span"
              text="Premium Audio Experience"
              className="inline-block text-sm font-medium px-4 py-1 rounded-full bg-secondary text-secondary-foreground mb-6"
              reveal="fade"
            />
            <AnimatedText
              as="h1"
              text="Immerse in Pure Sound Perfection"
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-6"
              delay={100}
            />
            <AnimatedText
              as="p"
              text="Experience unparalleled audio clarity with our minimalist wireless headphones designed for the discerning listener."
              className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0"
              delay={200}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <a
                href="#features"
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
              >
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded-full border border-border text-foreground hover:bg-secondary transition-all duration-300 flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Product Image */}
          <div className="relative order-1 md:order-2">
            <ProductImage 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
              alt="Premium Headphones" 
              className="max-w-full mx-auto md:ml-auto md:mr-0 w-[80%] md:w-[100%]"
              float={true}
            />
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-secondary/30 rounded-full filter blur-3xl opacity-20 animate-pulse-subtle" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full filter blur-3xl opacity-30 animate-pulse-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
