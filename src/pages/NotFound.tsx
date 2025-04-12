import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col items-center justify-center p-4">
      <SEO 
        title="Page Not Found - Face Shape Analyzer"
        description="The page you're looking for doesn't exist or has been moved. Return to the Face Shape Analyzer homepage."
        canonicalUrl="/404"
        keywords="page not found, 404 error, face shape analyzer"
        noIndex={true}
      />
      
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
