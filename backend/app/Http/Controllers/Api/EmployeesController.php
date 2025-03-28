<?php


namespace App\Http\Controllers\Api;

use App\Models\Employees;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\EmployeeResource;
use Illuminate\Support\Facades\Log;
use App\Models\Business;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        
        $user = $request->user();
       
        $business = Business::where('bulstat', $user->business_bulstat??$request->bulstat)->first();

        if (!$business) {
            return response()->json(['message' => 'Business not found'], 404);
        }

        $employees = $business->employees;

        Log::info('Bulstat employees.', ['employees' => $employees]);
        
        // return response()->json($employees);
        return EmployeeResource::collection($employees);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attrs = $request->validate([
            'status' => ['required',],
            'business_bulstat'=> ['required']
        ]);


        Employees::create($attrs);
        return response()->json("Employee added");
    }

    /**
     * Display the specified resource.
     */
    public function show(Employees $employee)
    {
        return new EmployeeResource($employee);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employees $employee)
    {
        $attrs = $request->validate([
            'status' => ['required',],
        ]);


        $employee->update($attrs);
        return response()->json("Employee added");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employees $employee)
    {
        $employee->delete(); 
    }
}
