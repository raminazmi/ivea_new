import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const CreateSlide: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null as File | null,
        is_active: true as boolean,
    });

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.title.trim()) {
            alert('يرجى إدخال عنوان الشريحة');
            return;
        }
        
        post(route('admin.landing-page.slides.store'));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <AdminLayout>
            <Head title="إضافة بنر جديد" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">إضافة بنر جديد</h2>

                            <form onSubmit={handleSubmit} className="space-y-6" method="POST" encType="multipart/form-data">
                                <div>
                                    <InputLabel htmlFor="title" value="عنوان البنر" />
                                    <input
                                        id="title"
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        title="عنوان البنر"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="صورة البنر" />
                                    
                                    {/* Custom File Upload Area */}
                                    <div className="mt-1">
                                        <label
                                            htmlFor="image"
                                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">انقر لاختيار صورة</span> أو اسحب الصورة هنا
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF (أقصى 2MB)</p>
                                            </div>
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                required
                                                title="صورة البنر"
                                            />
                                        </label>
                                    </div>
                                    
                                    <InputError message={errors.image} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">
                                        يفضل استخدام صور بأبعاد 1920x1080 بكسل أو أكبر
                                    </p>

                                    {/* معاينة الصورة */}
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <div className="relative inline-block">
                                                <img
                                                    src={imagePreview}
                                                    alt="معاينة الصورة"
                                                    className="w-64 h-36 object-cover rounded-lg border border-gray-300 shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                    title="حذف الصورة"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="mt-2 text-sm text-green-600">
                                                ✓ تم اختيار الصورة بنجاح
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        title="تفعيل البنر"
                                    />
                                    <InputLabel htmlFor="is_active" value="بنر نشط" className="ms-2 cursor-pointer" />
                                </div>

                                <div className="flex items-center justify-end mt-6 gap-4">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'جاري الإنشاء...' : 'إنشاء البنر'}
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

export default CreateSlide;
