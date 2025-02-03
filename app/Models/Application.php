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
        'abbr',
        'description',
        'tech_stack',
        'version',
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
        'accessibility',
        'development_strategy',
        'platform',
        'computing_scheme',
        'internal_users',
        'no_of_internal_users',
        'external_users',
        'no_of_external_users',
        'system_owner',
        'location_of_deployment',
        'hostname_of_database',
        'database_ip_address',
        'description_general_contents',
        'information_systems_served',
        'data_archiving',
        'sqa_tested',
    ];

    // Define the dates (for casting to Carbon instances)
    protected $dates = ['deployment_date'];

    // Optionally, add any custom casts if needed
    protected $casts = [
        'deployment_date' => 'datetime',
    ];

    public function attachments()
    {
        return $this->hasMany(ApplicationDeploymentAttachment::class, 'application_id', 'id');
    }

    public function uptime()
    {
        return $this->hasOne(UptimeCheck::class, 'url', 'url');
    }
}
