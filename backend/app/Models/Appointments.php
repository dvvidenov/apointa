<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Appointments extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_bulstat',
        'user_id',
        'status',
        'services_id',
        'employees_id',
        'appointment_date',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employees::class);
    }

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
