<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
        $rules = [
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|integer|min:0|max:100',
            'image' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'tab' => 'required|in:all,new,offers,bestsellers',
            'category_id' => 'required|exists:categories,id',
            'colors' => 'nullable|array',
            'colors.*' => 'string|regex:/^#[0-9A-F]{6}$/i',
            'status' => 'required|in:active,inactive',
            'stock' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|unique:products,sku,' . ($this->product?->id ?? ''),
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'dimensions.width' => 'nullable|numeric|min:0',
            'dimensions.height' => 'nullable|numeric|min:0',
            'dimensions.depth' => 'nullable|numeric|min:0',
            'specifications' => 'nullable|array',
        ];

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'اسم المنتج مطلوب',
            'name.string' => 'اسم المنتج يجب أن يكون نص',
            'name.max' => 'اسم المنتج لا يمكن أن يتجاوز 255 حرف',
            
            'brand.required' => 'العلامة التجارية مطلوبة',
            'brand.string' => 'العلامة التجارية يجب أن تكون نص',
            'brand.max' => 'العلامة التجارية لا يمكن أن تتجاوز 255 حرف',
            
            'price.required' => 'السعر مطلوب',
            'price.numeric' => 'السعر يجب أن يكون رقم',
            'price.min' => 'السعر لا يمكن أن يكون أقل من 0',
            
            'discount.integer' => 'الخصم يجب أن يكون رقم صحيح',
            'discount.min' => 'الخصم لا يمكن أن يكون أقل من 0',
            'discount.max' => 'الخصم لا يمكن أن يتجاوز 100%',
            
            'image.required' => 'صورة المنتج مطلوبة',
            
            'rating.integer' => 'التقييم يجب أن يكون رقم صحيح',
            'rating.min' => 'التقييم لا يمكن أن يكون أقل من 1',
            'rating.max' => 'التقييم لا يمكن أن يتجاوز 5',
            
            'tab.required' => 'التصنيف مطلوب',
            'tab.in' => 'التصنيف يجب أن يكون: الكل، جديد، عروض، الأكثر مبيعاً',
            
            'category_id.required' => 'الفئة مطلوبة',
            'category_id.exists' => 'الفئة المحددة غير موجودة',
            
            'colors.array' => 'الألوان يجب أن تكون مصفوفة',
            'colors.*.regex' => 'لون غير صحيح، يجب أن يكون بتنسيق #RRGGBB',
            
            'status.required' => 'الحالة مطلوبة',
            'status.in' => 'الحالة يجب أن تكون: نشط أو غير نشط',
            
            'stock.integer' => 'المخزون يجب أن يكون رقم صحيح',
            'stock.min' => 'المخزون لا يمكن أن يكون أقل من 0',
            
            'sku.unique' => 'رمز المنتج مستخدم بالفعل',
            
            'weight.numeric' => 'الوزن يجب أن يكون رقم',
            'weight.min' => 'الوزن لا يمكن أن يكون أقل من 0',
        ];
    }
}
