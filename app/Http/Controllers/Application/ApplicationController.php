<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\LibDeploymentAttachment;
use App\Models\ApplicationDeploymentAttachment;
use App\Http\Resources\Application\ApplicationResource;
use App\Http\Requests\Application\ApplicationRequest;
use App\Http\Services\Application\ApplicationService;
use Illuminate\Support\Facades\Redirect;

class ApplicationController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = Application::with(['attachments.libDeploymentAttachment','uptime'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'Application/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search],
                'lib_deployment_req' => LibDeploymentAttachment::all()
            ]
        );
    }


    public function pending(Request $request)
    {
        $search = $request->input('search');

        $results =  Application::with(['attachments.libDeploymentAttachment'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('request_status','pending')
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'Application/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }

    public function approved(Request $request)
    {
        $search = $request->input('search');

        $results =  Application::with(['attachments.libDeploymentAttachment'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('request_status','approved')
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'Application/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }


    public function cancelled(Request $request)
    {
        $search = $request->input('search');

        $results = Application::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('request_status','cancelled')
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'Application/Index',
            [
                'results' => ApplicationResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }



    public function show($id)
    {

        $results = Application::with(['attachments.libDeploymentAttachment'])->where('id', $id)->first();

        return Inertia::render(
            'Application/View',
            [
                'results' => $results,
            ]
        );
    }

    public function store(ApplicationRequest $request, ApplicationService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'Application Created.');
    }

    public function update($id, ApplicationRequest $request, ApplicationService $service)
    {
        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'Application Updated.');
    }


    public function destroy($id)
    {

        Application::destroy($id);
        // return json with response
        // redirect to route('users.index'); whit message and render inertia page
        // return Redirect::route('application.index', ['message' => 'Application deleted successfully']);
        return redirect()->back()->with('success', 'Application deleted.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:applications,id'
        ]);

        try {
            Application::whereIn('id', $request->ids)->delete();
            // return Redirect::route('application.index', ['message' => 'Application deleted successfully.']);
            return redirect()->back()->with('success', 'Application deleted.');
        } catch (\Exception $e) {
            // return Redirect::route('application.index', ['message' => 'Application deletion Failed.']);
            return redirect()->back()->with('success', 'Application deletion failed.');
        }
    }



    public function request($id)
    {
        return Inertia::render(
            'Application/Index',
            [
                
            ]
        );
    }


    
    public function updateAttachment($id, Request $request)
    {
        $storagePath = storage_path('app/public/deployment-files');

        // Ensure the directory exists
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0775, true);
        }

        foreach ($request->all() as $key => $value) {
            if (isset($value['file'])) {
           
                $file = $value['file'];


                $fileName = $value['id'].'-'.uniqid().'.'.$file->getClientOriginalExtension();
                $file->storeAs('public/deployment-files', $fileName);
                
                ApplicationDeploymentAttachment::create([
                    'application_id' => $id,
                    'lib_deployment_attachments_id' => $value['id'],
                    'path' => $fileName
                ]);
            }
        }
    }

    public function attachmentDelete($id){
        ApplicationDeploymentAttachment::destroy($id);
        return redirect()->back()->with('success', 'Application deleted.');
    }
}
