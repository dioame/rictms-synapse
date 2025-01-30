<?php

namespace App\Http\Services\SQA;

use App\Models\SqaUat;
class UatService
{
    public function store($params){
        SqaUat::create([
            'application_id' => $params['application_id'],
            'module' => $params['module'],
            'procedure' => json_encode($params['procedure']),
            'requirements' => json_encode($params['requirements']),
            'test_result' => $params['test_result'],
            'remarks' => $params['remarks'],
            'retesting_result' => $params['retesting_result'],
        ]);
    }

    public function update($id, $params){
        SqaUat::find($id)->update([
            'application_id' => $params['application_id'],
            'module' => $params['module'],
            'procedure' => json_encode($params['procedure']),
            'requirements' => json_encode($params['requirements']),
            'test_result' => $params['test_result'],
            'remarks' => $params['remarks'],
            'retesting_result' => $params['retesting_result'],
        ]);
    }
}