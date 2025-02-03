<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UptimeCheck extends Model
{
    //
    protected $fillable = [
        'url',
        'status_code',
        'is_up',
    ];
}
