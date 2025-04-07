
import * as tf from '@tensorflow/tfjs';
// Use 'any' to avoid type issues with the face-landmarks-detection library
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

// This is a placeholder for the actual model loading
// In a real application, you would load a pre-trained model
let faceDetectionModel: any = null;

// Initialize TensorFlow.js
export async function initializeTensorFlow(
  progressCallback: (progress: number) => void
): Promise<void> {
  try {
    await tf.ready();
    console.log("TensorFlow.js is ready");
    progressCallback(20);
  } catch (error) {
    console.error("Failed to initialize TensorFlow.js:", error);
    throw new Error("Failed to initialize TensorFlow.js");
  }
}

// Load the face detection model
export async function loadModel(
  progressCallback: (progress: number) => void
): Promise<void> {
  try {
    if (!faceDetectionModel) {
      progressCallback(30);
      
      // Use the newer API if available, otherwise fall back to older API
      if (faceLandmarksDetection.createDetector) {
        console.log("Using createDetector API");
        faceDetectionModel = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: 'tfjs',
            refineLandmarks: true,
            maxFaces: 1
          }
        );
      } else {
        console.log("Using legacy API");
        // This is for compatibility with older versions of the library
        // @ts-ignore - Intentionally using any to work with different versions
        faceDetectionModel = await faceLandmarksDetection.load(
          // @ts-ignore
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          {
            maxFaces: 1,
            refineLandmarks: true,
          }
        );
      }
      
      progressCallback(70);
    }
    
    progressCallback(100);
    console.log("Face detection model loaded");
  } catch (error) {
    console.error("Failed to load face detection model:", error);
    throw new Error("Failed to load face detection model. Please try again.");
  }
}

// Export the model for use in other files
export function getModel() {
  return faceDetectionModel;
}

