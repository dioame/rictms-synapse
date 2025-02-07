<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Http;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        // Attempt local authentication first
        if (Auth::attempt($this->only('username', 'password'))) {
            RateLimiter::clear($this->throttleKey());
            return;
        }

        $portal_url = env('PORTAL_URL'); 

        // Try external API authentication if local fails
        $response = Http::post($portal_url.'/api/rest-auth/login/', [
            'username' => $this->input('username'),
            'password' => $this->input('password'),
        ]);

        if ($response->failed()) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'username' => trans('auth.failed'),
            ]);
        }

        // Get user details from the external API after successful authentication
        $apiResponse = $response->json();


   
        $token = $apiResponse['key'];
        
        // $employeeResponse = Http::withToken($token)->get('https://caraga-portal.dswd.gov.ph/api/employee/list/search/?q=djcrendon');
        $employeeResponse = Http::withHeaders([
            'Authorization' => 'Token ' . $token, // Manually set the Token header
        ])->get($portal_url.'/api/employee/list/search/', [
            'q' => $this->input('username'),
        ]);

        if ($employeeResponse->failed() || empty($employeeResponse->json())) {
            throw ValidationException::withMessages([
                'username' => __('User not found in employee records.'),
            ]);
        }

        $employeeDetails = $employeeResponse->json()[0];

        // Create a new local user entry
        $user = User::create([
            'name' => $employeeDetails['first_name'].' '.($employeeDetails['middle_name'] ? $employeeDetails['middle_name'][0].'.' : '').' '.$employeeDetails['last_name'],
            'username' => $employeeDetails['username'],
            'email' => $employeeDetails['email'] ?? null,
            'position' => $employeeDetails['position'] ?? null,
            'avatar' => $employeeDetails['image_path'] ?? null,
            'password' => bcrypt($this->input('password')), // Store the password securely
        ]);
        

        Auth::login($user); // Log in the newly created user
        RateLimiter::clear($this->throttleKey());
    }


    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'username' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('username')).'|'.$this->ip());
    }
}
