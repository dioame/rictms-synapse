<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Http\Resources\Application\ApplicationResource;
use App\Http\Requests\Application\ApplicationRequest;
use App\Http\Services\Application\ApplicationService;
use App\Models\ApplicationDeploymentAttachment;
use App\Models\LibDeploymentAttachment;
use Illuminate\Support\Facades\Redirect;

class ApplicationRequestController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = Application::with(['attachments.libDeploymentAttachment','uptime'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('request_status','pending')
            ->where('encoded_by',auth()->user()->id)
            ->orderBy('created_at','desc')
            ->paginate(15);

        return Inertia::render(
            'ApplicationRequest/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search],
                'lib_deployment_req' => LibDeploymentAttachment::all()
            ]
        );
    }
    
    public function generateForm($id)
    {

        $results = Application::find($id);
        
        return Inertia::render(
            'ApplicationRequest/Form',
            [
                'results' => $results
            ]
        );
    }

    
}
