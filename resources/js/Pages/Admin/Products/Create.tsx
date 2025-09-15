import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ColorSwatch from '@/Components/Common/ColorSwatch';
import ImageUpload from '@/Components/Admin/ImageUpload';
import { ChromePicker } from 'react-color';
interface CreateProductProps {
    categories: {
        id: number;
        name: string;
        slug?: string;
        parent_id?: number;
    }[];
    product?: any;
    isEditing?: boolean;
}

const CreateProduct: React.FC<CreateProductProps> = ({ categories, product, isEditing = false }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        brand: product?.brand || '',
        collection: product?.collection || '',
        description: product?.description || '',
        price: product?.price?.toString() || '',
        discount: product?.discount?.toString() || '',
        image: product?.image || '',
        images: product?.images || [] as string[],
        tab: product?.tab || '',
        category_id: product?.category_id?.toString() || '',
        colors: product?.colors || [] as string[],
        stock: product?.stock?.toString() || '',
        sku: product?.sku || '',
        featured: product?.featured || false as boolean,
        features: product?.features || [] as string[],

    });

    const [newColor, setNewColor] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const [selectedColor, setSelectedColor] = useState('#FF0000');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && product) {
            put(route('admin.products.update', product.id));
        } else {
            post(route('admin.products.store'));
        }
    };

    const addColor = () => {
        if (newColor.trim()) {
            setData('colors', [...data.colors, newColor.trim()]);
            setNewColor('');
        }
    };

    const handleColorPickerChange = (color: any) => {
        setSelectedColor(color.hex);
        setNewColor(color.hex);
    };

    const addColorFromPicker = () => {
        if (selectedColor && !data.colors.includes(selectedColor)) {
            setData('colors', [...data.colors, selectedColor]);
            setNewColor('');
        }
    };

    const removeColor = (index: number) => {
        setData('colors', data.colors.filter((_: string, i: number) => i !== index));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setData('features', [...data.features, newFeature.trim()]);
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setData('features', data.features.filter((_: string, i: number) => i !== index));
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? "تعديل المنتج" : "إنشاء منتج جديد"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">
                                {isEditing ? "تعديل المنتج" : "إنشاء منتج جديد"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="اسم المنتج" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="brand" value="العلامة التجارية" />
                                        <TextInput
                                            id="brand"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.brand}
                                            onChange={(e) => setData('brand', e.target.value)}
                                        />
                                        <InputError message={errors.brand} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="collection" value="التشكيلة" />
                                        <TextInput
                                            id="collection"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.collection}
                                            onChange={(e) => setData('collection', e.target.value)}
                                        />
                                        <InputError message={errors.collection} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="sku" value="رمز المنتج (SKU)" />
                                        <TextInput
                                            id="sku"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                        />
                                        <InputError message={errors.sku} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="وصف المنتج" />
                                    <textarea
                                        title="وصف المنتج"
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <InputLabel htmlFor="price" value="السعر" />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.price} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="discount" value="نسبة الخصم (%)" />
                                        <TextInput
                                            id="discount"
                                            type="number"
                                            min="0"
                                            max="100"
                                            className="mt-1 block w-full"
                                            value={data.discount}
                                            onChange={(e) => setData('discount', e.target.value)}
                                        />
                                        <InputError message={errors.discount} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="stock" value="الكمية المتوفرة" />
                                        <TextInput
                                            id="stock"
                                            type="number"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.stock}
                                            onChange={(e) => setData('stock', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.stock} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="category_id" value="الفئة" />
                                        <select
                                            id="category_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            required
                                            title="اختر فئة المنتج"
                                        >
                                            <option value="">اختر الفئة</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tab" value="التبويب (اختياري)" />
                                        <select
                                            id="tab"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.tab}
                                            onChange={(e) => setData('tab', e.target.value)}
                                            title="اختر تبويب المنتج (اختياري)"
                                        >
                                            <option value="">بدون تصنيف</option>
                                            <option value="all">الكل</option>
                                            <option value="featured">مميز</option>
                                            <option value="new">جديد</option>
                                            <option value="bestsellers">الأكثر مبيعاً</option>
                                            <option value="offers">العروض</option>
                                        </select>
                                        <InputError message={errors.tab} className="mt-2" />
                                    </div>
                                </div>

                                <ImageUpload
                                    images={data.images}
                                    onImagesChange={(images) => setData('images', images)}
                                    onMainImageChange={(image) => setData('image', image)}
                                    mainImage={data.image}
                                    error={errors.images}
                                />

                                <div>
                                    <InputLabel value="الألوان المتوفرة" />
                                    <div className="mt-2 space-y-4">
                                        {/* Color Picker Section */}
                                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">اختيار اللون</h4>
                                            
                                            <div className="space-y-3">
                                                <div className="flex justify-center">
                                                    <ChromePicker
                                                        color={selectedColor}
                                                        onChange={handleColorPickerChange}
                                                        disableAlpha={true}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            className="w-8 h-8 rounded border border-gray-300"
                                                            style={{ backgroundColor: selectedColor } as React.CSSProperties}
                                                        ></div>
                                                        <span className="text-sm text-gray-600 font-mono">{selectedColor}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={addColorFromPicker}
                                                        className="px-4 py-2 bg-primary-yellow text-gray-900 rounded-md text-sm font-medium hover:bg-yellow-400 transition-colors"
                                                    >
                                                        إضافة اللون
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Selected Colors Display */}
                                        {data.colors.length > 0 && (
                                            <div className="border border-gray-200 rounded-lg p-4 bg-white">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                    الألوان المختارة ({data.colors.length})
                                                </h4>
                                                <div className="flex gap-3 flex-wrap">
                                                {data.colors.map((color: string, index: number) => (
                                                        <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                                                        <ColorSwatch color={color} size="md" />
                                                            <span className="text-xs text-gray-600 font-mono">{color}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeColor(index)}
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors"
                                                            title={`حذف اللون ${index + 1}`}
                                                        >
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <InputError message={errors.colors} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel value="المميزات" />
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="أضف ميزة جديدة للمنتج"
                                                className="flex-1"
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                title="أدخل ميزة جديدة"
                                            />
                                            <button
                                                type="button"
                                                onClick={addFeature}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                                    newFeature.trim() 
                                                        ? 'bg-primary-yellow text-gray-900 hover:bg-yellow-400' 
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                                disabled={!newFeature.trim()}
                                            >
                                                إضافة
                                            </button>
                                        </div>
                                        {data.features.length > 0 && (
                                            <ul className="list-disc list-inside space-y-1">
                                                {data.features.map((feature: string, index: number) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <span>{feature}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFeature(index)}
                                                            className="text-red-500 text-sm"
                                                            title={`حذف الميزة ${index + 1}`}
                                                        >
                                                            ×
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="featured"
                                        type="checkbox"
                                        className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        title="تحديد المنتج كمميز"
                                    />
                                    <InputLabel htmlFor="featured" value="منتج مميز" className="ms-2 cursor-pointer" />
                                </div>



                                <div className="flex items-center justify-end mt-6 gap-4">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {processing
                                            ? (isEditing ? 'جاري التحديث...' : 'جاري الإنشاء...')
                                            : (isEditing ? 'تحديث المنتج' : 'إنشاء المنتج')
                                        }
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateProduct;
