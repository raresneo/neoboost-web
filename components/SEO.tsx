import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: Record<string, any>;
  keywords?: string[]; // Added keywords prop
}

// Imagine de share dedicată, 1200x630 JPG (format optim pentru WhatsApp / Facebook).
const DEFAULT_OG_IMAGE = '/og-default.jpg';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords = ["Antrenament EMS Oradea", "Sala Fitness Oradea", "Slăbire Oradea", "Electrostimulare Oradea", "Fitness Oradea"], // Refined defaults
  ogImage: image = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd,
}) => {
  const siteUrl = 'https://neo-boost.com';
  const siteName = 'NeoBoost EMS Oradea';

  // Clean canonical URL
  const path = canonical || (typeof window !== 'undefined' ? window.location.pathname : '');
  const fullCanonical = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, "");

  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title} | {siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ro_RO" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@neoboost_ems" />
      <meta name="twitter:creator" content="@neoboost_ems" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Helmet>
  );
};
