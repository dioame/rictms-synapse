<?php

namespace App\Http\Services;

use OpenAI;
use Illuminate\Support\Facades\Http;
use App\Models\Application;

class OpenAIService
{
    protected $openAIClient;
    protected $geminiApiKey;
    protected $geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    public function __construct()
    {
        $this->openAIClient = OpenAI::client(config('services.openai.key'));
        $this->geminiApiKey = config('services.gemini.key');
    }

    public function generateChatResponse($message, $modelType = 'gpt')
    {
        $data = Application::all()->toJson();
        $systemMessage = "Here is recent application data:\n$data\nNow, answer this question: $message";

        if ($modelType === 'gemini') {
            return $this->generateGeminiResponse($systemMessage);
        }

        return $this->generateOpenAIResponse($systemMessage);
    }

    protected function generateOpenAIResponse($message)
    {
        $response = $this->openAIClient->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => $message],
            ],
            'temperature' => 0.7,
            'max_tokens' => 1000,
        ]);

        return $response->choices[0]->message->content ?? 'No response';
    }

    protected function generateGeminiResponse($message)
    {
        $response = Http::post("{$this->geminiApiUrl}?key={$this->geminiApiKey}", [
            'contents' => [
                ['parts' => [['text' => $message]]],
            ]
        ]);

        return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'No response';
    }
}
