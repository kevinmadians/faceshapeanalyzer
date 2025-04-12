import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, ExternalLink, Heart, Shield, FileText } from 'lucide-react';

interface FooterProps {
  simplified?: boolean;
}

const Footer: React.FC<FooterProps> = ({ simplified = false }) => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-12 pb-8 mt-auto">
      <div className="container px-4 mx-auto">
        {!simplified && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/images/logo.png" alt="Face Shape Analyzer" className="h-8 w-auto mr-2" />
                <h3 className="font-bold text-lg">Face Shape Analyzer</h3>
              </div>
              <p className="text-slate-300 mb-6 text-sm">
                Using AI technology to analyze your facial features and provide personalized style recommendations tailored to your unique face shape.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4" />
                    <span>Face Shape Analyzer</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/face-shapes" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <ExternalLink className="h-4 w-4" />
                    <span>Face Shape Guide</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link to="/privacy" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-primary transition-colors text-sm">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        <div className={`${!simplified ? 'pt-6 border-t border-slate-700' : ''}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">
              &copy; {year} Face Shape Analyzer. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 