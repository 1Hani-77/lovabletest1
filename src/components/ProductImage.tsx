
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  float?: boolean;
  parallax?: boolean;
  scale?: boolean;
  delay?: number;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className,
  float = false,
  parallax = false,
  scale = false,
  delay = 0,
}) => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            if (!parallax) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [delay, parallax]);

  useEffect(() => {
    if (!parallax) return;

    const handleParallax = () => {
      if (!imgRef.current) return;
      const scrollPosition = window.scrollY;
      const elementPosition = imgRef.current.offsetTop;
      const elementHeight = imgRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition + windowHeight > elementPosition && 
          scrollPosition < elementPosition + elementHeight) {
        const relativePosition = (scrollPosition + windowHeight - elementPosition) / (windowHeight + elementHeight);
        const moveY = relativePosition * 50 - 25; // Move between -25px and 25px
        imgRef.current.style.transform = `translateY(${moveY}px)`;
      }
    };

    if (parallax) {
      window.addEventListener('scroll', handleParallax);
      handleParallax();
    }

    return () => {
      if (parallax) {
        window.removeEventListener('scroll', handleParallax);
      }
    };
  }, [parallax]);

  return (
    <div 
      ref={imgRef}
      className={cn(
        'reveal-on-scroll transition-all duration-700 ease-out-expo relative overflow-hidden',
        float && 'animate-float',
        scale && 'animate-scale-subtle',
        className
      )}
    >
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        className={cn(
          'w-full h-full object-contain transition-all duration-300',
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 pointer-events-none" />
    </div>
  );
};

export default ProductImage;
