<?php

namespace App\Http\Controllers\Api;

use App\Models\Appointments;
use App\Models\Business;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\AppointmentsResource;
use App\Models\Employees;
use Illuminate\Support\Facades\Log;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        
        $user = $request->user();
        if($user->role == 'owner'){
            $business = Business::where('bulstat', $user->business_bulstat)->first();
            Log::info(' Business appointments.', ['business' => $business->appointments]);
            return AppointmentsResource::collection($business->appointments);
        }

        if($user->role == 'employee'){
            $employee = Employees::where('user_id', $user->id)->first();
            Log::info(' employee appointment.', ['employee' =>   $employee]);
            return AppointmentsResource::collection($employee->appointments);
        }

        return AppointmentsResource::collection($user->appointments);

    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $user = $request->user();
       
        $attrs = $request->validate([
            'status' => ['required',],
            'business_bulstat'=> ['required'],
            'services_id'=>['required'],
            'employees_id' => ['required'],
            'appointment_date'=>['required','date'],
        ]);
        
        $attrs['user_id'] = $user['id'];
        
        Log::info('Created appointment.', ['attrs' => $attrs]);
        Appointments::create($attrs);
        return response()->json("Appointment added");
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointments $appointment)
    {
        return new AppointmentsResource($appointment);
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointments $appointment)
    { Log::info('Created appointment.', ['request' => $request]);
        $attrs = $request->validate([
            'status' => ['required',],
            'appointmentDate'=>['required','date'],
        ]);

        Log::info('Updated appointment.', ['attrs' => $attrs]);
        $appointment->update($attrs);
        return response()->json("Appointment updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointments $appointment)
    {
        $appointment->delete();
    }
}
