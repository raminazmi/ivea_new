<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_country_code' => 'required|string|max:10',
            'phone_number' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
            'attachments.*' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'first_name.required' => 'الاسم الأول مطلوب',
            'first_name.string' => 'الاسم الأول يجب أن يكون نص',
            'first_name.max' => 'الاسم الأول لا يمكن أن يتجاوز 255 حرف',

            'last_name.required' => 'الاسم الأخير مطلوب',
            'last_name.string' => 'الاسم الأخير يجب أن يكون نص',
            'last_name.max' => 'الاسم الأخير لا يمكن أن يتجاوز 255 حرف',

            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'البريد الإلكتروني يجب أن يكون صحيح',
            'email.max' => 'البريد الإلكتروني لا يمكن أن يتجاوز 255 حرف',

            'phone_country_code.required' => 'رمز الدولة مطلوب',
            'phone_country_code.string' => 'رمز الدولة يجب أن يكون نص',
            'phone_country_code.max' => 'رمز الدولة لا يمكن أن يتجاوز 10 أحرف',

            'phone_number.required' => 'رقم الجوال مطلوب',
            'phone_number.string' => 'رقم الجوال يجب أن يكون نص',
            'phone_number.max' => 'رقم الجوال لا يمكن أن يتجاوز 20 حرف',

            'subject.required' => 'الموضوع مطلوب',
            'subject.string' => 'الموضوع يجب أن يكون نص',
            'subject.max' => 'الموضوع لا يمكن أن يتجاوز 255 حرف',

            'category.required' => 'الفئة مطلوبة',
            'category.string' => 'الفئة يجب أن تكون نص',
            'category.max' => 'الفئة لا يمكن أن تتجاوز 255 حرف',

            'message.required' => 'الرسالة مطلوبة',
            'message.string' => 'الرسالة يجب أن تكون نص',
            'message.max' => 'الرسالة لا يمكن أن تتجاوز 1000 حرف',

            'attachments.*.file' => 'يجب أن يكون الملف صحيح',
            'attachments.*.mimes' => 'نوع الملف غير مدعوم. الأنواع المدعومة: PDF, DOC, DOCX, JPG, JPEG, PNG',
            'attachments.*.max' => 'حجم الملف لا يمكن أن يتجاوز 2 ميجابايت'
        ];
    }
}
