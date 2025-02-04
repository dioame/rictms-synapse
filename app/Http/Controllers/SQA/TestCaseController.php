<?php

namespace App\Http\Controllers\SQA;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\SqaTestCase;
use App\Models\Application;
use App\Models\ApplicationDeploymentAttachment;
use App\Models\LibDeploymentAttachment;
use App\Http\Resources\SQA\TestCaseResource;
use App\Http\Requests\SQA\TestCaseRequest;
use App\Http\Services\SQA\TestCaseService;
use App\Http\Resources\Application\ApplicationResource;
use App\Http\Requests\Application\ApplicationRequest;
use App\Http\Services\Application\ApplicationService;
use Illuminate\Support\Facades\Redirect;

class TestCaseController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = Application::with(['attachments.libDeploymentAttachment','sqaTestCase'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('status','testing')
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'SQA/TestCase/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search],
                'lib_deployment_req' => LibDeploymentAttachment::all()
            ]
        );
    }




    public function sqaView($id, Request $request){
        $search = $request->input('search');

        $results = SqaTestCase::query()
                ->where('application_id', $id)
                ->when($search, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('module', 'like', "%{$search}%");
                    });
                })
                ->orderBy('created_at','desc')
                ->paginate(10);
        $application = Application::find($id);

        return Inertia::render(
            'SQA/TestCase/ViewSQA',[
                'results' => TestCaseResource::collection($results),
                'filters' => ['search' => $search],
                'appId' => $application->id,
                'appName' => $application->name
            ]
        );
    }


    public function store(TestCaseRequest $request, TestCaseService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'Test Case Created.');
    }

    public function update($id, TestCaseRequest $request, TestCaseService $service)
    {
        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'Test Case Updated.');
    }

    public function destroy($id)
    {

        SqaTestCase::destroy($id);
        return redirect()->back()->with('success', 'Application deleted.');
    }

}
