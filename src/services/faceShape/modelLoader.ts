import * as tf from '@tensorflow/tfjs';
// Use 'any' to avoid type issues with the face-landmarks-detection library
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

// This is a placeholder for the actual model loading
// In a real application, you would load a pre-trained model
let faceDetectionModel: any = null;
let modelLoadAttempted = false;
let modelLoadPromise: Promise<any> | null = null;

// Initialize TensorFlow.js
export async function initializeTensorFlow(
  progressCallback: (progress: number) => void
): Promise<void> {
  try {
    // Prefer WebGL backend for better performance
    await tf.setBackend('webgl');
    await tf.ready();
    console.log("TensorFlow.js is ready with backend:", tf.getBackend());
    progressCallback(20);
  } catch (error) {
    console.error("Failed to initialize TensorFlow.js:", error);
    // Reset state on error to allow retry
    modelLoadAttempted = false;
    throw new Error("Failed to initialize TensorFlow.js. Please refresh the page to try again.");
  }
}

// Load the face detection model
export async function loadModel(
  progressCallback: (progress: number) => void
): Promise<void> {
  try {
    // Return existing model if already loaded
    if (faceDetectionModel) {
      progressCallback(100);
      console.log("Face detection model already loaded");
      return;
    }

    // Start new model loading process
    modelLoadAttempted = true;
    progressCallback(30);
    
    try {
      // Simple loading approach - try the legacy API first as it's more reliable in browsers
      try {
        console.log("Trying legacy API...");
        // @ts-ignore - Intentionally using any to work with different versions
        faceDetectionModel = await faceLandmarksDetection.load(
          // @ts-ignore
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          {
            maxFaces: 1,
            refineLandmarks: true,
          }
        );
        console.log("Loaded model using legacy API");
      } catch (legacyError) {
        console.log("Legacy API failed, trying newer API:", legacyError);
        // Try the newer API as fallback
        faceDetectionModel = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: 'tfjs',
            refineLandmarks: true,
            maxFaces: 1
          }
        );
        console.log("Loaded model using newer API");
      }
      
      progressCallback(100);
      console.log("Face detection model loaded successfully");
    } catch (error) {
      console.error("Both APIs failed to load the model:", error);
      throw error;
    }
  } catch (error) {
    // Reset state on error to allow retry
    modelLoadAttempted = false;
    modelLoadPromise = null;
    faceDetectionModel = null;
    console.error("Failed to load face detection model:", error);
    throw new Error("Failed to load face detection model. Please refresh the page to try again.");
  }
}

// Export the model for use in other files
export function getModel() {
  if (!faceDetectionModel) {
    throw new Error("Face detection model not loaded. Please refresh and try again.");
  }
  return faceDetectionModel;
}

// Reset the model state - useful for debugging or force reloading
export function resetModel() {
  faceDetectionModel = null;
  modelLoadAttempted = false;
  modelLoadPromise = null;
  console.log("Model state has been reset");
}
