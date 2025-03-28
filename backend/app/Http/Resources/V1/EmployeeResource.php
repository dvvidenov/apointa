<?php

namespace App\Http\Resources\V1;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;
class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        $employee = User::findOrFail($this->user_id);
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'name' => $employee->name,
            'email' => $employee->email,
            'phone' => $employee->phone,
            'businessBulstat' => $this->business_bulstat,
            'status' => $this->status,
        ];
    }
}
