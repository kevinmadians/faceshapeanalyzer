
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelected: (file: File, imageUrl: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setPreviewImage(imageUrl);
      onImageSelected(file, imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      {!previewImage ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-10 text-center transition-all",
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
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Upload your photo</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Drag and drop your image here or click to browse
              </p>
            </div>
            <Button 
              onClick={() => inputRef.current?.click()}
              className="mt-4"
            >
              Choose Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-auto object-cover"
          />
          <Button
            onClick={clearImage}
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 p-1.5 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
