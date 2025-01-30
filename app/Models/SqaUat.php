<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class SqaUat extends Model
{
    use HasFactory, Uuids;

    protected $table = 'sqa_uats';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'application_id',
        'module',
        'procedure',
        'requirements',
        'test_result',
        'remarks',
        'retesting_result',
    ];

    protected $casts = [
        'procedure' => 'array',
        'requirements' => 'array',
    ];
}
