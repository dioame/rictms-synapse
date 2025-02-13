<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IctInventory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\UptimeCheck;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use App\Helpers\Security;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class SecurityController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Security/Index',[
            "result" =>  []
        ]);
    }

    public function getSecurityChecksResult(Request $request){
      

        $security = Security::checkSecurity($request->url);
       
        return Inertia::render('Security/Index', [
            "result" =>  $security
        ]);
    }

    public function show(){
        return back();
    }
}
