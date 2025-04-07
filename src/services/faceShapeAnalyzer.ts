
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs';
import { v4 as uuidv4 } from 'uuid';

export interface FaceShapeResult {
  id: string;
  imageUrl: string;
  landmarks: { x: number; y: number }[];
  primaryShape: string;
  scores: {
    oval: number;
    round: number;
    square: number;
    heart: number;
    oblong: number;
    diamond: number;
  };
  tips: {
    hairstyles: string[];
    glasses: string[];
    makeup: string[];
  };
}

export const SHAPE_TIPS = {
  oval: {
    hairstyles: [
      "Most styles work well with oval faces",
      "Medium-length cuts with layers",
      "Side-swept bangs enhance your balanced features"
    ],
    glasses: [
      "Most frame styles complement oval faces",
      "Try rectangular or geometric frames",
      "Avoid oversized frames that overwhelm your features"
    ],
    makeup: [
      "Light contouring to enhance your natural symmetry",
      "Blush applied to the apples of the cheeks",
      "Any eyebrow shape works well—follow your natural arch"
    ]
  },
  round: {
    hairstyles: [
      "Long layers that frame the face",
      "Side parts to create asymmetry",
      "Styles with volume on top to elongate your face"
    ],
    glasses: [
      "Angular or rectangular frames",
      "Frames that are wider than they are tall",
      "Avoid round frames that emphasize face roundness"
    ],
    makeup: [
      "Contour cheekbones and jawline to create definition",
      "Highlight the center of your face to create length",
      "Defined, angular brows to add structure"
    ]
  },
  square: {
    hairstyles: [
      "Soft layers around the face to soften angles",
      "Side-swept styles that de-emphasize jawline",
      "Waves or curls to add softness"
    ],
    glasses: [
      "Round or oval frames to balance angular features",
      "Frames with curved edges or rimless styles",
      "Avoid square or rectangular frames that echo your face shape"
    ],
    makeup: [
      "Contour temples and jawline to soften angles",
      "Round blush placement on the apples of cheeks",
      "Soft, rounded brow shapes"
    ]
  },
  heart: {
    hairstyles: [
      "Chin-length cuts to add width to narrow jawline",
      "Side-swept or curtain bangs to soften forehead width",
      "Medium to long layers with volume at the jaw"
    ],
    glasses: [
      "Bottom-heavy frames that add width to lower face",
      "Light-colored or rimless frames at the top",
      "Oval frames that balance the face proportions"
    ],
    makeup: [
      "Contour temples and highlight jawline",
      "Blush applied horizontally across cheeks to widen lower face",
      "Bold lip colors to draw attention to the lower face"
    ]
  },
  oblong: {
    hairstyles: [
      "Side-swept or straight-across bangs to shorten face",
      "Short to medium styles with volume on the sides",
      "Waves and curls to add width"
    ],
    glasses: [
      "Deep frames with low bridges",
      "Decorative or contrasting temples to add width",
      "Avoid narrow frames that make your face appear longer"
    ],
    makeup: [
      "Horizontal application of blush across cheeks",
      "Contour at hairline and chin to shorten appearance",
      "Defined brows with a soft arch"
    ]
  },
  diamond: {
    hairstyles: [
      "Side-swept bangs to soften forehead",
      "Styles with fullness at jaw level",
      "Chin-length cuts that emphasize your cheekbones"
    ],
    glasses: [
      "Frames with detailing or distinctive brow lines",
      "Oval or walnut-shaped frames that balance cheekbones",
      "Rimless or semi-rimless styles"
    ],
    makeup: [
      "Subtle highlight on cheekbones (they're already prominent)",
      "Contour temples and chin to soften narrow areas",
      "Rounded brows to balance angular features"
    ]
  }
};

