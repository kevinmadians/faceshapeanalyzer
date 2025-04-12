import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, CheckCircle, Info, Scissors, Glasses, Brush } from 'lucide-react';
import FaceShapeIcon from '@/components/icons/FaceShapeIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const FaceShapes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faceShapes = [
    {
      id: 'oval',
      name: 'Oval',
      description: 'Considered the most balanced face shape with forehead slightly wider than the jawline and gentle curves.',
      characteristics: [
        'Forehead slightly wider than chin',
        'Face length approximately 1.5 times width',
        'Gentle curves with no sharp angles',
        'Balanced proportions with cheekbones as widest point'
      ],
      bestHairstyles: 'Most hairstyles work well, including pixie cuts, bobs, long layers, side or center parts.',
      bestGlasses: 'Most frame shapes complement oval faces. Try rectangular, square, or aviator styles.',
      bestMakeup: 'Focus on highlighting cheekbones with blush and contouring under cheekbones. Most eyebrow shapes work well.'
    },
    {
      id: 'round',
      name: 'Round',
      description: 'Characterized by soft angles, curved jawline, and face length approximately equal to face width.',
      characteristics: [
        'Face length and width are similar proportions',
        'Full cheeks with soft angles',
        'Rounded jawline with minimal definition',
        'Curved, wider hairline'
      ],
      bestHairstyles: 'Styles that add height and angles, like layered cuts, side-swept bangs, or shoulder-length with layers.',
      bestGlasses: 'Angular frames like rectangular, square, or cat-eye shapes to add definition.',
      bestMakeup: 'Contour cheeks to create definition and highlight center of forehead. Create angular brows.'
    },
    {
      id: 'square',
      name: 'Square',
      description: 'Defined by a strong jawline, wide forehead, and roughly equal face length and width measurements.',
      characteristics: [
        'Strong, angular jawline',
        'Straight sides with minimal tapering',
        'Broad forehead with straight hairline',
        'Face width and length often similar'
      ],
      bestHairstyles: 'Styles that soften angles, like side-swept bangs, layers, and styles with volume on top.',
      bestGlasses: 'Round or oval frames to balance angular features. Avoid rectangular frames.',
      bestMakeup: 'Soften jawline with bronzer, contour temples, and use rounded brow shapes.'
    },
    {
      id: 'heart',
      name: 'Heart',
      description: 'Widest at the forehead with a narrow chin, often featuring a widow\'s peak hairline.',
      characteristics: [
        'Wide forehead tapering to a narrow, sometimes pointed chin',
        'High, sometimes pronounced cheekbones',
        'Often has a widow\'s peak hairline',
        'Narrower jawline than forehead'
      ],
      bestHairstyles: 'Styles with volume at the jaw area, like chin-length bobs, side-swept bangs, and layered cuts.',
      bestGlasses: 'Bottom-heavy frames, rimless styles, or oval shapes that balance forehead width.',
      bestMakeup: 'Contour forehead and highlight chin to create balance. Focus blush on lower cheekbones.'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      description: 'Characterized by high, dramatic cheekbones with narrower forehead and jawline.',
      characteristics: [
        'Narrow forehead and jawline',
        'Dramatic, high cheekbones as widest point',
        'Possibly angular jawline with pointed chin',
        'High forehead often partially covered by hairstyle'
      ],
      bestHairstyles: 'Styles with volume at forehead and jawline, like side-swept bangs, chin-length styles, or textured pixie cuts.',
      bestGlasses: 'Oval, cat-eye, or rimless frames that highlight cheekbones without adding width.',
      bestMakeup: 'Highlight forehead and jawline while subtly contouring cheekbones. Rounded brow shapes work well.'
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      description: 'Also called "oblong," features longer face with forehead, cheeks, and jawline of similar width.',
      characteristics: [
        'Face length greater than width',
        'Forehead, cheeks, and jawline similar in width',
        'Often has a long, straight jawline',
        'High forehead with straight hairline'
      ],
      bestHairstyles: 'Styles with volume at sides, like layered cuts, waves, or curls. Side-swept bangs work well.',
      bestGlasses: 'Wide frames with decorative temples to add width. Try round, square, or cat-eye styles.',
      bestMakeup: 'Contour at hairline and jawline to shorten appearance. Use horizontal brow shapes.'
    },
    {
      id: 'triangle',
      name: 'Triangle',
      description: 'Features a wider jawline that tapers to a narrower forehead, creating an inverted triangle appearance.',
      characteristics: [
        'Wider jawline than forehead',
        'Minimal definition in cheekbones',
        'Possibly heavy or wide jaw',
        'Narrower temples and forehead'
      ],
      bestHairstyles: 'Styles with volume at the crown and temples, like side-parted styles, layers around the face, or full bangs.',
      bestGlasses: 'Frames that are wider at the top, like cat-eye or semi-rimless styles with detailed upper portions.',
      bestMakeup: 'Contour jawline and highlight forehead to create balance. Focus on creating height with eyebrows.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="Face Shape Guide - Face Shape Analyzer"
        description="Comprehensive guide to all face shapes: oval, round, square, heart, diamond, oblong, and triangle. Learn the characteristics of each face shape and get styling advice."
        canonicalUrl="/face-shapes"
        keywords="types of face shapes, face shape characteristics, oval face, round face, square face, heart shaped face, diamond face, oblong face, styling for face shapes"
      />
      
      {/* Header with Navbar */}
      <Navbar />

      <main className="container px-4 py-12 flex-grow">
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Complete Guide</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Master Your Face Shape
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how to identify and style for each of the seven classic face shapes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Why Face Shape Matters</h2>
                <p className="text-muted-foreground mb-4">
                  Your face shape is determined by the structure of your facial bones, particularly your jawline, 
                  cheekbones, and forehead width. Understanding your face shape is the key to selecting styles that 
                  enhance your natural features.
                </p>
                <p className="text-muted-foreground">
                  While most people don't fit perfectly into just one category, identifying your primary face shape 
                  can help you make confident style choices that work with your natural features instead of against them.
                </p>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  How to Determine Your Face Shape
                </h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">1</span>
                    <span>Pull your hair back and take a front-facing photo</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">2</span>
                    <span>Trace the outline of your face on the photo</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">3</span>
                    <span>Measure your forehead, cheekbones, jawline, and face length</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">4</span>
                    <span>Compare your measurements to the characteristics below</span>
                  </li>
                </ol>
                <div className="bg-white p-4 rounded-lg mt-4 text-sm text-center">
                  <p className="font-medium text-foreground">Learn more about face shapes on our information pages</p>
                  <Button asChild size="sm" className="mt-2 gap-1">
                    <Link to="/about">
                      About Page
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Style Guide by Face Shape</h2>
              <div className="flex items-center gap-1 text-xs bg-accent/30 p-1 px-2 rounded-md text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span>Expert recommendations</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-2">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">Hairstyles</h3>
                <p className="text-xs text-muted-foreground">Framing your features</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-2">
                  <Glasses className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">Glasses</h3>
                <p className="text-xs text-muted-foreground">Complementing face structure</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-2">
                  <Brush className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">Makeup</h3>
                <p className="text-xs text-muted-foreground">Enhancing your features</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 mb-16">
            {faceShapes.map((shape) => (
              <div key={shape.id} id={shape.id} className="bg-white rounded-xl shadow-sm overflow-hidden border transform hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b">
                  <h2 className="text-2xl font-bold text-primary">{shape.name} Face Shape</h2>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-lg mb-6 text-muted-foreground">
                    {shape.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="bg-accent/10 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        Key Characteristics
                      </h3>
                      <ul className="space-y-3">
                        {shape.characteristics.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Scissors className="h-5 w-5 text-primary" />
                          Best Hairstyles
                        </h3>
                        <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg">{shape.bestHairstyles}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Glasses className="h-5 w-5 text-primary" />
                          Best Glasses
                        </h3>
                        <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg">{shape.bestGlasses}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Brush className="h-5 w-5 text-primary" />
                          Makeup Tips
                        </h3>
                        <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg">{shape.bestMakeup}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.location.href = '/about'} 
                      className="text-xs gap-1"
                    >
                      More Information
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto py-12 border-t border-accent/20">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Learn More About Face Shapes</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
                Our comprehensive guide provides detailed information about different face shapes and style recommendations.
              </p>
              <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Link to="/about">
                  Visit About Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Comprehensive guides • Style tips • Educational resources
              </p>
            </div>
          </section>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FaceShapes; 