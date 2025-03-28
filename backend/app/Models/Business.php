<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Business extends Model
{
    use HasFactory;
    protected $primaryKey = 'bulstat';
    public $incrementing = false;
    protected $keyType = 'string';
    public function getRouteKeyName()
    {
        return 'slug';
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($business) {
            if (empty($business->slug)) {
                $business->slug = Str::slug($business->name, '-');
            }
        });

        static::updating(function ($business) {
            $business->slug = Str::slug($business->name, '-');
        });
    }
    
    protected $fillable = [
        'bulstat',
        'user_id',
        'categories_id',
        'name',
        'slug',
        'address',
        'phone',
        'city',
        'email',
        'working_hours',
        'pos_payment',
        'image',
        'business_info'
    ];

    protected $casts = [
        'working_hours' => 'array', // JSON поле
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function employees()
    {
        return $this->hasMany(Employees::class);
    }

    protected $table = 'businesses';

    public function categories()
    {
        return $this->belongsToMany(Categories::class, 'business_category', 'business_bulstat', 'category_id');
    }
    public function appointments()
    {
        return $this->hasMany(Appointments::class);
    }

    public function services()
    {
        return $this->hasMany(Services::class);
    }
}
