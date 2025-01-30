<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Application;

class SQATestPlanController extends Controller
{
    //
    public function index()
    {
        $results = Application::where('request_status','approved')->get();

        return Inertia::render(
            'Reports/SQATestPlan/Index',
            [
                'results' => $results
            ]
        );
    }
}
