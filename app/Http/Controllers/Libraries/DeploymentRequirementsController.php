<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\LibDeploymentAttachment;
use App\Http\Resources\Libraries\DeploymentRequirementsResource;
use App\Http\Requests\Libraries\DeploymentRequirementsRequest;
use App\Http\Services\Libraries\DeploymentRequirementsService;
use Illuminate\Support\Facades\Redirect;

class DeploymentRequirementsController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = LibDeploymentAttachment::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'Libraries/DeploymentRequirements/Index',
            [
                'results' => DeploymentRequirementsResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }


    public function show($id)
    {

        $results = LibDeploymentAttachment::find($id);

        return Inertia::render(
            'Libraries/DeploymentRequirements/View',
            [
                'results' => $results,
            ]
        );
    }

    public function store(DeploymentRequirementsRequest $request, DeploymentRequirementsService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'Application Created.');
    }

    public function update($id, DeploymentRequirementsRequest $request, DeploymentRequirementsService $service)
    {

        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'Application Updated.');
    }


    public function destroy($id)
    {

        LibDeploymentAttachment::destroy($id);
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
            LibDeploymentAttachment::whereIn('id', $request->ids)->delete();
            // return Redirect::route('application.index', ['message' => 'Application deleted successfully.']);
            return redirect()->back()->with('success', 'Application deleted.');
        } catch (\Exception $e) {
            // return Redirect::route('application.index', ['message' => 'Application deletion Failed.']);
            return redirect()->back()->with('success', 'Application deletion failed.');
        }
    }
}
