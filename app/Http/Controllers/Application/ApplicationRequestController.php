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

class ApplicationRequestController extends Controller
{
    
    public function generateForm($id)
    {
        return Inertia::render(
            'ApplicationRequest/Form',
            [
                
            ]
        );
    }
}
