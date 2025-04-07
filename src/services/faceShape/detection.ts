
import { getModel, loadModel } from './modelLoader';
import { analyzeFaceShape, determinePrimaryShape } from './analyzer';
import { generateStyleTips } from './styleTips';
import { FaceShapeResult } from './types';

// Detect face landmarks from an image
export async function detectFaceLandmarks(
  imageUrl: string,
  progressCallback: (progress: number) => void
): Promise<FaceShapeResult | null> {
  try {
    const model = getModel();
    if (!model) {
      console.log("Model not loaded, attempting to load it now...");
      await loadModel(progressCallback);
    }
    
    progressCallback(20);
    
    // Load the image
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = (e) => {
        console.error("Error loading image:", e);
        reject(new Error("Failed to load image. Please try a different one."));
      };
      img.src = imageUrl;
    });
    
    progressCallback(40);
    
    const faceDetectionModel = getModel();
    if (!faceDetectionModel) {
      throw new Error("Face detection model is not available. Please refresh and try again.");
    }
    
    // Use the face detection model
    let predictions;
    try {
      if (typeof faceDetectionModel.estimateFaces === 'function') {
        // Older API
        predictions = await faceDetectionModel.estimateFaces(img);
      } else {
        // Newer API
        predictions = await faceDetectionModel.detect(img);
      }
    } catch (error) {
      console.error("Error during face detection:", error);
      throw new Error("Failed to detect faces in the image. Please try a clearer photo.");
    }
    
    progressCallback(60);
    
    if (!predictions || predictions.length === 0) {
      console.log("No faces detected");
      return null;
    }
    
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
      console.log("No valid landmarks found");
      throw new Error("Failed to extract facial landmarks. Please try a clearer photo with a front-facing view.");
    }
    
    // Convert raw landmarks to {x, y} format
    const landmarks = rawLandmarks.map(point => ({
      x: point[0],
      y: point[1]
    }));
    
    progressCallback(80);
    
    // Analyze face shape
    const faceShapeScores = analyzeFaceShape(landmarks);
    const primaryShape = determinePrimaryShape(faceShapeScores);
    const tips = generateStyleTips(primaryShape);
    
    progressCallback(100);
    
    return {
      primaryShape,
      scores: faceShapeScores,
      landmarks,
      tips,
      imageUrl
    };
    
  } catch (error) {
    console.error("Error detecting face landmarks:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to analyze face shape. Please try again with a clearer image.");
  }
}
