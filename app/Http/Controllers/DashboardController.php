<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application; // Assuming this is the model for your table
use App\Models\IctInventory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
    $piaCompliance = Application::where('is_pia', true)->count();
    $recentDeployments = Application::orderBy('deployment_date', 'desc')
        ->take(5)
        ->get(['name', 'deployment_date', 'url']);
    $pendingSQA = Application::where('sqa_tested', '!=', 'yes')->count();
    $applicationsByFramework = Application::select('tech_stack', DB::raw('COUNT(*) as count'))
        ->groupBy('tech_stack')
        ->get();
    $equipment = IctInventory::all();
    $consolidatedEquipment = IctInventory::select('status', DB::raw('COUNT(*) as total_equipment'), DB::raw('SUM(purchase_price) as total_purchase_price'))
        ->groupBy('status')
        ->get();

    // Pass data to the view
    return Inertia::render('Dashboard', [
        'totalApplications' => $totalApplications,
        'applicationsByStatus' => $applicationsByStatus,
        'applicationsByRegion' => $applicationsByRegion,
        'piaCompliance' => $piaCompliance,
        'recentDeployments' => $recentDeployments,
        'pendingSQA' => $pendingSQA,
        'applicationsByFramework' => $applicationsByFramework,
        'equipment' => $equipment,
        'consolidatedEquipment' => $consolidatedEquipment,
    ]);
}
}
