// Common types for face shape analysis

export const FACE_SHAPES = {
  OVAL: 'Oval',
  ROUND: 'Round',
  SQUARE: 'Square',
  HEART: 'Heart',
  OBLONG: 'Oblong',
  DIAMOND: 'Diamond',
} as const;

export type FaceShape = typeof FACE_SHAPES[keyof typeof FACE_SHAPES];

export interface FaceShapeTips {
  hairstyles: string[];
  glasses: string[];
  makeup: string[];
}

// Type for face detection result
export type FaceShapeResult = {
  primaryShape: FaceShape;
  scores: Record<FaceShape, number>;
  landmarks: { x: number, y: number }[];
  tips: FaceShapeTips;
  imageUrl: string;
  // Add new metrics for advanced analysis
  metrics?: {
    faceRatio?: number;
    jawlineStrength?: number;
    foreheadWidth?: number;
    chinProminence?: number;
    cheekboneWidth?: number;
    symmetryScore?: number;
    goldenRatio?: number;
  };
  analysisDate?: string; // ISO date when the analysis was performed
};

