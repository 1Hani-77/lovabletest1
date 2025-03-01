
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/50 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-20" />

      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedText
            as="span"
            text="Stay Updated"
            className="inline-block text-sm font-medium px-4 py-1 rounded-full bg-secondary text-secondary-foreground mb-4"
            reveal="fade"
          />
          <AnimatedText
            as="h2"
            text="Subscribe to Our Newsletter"
            className="text-3xl md:text-4xl font-medium tracking-tight mb-4"
            delay={100}
          />
          <AnimatedText
            as="p"
            text="Be the first to know about new products, special offers, and upcoming events."
            className="text-muted-foreground text-lg mb-8"
            delay={200}
          />
          
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "w-full px-6 py-4 pr-14 rounded-full bg-secondary/50 border border-border/50",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
                  "transition-all duration-300 ease-out-expo placeholder:text-muted-foreground/70"
                )}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "absolute right-1 top-1 bottom-1 px-4 rounded-full bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-all duration-300 ease-out-expo flex items-center justify-center",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-3 opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
