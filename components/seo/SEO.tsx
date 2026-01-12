import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords = [],
    image = '/64f5f987-9c1e-43a8-8bdd-0d6d735fefa0.png',
    url,
    type = 'website'
}) => {
    const siteUrl = 'https://neo-boost.com';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const fullTitle = `${title} | NeoBoost EMS Oradea`;

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Helper function to set or update meta tag
        const setMetaTag = (property: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, property);
                document.head.appendChild(element);
            }

            element.content = content;
        };

        // Primary Meta Tags
        setMetaTag('title', fullTitle);
        setMetaTag('description', description);
        if (keywords.length > 0) {
            setMetaTag('keywords', keywords.join(', '));
        }

        // Open Graph / Facebook
        setMetaTag('og:type', type, true);
        setMetaTag('og:url', fullUrl, true);
        setMetaTag('og:title', fullTitle, true);
        setMetaTag('og:description', description, true);
        setMetaTag('og:image', fullImage, true);
        setMetaTag('og:site_name', 'NeoBoost EMS Oradea', true);
        setMetaTag('og:locale', 'ro_RO', true);

        // Twitter
        setMetaTag('twitter:card', 'summary_large_image', true);
        setMetaTag('twitter:url', fullUrl, true);
        setMetaTag('twitter:title', fullTitle, true);
        setMetaTag('twitter:description', description, true);
        setMetaTag('twitter:image', fullImage, true);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = fullUrl;

    }, [title, description, keywords, fullUrl, fullImage, type, fullTitle]);

    return null;
};
