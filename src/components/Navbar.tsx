
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
        isScrolled
          ? 'py-3 glass shadow-soft backdrop-blur-md'
          : 'py-6 bg-transparent'
      )}
    >
      <nav className="container max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a 
            href="#home" 
            className="text-xl font-medium tracking-tight"
          >
            Airnova
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-md pt-24 px-6 flex flex-col md:hidden transition-all duration-300 ease-out-expo',
          isMobileMenuOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'
        )}
      >
        <ul className="flex flex-col space-y-6 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