// Initialize TensorFlow.js
export const initializeTensorFlow = async () => {
  await tf.ready();
  // WebGL backend is faster, but we'll have a CPU fallback
  try {
    await tf.setBackend('webgl');
    console.log('Using WebGL backend');
  } catch (e) {
    console.log('WebGL backend not available, falling back to CPU');
    await tf.setBackend('cpu');
  }
};

// Load the face landmarks detection model
let model: faceLandmarksDetection.FaceLandmarksDetector | null = null;

export const loadModel = async (setProgress: (progress: number) => void): Promise<void> => {
  setProgress(10);

  if (!model) {
    setProgress(20);
    model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 }
    );
    setProgress(60);
  }
  
  setProgress(70);
};

export const detectFaceLandmarks = async (
  imageUrl: string,
  setProgress: (progress: number) => void
): Promise<FaceShapeResult | null> => {
  try {
    // Ensure model is loaded
    if (!model) {
      await loadModel(setProgress);
    }
    
    setProgress(75);
    
    // Load the image
    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    setProgress(80);
    
    // Run detection
    const predictions = await model!.estimateFaces({
      input: img,
    });

    if (predictions.length === 0) {
      console.error('No face detected');
      return null;
    }

    setProgress(90);

    // Get the first face prediction
    const face = predictions[0];
    
    // Get normalized landmarks (values between 0 and 1)
    // MediaPipe Face Mesh returns 468 landmarks
    const landmarkPoints = face.scaledMesh.map(point => ({
      x: point[0] / img.width,
      y: point[1] / img.height
    }));

    // Extract key measurements from the landmarks
    const measurements = calculateFaceMeasurements(landmarkPoints);
    
    // Analyze face shape based on measurements
    const shapeScores = analyzeFaceShape(measurements);
    
    // Find the primary face shape (highest score)
    let primaryShape = 'oval'; // Default
    let highestScore = 0;
    
    Object.entries(shapeScores).forEach(([shape, score]) => {
      if (score > highestScore) {
        highestScore = score;
        primaryShape = shape;
      }
    });

    setProgress(95);

    // Create result object
    const result: FaceShapeResult = {
      id: uuidv4(),
      imageUrl,
      landmarks: landmarkPoints,
      primaryShape,
      scores: shapeScores,
      tips: SHAPE_TIPS[primaryShape as keyof typeof SHAPE_TIPS]
    };

    setProgress(100);
    
    return result;
  } catch (error) {
    console.error('Error detecting face landmarks:', error);
    return null;
  }
};

// Helper functions for face shape analysis
interface FaceMeasurements {
  faceLength: number;
  foreheadWidth: number;
  cheekboneWidth: number;
  jawWidth: number;
  jawAngle: number;
  chinShape: number;
}

function calculateFaceMeasurements(landmarks: { x: number; y: number }[]): FaceMeasurements {
  // These indices are based on MediaPipe Face Mesh landmark map
  // See: https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection
  
  // Face height (forehead to chin)
  const faceLength = landmarks[152].y - landmarks[10].y;
  
  // Forehead width
  const foreheadWidth = landmarks[338].x - landmarks[68].x;
  
  // Cheekbone width
  const cheekboneWidth = landmarks[356].x - landmarks[123].x;
  
  // Jawline width
  const jawWidth = landmarks[172].x - landmarks[397].x;
  
  // Jaw angle (lower jaw to ear)
  const jawLeft = {
    x: landmarks[172].x,
    y: landmarks[172].y
  };
  const jawRight = {
    x: landmarks[397].x,
    y: landmarks[397].y
  };
  const ear = {
    x: (landmarks[234].x + landmarks[454].x) / 2,
    y: (landmarks[234].y + landmarks[454].y) / 2
  };
  
  // Calculate angle using vectors
  const jawAngle = Math.abs((Math.atan2(ear.y - jawLeft.y, ear.x - jawLeft.x) +
                             Math.atan2(ear.y - jawRight.y, ear.x - jawRight.x)) / 2);
  
  // Chin shape (pointed vs square)
  const chinBottom = landmarks[152];
  const chinLeft = landmarks[149];
  const chinRight = landmarks[378];
  // Measure how pointed the chin is
  const chinWidth = chinRight.x - chinLeft.x;
  const chinHeight = chinBottom.y - (chinLeft.y + chinRight.y) / 2;
  const chinShape = chinHeight / chinWidth; // Higher values = more pointed chin
  
  return {
    faceLength,
    foreheadWidth,
    cheekboneWidth,
    jawWidth,
    jawAngle,
    chinShape
  };
}

