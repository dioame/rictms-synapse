<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class IctInventory extends Model
{
    //

    use Uuids, SoftDeletes;

    public $incrementing = false;   

    protected $keyType = 'string';  

    // Define the table name if it doesn't follow Laravel's naming conventions
    protected $table = 'ict_inventory';

    protected $fillable = [
        'equipment_name',
        'serial_number',
        'model',
        'manufacturer',
        'location',
        'status',
        'purchase_date',
        'purchase_price',
        'warranty_expiry',
        'remarks',
    ];
}
