
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const handleRevealElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        if (elementTop + elementHeight * 0.2 <= windowHeight) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleRevealElements);
    window.addEventListener('resize', handleRevealElements);
    
    // Initial check on page load
    setTimeout(handleRevealElements, 100);
    
    return () => {
      window.removeEventListener('scroll', handleRevealElements);
      window.removeEventListener('resize', handleRevealElements);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
