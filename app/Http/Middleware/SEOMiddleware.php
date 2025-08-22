<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SEOMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        $response->headers->set('X-Robots-Tag', 'index, follow');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        if ($request->is('images/*') || $request->is('css/*') || $request->is('js/*') || $request->is('fonts/*')) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
        }
        if (!$request->is('admin/*') && !$request->is('api/*')) {
            $response->headers->set('Content-Language', 'ar');
        }

        return $response;
    }
}
