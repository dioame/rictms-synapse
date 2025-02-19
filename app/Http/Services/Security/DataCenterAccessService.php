<?php

namespace App\Http\Services\Security;

use App\Models\DataCenterVisitor;
class DataCenterAccessService
{
    public function store($params){
        DataCenterVisitor::create($params);
    }

    public function update($id, $params){
        DataCenterVisitor::find($id)->update($params);
    }
}