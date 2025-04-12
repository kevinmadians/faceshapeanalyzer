import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Info, Shield, Users, Award, Sparkles, CheckCircle, Heart, Palette } from 'lucide-react';
import FaceShapeIcon from '@/components/icons/FaceShapeIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="About - Face Shape Analyzer"
        description="Learn about our AI-powered face shape analysis tool. Discover how we use advanced technology to identify face shapes and provide personalized style recommendations."
        canonicalUrl="/about"
        keywords="face shape analyzer about, AI face analysis, facial recognition technology, face shape measurement, face shape app, face analyzer AI"
      />

      {/* Header with Navbar */}
      <Navbar />

      <main className="container px-4 py-12 flex-grow">
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Info className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">About Face Shape Analyzer</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Your AI Style Companion</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered tool helps you find your perfect style based on your unique facial structure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                Our Mission
              </h2>
              <p className="mb-4">
                Face Shape Analyzer was created with one goal in mind: to help you make confident style choices based on your unique facial features.
              </p>
              <p className="mb-4">
                We believe that understanding your face shape is the foundation of personal style, enabling you to choose hairstyles, glasses, and makeup that truly complement your natural beauty.
              </p>
              <div className="flex items-center mt-6 text-muted-foreground bg-accent/20 p-4 rounded-lg">
                <span className="text-sm italic">
                  "The right style choices can enhance your natural features and boost your confidence."
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-primary" />
                </div>
                How It Works
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">1</div>
                  <div>
                    <strong className="text-foreground">Upload Your Photo</strong>
                    <p className="text-muted-foreground">Take a clear, front-facing photo or upload an existing one</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">2</div>
                  <div>
                    <strong className="text-foreground">AI Analysis</strong>
                    <p className="text-muted-foreground">Our advanced AI analyzes your facial proportions and features</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">3</div>
                  <div>
                    <strong className="text-foreground">Get Results</strong>
                    <p className="text-muted-foreground">Receive personalized recommendations for hairstyles, glasses, and makeup</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 mb-16 border border-primary/10">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Face Shape Matters</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Enhances Natural Beauty</h3>
                <p className="text-muted-foreground text-center">
                  The right style choices work with your natural features instead of against them
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Saves Time & Money</h3>
                <p className="text-muted-foreground text-center">
                  Avoid costly style mistakes by choosing options that are proven to work for your face shape
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Boosts Confidence</h3>
                <p className="text-muted-foreground text-center">
                  When you look your best, you feel your best - it's that simple
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16 border">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 border-b">
              <h2 className="text-2xl font-bold">Our AI Technology</h2>
            </div>
            <div className="p-8">
              <p className="mb-6">
                Face Shape Analyzer uses advanced machine learning algorithms to analyze facial proportions and features with incredible accuracy:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-accent/10 rounded-lg p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Facial Landmark Detection
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our AI identifies key points on your face to measure proportions and angles with precision
                  </p>
                </div>
                <div className="bg-accent/10 rounded-lg p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Shape Classification
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    The AI compares your measurements to our database to determine your closest face shape match
                  </p>
                </div>
                <div className="bg-accent/10 rounded-lg p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Browser-Based Processing
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    All analysis happens directly in your browser using TensorFlow.js for complete privacy
                  </p>
                </div>
                <div className="bg-accent/10 rounded-lg p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Personalized Recommendations
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our system generates tailored style advice based on your unique facial structure
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Privacy Promise</h2>
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <p className="text-lg">
                Your photos never leave your device. All processing happens locally in your browser.
              </p>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We take your privacy seriously. Unlike other services, we don't store your images on servers or build facial recognition databases. 
              Your face shape analysis is 100% private and secure.
            </p>
            <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
              <Link to="/">
                Try It Risk-Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Trust indicators section */}
        <section className="py-12 border-t border-accent/20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Trusted By Style Enthusiasts</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                All processing happens locally in your browser, your photos never leave your device
              </p>
            </div>
            
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Technology</h3>
              <p className="text-muted-foreground text-sm">
                Powered by advanced machine learning models trained on diverse facial datasets
              </p>
            </div>
            
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Backed</h3>
              <p className="text-muted-foreground text-sm">
                Created by professional stylists and tech experts with years of industry experience
              </p>
            </div>
            
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Research Based</h3>
              <p className="text-muted-foreground text-sm">
                Recommendations grounded in scientific research on facial proportions and aesthetics
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About; 