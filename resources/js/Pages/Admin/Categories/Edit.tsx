import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    status: string;
    sort_order: number;
    color?: string;
    parent_id?: number;
}

interface EditCategoryProps {
    category: Category;
    user: any;
    categories: Category[]; // All categories for parent selection
}

const EditCategory: React.FC<EditCategoryProps> = ({ category, user, categories = [] }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description || '',
        image: category.image || '/images/curtain.png', // Fixed default image
        status: category.status,
        color: category.color || '#3B82F6', // Default blue color
        parent_id: category.parent_id?.toString() || '' // Convert to string for select
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/categories/${category.id}`);
    };

    return (
        <AdminLayout user={user}>
            <Head title="تعديل الفئة" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">تعديل الفئة</h1>
                    <Link
                        href="/admin/categories"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                        العودة للفئات
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Type Selection */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">نوع الفئة</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${!data.parent_id
                                        ? 'border-primary-yellow bg-yellow-50 text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    onClick={() => setData('parent_id', '')}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category_type"
                                            checked={!data.parent_id}
                                            onChange={() => setData('parent_id', '')}
                                            className="w-4 h-4 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                                        />
                                        <div className="mr-3">
                                            <h4 className="font-semibold">فئة رئيسية</h4>
                                            <p className="text-sm text-gray-500">فئة أساسية تحتوي على فئات فرعية</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${data.parent_id
                                        ? 'border-primary-yellow bg-yellow-50 text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    onClick={() => setData('parent_id', categories.filter(cat => !cat.parent_id && cat.id !== category.id)[0]?.id.toString() || '')}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category_type"
                                            checked={!!data.parent_id}
                                            onChange={() => setData('parent_id', categories.filter(cat => !cat.parent_id && cat.id !== category.id)[0]?.id.toString() || '')}
                                            className="w-4 h-4 text-primary-yellow border-gray-300 focus:ring-primary-yellow"
                                        />
                                        <div className="mr-3">
                                            <h4 className="font-semibold">فئة فرعية</h4>
                                            <p className="text-sm text-gray-500">فئة تندرج تحت فئة رئيسية</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    اسم الفئة *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    placeholder={data.parent_id ? "مثال: ستائر الويفي" : "مثال: ستائر"}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {data.parent_id && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        الفئة الرئيسية *
                                    </label>
                                    <select
                                        value={data.parent_id}
                                        onChange={(e) => setData('parent_id', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                        required
                                    >
                                        <option value="">اختر الفئة الرئيسية</option>
                                        {categories.filter(cat => !cat.parent_id && cat.id !== category.id).map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.parent_id && <p className="text-red-500 text-sm mt-1">{errors.parent_id}</p>}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الحالة *
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    title="اختر الحالة"
                                >
                                    <option value="active">نشط</option>
                                    <option value="inactive">غير نشط</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                وصف الفئة
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                placeholder="وصف الفئة..."
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end space-x-4 rtl:space-x-reverse">
                            <Link
                                href="/admin/categories"
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                            >
                                إلغاء
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary-yellow text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditCategory;
