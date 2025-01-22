<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Http\Resources\Application\ApplicationResource;

class SoftwareApplicationController extends Controller
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
}
