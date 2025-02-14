<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecuredMessage extends Model
{
    use HasFactory;

    protected $table = 'secured_message';

    protected $fillable = [
        'receiver_id',
        'sender_id',
        'message',
        'expiration',
    ];

    protected $casts = [
        'expiration' => 'datetime',
    ];
}
