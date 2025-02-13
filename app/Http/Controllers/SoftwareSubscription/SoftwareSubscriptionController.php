<?php

namespace App\Http\Controllers\SoftwareSubscription;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\SoftwareSubscription;
use App\Http\Resources\SoftwareSubscription\SoftwareSubscriptionResource;
use App\Http\Requests\SoftwareSubscription\SoftwareSubscriptionRequest;
use App\Http\Services\SoftwareSubscription\SoftwareSubscriptionService;
use Illuminate\Support\Facades\Redirect;

class SoftwareSubscriptionController extends Controller
{
    //
    public function index(Request $request)
    {
        $search = $request->input('search');

        $results = SoftwareSubscription::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('software_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at','desc')
            ->paginate(10);

        return Inertia::render(
            'SoftwareSubscription/Index',
            [
                'results' => SoftwareSubscriptionResource::collection($results),
                'filters' => ['search' => $search]
            ]
        );
    }


    public function show($id)
    {

        $results = SoftwareSubscription::find($id);

        return Inertia::render(
            'SoftwareSubscription/View',
            [
                'results' => $results,
            ]
        );
    }

    public function store(SoftwareSubscriptionRequest $request, SoftwareSubscriptionService $service)
    {
        $service->store($request->all());
        return redirect()->back()->with('success', 'Application Created.');
    }

    public function update($id, SoftwareSubscriptionRequest $request, SoftwareSubscriptionService $service)
    {

        $service->update($id, $request->all());
        return redirect()->back()->with('success', 'Application Updated.');
    }


    public function destroy($id)
    {

        SoftwareSubscription::destroy($id);
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
            SoftwareSubscription::whereIn('id', $request->ids)->delete();
            // return Redirect::route('application.index', ['message' => 'Application deleted successfully.']);
            return redirect()->back()->with('success', 'Application deleted.');
        } catch (\Exception $e) {
            // return Redirect::route('application.index', ['message' => 'Application deletion Failed.']);
            return redirect()->back()->with('success', 'Application deletion failed.');
        }
    }
}
