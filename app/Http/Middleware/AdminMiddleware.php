<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // التحقق من أن المستخدم مسجل دخول
        if (!Auth::check()) {
            return \Redirect::route('login');
        }

        // التحقق من أن المستخدم مدير (يمكن تعديل هذا حسب نظام الصلاحيات)
        $user = Auth::user();

        // يمكن إضافة منطق إضافي للتحقق من الصلاحيات هنا
        // مثال: التحقق من role أو permissions
        if (!$user->is_admin ?? false) {
            \Abort::abort(403, 'غير مصرح لك بالوصول لهذه الصفحة');
        }

        return $next($request);
    }
}