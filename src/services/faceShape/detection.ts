import { getModel, loadModel, resetModel } from './modelLoader';
import { analyzeFaceShape, determinePrimaryShape } from './analyzer';
import { generateStyleTips } from './styleTips';
import { FaceShapeResult } from './types';

// Simple delay helper function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Detect face landmarks from an image
export async function detectFaceLandmarks(
  imageUrl: string,
  progressCallback: (progress: number) => void
): Promise<FaceShapeResult | null> {
  try {
    // Try to get the model - if it fails, try to load it again
    let faceDetectionModel;
    try {
      faceDetectionModel = getModel();
    } catch (error) {
      console.log("Model not loaded, attempting to load it now...");
      await loadModel(progressCallback);
      faceDetectionModel = getModel();
    }
    
    progressCallback(20);
    await delay(200); // Short delay after model loading
    
    // Load the image
    const img = new Image();
    img.crossOrigin = "anonymous"; // Try to prevent CORS issues
    
    progressCallback(25);
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = (e) => {
        console.error("Error loading image:", e);
        reject(new Error("Failed to load image. Please try a different one."));
      };
      img.src = imageUrl;
    });
    
    progressCallback(30);
    await delay(300); // Slight delay after image loading
    
    // Begin face detection (gradual progress updates for visual effect)
    progressCallback(35);
    await delay(200);
    progressCallback(40);
    
    // Use the face detection model with simplified error handling
    let predictions;
    try {
      // Try both API styles
      if (typeof faceDetectionModel.estimateFaces === 'function') {
        // Older API
        predictions = await faceDetectionModel.estimateFaces(img, {
          returnTensors: false,
          flipHorizontal: false,
          predictIrises: true
        });
      } else {
        // Newer API
        predictions = await faceDetectionModel.detect(img);
      }
    } catch (error) {
      console.error("Error during face detection:", error);
      
      // Reset the model and try one more time
      resetModel();
      await loadModel(progressCallback);
      faceDetectionModel = getModel();
      
      // Try once more with the reloaded model
      if (typeof faceDetectionModel.estimateFaces === 'function') {
        predictions = await faceDetectionModel.estimateFaces(img);
      } else {
        predictions = await faceDetectionModel.detect(img);
      }
    }
    
    progressCallback(60);
    await delay(300); // Delay after face detection
    
    if (!predictions || predictions.length === 0) {
      console.log("No faces detected in the image");
      return null;
    }
    
    progressCallback(65);
    
    const face = predictions[0];
    let rawLandmarks: number[][] = [];
    
    // Extract landmarks (compatible with both API versions)
    if (face.keypoints) {
      // Newer API
      rawLandmarks = face.keypoints.map((kp: any) => [kp.x, kp.y]);
    } else if (face.scaledMesh) {
      // Older API
      rawLandmarks = face.scaledMesh;
    } else if (face.mesh) {
      // Another possible format
      rawLandmarks = face.mesh;
    }
    
    if (!rawLandmarks || rawLandmarks.length === 0) {
      console.log("No valid landmarks found in the face");
      throw new Error("Failed to extract facial landmarks. Please try a clearer photo with a front-facing view.");
    }
    
    // Convert raw landmarks to {x, y} format
    const landmarks = rawLandmarks.map(point => ({
      x: point[0],
      y: point[1]
    }));
    
    progressCallback(70);
    await delay(400); // Slightly longer delay to simulate measurement calculations
    
    // Show incremental progress during analysis
    progressCallback(75);
    await delay(250);
    progressCallback(80);
    
    // Analyze face shape
    const faceShapeScores = analyzeFaceShape(landmarks);
    progressCallback(85);
    await delay(300);
    
    const primaryShape = determinePrimaryShape(faceShapeScores);
    progressCallback(90);
    await delay(200);
    
    // Generate styling recommendations
    const tips = generateStyleTips(primaryShape);
    
    progressCallback(95);
    await delay(400); // Final delay for recommendation generation
    
    progressCallback(100);
    
    return {
      primaryShape,
      scores: faceShapeScores,
      landmarks,
      tips,
      imageUrl
    };
    
  } catch (error) {
    console.error("Error in face shape detection:", error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Failed to analyze face shape. Please try again with a clearer image."
    );
  }
}
