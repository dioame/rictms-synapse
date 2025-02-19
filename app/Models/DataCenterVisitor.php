<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataCenterVisitor extends Model
{
    /** @use HasFactory<\Database\Factories\DataCenterVisitorFactory> */
    use HasFactory;

    protected $table = 'data_center_visitors';

    protected $fillable = [
        'name',
        'company_name',
        'contact_number',
        'email_address',
        'purpose_of_visit',
        'date_of_visit',
        'duration_of_visit',
        'proof_of_identity_presented',
    ];
}
