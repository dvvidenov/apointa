<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicesResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'businessBulstat' => $this->business_bulstat,
      'name' => $this->name,
      'price' => $this->price,
      'oldPrice'=>$this->old_price,
      'serviceInfo'=>$this->service_info,
      'duration' => $this->duration,
      'status' => $this->status
    ];
  }
}
