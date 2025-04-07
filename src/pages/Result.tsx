
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById } from '@/services/supabaseService';
import FaceShapeResult from '@/components/FaceShapeResult';
import LoadingScreen from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Share2, ChevronLeft } from 'lucide-react';

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchResult = async () => {
      if (!id) {
        setError("No result ID provided");
        setLoading(false);
        return;
      }
      
      try {
        const data = await getAnalysisById(id);
        if (!data) {
          setError("Result not found. It may have been deleted or the URL is incorrect.");
          setLoading(false);
          return;
        }
        
        setResult(data);
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("Failed to load result. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResult();
  }, [id]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Face Shape Analysis',
        text: `Check out my face shape: ${result.primary_shape}`,
        url: window.location.href
      }).catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Share this link with your friends"
        });
      });
    }
  };
  
  const handleTryAgain = () => {
    navigate('/');
  };
  
  if (loading) {
    return <LoadingScreen isVisible={true} progress={50} message="Loading your results..." />;
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-mesh flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="mb-6 text-gray-700">{error}</p>
          <Button onClick={handleTryAgain}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Start New Analysis
          </Button>
        </div>
      </div>
    );
  }
  
  // Convert database format to component format
  const formattedResult = {
    primary: result.primary_shape,
    scores: result.scores,
    tips: result.tips
  };
  
  return (
    <div className="min-h-screen bg-mesh">
      <header className="py-6 mb-6 border-b">
        <div className="container">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> 
              Home
            </Button>
            <h1 className="text-2xl font-bold text-center">Face Shape Results</h1>
            <Button variant="ghost" onClick={handleShare} className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container px-4 pb-16">
        <div className="mb-6 bg-gradient-to-r from-primary/10 to-primary/20 p-4 rounded-lg">
          <h2 className="font-medium text-lg">Analysis Details</h2>
          <p className="text-sm text-muted-foreground">
            Analysis created on {new Date(result.created_at).toLocaleDateString()} at {new Date(result.created_at).toLocaleTimeString()}
          </p>
        </div>
        
        <FaceShapeResult 
          result={formattedResult} 
          imageUrl={result.image_url} 
        />
        
        <div className="mt-12 bg-accent/50 rounded-lg p-6 max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Did you know?</h2>
          <p className="mb-4">
            {result.primary_shape === 'Oval' && "The oval face shape is often considered the most versatile and balanced face shape, making it easy to wear almost any hairstyle."}
            {result.primary_shape === 'Round' && "Many celebrities with round face shapes use angular hairstyles and accessories to add definition to their soft features."}
            {result.primary_shape === 'Square' && "The square face shape is often associated with a strong jawline and is considered very photogenic due to its defined angles."}
            {result.primary_shape === 'Heart' && "The heart-shaped face is characterized by a wider forehead tapering to a narrower chin, resembling a heart or inverted triangle."}
            {result.primary_shape === 'Oblong' && "The oblong face shape is longer than it is wide and benefits from hairstyles that add width, creating a more balanced appearance."}
            {result.primary_shape === 'Diamond' && "The diamond face shape features high, defined cheekbones, making it one of the rarest and most sought-after face shapes."}
          </p>
          <Button onClick={handleTryAgain} className="gap-2">
            <Camera className="h-4 w-4" />
            Try Another Photo
          </Button>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Face Shape Oracle &copy; {new Date().getFullYear()} - Your unique face shape assistant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Result;
