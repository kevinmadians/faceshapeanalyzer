import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelected: (file: File, imageUrl: string) => void;
  onImageCleared?: () => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onImageCleared,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Compress an image to a specified size
  const compressImage = (file: File, maxWidth: number, maxHeight: number, quality: number = 0.7): Promise<File> => {
    return new Promise((resolve, reject) => {
      setIsCompressing(true);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          // If image is already small enough, return the original file
          if (img.width <= maxWidth && img.height <= maxHeight && file.size <= 2 * 1024 * 1024) {
            setIsCompressing(false);
            resolve(file);
            return;
          }
          
          // Create a canvas to draw the resized image
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * (maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * (maxHeight / height));
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw the resized image on the canvas
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert canvas to Blob
          canvas.toBlob((blob) => {
            if (!blob) {
              setIsCompressing(false);
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            
            // Create new File from Blob
            const compressedFile = new File(
              [blob], 
              file.name, 
              { type: 'image/jpeg', lastModified: Date.now() }
            );
            
            setIsCompressing(false);
            resolve(compressedFile);
          }, 'image/jpeg', quality);
        };
        
        img.onerror = () => {
          setIsCompressing(false);
          reject(new Error('Error loading image'));
        };
      };
      
      reader.onerror = () => {
        setIsCompressing(false);
        reject(new Error('Error reading file'));
      };
    });
  };

  const handleFile = async (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG)",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if file needs compression (over 2MB or potentially large dimensions)
      let processedFile = file;
      
      if (file.size > 2 * 1024 * 1024) {
        // Compress the image if it's too large
        processedFile = await compressImage(file, 1920, 1920, 0.8);
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        onImageSelected(processedFile, imageUrl);
      };
      reader.readAsDataURL(processedFile);
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error processing image",
        description: "Please try a different image or refresh the page",
        variant: "destructive",
      });
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onImageCleared) {
      onImageCleared();
    }
  };

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      {!previewImage ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-3 sm:p-6 text-center transition-all",
            dragActive ? "border-primary bg-accent/50" : "border-border",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            onChange={handleChange}
            type="file"
            className="hidden"
            accept="image/jpeg, image/png"
            id="image-upload"
          />
          
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-3">
            <div className="w-10 h-12 sm:w-16 sm:h-16 rounded-full bg-lavender flex items-center justify-center">
              <Upload className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div className="space-y-0.5 sm:space-y-2">
              <h3 className="font-medium text-sm sm:text-lg">Upload your photo</h3>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mx-auto">
                Drag and drop your image here or click to browse
              </p>
            </div>
            <Button 
              onClick={() => inputRef.current?.click()}
              className="mt-1 sm:mt-3"
              size="sm"
              disabled={isCompressing}
            >
              {isCompressing ? "Processing..." : "Choose Image"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-md bg-background">
            <div className="flex items-center justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-auto max-w-full h-auto object-contain max-h-[500px]"
                style={{ display: 'block' }}
              />
            </div>
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 to-transparent h-12 pointer-events-none"></div>
            <Button
              onClick={clearImage}
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 p-1.5 rounded-full shadow-sm z-10"
              disabled={isCompressing}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
