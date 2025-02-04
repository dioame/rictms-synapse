<?php

namespace App\Http\Resources\SQA;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TestCaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'module' => $this->module,
            'test_procedure' => $this->test_procedure ? json_decode($this->test_procedure,true) : null,
            'expected_result' => $this->expected_result ? json_decode($this->expected_result,true) : null,
            'test_status' => $this->test_status,
            'remarks' => $this->remarks,
            'application' => $this->application,
        ];
    }
}
