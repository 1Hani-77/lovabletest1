
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'reveal-on-scroll p-6 rounded-lg border border-border/50 hover:border-border',
        'transition-all duration-500 ease-out-expo hover:shadow-soft',
        'bg-white/20 backdrop-blur-xs',
        className
      )}
    >
      <div className="mb-4 text-primary p-2 inline-block rounded-full bg-accent/50">
        {icon}
      </div>
      
      <AnimatedText
        as="h3"
        text={title}
        className="text-xl font-medium mb-2"
        delay={index * 100 + 200}
      />
      
      <AnimatedText
        as="p"
        text={description}
        className="text-muted-foreground"
        delay={index * 100 + 300}
      />
    </div>
  );
};

export default FeatureCard;
