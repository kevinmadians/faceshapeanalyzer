import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, Menu, X } from 'lucide-react';

interface NavbarProps {
  showTryItButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showTryItButton = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b backdrop-blur-sm bg-white/95 sticky top-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-auto h-12 flex items-center justify-center">
              <img src="/images/logo.png" alt="Face Shape Analyzer Logo" className="h-10 object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Face Shape Analyzer
              </h1>
              <span className="text-xs text-muted-foreground leading-none hidden md:inline">AI-Powered</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/about" 
              className={`text-sm font-medium ${isActive('/about') 
                ? 'text-foreground hover:text-primary' 
                : 'text-muted-foreground hover:text-foreground'} transition-colors`}
            >
              About
            </Link>
            <Link 
              to="/face-shapes" 
              className={`text-sm font-medium ${isActive('/face-shapes') 
                ? 'text-foreground hover:text-primary' 
                : 'text-muted-foreground hover:text-foreground'} transition-colors`}
            >
              Face Shapes
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            {showTryItButton && (
              <Button 
                onClick={() => {
                  if (location.pathname === '/') {
                    document.querySelector('.upload-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/';
                  }
                }}
                variant="default" 
                size="sm" 
                className="gap-2 bg-primary hover:bg-primary/90 hidden md:flex"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Try It Now</span>
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                className={`px-4 py-2 text-sm font-medium hover:bg-accent rounded-md ${isActive('/about') ? 'text-primary' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/face-shapes" 
                className={`px-4 py-2 text-sm font-medium hover:bg-accent rounded-md ${isActive('/face-shapes') ? 'text-primary' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Face Shapes
              </Link>
              {location.pathname !== '/' && (
                <Link
                  to="/"
                  className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Face Shape Analyzer
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar; 