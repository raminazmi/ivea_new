<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- DNS Prefetch for performance -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">

    <!-- Preconnect for critical resources -->
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>

    <title inertia>{{ config('app.name', 'ايڤيا - تصميم داخلي وديكور احترافي') }}</title>

    <!-- Primary Meta Tags -->
    <meta name="title" content="ايڤيا - تصميم داخلي وديكور احترافي">
    <meta name="description"
        content="ايڤيا رائدة في تصميم الديكور الداخلي والخارجي. نقدم خدمات تصميم احترافية للمنازل والمكاتب والمحلات التجارية.">
    <meta name="keywords" content="تصميم داخلي, ديكور, تصميم منازل, تصميم مكاتب, تصميم محلات, ايڤيا">
    <meta name="author" content="ايڤيا">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="bingbot" content="index, follow">

    <!-- Geographic targeting -->
    <meta name="geo.region" content="SA">
    <meta name="geo.placename" content="الرياض">
    <meta name="geo.position" content="24.7136;46.6753">
    <meta name="ICBM" content="24.7136, 46.6753">

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ config('app.url') }}">

    <!-- Language alternatives -->
    <link rel="alternate" hreflang="ar" href="{{ config('app.url') }}">
    <link rel="alternate" hreflang="ar-sa" href="{{ config('app.url') }}">
    <link rel="alternate" hreflang="x-default" href="{{ config('app.url') }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ config('app.url') }}">
    <meta property="og:title" content="ايڤيا - تصميم داخلي وديكور احترافي">
    <meta property="og:description"
        content="ايڤيا رائدة في تصميم الديكور الداخلي والخارجي. نقدم خدمات تصميم احترافية للمنازل والمكاتب والمحلات التجارية.">
    <meta property="og:image" content="{{ config('app.url') }}/images/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="ايڤيا - Ivea">
    <meta property="og:locale" content="ar_SA">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ config('app.url') }}">
    <meta property="twitter:title" content="ايڤيا - تصميم داخلي وديكور احترافي">
    <meta property="twitter:description"
        content="ايڤيا رائدة في تصميم الديكور الداخلي والخارجي. نقدم خدمات تصميم احترافية للمنازل والمكاتب والمحلات التجارية.">
    <meta property="twitter:image" content="{{ config('app.url') }}/images/og-image.jpg">

    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/png" href="/images/logo.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#F59E0B">
    <meta name="msapplication-TileColor" content="#F59E0B">
    <meta name="msapplication-config" content="/browserconfig.xml">

    <!-- Performance hints -->
    <link rel="preload" href="/fonts/IBMPlexSansArabic-Regular.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="/fonts/IBMPlexSansArabic-Bold.ttf" as="font" type="font/ttf" crossorigin>

    <!-- Fonts with optimized loading -->
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <style>
        /* IBM Plex Arabic - Local with font-display: swap for performance */
        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-Thin.ttf') format('truetype');
            font-weight: 100;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-ExtraLight.ttf') format('truetype');
            font-weight: 200;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-Light.ttf') format('truetype');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-Medium.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-SemiBold.ttf') format('truetype');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Arabic';
            src: url('/fonts/IBMPlexSansArabic-Bold.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
        }

        /* Critical CSS for above-the-fold content */
        body {
            font-family: 'IBM Plex Arabic', system-ui, -apple-system, sans-serif;
            margin: 0;
            line-height: 1.6;
        }

        /* Loading optimization */
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #F59E0B;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        .page-loader.hidden {
            opacity: 0;
            pointer-events: none;
        }
    </style>

    <!-- Structured Data - Organization -->
    <script type="application/ld+json">
        {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ايڤيا",
        "url": "{{ config('app.url') }}",
        "logo": "{{ config('app.url') }}/images/logo.png",
        "description": "ايڤيا رائدة في تصميم الديكور الداخلي والخارجي. نقدم خدمات تصميم احترافية للمنازل والمكاتب والمحلات التجارية.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "SA",
            "addressLocality": "الرياض"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-XX-XXX-XXXX",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"]
        },
        "sameAs": [
            "https://www.facebook.com/ivea",
            "https://www.instagram.com/ivea",
            "https://www.linkedin.com/company/ivea"
        ]
    }
    </script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <!-- Page Loader -->
    <div id="page-loader" class="page-loader">
        <img src="/images/logo.png" alt="ايڤيا" style="width: 80px; height: 80px;">
    </div>

    @inertia

    <!-- Performance monitoring -->
    <script>
        // Hide loader when page is fully loaded
        window.addEventListener('load', function() {
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }
        });

        // SEO and performance optimizations
        document.addEventListener('DOMContentLoaded', function() {
            // Add loading=lazy to images below the fold
            const images = document.querySelectorAll('img');
            images.forEach((img, index) => {
                if (index > 2) { // First 3 images load normally, rest lazy load
                    img.setAttribute('loading', 'lazy');
                }
            });
        });
    </script>
</body>

</html>