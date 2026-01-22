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

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords = ["Antrenor Personal Oradea", "Sala Fitness Oradea", "Slăbire Oradea", "EMS Oradea", "Fitness Oradea"], // Added keywords with default
  ogImage: image = '/64f5f987-9c1e-43a8-8bdd-0d6d735fefa0.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd,
}) => {
  const siteUrl = 'https://neo-boost.com';
  const fullCanonical = canonical
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`)
    : (typeof window !== 'undefined' ? window.location.href : siteUrl);

  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title} | NeoBoost</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="NeoBoost" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
