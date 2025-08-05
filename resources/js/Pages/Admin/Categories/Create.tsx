import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface CreateCategoryProps {
    user: any;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ user }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: '',
        status: 'active',
        sort_order: 0,
        color: '#F0F7FF'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/categories');
    };

    return (
        <AdminLayout user={user}>
            <Head title="إضافة فئة جديدة" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">إضافة فئة جديدة</h1>
                    <Link
                        href="/admin/categories"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                        العودة للفئات
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder="اسم الفئة"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الترتيب
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    placeholder="0"
                                />
                                {errors.sort_order && <p className="text-red-500 text-sm mt-1">{errors.sort_order}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    صورة الفئة
                                </label>
                                <input
                                    type="text"
                                    value={data.image}
                                    onChange={(e) => setData('image', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                                    placeholder="/images/category.jpg"
                                />
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>

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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                لون الفئة
                            </label>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <input
                                    type="color"
                                    value={data.color}
                                    onChange={(e) => setData('color', e.target.value)}
                                    className="w-16 h-12 border border-gray-300 rounded-lg"
                                    title="اختر لون الفئة"
                                />
                                <span className="text-sm text-gray-600">
                                    اختر لون يمثل الفئة في الواجهة
                                </span>
                            </div>
                            {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
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
                                {processing ? 'جاري الحفظ...' : 'حفظ الفئة'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateCategory;
