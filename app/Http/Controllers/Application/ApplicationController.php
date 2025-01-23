<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Application;
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

        $results = Application::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->where('request_status','approve')
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

        $results = Application::find($id);

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
        return Redirect::route('application.index', ['message' => 'Application deleted successfully']);
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:applications,id'
        ]);

        try {
            Application::whereIn('id', $request->ids)->delete();
            return Redirect::route('application.index', ['message' => 'Application deleted successfully.']);
        } catch (\Exception $e) {
            return Redirect::route('application.index', ['message' => 'Application deletion Failed.']);
        }
    }
}
