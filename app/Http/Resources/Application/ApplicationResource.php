<?php

namespace App\Http\Resources\Application;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ApplicationResource extends JsonResource
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
            'name' => $this->name,
            'abbr' => $this->abbr,
            'description' => $this->description,
            'tech_stack' => $this->tech_stack,
            'version' => $this->version,
            'repository' => $this->repository,
            'is_pia' => $this->is_pia,
            'is_km' => $this->is_km,
            'author' => $this->author,
            'developer' => $this->developer,
            'division' => $this->division,
            'section' => $this->section,
            'region' => $this->region,
            'url' => $this->url,
            'deployment_date' => $this->deployment_date,
            'status' => $this->status,
            'request_status' => $this->request_status,
            'accessibility' => $this->accessibility,
            'development_strategy' => $this->development_strategy,
            'platform' => $this->platform,
            'computing_scheme' => $this->computing_scheme,
            'internal_users' => $this->internal_users,
            'no_of_internal_users' => $this->no_of_internal_users,
            'external_users' => $this->external_users,
            'no_of_external_users' => $this->no_of_external_users,
            'system_owner' => $this->system_owner,
            'location_of_deployment' => $this->location_of_deployment,
            'hostname_of_database' => $this->hostname_of_database,
            'database_ip_address' => $this->database_ip_address,
            'description_general_contents' => $this->description_general_contents,
            'information_systems_served' => $this->information_systems_served,
            'data_archiving' => $this->data_archiving,
            'sqa_tested' => $this->sqa_tested,
            'attachments' => $this->attachments,
            'uptime' => $this->uptime,
            'sqa_test_case' => $this->sqaTestCase,
            'sqa_uat' => $this->sqaUat,
            'features' => json_decode($this->features,true),
            'features_count' => $this->features ? count(json_decode($this->features,true)) : 0,
            'requirement_remarks'=>$this->requirement_remarks
        ];
    }
}
