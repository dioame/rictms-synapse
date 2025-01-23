<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Application extends Model
{
    use HasFactory;
    use Uuids, SoftDeletes;

    public $incrementing = false;   

    protected $keyType = 'string';  

    // Define the table name if it doesn't follow Laravel's naming conventions
    protected $table = 'applications';

    // Define the fillable attributes (the columns you can mass-assign)
    protected $fillable = [
        'name',
        'description',
        'version',
        'application_type',
        'frontend_language',
        'frontend_framework',
        'backend_language',
        'backend_framework',
        'sqa_status',
        'repository',
        'is_pia',
        'is_km',
        'author',
        'developer',
        'division',
        'section',
        'region',
        'url',
        'deployment_date',
        'status',
        'request_status',
    ];

    // Define the dates (for casting to Carbon instances)
    protected $dates = ['deployment_date'];

    // Optionally, add any custom casts if needed
    protected $casts = [
        'deployment_date' => 'datetime',
    ];
}
