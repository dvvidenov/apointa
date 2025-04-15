<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBusinessRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {

    return [
      'bulstat' => ['required', 'min:9', 'max:10', Rule::unique('businesses')->ignore($this->bulstat, 'bulstat')],
      'user_id' => ['exists:users,id'],
      'categories_id' => ['exists:categories,id',],
      'name' => ['required', Rule::unique('businesses')->ignore($this->name, 'name')],
      'address' => ['required', 'string', 'max:255'],
      'city' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'numeric', 'min:10'],
      'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
      'email' => ['required', 'email', Rule::unique('businesses')->ignore($this->email, 'email')]
    ];
  }
}
