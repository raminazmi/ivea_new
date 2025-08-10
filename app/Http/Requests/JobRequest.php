<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'type' => 'required|in:full-time,part-time,contract',
            'category' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'requirements' => 'nullable|string|max:1000',
            'benefits' => 'nullable|string|max:1000',
            'status' => 'required|in:active,inactive,closed',
            'deadline' => 'nullable|date|after:today',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'عنوان الوظيفة مطلوب',
            'title.max' => 'عنوان الوظيفة يجب أن لا يتجاوز 255 حرف',
            'description.required' => 'وصف الوظيفة مطلوب',
            'description.max' => 'وصف الوظيفة يجب أن لا يتجاوز 2000 حرف',
            'type.required' => 'نوع الوظيفة مطلوب',
            'type.in' => 'نوع الوظيفة غير صحيح',
            'category.required' => 'فئة الوظيفة مطلوبة',
            'category.max' => 'فئة الوظيفة يجب أن لا تتجاوز 255 حرف',
            'location.max' => 'الموقع يجب أن لا يتجاوز 255 حرف',
            'salary_range.max' => 'نطاق الراتب يجب أن لا يتجاوز 255 حرف',
            'requirements.max' => 'المتطلبات يجب أن لا تتجاوز 1000 حرف',
            'benefits.max' => 'الفوائد يجب أن لا تتجاوز 1000 حرف',
            'status.required' => 'حالة الوظيفة مطلوبة',
            'status.in' => 'حالة الوظيفة غير صحيحة',
            'deadline.date' => 'تاريخ انتهاء الصلاحية غير صحيح',
            'deadline.after' => 'تاريخ انتهاء الصلاحية يجب أن يكون بعد اليوم الحالي',
        ];
    }
}
