<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SoftwareSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_name',
        'license_key',
        'subscriber_name',
        'subscriber_email',
        'subscription_type',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];
}