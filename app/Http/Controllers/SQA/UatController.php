<?php

namespace App\Http\Controllers\SQA;

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

class UatController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = Application::with(['attachments.libDeploymentAttachment','sqaUat'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('status', '<>', 'development')
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'SQA/Uat/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search],
                'lib_deployment_req' => LibDeploymentAttachment::all()
            ]
        );
    }


    public function sqaView($id, Request $request){
        $search = $request->input('search');

        $results = SqaUat::query()
                ->where('application_id', $id)
                ->when($search, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('module', 'like', "%{$search}%");
                    });
                })
                ->orderBy('created_at','desc')
                ->paginate(15);
        $application = Application::find($id);

        return Inertia::render(
            'SQA/Uat/ViewSQA',[
                'results' => UatResource::collection($results),
                'filters' => ['search' => $search],
                'appId' => $application->id,
                'appName' => $application->name
            ]
        );
    }


    public function store(UatRequest $request, UatService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'UAT Created.');
    }

    public function update($id, UatRequest $request, UatService $service)
    {
        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'UAT Updated.');
    }

    public function destroy($id)
    {

        SqaUat::destroy($id);
        return redirect()->back()->with('success', 'Application deleted.');
    }

}
