<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <style>
        /* IBM Plex Arabic - Local */
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
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @if(app()->isProduction())
    <link rel="stylesheet" href="{{ asset('build/assets/app.css') }}">
    <script type="module" src="{{ asset('build/assets/app.js') }}"></script>
    @else
    @vite(['resources/js/app.tsx'])
    @endif
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>