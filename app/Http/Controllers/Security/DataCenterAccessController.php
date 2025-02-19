<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\DataCenterVisitor;
use App\Http\Resources\Security\DataCenterAccessResource;
use App\Http\Requests\Security\DataCenterAccessRequest;
use App\Http\Services\Security\DataCenterAccessService;
use Illuminate\Support\Facades\Redirect;

class DataCenterAccessController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = DataCenterVisitor::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'Security/DataCenterAccess/Index',
            [
                'results' => DataCenterAccessResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }


    public function show($id)
    {

        $results = DataCenterVisitor::find($id);

        return Inertia::render(
            'Security/DataCenterAccess/View',
            [
                'results' => $results,
            ]
        );
    }

    public function store(DataCenterAccessRequest $request, DataCenterAccessService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'Application Created.');
    }

    public function update($id, DataCenterAccessRequest $request, DataCenterAccessService $service)
    {

        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'Application Updated.');
    }


    public function destroy($id)
    {

        DataCenterVisitor::destroy($id);
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
            DataCenterVisitor::whereIn('id', $request->ids)->delete();
            // return Redirect::route('application.index', ['message' => 'Application deleted successfully.']);
            return redirect()->back()->with('success', 'Application deleted.');
        } catch (\Exception $e) {
            // return Redirect::route('application.index', ['message' => 'Application deletion Failed.']);
            return redirect()->back()->with('success', 'Application deletion failed.');
        }
    }

    public function form($id){
        
        return Inertia::render(
            'Security/DataCenterAccess/PrintForm',
            [
                'result' => DataCenterVisitor::find($id)
            ]
        );
    }
}
