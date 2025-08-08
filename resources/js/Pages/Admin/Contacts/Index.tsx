import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/Common/ConfirmModal';
import Toast from '@/Components/Common/Toast';
import {
    FaEye,
    FaEnvelope,
    FaEnvelopeOpen,
    FaReply,
    FaSearch,
    FaFilter,
    FaUser,
    FaPhone,
    FaCalendar,
    FaTimes,
    FaDownload,
    FaTrash
} from 'react-icons/fa';

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    category: string;
    status: 'pending' | 'read' | 'replied';
    files?: string[];
    created_at: string;
}

interface ContactsIndexProps {
    contacts: {
        data: Contact[];
        // باقي خصائص pagination إذا احتجت
    } | null | undefined;
    user?: {
        id: number;
        name: string;
        email: string;
        is_admin: boolean;
    };
}

const ContactsIndex: React.FC<ContactsIndexProps> = ({ contacts, user }) => {
    const pageUser = usePage().props.auth?.user;
    const currentUser = user || pageUser;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'success',
        isVisible: false
    });

    const contactsArray = Array.isArray(contacts?.data) ? contacts.data : [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'read':
                return 'bg-blue-100 text-blue-800';
            case 'replied':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'جديد';
            case 'read':
                return 'مقروء';
            case 'replied':
                return 'تم الرد';
            default:
                return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <FaEnvelope className="w-4 h-4" />;
            case 'read':
                return <FaEnvelopeOpen className="w-4 h-4" />;
            case 'replied':
                return <FaReply className="w-4 h-4" />;
            default:
                return <FaEnvelope className="w-4 h-4" />;
        }
    };

    const handleDeleteClick = (contact: Contact) => {
        setContactToDelete(contact);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (contactToDelete) {
            router.delete(route('admin.contacts.destroy', contactToDelete.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setContactToDelete(null);
                    setToast({
                        message: 'تم حذف الرسالة بنجاح',
                        type: 'success',
                        isVisible: true
                    });
                },
                onError: () => {
                    setToast({
                        message: 'حدث خطأ أثناء حذف الرسالة',
                        type: 'error',
                        isVisible: true
                    });
                }
            });
        }
    };

    const filteredContacts = contactsArray.filter(contact => {
        const matchesSearch =
            contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const updateStatus = (contactId: number, newStatus: string) => {
        router.put(route('admin.contacts.update-status', contactId), { status: newStatus }, {
            onSuccess: () => {
                setToast({
                    message: 'تم تحديث حالة الرسالة بنجاح',
                    type: 'success',
                    isVisible: true
                });
                router.reload();
            },
            onError: () => {
                setToast({
                    message: 'حدث خطأ أثناء تحديث حالة الرسالة',
                    type: 'error',
                    isVisible: true
                });
            }
        });
    };

    return (
        <AdminLayout title="إدارة الرسائل" user={currentUser}>
            <div className="space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة الرسائل</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            مراجعة وإدارة جميع الرسائل الواردة
                        </p>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white border border-transparent rounded-md font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                        <FaFilter className="w-4 h-4 ml-2" />
                        الفلاتر
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                                <FaEnvelope className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">رسائل جديدة</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {contactsArray.filter(contact => contact.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                                <FaEnvelopeOpen className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">مقروء</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {contactsArray.filter(contact => contact.status === 'read').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                                <FaReply className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">تم الرد</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    {contactsArray.filter(contact => contact.status === 'replied').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="البحث في الرسائل..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                                />
                            </div>

                            <div className="relative">
                                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow appearance-none bg-white"
                                    title="تصفية حسب الحالة"
                                    aria-label="تصفية حسب الحالة"
                                >
                                    <option value="all">جميع الحالات</option>
                                    <option value="pending">جديد</option>
                                    <option value="read">مقروء</option>
                                    <option value="replied">تم الرد</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            الرسائل ({filteredContacts.length})
                        </h3>
                    </div>

                    {filteredContacts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            المرسل
                                        </th>
                                        <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الموضوع
                                        </th>
                                        <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الفئة
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الحالة
                                        </th>
                                        <th className="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            التاريخ
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الإجراءات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredContacts.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-gray-50">
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-yellow rounded-full flex items-center justify-center">
                                                        <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-primary-black" />
                                                    </div>
                                                    <div className="mr-2 sm:mr-3">
                                                        <div className="text-sm font-medium text-gray-900 truncate max-w-24 sm:max-w-none">
                                                            {contact.first_name} {contact.last_name}
                                                        </div>
                                                        <div className="text-xs sm:text-sm text-gray-500 truncate max-w-24 sm:max-w-none">
                                                            {contact.email}
                                                        </div>
                                                        <div className="md:hidden text-xs text-gray-500">
                                                            {contact.subject}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-32">{contact.subject}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-32">
                                                    {contact.message.substring(0, 50)}...
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{contact.category}</span>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(contact.status)}
                                                    <span className={`mr-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                                                        {getStatusText(contact.status)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <FaCalendar className="w-4 h-4 text-gray-400 ml-1" />
                                                    {new Date(contact.created_at).toLocaleDateString('ar-SA')}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-1 sm:gap-2">
                                                    <button
                                                        onClick={() => setSelectedContact(contact)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="عرض التفاصيل"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </button>
                                                    {contact.status === 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(contact.id, 'read')}
                                                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                                                            title="تحديد كمقروء"
                                                        >
                                                            <FaEnvelopeOpen className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {contact.status !== 'replied' && (
                                                        <button
                                                            onClick={() => updateStatus(contact.id, 'replied')}
                                                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                                            title="تحديد كرد"
                                                        >
                                                            <FaReply className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteClick(contact)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                        title="حذف"
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <FaEnvelope className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد رسائل</h3>
                            <p className="text-gray-500">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'جرب تغيير معايير البحث'
                                    : 'لا توجد رسائل واردة'
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Contact Details Modal */}
                {selectedContact && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-4 sm:p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">تفاصيل الرسالة</h3>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                                        title="إغلاق"
                                    >
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الاسم</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedContact.first_name} {selectedContact.last_name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedContact.phone}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الفئة</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedContact.category}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">الموضوع</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedContact.subject}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">الرسالة</label>
                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                                </div>
                                {selectedContact.files && selectedContact.files.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الملفات المرفقة</label>
                                        <div className="mt-1 space-y-2">
                                            {selectedContact.files.map((file, index) => (
                                                <a
                                                    key={index}
                                                    href={`/storage/contact-files/${file}`}
                                                    download
                                                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    <FaDownload className="w-4 h-4 ml-2" />
                                                    {file}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setContactToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="تأكيد الحذف"
                message={`هل أنت متأكد من حذف رسالة ${contactToDelete?.first_name} ${contactToDelete?.last_name}؟ لا يمكن التراجع عن هذا الإجراء.`}
                confirmText="حذف"
                cancelText="إلغاء"
                type="danger"
            />

            {toast.isVisible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
                />
            )}
        </AdminLayout>
    );
};

export default ContactsIndex;