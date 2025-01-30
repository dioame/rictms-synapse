<?php

namespace App\Http\Services\SQA;

use App\Models\SqaTestCase;
class TestCaseService
{
    public function store($params){
        SqaTestCase::create([
            'application_id' => $params['application_id'],
            'module' => $params['module'],
            'test_procedure' => json_encode($params['test_procedure']),
            'expected_result' => json_encode($params['expected_result']),
            'test_status' => $params['test_status'],
            'remarks' => $params['remarks'],
        ]);
    }

    public function update($id, $params){
        SqaTestCase::find($id)->update([
            'application_id' => $params['application_id'],
            'module' => $params['module'],
            'test_procedure' => json_encode($params['test_procedure']),
            'expected_result' => json_encode($params['expected_result']),
            'test_status' => $params['test_status'],
            'remarks' => $params['remarks'],
        ]);
    }
}