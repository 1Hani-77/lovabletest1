
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
  as?: React.ElementType;
  reveal?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  children,
  as: Component = 'div',
  reveal = 'up'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (reveal) {
      case 'up':
        return 'translate-y-8 opacity-0 revealed:translate-y-0 revealed:opacity-100';
      case 'down':
        return 'translate-y-[-8px] opacity-0 revealed:translate-y-0 revealed:opacity-100';
      case 'left':
        return 'translate-x-[-8px] opacity-0 revealed:translate-x-0 revealed:opacity-100';
      case 'right':
        return 'translate-x-8 opacity-0 revealed:translate-x-0 revealed:opacity-100';
      case 'fade':
        return 'opacity-0 revealed:opacity-100';
      default:
        return 'translate-y-8 opacity-0 revealed:translate-y-0 revealed:opacity-100';
    }
  };

  return (
    <Component
      ref={elementRef}
      className={cn(
        getAnimationClass(),
        'transition-all duration-700 ease-out-expo',
        className
      )}
    >
      {text}
      {children}
    </Component>
  );
};

export default AnimatedText;
