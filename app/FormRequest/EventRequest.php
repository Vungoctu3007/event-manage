<?php

namespace App\FormRequest;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'organizer_id' => 'required|exists:organizers,organizer_id',
            'category_id' => 'required|exists:categories,category_id',
            'venue_id' => 'required|exists:venues,venue_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'status' => 'required|in:pending,active,cancelled',
            'banner_url' => 'nullable|url',
            'logo_url' => 'nullable|url',
            'background_url' => 'nullable|url',
        ];
    }
}
