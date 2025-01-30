<?php

namespace App\Http\Resources\SQA;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UatResource extends JsonResource
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
            'procedure' => $this->procedure ? json_decode($this->procedure,true) : null,
            'requirements' => $this->requirements ? json_decode($this->requirements,true) : null,
            'test_result' => $this->test_result,
            'remarks' => $this->remarks,
            'retesting_result' => $this->retesting_result
        ];
    }
}
