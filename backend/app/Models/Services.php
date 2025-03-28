<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
  use HasFactory;
  protected $fillable = [
    'name',
    'price',
    'old_price',
    'service_info',
    'duration',
    'business_bulstat',
    'status'
  ];

  public function businesses(){
    return $this->belongsTo(Business::class);
  }
}
