<?php

namespace App\Http\Controllers\Guest\SQAUAT;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\SqaUat;
use App\Models\Application;
use App\Models\ApplicationDeploymentAttachment;
use App\Models\LibDeploymentAttachment;
use App\Http\Resources\SQA\UatResource;
use App\Http\Requests\SQA\UatRequest;
use App\Http\Services\SQA\UatService;
use App\Http\Resources\Application\ApplicationResource;
use App\Http\Requests\Application\ApplicationRequest;
use App\Http\Services\Application\ApplicationService;
use Illuminate\Support\Facades\Redirect;

class SQAUATController extends Controller
{
    //
    public function index($id)
    {
        // Fetch results filtered by application_id
        $results = SqaUat::query()
            ->where('application_id', $id)
            ->orderBy('created_at', 'desc')
            ->get(); // Use get() instead of all()
    
        // Find application
        $application = Application::find($id);
    
        // Handle missing application
        if (!$application) {
            return redirect()->back()->with('error', 'Application not found.');
        }
    
        return Inertia::render('SQA/Uat/Guest/UATForm', [
            'results' => $results,
            'application' => $application
        ]);
    }

    public function store(Request $request){
        $params = $request->all();
        foreach($params['testResults'] as $row){
            SqaUat::find($row['id'])->update([
                'test_result' => $row['test_result'],
                'remarks' => $row['remarks'],
                'retesting_result' => $row['retesting_result']
            ]);
        }
        return redirect()->back()->with('error', 'Success.');
    }
    

}
