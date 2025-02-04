<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application; // Assuming this is the model for your table
use App\Models\IctInventory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\UptimeCheck;
use App\Models\Setting;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
{
    // Aggregate data for dashboard
    $totalApplications = Application::count();
    $applicationsByStatus = Application::select('status', DB::raw('COUNT(*) as count'))
        ->groupBy('status')
        ->get();
    $applicationsByRegion = Application::select('division', DB::raw('COUNT(*) as count'))
        ->groupBy('division')
        ->get();
    // $piaCompliance = Application::where('is_pia', true)->count();
    $recentDeployments = Application::orderBy('deployment_date', 'desc')
        ->take(5)
        ->get(['name', 'deployment_date', 'url'])
        ->map(function ($deployment) {
            $deployment->deployment_date = Carbon::parse($deployment->deployment_date)->format('Y-m-d');
            return $deployment;
        });
        
    $applicationsByFramework = Application::select('tech_stack', DB::raw('COUNT(*) as count'))
        ->groupBy('tech_stack')
        ->get();
    $equipment = IctInventory::all();
    $consolidatedEquipment = IctInventory::select('status', DB::raw('COUNT(*) as total_equipment'), DB::raw('SUM(purchase_price) as total_purchase_price'))
        ->groupBy('status')
        ->get();

    $applicationsByComputing = Application::select('computing_scheme', DB::raw('COUNT(*) as count'))
    ->groupBy('computing_scheme')
    ->get();

    $applicationsByDevelopmentStrategy = Application::select('development_strategy', DB::raw('COUNT(*) as count'))
    ->groupBy('development_strategy')
    ->get();
    
    $app_up = UptimeCheck::where('is_up',1)->count();
    $app_down = UptimeCheck::where('is_up', 0)->count();

    // Pass data to the view
    return Inertia::render('Dashboard', [
        'totalApplications' => $totalApplications,
        'applicationsByStatus' => $applicationsByStatus,
        'applicationsByRegion' => $applicationsByRegion,
        // 'piaCompliance' => $piaCompliance,
        'recentDeployments' => $recentDeployments,
        // 'pendingSQA' => $pendingSQA,
        'applicationsByFramework' => $applicationsByFramework,
        'equipment' => $equipment,
        'consolidatedEquipment' => $consolidatedEquipment,
        'app_up' => $app_up,
        'app_down' => $app_down,
        'http_uptime_timeouts' => Setting::UPTIME_HTTP_TIMEOUTS(),
        'applicationsByComputingScheme' => $applicationsByComputing,
        'applicationsByDevelopmentStrategy' => $applicationsByDevelopmentStrategy
    ]);
}
}
