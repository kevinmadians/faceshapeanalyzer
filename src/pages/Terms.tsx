import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft, Info, Scale, Ban, AlertTriangle, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Terms = () => {
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="Terms of Service - Face Shape Analyzer"
        description="Read our Terms of Service to understand the rules and guidelines for using the Face Shape Analyzer tool and website."
        canonicalUrl="/terms"
        keywords="face shape analyzer terms, terms of service, terms and conditions, usage terms, legal terms"
      />
      
      {/* Header with Navbar */}
      <Navbar />

      <main className="container px-4 py-12 flex-grow">
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Terms of Service</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Terms of Service</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using Face Shape Analyzer.
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
              Introduction
            </h2>
            <p className="mb-4">
              Welcome to Face Shape Analyzer. These Terms of Service ("Terms") govern your use of the Face Shape Analyzer website and services (collectively, the "Service") operated by Face Shape Analyzer ("we," "us," or "our").
            </p>
            <p className="mb-4">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              Use of Our Service
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Account Registration</h3>
                <p className="text-muted-foreground">
                  Some features of our Service may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Service Changes</h3>
                <p className="text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue any part of our Service with or without notice at any time. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">User Content</h3>
                <p className="text-muted-foreground">
                  Our Service may allow you to upload content, such as photos. You retain all rights to your content. By uploading content, you grant us a non-exclusive, royalty-free license to use, store, and process your content solely for the purpose of providing and improving the Service.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which explains how we collect, use, and disclose information about you.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Ban className="h-4 w-4 text-primary" />
              </div>
              Prohibited Activities
            </h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Use the Service in any way that violates any applicable law or regulation</li>
              <li>Attempt to bypass any security measures or access content not intended for you</li>
              <li>Use the Service to harm minors in any way</li>
              <li>Engage in unauthorized scraping, data mining, or harvesting of content</li>
              <li>Impersonate or attempt to impersonate us, our employees, or other users</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Upload content that is illegal, offensive, or otherwise objectionable</li>
              <li>Attempt to reverse engineer any portion of the Service</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-primary" />
              </div>
              Disclaimers and Limitations
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">No Warranties</h3>
                <p className="text-muted-foreground">
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Accuracy of Results</h3>
                <p className="text-muted-foreground">
                  While we strive to provide accurate face shape analysis and style recommendations, we cannot guarantee perfect accuracy. Our recommendations should be considered as suggestions only, and not definitive assessments of facial structure.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              Intellectual Property
            </h2>
            <p className="mb-4">
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Face Shape Analyzer and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Face Shape Analyzer.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              Governing Law
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and defined following the laws of [Your Country/State]. Face Shape Analyzer and yourself irrevocably consent that the courts of [Your Country/State] shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Terms.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="flex justify-center">
              <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
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

export default Terms; 