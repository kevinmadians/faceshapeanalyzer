
import * as tf from '@tensorflow/tfjs';
// Use 'any' to avoid type issues with the face-landmarks-detection library
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

// This is a placeholder for the actual model loading
// In a real application, you would load a pre-trained model
let faceDetectionModel: any = null;
let modelLoadAttempted = false;

// Initialize TensorFlow.js
export async function initializeTensorFlow(
  progressCallback: (progress: number) => void
): Promise<void> {
  try {
    // Set a timeout to avoid hanging forever
    const tfReadyPromise = tf.ready();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("TensorFlow.js initialization timed out")), 10000);
    });
    
    await Promise.race([tfReadyPromise, timeoutPromise]);
    console.log("TensorFlow.js is ready");
    progressCallback(20);
  } catch (error) {
    console.error("Failed to initialize TensorFlow.js:", error);
    throw new Error("Failed to initialize TensorFlow.js. Your browser might not support this feature.");
  }
}

// Load the face detection model
export async function loadModel(
  progressCallback: (progress: number) => void
): Promise<void> {
  try {
    if (!faceDetectionModel && !modelLoadAttempted) {
      modelLoadAttempted = true;
      progressCallback(30);
      
      // Set a timeout to avoid hanging forever
      const modelLoadPromise = loadModelImplementation();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Model loading timed out")), 15000);
      });
      
      faceDetectionModel = await Promise.race([modelLoadPromise, timeoutPromise]);
      
      progressCallback(70);
    }
    
    progressCallback(100);
    console.log("Face detection model loaded or already available");
  } catch (error) {
    modelLoadAttempted = false; // Reset so we can try again
    console.error("Failed to load face detection model:", error);
    throw new Error("Failed to load face detection model. Your browser might not fully support this feature.");
  }
}

async function loadModelImplementation() {
  try {
    // Use the newer API if available, otherwise fall back to older API
    if (faceLandmarksDetection.createDetector) {
      console.log("Using createDetector API");
      return await faceLandmarksDetection.createDetector(
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
      return await faceLandmarksDetection.load(
        // @ts-ignore
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        {
          maxFaces: 1,
          refineLandmarks: true,
        }
      );
    }
  } catch (error) {
    console.error("Error in model implementation loading:", error);
    throw error;
  }
}

// Export the model for use in other files
export function getModel() {
  return faceDetectionModel;
}
