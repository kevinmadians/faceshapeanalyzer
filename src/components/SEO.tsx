import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  imageUrl?: string;
  type?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl = "https://faceshapeanalyzer.net/",
  keywords = "face shape analyzer, face shape test, face analysis, AI face tool",
  imageUrl = "/og-image.jpg",
  type = "website",
  noIndex = false
}) => {
  // Ensure title has correct format: PAGE NAME - SITE NAME
  // For homepage, format is: SITE NAME - TAGLINE
  const fullTitle = title.includes('Face Shape Analyzer') 
    ? title 
    : `${title} - Face Shape Analyzer`;

  // Ensure canonical URL is absolute and has trailing slash
  const fullCanonicalUrl = (() => {
    // If already absolute URL
    if (canonicalUrl.startsWith('http')) {
      return canonicalUrl.endsWith('/') ? canonicalUrl : `${canonicalUrl}/`;
    }
    
    // If relative URL, make it absolute
    const baseUrl = 'https://faceshapeanalyzer.net';
    const path = canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`;
    // Ensure path has trailing slash
    const formattedPath = path.endsWith('/') ? path : `${path}/`;
    return `${baseUrl}${formattedPath}`;
  })();

  // Ensure image URL is absolute
  const fullImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `https://faceshapeanalyzer.net${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Robots meta tag - prevent indexing if noIndex is true */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};

export default SEO; 