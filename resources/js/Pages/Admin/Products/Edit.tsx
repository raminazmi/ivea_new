import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ColorSwatch from '@/Components/Common/ColorSwatch';

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
            features: string[];
            material: string;
            dimensions: string;
            installation: string;
        };
        weight: number;
        dimensions: {
            width: string;
            height: string;
            depth: string;
        };
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
            features: product.specifications?.features || [],
            material: product.specifications?.material || '',
            dimensions: product.specifications?.dimensions || '',
            installation: product.specifications?.installation || ''
        },
        weight: product.weight ? product.weight.toString() : '',
        dimensions: {
            width: product.dimensions?.width || '',
            height: product.dimensions?.height || '',
            depth: product.dimensions?.depth || ''
        }
    });

    const [newImage, setNewImage] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newFeature, setNewFeature] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    const addImage = () => {
        if (newImage.trim()) {
            setData('images', [...data.images, newImage.trim()]);
            setNewImage('');
        }
    };

    const removeImage = (index: number) => {
        setData('images', data.images.filter((_, i) => i !== index));
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
            setData('specifications', {
                ...data.specifications,
                features: [...data.specifications.features, newFeature.trim()]
            });
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setData('specifications', {
            ...data.specifications,
            features: data.specifications.features.filter((_, i) => i !== index)
        });
    };

    return (
        <AdminLayout>
            <Head title="تعديل المنتج" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">تعديل المنتج: {product.name}</h2>

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
                                        title="المنتج"
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                                    <div>
                                        <InputLabel htmlFor="status" value="الحالة" />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            title="اختر حالة المنتج"
                                        >
                                            <option value="active">نشط</option>
                                            <option value="inactive">غير نشط</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel value="صور المنتج" />
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="رابط الصورة"
                                                className="flex-1"
                                                value={newImage}
                                                onChange={(e) => setNewImage(e.target.value)}
                                                title="أدخل رابط الصورة"
                                            />
                                            <SecondaryButton type="button" onClick={addImage}>
                                                إضافة
                                            </SecondaryButton>
                                        </div>
                                        {data.images.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {data.images.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={image}
                                                            alt={`صورة ${index + 1}`}
                                                            className="w-full h-20 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                            title={`حذف الصورة ${index + 1}`}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <InputError message={errors.images} className="mt-2" />
                                </div>

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
                                                {data.colors.map((color, index) => (
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
                                    <InputLabel value="المميزات" />
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-2">
                                            <TextInput
                                                type="text"
                                                placeholder="أضف ميزة جديدة"
                                                className="flex-1"
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                title="أدخل ميزة جديدة"
                                            />
                                            <SecondaryButton type="button" onClick={addFeature}>
                                                إضافة
                                            </SecondaryButton>
                                        </div>
                                        {data.specifications.features.length > 0 && (
                                            <ul className="list-disc list-inside space-y-1">
                                                {data.specifications.features.map((feature, index) => (
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

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                        <InputLabel htmlFor="dimensions" value="الأبعاد" />
                                        <TextInput
                                            id="dimensions"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.specifications.dimensions}
                                            onChange={(e) => setData('specifications', {
                                                ...data.specifications,
                                                dimensions: e.target.value
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

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="width" value="العرض" />
                                        <TextInput
                                            id="width"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.dimensions.width}
                                            onChange={(e) => setData('dimensions', {
                                                ...data.dimensions,
                                                width: e.target.value
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="height" value="الارتفاع" />
                                        <TextInput
                                            id="height"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.dimensions.height}
                                            onChange={(e) => setData('dimensions', {
                                                ...data.dimensions,
                                                height: e.target.value
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="depth" value="العمق" />
                                        <TextInput
                                            id="depth"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.dimensions.depth}
                                            onChange={(e) => setData('dimensions', {
                                                ...data.dimensions,
                                                depth: e.target.value
                                            })}
                                        />
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
                                        {processing ? 'جاري التحديث...' : 'تحديث المنتج'}
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
