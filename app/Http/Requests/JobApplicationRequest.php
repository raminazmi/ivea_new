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
            'job_id' => 'required|exists:jobs,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'cover_letter' => 'nullable|string|max:1000',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'job_id.required' => 'معرف الوظيفة مطلوب',
            'job_id.exists' => 'الوظيفة غير موجودة',
            'first_name.required' => 'الاسم الأول مطلوب',
            'first_name.max' => 'الاسم الأول يجب أن لا يتجاوز 255 حرف',
            'last_name.required' => 'الاسم الأخير مطلوب',
            'last_name.max' => 'الاسم الأخير يجب أن لا يتجاوز 255 حرف',
            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'البريد الإلكتروني غير صحيح',
            'email.max' => 'البريد الإلكتروني يجب أن لا يتجاوز 255 حرف',
            'phone.required' => 'رقم الهاتف مطلوب',
            'phone.max' => 'رقم الهاتف يجب أن لا يتجاوز 20 رقم',
            'cover_letter.max' => 'خطاب التقديم يجب أن لا يتجاوز 1000 حرف',
            'cv_file.required' => 'ملف السيرة الذاتية مطلوب',
            'cv_file.file' => 'يجب أن يكون ملف السيرة الذاتية ملف صحيح',
            'cv_file.mimes' => 'ملف السيرة الذاتية يجب أن يكون بصيغة PDF أو DOC أو DOCX',
            'cv_file.max' => 'حجم ملف السيرة الذاتية يجب أن لا يتجاوز 2 ميجابايت',
        ];
    }
}
