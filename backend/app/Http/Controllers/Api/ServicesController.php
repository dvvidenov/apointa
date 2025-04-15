<?php


namespace App\Http\Controllers\Api;

use App\Http\Resources\V1\ServicesResource;
use App\Models\Services;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use App\Models\Business;



class ServicesController extends Controller
{   
  
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
   
        $user = $request->user();
    
        $business = Business::where('bulstat', $user->business_bulstat)->first();

        if (!$business) {
            return response()->json(['message' => 'Business not found'], 404);
        }
        $services = $business->services;

        Log::info('Bulstat services.', ['services' => $services]);
        
        return ServicesResource::collection($services);
        // return response()->json($services);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        Log::info('Created services.', ['services' => $request]);
        $attrs = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required'],
            'duration' => ['required'],
            'business_bulstat'=> ['required'],
            // 'old_price' => ['nullable'],
            'service_info' => ['nullable', 'string', 'max:255'],
        ]);
        $attrs['status'] = true;

        Services::create($attrs);
        Log::info('Created services.', ['services' => $attrs]);
        return response()->json("Service added");
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,Services $service)
    {   
        $user = $request->user();
       
        if($service->business_bulstat != $user->business_bulstat){
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return  new ServicesResource($service);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Services $service)
    {   

        Log::info('Update services.', ['update' => $request]);
        $attrs = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required','numeric','min:2'],
            'duration' => ['required','numeric','min:1'],
            'business_bulstat'=> ['required'],
            'status' => ['required'],
            // 'old_price' => ['nullable'],
            'service_info' => ['nullable','string','max:255']
        ]);


        $service->update($attrs);
        return response()->json("Service updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Services $service)
    {
        $service->delete();
        return response()->json("Service deleted");
    }
}
