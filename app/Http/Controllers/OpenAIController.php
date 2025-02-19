<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Services\OpenAIService;

class OpenAIController extends Controller
{
    protected $openAIService;

    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    public function index()
    {
        return Inertia::render('Openai/Index');
    }

    public function generate(Request $request)
    {
      
        $request->validate([
            'text' => 'required|string',
            'model' => 'required|string|in:gpt,gemini' // Validate model type
        ]);
    
        $response = $this->openAIService->generateChatResponse($request->text, $request->model);
    
        return response()->json(['response' => $response]);
    }
    
}
