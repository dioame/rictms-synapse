<?php

namespace App\Http\Services\Application;

use App\Models\Application;
class ApplicationService
{
    public function store($params){
        $results = Application::create($params);
    }

    public function update($id, $params){
        $results = Application::find($id)->update($params);
    }
}