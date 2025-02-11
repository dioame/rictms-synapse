<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'usernmae' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
            'avatar' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,svg',
        ];
    }

    protected function prepareForValidation()
    {       
        if (isset($this->avatar) && is_array($this->avatar) && empty($this->avatar)) {
            $this->merge(['avatar' => null]);
        }
    }
}
