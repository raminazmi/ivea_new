<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\ProjectQuiz;

class ProjectQuizRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|min:10|max:20',
            'space_types' => 'required|array|min:1',
            'space_types.*' => 'string|in:' . implode(',', array_keys(ProjectQuiz::SPACE_TYPES)),
            'product_needs' => 'required|array|min:1',
            'product_needs.*' => 'string|in:' . implode(',', array_keys(ProjectQuiz::PRODUCT_NEEDS)),
            'preferred_styles' => 'required|array|min:1',
            'preferred_styles.*' => 'string|in:' . implode(',', array_keys(ProjectQuiz::PREFERRED_STYLES)),
            'space_type_other' => 'nullable|string|max:500',
            'product_other' => 'nullable|string|max:500',
            'style_other' => 'nullable|string|max:500',
            'additional_notes' => 'nullable|string|max:1000',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,pdf|max:10240'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب',
            'name.string' => 'الاسم يجب أن يكون نص',
            'name.min' => 'الاسم يجب أن يكون على الأقل حرفين',
            'name.max' => 'الاسم لا يمكن أن يتجاوز 255 حرف',

            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'البريد الإلكتروني يجب أن يكون صحيح',
            'email.max' => 'البريد الإلكتروني لا يمكن أن يتجاوز 255 حرف',

            'phone.required' => 'رقم الهاتف مطلوب',
            'phone.string' => 'رقم الهاتف يجب أن يكون نص',
            'phone.min' => 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام',
            'phone.max' => 'رقم الهاتف لا يمكن أن يتجاوز 20 رقم',

            'space_types.required' => 'يجب اختيار نوع المساحة',
            'space_types.array' => 'نوع المساحة يجب أن يكون قائمة',
            'space_types.min' => 'يجب اختيار نوع مساحة واحد على الأقل',
            'space_types.*.string' => 'نوع المساحة يجب أن يكون نص',
            'space_types.*.in' => 'نوع المساحة المختار غير صحيح',

            'product_needs.required' => 'يجب اختيار المنتجات المطلوبة',
            'product_needs.array' => 'المنتجات المطلوبة يجب أن تكون قائمة',
            'product_needs.min' => 'يجب اختيار منتج واحد على الأقل',
            'product_needs.*.string' => 'المنتج يجب أن يكون نص',
            'product_needs.*.in' => 'المنتج المختار غير صحيح',

            'preferred_styles.required' => 'يجب اختيار الستايل المفضل',
            'preferred_styles.array' => 'الستايل المفضل يجب أن يكون قائمة',
            'preferred_styles.min' => 'يجب اختيار ستايل واحد على الأقل',
            'preferred_styles.*.string' => 'الستايل يجب أن يكون نص',
            'preferred_styles.*.in' => 'الستايل المختار غير صحيح',

            'space_type_other.string' => 'نوع المساحة الإضافي يجب أن يكون نص',
            'space_type_other.max' => 'نوع المساحة الإضافي لا يمكن أن يتجاوز 500 حرف',

            'product_other.string' => 'المنتج الإضافي يجب أن يكون نص',
            'product_other.max' => 'المنتج الإضافي لا يمكن أن يتجاوز 500 حرف',

            'style_other.string' => 'الستايل الإضافي يجب أن يكون نص',
            'style_other.max' => 'الستايل الإضافي لا يمكن أن يتجاوز 500 حرف',

            'additional_notes.string' => 'الملاحظات الإضافية يجب أن تكون نص',
            'additional_notes.max' => 'الملاحظات الإضافية لا يمكن أن تتجاوز 1000 حرف',

            'images.array' => 'الصور يجب أن تكون قائمة',
            'images.max' => 'يمكن رفع 5 صور كحد أقصى',
            'images.*.image' => 'يجب أن يكون الملف صورة',
            'images.*.mimes' => 'نوع الملف غير مدعوم. الأنواع المدعومة: JPEG, PNG, JPG, GIF, PDF',
            'images.*.max' => 'حجم الملف لا يمكن أن يتجاوز 10 ميجابايت'
        ];
    }
}
