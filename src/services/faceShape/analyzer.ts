
import { FaceShape, FACE_SHAPES } from './types';

// Calculate ratio of width to height
function calculateWidthToHeightRatio(landmarks: { x: number, y: number }[]): number {
  if (landmarks.length === 0) return 1;
  
  // Find the face width (distance between leftmost and rightmost points)
  let minX = 1, maxX = 0;
  // Find the face height (distance between top and bottom points)
  let minY = 1, maxY = 0;
  
  landmarks.forEach(point => {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  });
  
  const width = maxX - minX;
  const height = maxY - minY;
  
  return width / height;
}

// Calculate jaw angle (how angular or round the jawline is)
function calculateJawAngularity(landmarks: { x: number, y: number }[]): number {
  // This is simplified. In a real implementation, we would identify
  // specific jaw landmarks and calculate the angles between them.
  // Here we'll estimate based on a subset of points most likely to be on the jawline
  
  // Take points that are likely on the jawline (in bottom 30% of face)
  const jawPoints = landmarks.filter(point => point.y > 0.7);
  
  if (jawPoints.length < 3) return 0.5; // Default if not enough points
  
  // Sort points by x coordinate
  jawPoints.sort((a, b) => a.x - b.x);
  
  // Calculate average change in angle between consecutive points
  let totalAngleChange = 0;
  let angleSamples = 0;
  
  for (let i = 1; i < jawPoints.length - 1; i++) {
    const prev = jawPoints[i-1];
    const curr = jawPoints[i];
    const next = jawPoints[i+1];
    
    // Calculate angles using Math.atan2
    const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
    
    // Calculate the absolute angle change
    let angleDiff = Math.abs(angle2 - angle1);
    // Normalize to be between 0 and Math.PI
    if (angleDiff > Math.PI) angleDiff = (2 * Math.PI) - angleDiff;
    
    totalAngleChange += angleDiff;
    angleSamples++;
  }
  
  // Higher value means more angular jawline
  const averageAngleChange = angleSamples > 0 ? totalAngleChange / angleSamples : 0.5;
  // Normalize to a 0-1 range where 1 means very angular
  return Math.min(1, averageAngleChange / (Math.PI / 4));
}

// Calculate forehead width relative to jawline width
function calculateForeheadToJawRatio(landmarks: { x: number, y: number }[]): number {
  // Group landmarks by vertical position (y-coordinate)
  // Assuming y=0 is top and y=1 is bottom
  const topThird = landmarks.filter(point => point.y < 0.33);
  const bottomThird = landmarks.filter(point => point.y > 0.67);
  
  if (topThird.length < 2 || bottomThird.length < 2) return 1; // Default if not enough points
  
  // Calculate width of forehead (top third of face)
  const foreheadLeft = Math.min(...topThird.map(p => p.x));
  const foreheadRight = Math.max(...topThird.map(p => p.x));
  const foreheadWidth = foreheadRight - foreheadLeft;
  
  // Calculate width of jawline (bottom third of face)
  const jawLeft = Math.min(...bottomThird.map(p => p.x));
  const jawRight = Math.max(...bottomThird.map(p => p.x));
  const jawWidth = jawRight - jawLeft;
  
  // Return ratio of forehead width to jaw width
  return foreheadWidth / jawWidth;
}

// Calculate cheekbone prominence
function calculateCheekboneProminence(landmarks: { x: number, y: number }[]): number {
  // Identify middle third of face (where cheekbones are)
  const middleThird = landmarks.filter(point => point.y > 0.33 && point.y < 0.67);
  const topThird = landmarks.filter(point => point.y < 0.33);
  const bottomThird = landmarks.filter(point => point.y > 0.67);
  
  if (middleThird.length < 2 || topThird.length < 2 || bottomThird.length < 2) return 0.5;
  
  // Calculate max width in each third
  const topWidth = Math.max(...topThird.map(p => p.x)) - Math.min(...topThird.map(p => p.x));
  const middleWidth = Math.max(...middleThird.map(p => p.x)) - Math.min(...middleThird.map(p => p.x));
  const bottomWidth = Math.max(...bottomThird.map(p => p.x)) - Math.min(...bottomThird.map(p => p.x));
  
  // Cheekbone prominence is high when middle third is wider than both top and bottom
  const avgOtherWidth = (topWidth + bottomWidth) / 2;
  
  return middleWidth / avgOtherWidth;
}

// Calculate chin pointiness
function calculateChinPointiness(landmarks: { x: number, y: number }[]): number {
  // Get bottom 15% of points (the chin area)
  const chinPoints = landmarks.filter(point => point.y > 0.85);
  
  if (chinPoints.length < 3) return 0.5;
  
  // Calculate the average x-coordinate (center line)
  const avgX = chinPoints.reduce((sum, point) => sum + point.x, 0) / chinPoints.length;
  
  // Calculate average distance of points from center line
  const avgDistance = chinPoints.reduce((sum, point) => sum + Math.abs(point.x - avgX), 0) / chinPoints.length;
  
  // Lower value means more pointed chin
  return 1 - Math.min(1, avgDistance * 10);
}

// Analyze face shape based on landmarks
export function analyzeFaceShape(landmarks: { x: number, y: number }[]): Record<FaceShape, number> {
  // Calculate key measurements
  const widthToHeightRatio = calculateWidthToHeightRatio(landmarks);
  const jawAngularity = calculateJawAngularity(landmarks);
  const foreheadToJawRatio = calculateForeheadToJawRatio(landmarks);
  const cheekboneProminence = calculateCheekboneProminence(landmarks);
  const chinPointiness = calculateChinPointiness(landmarks);
  
  // Calculate scores for each face shape based on these measurements
  const scores: Record<FaceShape, number> = {
    // Oval: Balanced proportions, width-to-height ratio around 0.75
    [FACE_SHAPES.OVAL]: Math.max(0, 1 - Math.abs(widthToHeightRatio - 0.75) * 2),
    
    // Round: Width similar to height, softer jaw angles
    [FACE_SHAPES.ROUND]: Math.max(0, 1 - Math.abs(widthToHeightRatio - 0.9) * 2) * (1 - jawAngularity),
    
    // Square: Width similar to height, angular jaw
    [FACE_SHAPES.SQUARE]: Math.max(0, 1 - Math.abs(widthToHeightRatio - 0.9) * 2) * jawAngularity * (1 - chinPointiness),
    
    // Heart: Wider forehead than jawline, pointed chin
    [FACE_SHAPES.HEART]: Math.max(0, foreheadToJawRatio - 1) * chinPointiness,
    
    // Oblong: Height much greater than width
    [FACE_SHAPES.OBLONG]: Math.max(0, 1 - Math.abs(widthToHeightRatio - 0.65) * 3),
    
    // Diamond: Prominent cheekbones, narrow forehead and jawline
    [FACE_SHAPES.DIAMOND]: cheekboneProminence * (1 - Math.abs(foreheadToJawRatio - 1))
  };
  
  // Normalize the scores
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  if (total > 0) {
    for (const shape in scores) {
      scores[shape as FaceShape] = scores[shape as FaceShape] / total;
    }
  } else {
    // Fallback if all scores are 0
    scores[FACE_SHAPES.OVAL] = 1;
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
