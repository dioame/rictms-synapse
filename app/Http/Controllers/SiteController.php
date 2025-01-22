<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        $sites = Site::with('user')->get();
        return inertia('Sites/Index', ['sites' => $sites]);
    }

    public function create()
    {
        return inertia('Sites/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
        ]);

        $site = new Site($request->all());
        $site->user_id = auth()->user()->id;
        $site->save();

        return redirect()->route('sites.index');
    }

    // Add other methods (show, edit, update, destroy) as needed
}
