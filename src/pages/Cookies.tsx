import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, ArrowLeft, Info, ToggleLeft, Settings, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Cookies = () => {
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <SEO 
        title="Cookie Policy - Face Shape Analyzer"
        description="Our Cookie Policy explains how we use cookies and similar technologies on the Face Shape Analyzer website to enhance your experience."
        canonicalUrl="/cookies"
        keywords="face shape analyzer cookies, cookie policy, website cookies, cookie management, cookie preferences"
      />

      {/* Header with Navbar */}
      <Navbar />

      <main className="container px-4 py-12 flex-grow">
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Cookie className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Cookie Policy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Cookie Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              This policy explains how Face Shape Analyzer uses cookies on our website.
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
              What Are Cookies
            </h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <p className="mb-4">
              Cookies help websites remember information about your visit, like your preferred language and settings. This makes your next visit easier and the site more useful to you.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              How We Use Cookies
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Preference Cookies</h3>
                <p className="text-muted-foreground">
                  Preference cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground">
                  Analytics cookies help us understand how visitors interact with our website. These cookies help us count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ToggleLeft className="h-4 w-4 text-primary" />
              </div>
              Managing Cookies
            </h2>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
            </p>
            <p className="mb-4">
              Below are links to instructions on how to manage cookies in popular web browsers:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              Our Cookies
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-accent/30">
                    <th className="border border-accent/50 px-4 py-2 text-left">Name</th>
                    <th className="border border-accent/50 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-accent/50 px-4 py-2 text-left">Duration</th>
                    <th className="border border-accent/50 px-4 py-2 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-accent/30 px-4 py-2">session_id</td>
                    <td className="border border-accent/30 px-4 py-2">Used to maintain your session while using our website</td>
                    <td className="border border-accent/30 px-4 py-2">Session</td>
                    <td className="border border-accent/30 px-4 py-2">Essential</td>
                  </tr>
                  <tr className="bg-accent/10">
                    <td className="border border-accent/30 px-4 py-2">theme_preference</td>
                    <td className="border border-accent/30 px-4 py-2">Stores your preferred theme (light/dark)</td>
                    <td className="border border-accent/30 px-4 py-2">1 year</td>
                    <td className="border border-accent/30 px-4 py-2">Preference</td>
                  </tr>
                  <tr>
                    <td className="border border-accent/30 px-4 py-2">_ga</td>
                    <td className="border border-accent/30 px-4 py-2">Used to distinguish users for Google Analytics</td>
                    <td className="border border-accent/30 px-4 py-2">2 years</td>
                    <td className="border border-accent/30 px-4 py-2">Analytics</td>
                  </tr>
                  <tr className="bg-accent/10">
                    <td className="border border-accent/30 px-4 py-2">_gid</td>
                    <td className="border border-accent/30 px-4 py-2">Used to distinguish users for Google Analytics</td>
                    <td className="border border-accent/30 px-4 py-2">24 hours</td>
                    <td className="border border-accent/30 px-4 py-2">Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
              Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page with a new "Last updated" date.
            </p>
            <p>
              We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">More Information</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you have any questions about our Cookie Policy, please don't hesitate to contact us.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <Link to="/privacy">
                  Privacy Policy
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <Link to="/terms">
                  Terms of Service
                </Link>
              </Button>
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

export default Cookies; 