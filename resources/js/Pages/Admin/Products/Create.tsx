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

interface CreateProductProps {
    categories: any[];
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
        tab: product?.tab || 'all',
        category_id: product?.category_id?.toString() || '',
        colors: product?.colors || [] as string[],
        stock: product?.stock?.toString() || '',
        sku: product?.sku || '',
        featured: product?.featured || false as boolean,
        features: product?.features || [] as string[],
    });

    const [newColor, setNewColor] = useState('');
    const [newFeature, setNewFeature] = useState('');

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
                                        <InputLabel htmlFor="category_id" value="الفئة الفرعية" />
                                        <select
                                            id="category_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            required
                                            title="اختر الفئة الفرعية للمنتج"
                                        >
                                            <option value="">اختر الفئة الفرعية</option>
                                            {categories.filter(cat => !cat.parent_id).map((mainCategory) => (
                                                <optgroup key={`group-${mainCategory.id}`} label={mainCategory.name}>
                                                    {categories
                                                        .filter(sub => sub.parent_id === mainCategory.id)
                                                        .map((subCategory) => (
                                                            <option key={`sub-${subCategory.id}`} value={subCategory.id}>
                                                                {subCategory.name}
                                                            </option>
                                                        ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500">يمكن ربط المنتجات بالفئات الفرعية فقط</p>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tab" value="التبويب" />
                                        <select
                                            id="tab"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.tab}
                                            onChange={(e) => setData('tab', e.target.value)}
                                            title="اختر تبويب المنتج"
                                        >
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
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="كود اللون (مثال: #FF0000)"
                                                className="flex-1"
                                                value={newColor}
                                                onChange={(e) => setNewColor(e.target.value)}
                                                title="أدخل كود اللون"
                                            />
                                            <SecondaryButton type="button" onClick={addColor}>
                                                إضافة
                                            </SecondaryButton>
                                        </div>
                                        {data.colors.length > 0 && (
                                            <div className="flex gap-2 flex-wrap">
                                                {data.colors.map((color: string, index: number) => (
                                                    <div key={index} className="flex items-center gap-1">
                                                        <ColorSwatch color={color} size="md" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeColor(index)}
                                                            className="text-red-500 text-sm"
                                                            title={`حذف اللون ${index + 1}`}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <InputError message={errors.colors} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel value="المميزات (اختياري)" />
                                    <p className="text-sm text-gray-600 mt-1 mb-3">
                                        يمكنك إضافة مميزات للمنتج أو تركه فارغاً. إذا لم تقم بإضافة مميزات، سيتم عرض المميزات الافتراضية.
                                    </p>
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="أضف ميزة جديدة (مثال: مقاومة للحريق، عازلة للحرارة)"
                                                className="flex-1"
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                title="أدخل ميزة جديدة"
                                            />
                                            <SecondaryButton type="button" onClick={addFeature}>
                                                إضافة
                                            </SecondaryButton>
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
                                        {data.features.length === 0 && (
                                            <p className="text-sm text-gray-500 italic">
                                                لم يتم إضافة مميزات بعد. سيتم عرض المميزات الافتراضية للمنتج.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="featured"
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        title="تحديد المنتج كمميز"
                                    />
                                    <InputLabel htmlFor="featured" value="منتج مميز" className="ml-2" />
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
