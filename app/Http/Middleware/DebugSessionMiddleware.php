<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DebugSessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // فقط في حالة development أو إذا كان APP_DEBUG=true
        if (config('app.debug')) {
            Log::info('=== Session Debug Info ===');
            Log::info('Session ID: ' . session()->getId());
            Log::info('Session Config: ' . json_encode([
                'driver' => config('session.driver'),
                'lifetime' => config('session.lifetime'),
                'domain' => config('session.domain'),
                'secure' => config('session.secure'),
                'same_site' => config('session.same_site'),
                'path' => config('session.path'),
                'cookie_name' => config('session.cookie'),
            ]));
            Log::info('CSRF Token: ' . csrf_token());
            Log::info('Request URL: ' . $request->fullUrl());
            Log::info('Request Method: ' . $request->method());
            Log::info('Has CSRF Token: ' . ($request->hasHeader('X-CSRF-TOKEN') ? 'Yes' : 'No'));
            Log::info('Session Data: ' . json_encode(session()->all()));
            Log::info('========================');
        }

        return $next($request);
    }
}