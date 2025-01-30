<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class SqaTestCase extends Model
{
    use HasFactory, Uuids;

    protected $table = 'sqa_test_cases';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'application_id',
        'module',
        'test_procedure',
        'expected_result',
        'test_status',
        'remarks'
    ];

    protected $casts = [
        'test_procedure' => 'array',
        'expected_result' => 'array',
    ];
}
