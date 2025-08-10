<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();
        $redirectRoute = $user->is_admin ? 'admin.dashboard' : 'user.dashboard';

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route($redirectRoute, absolute: false) . '?verified=1');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->intended(route($redirectRoute, absolute: false) . '?verified=1');
    }
}
