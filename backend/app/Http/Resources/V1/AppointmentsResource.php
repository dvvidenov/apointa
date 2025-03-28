<?php

namespace App\Http\Resources\V1;

use App\Models\Business;
use App\Models\Categories;
use App\Models\Employees;
use App\Models\User;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class AppointmentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {   
        $employee = Employees::find($this->employees_id);
        if($employee){
            $empAsUser = User::find($employee->user_id);
        }else{
            $empAsUser= User::find($this->employees_id);
        }
       
        $user = User::find($this->user_id);
        $service = Services::findOrFail($this->services_id);
        $business = Business::find($this->business_bulstat);
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'userName'=> $user->name,
            'clientPhone' =>$user->phone,
            'clientEmail' => $user->email,
            'bulstat' => $this->business_bulstat,
            'businessName'=> $business->name,
            'employeesName' =>  $empAsUser->name,
            'servicesName' =>  $service->name,
            'servicesPrice' =>  $service->price,
            'serviceDuration'=>  $service->duration,
            'appointmentDate' => $this->appointment_date,
            'appointmentTime' => $this->appointment_time,
            'status' => $this->status,
        ];
    }
}
