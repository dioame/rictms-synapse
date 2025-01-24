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
        $applicationsByStatus = Application::select('status', \DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();
        $applicationsByRegion = Application::select('division', \DB::raw('COUNT(*) as count'))
            ->groupBy('division')
            ->get();
        $piaCompliance = Application::where('is_pia', true)->count();
        $recentDeployments = Application::orderBy('deployment_date', 'desc')
            ->take(5)
            ->get(['name', 'deployment_date', 'url']);
        $pendingSQA = Application::where('sqa_status', '!=', 'Approved')->count();

        // Aggregate data for frameworks
        $applicationsByFramework = Application::select('frontend_framework', \DB::raw('COUNT(*) as count'))
            ->groupBy('frontend_framework')
            ->get();

        $inventory = IctInventory::all();
        $consolidatedData = IctInventory::select(
            'status',
            DB::raw('COUNT(*) as total_equipment'),
            DB::raw('SUM(purchase_price) as total_purchase_price')
        )
            ->groupBy('status')
            ->orderBy('status')
            ->get();

        // Return data to Inertia
        return Inertia::render('Dashboard', [
            'totalApplications' => $totalApplications,
            'applicationsByStatus' => $applicationsByStatus,
            'applicationsByRegion' => $applicationsByRegion,
            'piaCompliance' => $piaCompliance,
            'recentDeployments' => $recentDeployments,
            'pendingSQA' => $pendingSQA,
            'applicationsByFramework' => $applicationsByFramework, // Add this line
            'equipment' => $inventory,
            'consolidatedEquipment' => $consolidatedData,
        ]);
    }
}
