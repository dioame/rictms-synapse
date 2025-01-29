<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application; // Assuming this is the model for your table
use App\Models\IctInventory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application as AppVer;


class LandingController extends Controller
{
    public function index()
    {
        $apps = Application::where('request_status','approved')->get();
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => AppVer::VERSION,
            'phpVersion' => PHP_VERSION,
            'apps' => $apps
        ]);
    }
}
