<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|min:2|max:50',
            'last_name' => 'required|string|min:2|max:50',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|min:10|max:15',
            'cover_letter' => 'nullable|string|max:1000',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'الاسم الأول مطلوب',
            'first_name.min' => 'الاسم الأول يجب أن يكون حرفين على الأقل',
            'first_name.max' => 'الاسم الأول يجب أن لا يتجاوز 50 حرف',

            'last_name.required' => 'اسم العائلة مطلوب',
            'last_name.min' => 'اسم العائلة يجب أن يكون حرفين على الأقل',
            'last_name.max' => 'اسم العائلة يجب أن لا يتجاوز 50 حرف',

            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'البريد الإلكتروني غير صحيح',
            'email.max' => 'البريد الإلكتروني يجب أن لا يتجاوز 255 حرف',

            'phone.required' => 'رقم الجوال مطلوب',
            'phone.min' => 'رقم الجوال يجب أن يكون 10 أرقام على الأقل',
            'phone.max' => 'رقم الجوال يجب أن لا يتجاوز 15 رقم',

            'cover_letter.max' => 'الرسالة التعريفية يجب أن لا تتجاوز 1000 حرف',

            'cv_file.required' => 'ملف السيرة الذاتية مطلوب',
            'cv_file.file' => 'يجب أن يكون ملف السيرة الذاتية ملف صحيح',
            'cv_file.mimes' => 'ملف السيرة الذاتية يجب أن يكون بصيغة PDF أو DOC أو DOCX',
            'cv_file.max' => 'حجم ملف السيرة الذاتية يجب أن لا يتجاوز 2 ميجابايت',
        ];
    }
}
