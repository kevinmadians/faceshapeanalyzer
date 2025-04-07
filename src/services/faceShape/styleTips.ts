
import { FaceShape, FaceShapeTips, FACE_SHAPES } from './types';

// Generate style tips based on face shape
export function generateStyleTips(faceShape: FaceShape): FaceShapeTips {
  switch (faceShape) {
    case FACE_SHAPES.OVAL:
      return {
        hairstyles: [
          "You can wear most hairstyles due to your well-balanced proportions.",
          "Medium to long layers complement your face shape well.",
          "Side or middle parts both work nicely with your face structure."
        ],
        glasses: [
          "You can wear most eyeglasses styles with your balanced face.",
          "Opt for glasses with balanced proportions that don't upset your natural harmony."
        ],
        makeup: [
          "Light contouring to maintain your natural balance.",
          "Focus on enhancing your features rather than reshaping.",
          "Most makeup styles will complement your face well."
        ]
      };
    case FACE_SHAPES.ROUND:
      return {
        hairstyles: [
          "Angular hairstyles that add height and length will complement your face shape.",
          "Long layers starting below the chin help elongate your face.",
          "Side-swept bangs create asymmetry that slims a round face."
        ],
        glasses: [
          "Rectangle or geometric eyeglasses can add definition to your soft features.",
          "Angular frames help counterbalance the roundness of your face.",
          "Avoid circular frames that echo your face shape."
        ],
        makeup: [
          "Contour along the sides of your face and below your cheekbones.",
          "Elongate your face with vertical highlight down the center.",
          "Apply blush slightly below the apples of your cheeks for definition."
        ]
      };
    case FACE_SHAPES.SQUARE:
      return {
        hairstyles: [
          "Softer hairstyles with layers around the face can soften angular features.",
          "Waves and curls help soften your strong jawline.",
          "Side-swept styles and wispy bangs add softness to angular features."
        ],
        glasses: [
          "Round or oval eyeglasses help balance the natural angles of your face.",
          "Frames with curved edges complement your strong jawline.",
          "Thin frames or rimless styles can soften your angular features."
        ],
        makeup: [
          "Contour the corners of your forehead and jawline to soften angles.",
          "Use rounder application techniques for blush.",
          "Focus highlight on the center of your face to draw attention away from corners."
        ]
      };
    case FACE_SHAPES.HEART:
      return {
        hairstyles: [
          "Medium-length hairstyles that add width at the jaw level balance your proportions.",
          "Side-swept bangs help balance a wider forehead.",
          "Hairstyles with volume at the chin area complement your face shape."
        ],
        glasses: [
          "Light, thin frames or rimless eyeglasses complement your face beautifully.",
          "Bottom-heavy frames add balance to a narrower chin.",
          "Oval or round frames soften the wider upper face."
        ],
        makeup: [
          "Contour at the temples and sides of forehead to minimize width.",
          "Apply blush in a horizontal sweep to create the illusion of width at cheeks.",
          "Use bronzer along the jawline to create definition."
        ]
      };
    case FACE_SHAPES.OBLONG:
      return {
        hairstyles: [
          "Side-swept bangs and layers add width and break the length of your face.",
          "Short to medium-length hairstyles work best.",
          "Styles with volume at the sides help create the illusion of width."
        ],
        glasses: [
          "Oversized or decorative eyeglasses work well to break the vertical line.",
          "Frames with strong horizontal elements are ideal.",
          "Deep or wide frames help balance face length."
        ],
        makeup: [
          "Apply blush horizontally across cheeks to add width.",
          "Use highlighter across the chin and forehead to shorten the face.",
          "Contour the chin and top of the forehead to visually shorten face length."
        ]
      };
    case FACE_SHAPES.DIAMOND:
      return {
        hairstyles: [
          "Hairstyles with volume at the forehead and chin complement your cheekbones.",
          "Side-swept or curtain bangs help soften angular features.",
          "Chin-length bobs accentuate your jawline while balancing cheekbones."
        ],
        glasses: [
          "Eyeglasses with detailing on the top rim or cat-eye shapes work well.",
          "Oval or rimless frames complement your distinct face shape.",
          "Frames that are wider than your cheekbones create balance."
        ],
        makeup: [
          "Apply highlighter to the center of your forehead and chin to add balance.",
          "Contour below the cheekbones to soften their prominence.",
          "Use blush on the apples of your cheeks to enhance your natural structure."
        ]
      };
    default:
      return {
        hairstyles: [
          "Focus on hairstyles that complement your unique facial features.",
          "Consider face-framing layers to enhance your features.",
          "Consult with a professional stylist for personalized recommendations."
        ],
        glasses: [
          "Choose eyewear that balances your face proportions.",
          "Look for frames that complement your facial symmetry.",
          "Try multiple styles to find what suits your face best."
        ],
        makeup: [
          "Use techniques that enhance your natural features.",
          "Experiment with different contouring techniques to find what works best.",
          "Highlight your favorite facial features to draw attention to them."
        ]
      };
  }
}
