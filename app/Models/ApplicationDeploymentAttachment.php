<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApplicationDeploymentAttachment extends Model
{
    //
    use SoftDeletes;

    protected $table = 'application_deployment_attachments';

    protected $fillable = [
        'application_id',
        'lib_deployment_attachments_id',
        'path'
    ];

    public $timestamps = true;

    // Define relationships
    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id', 'id');
    }

    public function libDeploymentAttachment()
    {
        return $this->belongsTo(LibDeploymentAttachment::class, 'lib_deployment_attachments_id', 'id');
    }
}
