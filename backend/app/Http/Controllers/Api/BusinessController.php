<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBusinessRequest;
use App\Http\Resources\V1\BusinessResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

use App\Models\Business;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {

    return  BusinessResource::collection(
      Business::all()
        ->loadMissing('services')
        ->loadMissing('employees')
    );
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreBusinessRequest $request)
  {
    $attrs = $request->validated();

    $path = null;

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('business_logo', 'public');
    }

    $attrs['image'] = $path;
    Business::create($attrs);
    return response()->json("Business added");
  }


  /**
   * Display the specified resource.
   */
  public function show(Business $business)
  {
    return new BusinessResource($business->loadMissing('services'));
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Business $business)
  {
    Log::info('Update business request:', ['request' => $request->all()]);

    $attrs = $request->validate([
      'address' => ['required', 'string', 'max:255'],
      'city' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'numeric', 'min:10'],
      'image' => 'nullable|image|mimes:jpg,jpeg,png|max:10048',
      'email' => ['required', 'email', Rule::unique('businesses')->ignore($request->email, 'email')],
      'pos_payment' => ['nullable'],
      'business_info' => ['nullable']
    ]);

    $path = null;

    if ($request->hasFile('image')) {
      $path = $request->file('image')->storeAs('public/business_logo', $request->file('image')->getClientOriginalName(), 'public');
      Log::info('Image uploaded to: ', ['path' => $path]);
    } else {
      Log::warning('No image uploaded.');
    }

    $attrs['image'] = $path;

    if ($request->filled('working_hours')) {
      $attrs['working_hours'] = json_decode($request->input('working_hours'), true);
    }

    $business->update($attrs);
    return response()->json(["business" => $business]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Business $business)
  {
    $business->delete();
    return response()->json("Business deleted");
  }
}
