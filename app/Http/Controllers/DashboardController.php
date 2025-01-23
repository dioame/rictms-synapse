<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application; // Assuming this is the model for your table
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

        // Return data to Inertia
        return Inertia::render('Dashboard', [
            'totalApplications' => $totalApplications,
            'applicationsByStatus' => $applicationsByStatus,
            'applicationsByRegion' => $applicationsByRegion,
            'piaCompliance' => $piaCompliance,
            'recentDeployments' => $recentDeployments,
            'pendingSQA' => $pendingSQA,
            'applicationsByFramework' => $applicationsByFramework, // Add this line
        ]);
    }
}
