import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Info, Clock, Lock, FileText, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Privacy = () => {
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="Privacy Policy - Face Shape Analyzer"
        description="Our Privacy Policy explains how we handle your data. Learn how Face Shape Analyzer protects your privacy with local processing and no data storage."
        canonicalUrl="/privacy"
        keywords="face shape analyzer privacy, privacy policy, data protection, face analysis privacy, AI privacy"
      />

      {/* Header with Navbar */}
      <Navbar />

      <main className="container px-4 py-12 flex-grow">
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Privacy Policy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy outlines how we handle your information when using Face Shape Analyzer.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
              Overview
            </h2>
            <p className="mb-4">
              Face Shape Analyzer is designed with privacy at its core. Our browser-based face analysis technology means your photos are processed directly on your device and are never uploaded to our servers.
            </p>
            <p className="mb-4">
              When you use our service, you can be confident that your facial data and images remain private and secure. This page explains our data practices in detail.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Photos</h3>
                <p className="text-muted-foreground">
                  Your photos are processed locally in your browser using TensorFlow.js. We do not store, transmit, or have access to the photos you analyze.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Face Analysis Data</h3>
                <p className="text-muted-foreground">
                  The facial measurements, proportions, and face shape results are calculated in your browser and are not sent to our servers or stored in any database.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground">
                  We collect anonymous usage data such as page views, features used, and time spent on the application to improve our service. This data cannot be linked to individual users.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Cookies</h3>
                <p className="text-muted-foreground">
                  We use essential cookies to ensure the website functions properly. We also use analytics cookies to understand how visitors interact with our website. For more information, please see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="h-4 w-4 text-primary" />
              </div>
              How We Use Information
            </h2>
            <div className="space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Provide and improve our face shape analysis service</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Diagnose technical issues and maintain security</li>
                <li>Communicate with you about updates or changes to our service</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">
                We will never sell your personal information to third parties or use your facial data for advertising purposes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              Your Rights
            </h2>
            <div className="space-y-4">
              <p>Depending on your location, you may have certain rights regarding your information, including:</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>The right to access information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to or restrict processing of your information</li>
                <li>The right to data portability</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page with a new "Last updated" date.
            </p>
            <p>
              We encourage you to review this policy periodically to stay informed about how we are protecting your information.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Privacy Commitment</h2>
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <p className="text-lg">
                Your photos never leave your device. All processing happens locally in your browser.
              </p>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Unlike many facial analysis services, Face Shape Analyzer prioritizes your privacy by keeping all photo processing on your device. We believe that you shouldn't have to sacrifice privacy for convenience.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <Link to="/terms">
                  Terms of Service
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <Link to="/cookies">
                  Cookie Policy
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Privacy; 