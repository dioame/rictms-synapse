<?php

namespace App\Http\Services\Libraries;

use App\Models\LibDeploymentAttachment;
class DeploymentRequirementsService
{
    public function store($params){
        LibDeploymentAttachment::create($params);
    }

    public function update($id, $params){
        LibDeploymentAttachment::find($id)->update($params);
    }
}