<?php
// app/Http/Middleware/CheckStaffRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckStaffRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = auth()->guard('staff')->user();
        
        if (!$user) {
            return redirect()->route('staff.login');
        }

        if (!in_array($user->role, $roles)) {
            abort(403, 'You do not have permission to access this page.');
        }

        return $next($request);
    }
}