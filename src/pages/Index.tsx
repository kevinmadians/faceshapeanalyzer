
import React, { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import LoadingScreen from '@/components/LoadingScreen';
import FaceShapeResult from '@/components/FaceShapeResult';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';
import {
  detectFaceLandmarks,
  FaceShapeResult as FaceShapeResultType
} from '@/services/faceShape';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [modelLoading, setModelLoading] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const [result, setResult] = useState<FaceShapeResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const prepareModel = async () => {
      try {
        setModelLoading(true);
        setLoadingMessage('Initializing TensorFlow.js...');
        
        // Load the model in the background without blocking the UI render
        import('@/services/faceShape').then(async ({ initializeTensorFlow, loadModel }) => {
          try {
            await initializeTensorFlow(setLoadingProgress);
            setLoadingMessage('Loading face detection model...');
            // Pre-load the model in the background
            await loadModel(setLoadingProgress);
            setModelReady(true);
            sonnerToast.success('Face detection model loaded successfully!');
          } catch (error) {
            console.error("Failed to initialize or load model:", error);
            setError("Model loading failed. You can still upload an image, but analysis may not work.");
            toast({
              title: "Model Loading Warning",
              description: "Face detection model couldn't be loaded. Some features may be limited.",
              variant: "destructive",
            });
          } finally {
            setModelLoading(false);
          }
        });
      } catch (error) {
        console.error("Failed to load module:", error);
        setError("Failed to load application modules.");
        setModelLoading(false);
      }
    };

    prepareModel();
  }, [toast]);

  const handleImageSelected = (file: File, imageUrl: string) => {
    setSelectedImage({ file, url: imageUrl });
    // Reset any previous results
    setResult(null);
    setError(null);
  };
  
  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setLoadingProgress(0);
    setLoadingMessage('Analyzing your face shape...');
    setError(null);
    
    try {
      if (!modelReady) {
        // If model isn't ready, try loading it now
        const { loadModel } = await import('@/services/faceShape');
        await loadModel(setLoadingProgress);
      }
      
      // Run face detection
      const detectionResult = await detectFaceLandmarks(selectedImage.url, setLoadingProgress);
      
      if (!detectionResult) {
        toast({
          title: "No Face Detected",
          description: "We couldn't detect a clear face in your image. Please try a different photo with a clear, front-facing view.",
          variant: "destructive",
        });
        setError("No face detected in the image. Please upload a clear, front-facing photo.");
        setLoading(false);
        return;
      }
      
      setResult(detectionResult);
      
    } catch (error) {
      console.error("Error during face analysis:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Analysis failed: ${errorMessage}`);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-mesh">
      <header className="py-6 mb-6 border-b">
        <div className="container">
          <div className="flex items-center justify-center">
            <Camera className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold text-center">Face Shape Oracle</h1>
          </div>
          <p className="text-center mt-2 text-muted-foreground max-w-md mx-auto">
            Upload your photo to discover your face shape and get personalized style recommendations
          </p>
        </div>
      </header>
      
      <main className="container px-4 pb-16">
        {error && (
          <div className="max-w-xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">{error}</p>
            <p className="text-sm mt-2">Please try uploading a different photo or refresh the page.</p>
          </div>
        )}
        
        {modelLoading && (
          <div className="max-w-xl mx-auto mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            <p className="font-medium">Loading face detection model...</p>
            <p className="text-sm mt-2">You can upload your image while we prepare the model.</p>
          </div>
        )}
        
        {!result ? (
          <>
            <div className="max-w-xl mx-auto mb-8">
              <ImageUploader onImageSelected={handleImageSelected} />
            </div>
            
            {selectedImage && (
              <div className="text-center mt-8">
                <Button 
                  onClick={handleAnalyze} 
                  size="lg" 
                  disabled={loading}
                  className="px-8"
                >
                  {loading ? "Analyzing..." : "Analyze My Face Shape"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Your photo is processed locally in your browser and is not uploaded to any server
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-8 text-center">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Analyze Another Photo
              </Button>
            </div>
            
            <FaceShapeResult 
              result={{
                primary: result.primaryShape,
                scores: result.scores,
                tips: result.tips
              }} 
              imageUrl={result.imageUrl} 
              landmarks={result.landmarks}
            />
          </>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Face Shape Oracle &copy; {new Date().getFullYear()} - Face analysis runs entirely in your browser
          </p>
        </div>
      </footer>
      
      <LoadingScreen 
        isVisible={loading} 
        progress={loadingProgress}
        message={loadingMessage} 
      />
    </div>
  );
};

export default Index;
