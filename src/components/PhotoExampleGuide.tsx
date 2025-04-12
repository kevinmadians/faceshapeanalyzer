import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

const PhotoExampleGuide: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setOpen(true)}
        className="text-xs sm:text-sm text-primary flex items-center gap-1.5 mx-auto border-primary/30 hover:bg-primary/5"
      >
        <HelpCircle className="h-3.5 w-3.5" />
        View example of a good photo
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Example of an Ideal Photo</DialogTitle>
            <DialogDescription>
              For best face shape analysis results, use a photo similar to this example
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-2">
            <div className="rounded-lg overflow-hidden shadow-md border border-primary/10">
              <img 
                src="/images/example_photo.png" 
                alt="Example of ideal face photo" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-4 bg-primary/5 p-4 rounded-lg text-sm border border-primary/10">
              <h4 className="font-medium mb-2 text-primary">Key characteristics:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                <li>Front-facing pose with neutral expression</li>
                <li>Even lighting on the face</li>
                <li>Hair pulled back to reveal face shape</li>
                <li>No glasses or accessories blocking features</li>
                <li>High-quality, clear image</li>
              </ul>
            </div>
          </div>

          <DialogClose asChild>
            <Button className="mt-4 w-full sm:w-auto sm:ml-auto">Got it</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoExampleGuide; 