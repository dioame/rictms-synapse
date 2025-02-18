<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VirusTotalScan extends Model
{
    //
    protected $fillable = [
        'url',
        'file_name',
        'result',
    ];
}
