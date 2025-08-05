import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
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
    FaDownload
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
    contacts: Contact[] | null | undefined;
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

    const contactsArray = Array.isArray(contacts) ? contacts : [];

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
    };

    return (
        <AdminLayout title="إدارة الرسائل" user={currentUser}>
            <div className="space-y-6">
                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                        <p>Debug: Contacts count: {contactsArray.length}</p>
                        <p>Original contacts type: {typeof contacts}</p>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">إدارة الرسائل</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            مراجعة وإدارة جميع الرسائل الواردة
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <FaEnvelope className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">رسائل جديدة</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {contactsArray.filter(contact => contact.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FaEnvelopeOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">مقروء</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {contactsArray.filter(contact => contact.status === 'read').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-full">
                                <FaReply className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">تم الرد</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {contactsArray.filter(contact => contact.status === 'replied').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                            >
                                <option value="all">جميع الحالات</option>
                                <option value="pending">جديد</option>
                                <option value="read">مقروء</option>
                                <option value="replied">تم الرد</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            الرسائل ({filteredContacts.length})
                        </h3>
                    </div>

                    {filteredContacts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            المرسل
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الموضوع
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الفئة
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الحالة
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            التاريخ
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            الإجراءات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredContacts.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center">
                                                        <FaUser className="w-5 h-5 text-primary-black" />
                                                    </div>
                                                    <div className="mr-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {contact.first_name} {contact.last_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {contact.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{contact.subject}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {contact.message.substring(0, 50)}...
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{contact.category}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(contact.status)}
                                                    <span className={`mr-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                                                        {getStatusText(contact.status)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <FaCalendar className="w-4 h-4 text-gray-400 ml-1" />
                                                    {new Date(contact.created_at).toLocaleDateString('ar-SA')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                    <button
                                                        onClick={() => setSelectedContact(contact)}
                                                        className="text-blue-600 hover:text-blue-900 p-1"
                                                        title="عرض التفاصيل"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </button>
                                                    {contact.status === 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(contact.id, 'read')}
                                                            className="text-yellow-600 hover:text-yellow-900 p-1"
                                                            title="تحديد كمقروء"
                                                        >
                                                            <FaEnvelopeOpen className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {contact.status !== 'replied' && (
                                                        <button
                                                            onClick={() => updateStatus(contact.id, 'replied')}
                                                            className="text-green-600 hover:text-green-900 p-1"
                                                            title="تحديد كرد"
                                                        >
                                                            <FaReply className="w-4 h-4" />
                                                        </button>
                                                    )}
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

                {selectedContact && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">تفاصيل الرسالة</h3>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                        title="إغلاق"
                                    >
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
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
        </AdminLayout>
    );
};

export default ContactsIndex; 