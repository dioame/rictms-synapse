<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')
            ->with(['hd' => 'dswd.gov.ph']) // Enforce domain restriction
            ->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Restrict to @dswd.gov.ph emails only
            if (!str_ends_with($googleUser->getEmail(), '@dswd.gov.ph')) {
                return redirect()->route('login')->withErrors(['email' => 'Only DSWD accounts are allowed.']);
            }

            // Find or create user
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'username' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => bcrypt(str()->random(16)), // Random password
                ]
            );
            
            $user->assignRole('user');

            Auth::login($user);

            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors(['error' => 'Google login failed.']);
        }
    }
}
