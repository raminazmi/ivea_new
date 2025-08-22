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

interface EditProductProps {
    product: {
        id: number;
        name: string;
        brand: string;
        collection: string;
        description: string;
        price: number;
        discount: number;
        image: string;
        images: string[];
        rating: number;
        tab: string;
        category_id: number;
        colors: string[];
        status: string;
        stock: number;
        sku: string;
        featured: boolean;
        specifications: {
            material: string;
            installation: string;
        };
        features: string[];
        weight: number;
    };
    categories: any[];
}

const EditProduct: React.FC<EditProductProps> = ({ product, categories }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        brand: product.brand || '',
        collection: product.collection || '',
        description: product.description || '',
        price: product.price.toString(),
        discount: product.discount ? product.discount.toString() : '',
        image: product.image || '',
        images: product.images || [],
        rating: product.rating.toString(),
        tab: product.tab,
        category_id: product.category_id.toString(),
        colors: product.colors || [],
        status: product.status,
        stock: product.stock.toString(),
        sku: product.sku || '',
        featured: product.featured,
        specifications: {
            material: product.specifications?.material || '',
            installation: product.specifications?.installation || ''
        },
        features: product.features || [],
        weight: product.weight ? product.weight.toString() : '',
    });

    const [newColor, setNewColor] = useState('');
    const [newFeature, setNewFeature] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    const addColor = () => {
        if (newColor.trim()) {
            setData('colors', [...data.colors, newColor.trim()]);
            setNewColor('');
        }
    };

    const removeColor = (index: number) => {
        setData('colors', data.colors.filter((_, i) => i !== index));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setData('features', [...data.features, newFeature.trim()]);
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setData('features', data.features.filter((_, i) => i !== index));
    };

    return (
        <AdminLayout>
            <Head title="تعديل المنتج" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">تعديل المنتج</h2>
                                <SecondaryButton onClick={() => window.history.back()}>
                                    رجوع
                                </SecondaryButton>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">المعلومات الأساسية</h3>
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
                                            <InputLabel htmlFor="collection" value="المجموعة" />
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
                                            <InputLabel htmlFor="price" value="السعر (ريال)" />
                                        <TextInput
                                            id="price"
                                            type="number"
                                                min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.price} className="mt-2" />
                                    </div>

                                    <div>
                                            <InputLabel htmlFor="discount" value="الخصم (%)" />
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

                                    <div>
                                        <InputLabel htmlFor="rating" value="التقييم" />
                                        <TextInput
                                            id="rating"
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className="mt-1 block w-full"
                                            value={data.rating}
                                            onChange={(e) => setData('rating', e.target.value)}
                                        />
                                        <InputError message={errors.rating} className="mt-2" />
                                </div>

                                    <div>
                                            <InputLabel htmlFor="weight" value="الوزن (كجم)" />
                                            <TextInput
                                                id="weight"
                                                type="number"
                                                step="0.1"
                                                className="mt-1 block w-full"
                                                value={data.weight}
                                                onChange={(e) => setData('weight', e.target.value)}
                                            />
                                            <InputError message={errors.weight} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tab" value="التبويب" />
                                        <select
                                            id="tab"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.tab}
                                            onChange={(e) => setData('tab', e.target.value)}
                                                required
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

                                    <div>
                                        <InputLabel htmlFor="status" value="الحالة" />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                                required
                                            title="اختر حالة المنتج"
                                        >
                                            <option value="active">نشط</option>
                                            <option value="inactive">غير نشط</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                </div>

                                    <div className="mt-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                checked={data.featured}
                                                onChange={(e) => setData('featured', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600">منتج مميز</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="الوصف" />
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        title="أدخل وصف المنتج"
                                        aria-label="وصف المنتج"
                                        placeholder="أدخل وصف مفصل للمنتج..."
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">الصور</h3>
                                <ImageUpload
                                    images={data.images}
                                    onImagesChange={(images) => setData('images', images)}
                                        mainImage={data.image}
                                    onMainImageChange={(image) => setData('image', image)}
                                />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">الألوان</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="أضف لون جديد"
                                                value={newColor}
                                                onChange={(e) => setNewColor(e.target.value)}
                                                className="flex-1"
                                            />
                                            <PrimaryButton type="button" onClick={addColor}>
                                                إضافة
                                            </PrimaryButton>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                                {data.colors.map((color, index) => (
                                                <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                                    <ColorSwatch color={color} size="sm" />
                                                    <span className="text-sm">{color}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeColor(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">المواصفات</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="material" value="المادة" />
                                        <TextInput
                                            id="material"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.specifications.material}
                                            onChange={(e) => setData('specifications', {
                                                ...data.specifications,
                                                material: e.target.value
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="installation" value="التركيب" />
                                        <TextInput
                                            id="installation"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.specifications.installation}
                                            onChange={(e) => setData('specifications', {
                                                ...data.specifications,
                                                installation: e.target.value
                                            })}
                                        />
                                    </div>
                                    </div>
                                </div>

                                        <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">المميزات</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="أضف ميزة جديدة"
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                className="flex-1"
                                            />
                                            <PrimaryButton type="button" onClick={addFeature}>
                                                إضافة
                                            </PrimaryButton>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {data.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                                                    <span className="text-sm">{feature}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFeature(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        ×
                                                    </button>
                                        </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">معاينة المنتج</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <strong>الاسم:</strong> {data.name}
                                            </div>
                                            <div>
                                                <strong>الفئة:</strong> {categories.find(c => c.id.toString() === data.category_id)?.name}
                                            </div>
                                                <div>
                                                <strong>السعر:</strong> {data.price} ريال
                                                </div>
                                                <div>
                                                <strong>الخصم:</strong> {data.discount ? `${data.discount}%` : 'لا يوجد'}
                                                </div>
                                                <div>
                                                <strong>الكمية:</strong> {data.stock}
                                                </div>
                                                <div>
                                                <strong>الحالة:</strong> {data.status === 'active' ? 'نشط' : 'غير نشط'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <SecondaryButton type="button" onClick={() => window.history.back()}>
                                        إلغاء
                                    </SecondaryButton>
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {processing ? 'جاري الحفظ...' : 'حفظ التغييرات'}
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

export default EditProduct;
