import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiArrowLeft, HiMail, HiPhone, HiCalendar, HiUser, HiPhotograph, HiDownload } from 'react-icons/hi';

interface ProjectSubmission {
    id: number;
    name: string;
    email: string;
    phone: string;
    product_type: string;
    description: string;
    images: string[];
    created_at: string;
}

interface SubmissionShowProps {
    submission: ProjectSubmission;
}

const SubmissionShow: React.FC<SubmissionShowProps> = ({ submission }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const downloadAllImages = () => {
        submission.images.forEach((image, index) => {
            const link = document.createElement('a');
            link.href = image;
            link.download = `project_${submission.id}_image_${index + 1}`;
            link.click();
        });
    };

    return (
        <AdminLayout>
            <Head title={`تفاصيل مشروع - ${submission.name}`} />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                        العودة للقائمة
                    </Link>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <h1 className="text-2xl font-bold text-gray-900">تفاصيل المشروع</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <HiUser className="w-5 h-5" />
                                معلومات العميل
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                                    <p className="text-gray-900">{submission.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                                    <div className="flex items-center gap-2">
                                        <HiMail className="w-4 h-4 text-gray-400" />
                                        <a href={`mailto:${submission.email}`} className="text-blue-600 hover:text-blue-800">
                                            {submission.email}
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                                    <div className="flex items-center gap-2">
                                        <HiPhone className="w-4 h-4 text-gray-400" />
                                        <a href={`tel:${submission.phone}`} className="text-blue-600 hover:text-blue-800">
                                            {submission.phone}
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإرسال</label>
                                    <div className="flex items-center gap-2">
                                        <HiCalendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-900">{formatDate(submission.created_at)}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">نوع المنتج</label>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                        {submission.product_type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">وصف المشروع</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                                        {submission.description}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <HiPhotograph className="w-5 h-5" />
                                        صور المشروع ({submission.images.length})
                                    </h3>
                                    {submission.images.length > 0 && (
                                        <button
                                            onClick={downloadAllImages}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            <HiDownload className="w-4 h-4" />
                                            تحميل جميع الصور
                                        </button>
                                    )}
                                </div>

                                {submission.images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {submission.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100"
                                                onClick={() => setSelectedImage(image)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`صورة المشروع ${index + 1}`}
                                                    className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                                                    <HiPhotograph className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <HiPhotograph className="w-12 h-12 mx-auto mb-2" />
                                        <p>لا توجد صور مرفقة</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <Link
                        href={`/admin/projects/submissions/${submission.id}/edit`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        تعديل المشروع
                    </Link>
                    <a
                        href={`mailto:${submission.email}?subject=حول مشروعك المرسل`}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        إرسال رد بالبريد
                    </a>
                    <a
                        href={`tel:${submission.phone}`}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        الاتصال بالعميل
                    </a>
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
                        <div className="relative max-w-4xl max-h-full">
                            <img
                                src={selectedImage}
                                alt="صورة المشروع"
                                className="max-w-full max-h-full object-contain"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default SubmissionShow;
