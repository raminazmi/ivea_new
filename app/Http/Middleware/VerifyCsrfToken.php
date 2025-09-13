<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Add any API routes that should be excluded from CSRF protection
    ];

    /**
     * Determine if the session and input CSRF tokens match.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function tokensMatch($request)
    {
        // If the request is an ajax request, then check to see if token matches token provider in
        // the header. This way, we can use CSRF protection in ajax requests also.
        $token = $this->getTokenFromRequest($request);

        return is_string($request->session()->token()) &&
            is_string($token) &&
            hash_equals($request->session()->token(), $token);
    }
}