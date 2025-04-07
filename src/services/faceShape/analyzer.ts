
import { FaceShape, FACE_SHAPES } from './types';

// Analyze face shape based on landmarks (simplified implementation)
export function analyzeFaceShape(landmarks: { x: number, y: number }[]): Record<FaceShape, number> {
  // This is a simplified version. In a real application,
  // you would use a more sophisticated algorithm to determine the face shape
  
  // For this demo, we're just assigning random scores
  const scores: Record<FaceShape, number> = {
    [FACE_SHAPES.OVAL]: Math.random() * 0.5 + 0.5,
    [FACE_SHAPES.ROUND]: Math.random() * 0.7,
    [FACE_SHAPES.SQUARE]: Math.random() * 0.7,
    [FACE_SHAPES.HEART]: Math.random() * 0.7,
    [FACE_SHAPES.OBLONG]: Math.random() * 0.7,
    [FACE_SHAPES.DIAMOND]: Math.random() * 0.7,
  };
  
  // Normalize the scores
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  for (const shape in scores) {
    scores[shape as FaceShape] = scores[shape as FaceShape] / total;
  }
  
  return scores;
}

// Determine the primary face shape
export function determinePrimaryShape(scores: Record<FaceShape, number>): FaceShape {
  let maxScore = 0;
  let primaryShape: FaceShape = FACE_SHAPES.OVAL; // Default
  
  for (const shape in scores) {
    if (scores[shape as FaceShape] > maxScore) {
      maxScore = scores[shape as FaceShape];
      primaryShape = shape as FaceShape;
    }
  }
  
  return primaryShape;
}

