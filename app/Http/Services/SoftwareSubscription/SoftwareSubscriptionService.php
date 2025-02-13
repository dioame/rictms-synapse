<?php

namespace App\Http\Services\SoftwareSubscription;

use App\Models\SoftwareSubscription;
class SoftwareSubscriptionService
{
    public function store($params){
        SoftwareSubscription::create($params);
    }

    public function update($id, $params){
        SoftwareSubscription::find($id)->update($params);
    }
}