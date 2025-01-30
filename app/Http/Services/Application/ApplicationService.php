<?php

namespace App\Http\Services\Application;

use App\Models\Application;
class ApplicationService
{
    public function store($params){
       Application::create($params);
    }

    public function update($id, $params){
       Application::find($id)->update($params);
    }
}