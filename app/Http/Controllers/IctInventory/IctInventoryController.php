<?php

namespace App\Http\Controllers\IctInventory;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\IctInventory;
use App\Http\Resources\IctInventory\IctInventoryResource;
use App\Http\Requests\IctInventory\IctInventoryRequest;
use App\Http\Services\IctInventory\IctInventoryService;
use Illuminate\Support\Facades\Redirect;

class IctInventoryController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = IctInventory::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('equipment_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'IctInventory/Index',
            [
                'results' => IctInventoryResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }


    public function show($id)
    {

        $results = IctInventory::find($id);

        return Inertia::render(
            'IctInventory/View',
            [
                'results' => $results,
            ]
        );
    }

    public function store(IctInventoryRequest $request, IctInventoryService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'Application Created.');
    }

    public function update($id, IctInventoryRequest $request, IctInventoryService $service)
    {
        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'Application Updated.');
    }


    public function destroy($id)
    {

        IctInventory::destroy($id);
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
            IctInventory::whereIn('id', $request->ids)->delete();
            // return Redirect::route('application.index', ['message' => 'Application deleted successfully.']);
            return redirect()->back()->with('success', 'Application deleted.');
        } catch (\Exception $e) {
            // return Redirect::route('application.index', ['message' => 'Application deletion Failed.']);
            return redirect()->back()->with('success', 'Application deletion failed.');
        }
    }
}
