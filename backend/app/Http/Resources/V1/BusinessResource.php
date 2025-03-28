<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */ 
  public function toArray(Request $request): array
  {


    return [
      'bulstat' => $this->bulstat,
      'userId' => $this->user_id,
      'name' => $this->name,
      'slug' => $this->slug,
      'categoriesId' => $this->categories_id,
      'address' => $this->address,
      'phone' => $this->phone,
      'email' => $this->email,
      'city' => $this->city,
      'status' => $this->status,
      'workingHours' => $this->working_hours,
      'posPayment' => $this->pos_payment,
      'services' => ServicesResource::collection($this->whenLoaded('services')),
      'employee' => EmployeeResource::collection(($this->whenLoaded('employees'))),
      'businessInfo'=>$this->business_info,
      'logo' => $this->image
    ];
  }
}