function analyzeFaceShape(measurements: FaceMeasurements) {
  const { 
    faceLength, 
    foreheadWidth, 
    cheekboneWidth, 
    jawWidth, 
    jawAngle, 
    chinShape 
  } = measurements;
  
  // Normalize measurements relative to face length
  const normalizedForeheadWidth = foreheadWidth / faceLength;
  const normalizedCheekboneWidth = cheekboneWidth / faceLength;
  const normalizedJawWidth = jawWidth / faceLength;
  
  // Calculate ratios
  const foreheadToCheekbone = foreheadWidth / cheekboneWidth;
  const cheekboneToJaw = cheekboneWidth / jawWidth;
  const foreheadToJaw = foreheadWidth / jawWidth;
  
  // Initialize scores for each face shape
  let scores = {
    oval: 0,
    round: 0,
    square: 0,
    heart: 0,
    oblong: 0,
    diamond: 0
  };
  
  // Oval: Length about 1.5x width, gradual taper from cheekbones
  scores.oval += gaussian(faceLength / cheekboneWidth, 1.5, 0.2) * 0.5;
  scores.oval += gaussian(cheekboneToJaw, 1.1, 0.1) * 0.3;
  scores.oval += gaussian(foreheadToCheekbone, 0.9, 0.1) * 0.2;
  
  // Round: Length close to width, soft jaw angles
  scores.round += gaussian(faceLength / cheekboneWidth, 1.0, 0.2) * 0.4;
  scores.round += (1 - Math.min(jawAngle / Math.PI, 1)) * 0.3;
  scores.round += gaussian(cheekboneToJaw, 1.0, 0.1) * 0.3;
  
  // Square: Strong jaw, width similar throughout
  scores.square += gaussian(jawAngle / Math.PI, 0.7, 0.15) * 0.4;
  scores.square += gaussian(foreheadToJaw, 1.0, 0.15) * 0.3;
  scores.square += gaussian(cheekboneToJaw, 1.0, 0.15) * 0.3;
  
  // Heart: Wide forehead, narrow jaw
  scores.heart += gaussian(foreheadToJaw, 1.4, 0.2) * 0.4;
  scores.heart += (1 - gaussian(chinShape, 0.5, 0.2)) * 0.3; // More pointed chin
  scores.heart += gaussian(foreheadToCheekbone, 1.1, 0.1) * 0.3;
  
  // Oblong: Longer face, similar width throughout
  scores.oblong += gaussian(faceLength / cheekboneWidth, 1.8, 0.2) * 0.5;
  scores.oblong += gaussian(foreheadToJaw, 1.0, 0.15) * 0.25;
  scores.oblong += gaussian(foreheadToCheekbone, 1.0, 0.1) * 0.25;
  
  // Diamond: Wide cheekbones, narrow forehead and jaw
  scores.diamond += gaussian(cheekboneToJaw, 1.3, 0.15) * 0.4;
  scores.diamond += gaussian(foreheadToCheekbone, 0.7, 0.1) * 0.4;
  scores.diamond += (1 - gaussian(normalizedJawWidth, 0.9, 0.1)) * 0.2; // Narrower jaw
  
  // Normalize scores
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  Object.keys(scores).forEach(key => {
    scores[key as keyof typeof scores] /= totalScore;
  });
  
  return scores;
}

// Helper function: Gaussian distribution for fuzzy matching
function gaussian(x: number, mean: number, stdDev: number): number {
  return Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
}
