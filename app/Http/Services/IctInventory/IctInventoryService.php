<?php

namespace App\Http\Services\IctInventory;

use App\Models\IctInventory;
class IctInventoryService
{
    public function store($params){
        $results = IctInventory::create($params);
    }

    public function update($id, $params){
        $results = IctInventory::find($id)->update($params);
    }
}