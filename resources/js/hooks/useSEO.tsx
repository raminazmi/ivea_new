import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface SeoData {
    title: string;
    description: string;
    keywords: string;
    image: string;
    url: string;
    type: string;
    site_name: string;
    locale: string;
    published_time?: string;
    modified_time?: string;
    author?: string;
    price?: number;
    currency?: string;
    availability?: string;
}

interface StructuredData {
    [key: string]: any;
}

interface PageProps {
    seo?: SeoData;
    structuredData?: StructuredData;
    [key: string]: any;
}

export const useSEO = () => {
    const { props } = usePage<PageProps>();
    const { seo, structuredData } = props;

    useEffect(() => {
        if (!seo) return;

        // Update document title
        document.title = seo.title;

        // Update meta tags
        const updateMetaTag = (name: string, content: string, property?: string) => {
            const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;

            if (!meta) {
                meta = document.createElement('meta');
                if (property) {
                    meta.setAttribute('property', property);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }

            meta.setAttribute('content', content);
        };

        // Basic meta tags
        updateMetaTag('description', seo.description);
        updateMetaTag('keywords', seo.keywords);
        updateMetaTag('author', seo.author || 'ايڤيا');

        // Open Graph tags
        updateMetaTag('og:title', seo.title, 'og:title');
        updateMetaTag('og:description', seo.description, 'og:description');
        updateMetaTag('og:image', seo.image, 'og:image');
        updateMetaTag('og:url', seo.url, 'og:url');
        updateMetaTag('og:type', seo.type, 'og:type');
        updateMetaTag('og:site_name', seo.site_name, 'og:site_name');
        updateMetaTag('og:locale', seo.locale, 'og:locale');

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
        updateMetaTag('twitter:title', seo.title, 'twitter:title');
        updateMetaTag('twitter:description', seo.description, 'twitter:description');
        updateMetaTag('twitter:image', seo.image, 'twitter:image');

        // Article specific tags
        if (seo.published_time) {
            updateMetaTag('article:published_time', seo.published_time, 'article:published_time');
        }
        if (seo.modified_time) {
            updateMetaTag('article:modified_time', seo.modified_time, 'article:modified_time');
        }
        if (seo.author) {
            updateMetaTag('article:author', seo.author, 'article:author');
        }

        // Product specific tags
        if (seo.price) {
            updateMetaTag('product:price:amount', seo.price.toString(), 'product:price:amount');
            updateMetaTag('product:price:currency', seo.currency || 'SAR', 'product:price:currency');
        }
        if (seo.availability) {
            updateMetaTag('product:availability', seo.availability, 'product:availability');
        }

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', seo.url);

        // hreflang tags for Arabic
        let hreflang = document.querySelector('link[hreflang="ar"]') as HTMLLinkElement;
        if (!hreflang) {
            hreflang = document.createElement('link');
            hreflang.setAttribute('rel', 'alternate');
            hreflang.setAttribute('hreflang', 'ar');
            document.head.appendChild(hreflang);
        }
        hreflang.setAttribute('href', seo.url);

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');

    }, [seo]);

    useEffect(() => {
        if (!structuredData) return;

        // Add structured data (JSON-LD)
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [structuredData]);

    return { seo, structuredData };
};

// Component wrapper for automatic SEO
export const SEOWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useSEO();
    return <>{children}</>;
};

export default useSEO;
