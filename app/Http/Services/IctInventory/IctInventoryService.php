<?php

namespace App\Http\Services\IctInventory;

use App\Models\IctInventory;
class IctInventoryService
{
    public function store($params){
        IctInventory::create($params);
    }

    public function update($id, $params){
        IctInventory::find($id)->update($params);
    }
}