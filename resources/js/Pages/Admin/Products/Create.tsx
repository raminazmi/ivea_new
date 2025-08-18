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
        rating: product?.rating?.toString() || '',
        tab: product?.tab || 'all',
        category_id: product?.category_id?.toString() || '',
        colors: product?.colors || [] as string[],
        status: product?.status || 'active',
        stock: product?.stock?.toString() || '',
        sku: product?.sku || '',
        featured: product?.featured || false as boolean,
        specifications: {
            features: product?.specifications?.features || [] as string[],
            material: product?.specifications?.material || '',
            dimensions: product?.specifications?.dimensions || '',
            installation: product?.specifications?.installation || ''
        },
        weight: product?.weight?.toString() || '',
        dimensions: {
            width: product?.dimensions?.width?.toString() || '',
            height: product?.dimensions?.height?.toString() || '',
            depth: product?.dimensions?.depth?.toString() || ''
        },
        base_price: product?.base_price?.toString() || '',
        price_per_sqm: product?.price_per_sqm?.toString() || '25',
        pricing_method: product?.pricing_method || 'area_based',
        min_price: product?.min_price?.toString() || '',
        max_price: product?.max_price?.toString() || '',
        default_width: product?.default_width?.toString() || '100',
        default_height: product?.default_height?.toString() || '100',
        min_width: product?.min_width?.toString() || '50',
        max_width: product?.max_width?.toString() || '500',
        min_height: product?.min_height?.toString() || '50',
        max_height: product?.max_height?.toString() || '400'
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
            features: data.specifications.features.filter((_: string, i: number) => i !== index)
        });
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
                                                {data.specifications.features.map((feature: string, index: number) => (
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

                                {/* قسم التسعير الديناميكي */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات التسعير الديناميكي</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="base_price" value="السعر الأساسي (ريال)" />
                                            <TextInput
                                                id="base_price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                value={data.base_price}
                                                onChange={(e) => setData('base_price', e.target.value)}
                                                required
                                            />
                                            <p className="text-sm text-gray-500 mt-1">السعر للأبعاد الافتراضية</p>
                                            <InputError message={errors.base_price} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="price_per_sqm" value="السعر لكل متر مربع (ريال)" />
                                            <TextInput
                                                id="price_per_sqm"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                value={data.price_per_sqm}
                                                onChange={(e) => setData('price_per_sqm', e.target.value)}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">سعر إضافي لكل متر مربع إضافي</p>
                                            <InputError message={errors.price_per_sqm} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="min_price" value="أقل سعر (ريال)" />
                                            <TextInput
                                                id="min_price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                value={data.min_price}
                                                onChange={(e) => setData('min_price', e.target.value)}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">الحد الأدنى للسعر</p>
                                            <InputError message={errors.min_price} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="max_price" value="أقصى سعر (ريال)" />
                                            <TextInput
                                                id="max_price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                value={data.max_price}
                                                onChange={(e) => setData('max_price', e.target.value)}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">الحد الأقصى للسعر</p>
                                            <InputError message={errors.max_price} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="pricing_method" value="طريقة التسعير" />
                                            <select
                                                id="pricing_method"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.pricing_method}
                                                onChange={(e) => setData('pricing_method', e.target.value)}
                                            >
                                                <option value="fixed">ثابت</option>
                                                <option value="area_based">حسب المساحة</option>
                                                <option value="size_based">حسب الحجم</option>
                                                <option value="custom">مخصص</option>
                                            </select>
                                            <InputError message={errors.pricing_method} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات الأبعاد</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h4 className="text-md font-medium text-gray-700">الأبعاد الافتراضية</h4>
                                            <div>
                                                <InputLabel htmlFor="default_width" value="العرض الافتراضي (سم)" />
                                                <TextInput
                                                    id="default_width"
                                                    type="number"
                                                    min="50"
                                                    max="500"
                                                    className="mt-1 block w-full"
                                                    value={data.default_width}
                                                    onChange={(e) => setData('default_width', e.target.value)}
                                                />
                                                <p className="text-sm text-gray-500 mt-1">العرض الذي يظهر في البداية للعملاء</p>
                                                <InputError message={errors.default_width} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="default_height" value="الارتفاع الافتراضي (سم)" />
                                                <TextInput
                                                    id="default_height"
                                                    type="number"
                                                    min="50"
                                                    max="400"
                                                    className="mt-1 block w-full"
                                                    value={data.default_height}
                                                    onChange={(e) => setData('default_height', e.target.value)}
                                                />
                                                <p className="text-sm text-gray-500 mt-1">الارتفاع الذي يظهر في البداية للعملاء</p>
                                                <InputError message={errors.default_height} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-md font-medium text-gray-700">الحدود المسموحة</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <InputLabel htmlFor="min_width" value="أقل عرض (سم)" />
                                                    <TextInput
                                                        id="min_width"
                                                        type="number"
                                                        min="10"
                                                        className="mt-1 block w-full"
                                                        value={data.min_width}
                                                        onChange={(e) => setData('min_width', e.target.value)}
                                                    />
                                                    <InputError message={errors.min_width} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="max_width" value="أقصى عرض (سم)" />
                                                    <TextInput
                                                        id="max_width"
                                                        type="number"
                                                        min="50"
                                                        className="mt-1 block w-full"
                                                        value={data.max_width}
                                                        onChange={(e) => setData('max_width', e.target.value)}
                                                    />
                                                    <InputError message={errors.max_width} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="min_height" value="أقل ارتفاع (سم)" />
                                                    <TextInput
                                                        id="min_height"
                                                        type="number"
                                                        min="10"
                                                        className="mt-1 block w-full"
                                                        value={data.min_height}
                                                        onChange={(e) => setData('min_height', e.target.value)}
                                                    />
                                                    <InputError message={errors.min_height} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="max_height" value="أقصى ارتفاع (سم)" />
                                                    <TextInput
                                                        id="max_height"
                                                        type="number"
                                                        min="50"
                                                        className="mt-1 block w-full"
                                                        value={data.max_height}
                                                        onChange={(e) => setData('max_height', e.target.value)}
                                                    />
                                                    <InputError message={errors.max_height} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h4 className="font-medium text-blue-800 mb-2">معاينة التسعير</h4>
                                        <div className="text-sm text-blue-700">
                                            <p>السعر الأساسي للأبعاد ({data.default_width}×{data.default_height} سم): <span className="font-bold">{data.base_price || '0'} ريال</span></p>
                                            <p>المساحة الأساسية: <span className="font-bold">{((parseInt(data.default_width) || 100) * (parseInt(data.default_height) || 100) / 10000).toFixed(2)} م²</span></p>
                                            {data.price_per_sqm && (
                                                <p>السعر الإضافي: <span className="font-bold">{data.price_per_sqm} ريال/م²</span></p>
                                            )}
                                        </div>
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
