<?php
namespace App\Http\Controllers;

use App\Http\Services\VirusTotalService;
use App\Models\VirusTotalScan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VirusTotalController extends Controller
{
    protected $virusTotalService;

    // Inject the VirusTotalService into the controller
    public function __construct(VirusTotalService $virusTotalService)
    {
        $this->virusTotalService = $virusTotalService;
    }

    public function index()
    {
        return Inertia::render('VirusTotal/Index');
    }

    // Method to handle check URL and get result
    public function check(Request $request)
    {
        // Validate the input to make sure a URL is provided
        $request->validate([
            'url' => 'nullable|url',
        ]);

        // Check if a URL is provided
        if ($request->has('url')) {
            $url = $request->input('url');
            
            // Check if URL already exists in the database and was created today
            $existingScan = VirusTotalScan::where('url', $url)
                ->whereDate('created_at', today())
                ->first();

            if ($existingScan) {
                // Return the result from the database as a JSON response
                return response()->json([
                    'result' => json_decode($existingScan->result),  // Decode the stored JSON result
                ]);
            }

            // If not found, call VirusTotal API to get the result using the service
            $result = $this->virusTotalService->check($url);

            // Save the result to the database
            VirusTotalScan::create([
                'url' => $url,
                'result' => json_encode($result),
            ]);

            return response()->json([
                'result' => $result,
            ]);
        }

        // If no URL is provided, return a validation error response
        return response()->json([
            'error' => 'Please provide a valid URL for scanning.',
        ], 400);  // 400 status code for bad request
    }

}
