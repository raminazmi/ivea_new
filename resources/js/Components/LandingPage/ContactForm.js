import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { router } from '@inertiajs/react';
import Toast from '@/Components/Common/Toast';
const ContactForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_country_code: '+966',
        phone_number: '',
        subject: '',
        category: '',
        message: '',
        attachments: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({
        message: '',
        type: 'success',
        isVisible: false
    });
    const showToast = (message, type) => {
        setToast({ message, type, isVisible: true });
    };
    const hideToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFormData(prev => ({
                ...prev,
                attachments: Array.from(e.target.files || [])
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        // Create FormData for file upload
        const submitData = new FormData();
        submitData.append('first_name', formData.first_name);
        submitData.append('last_name', formData.last_name);
        submitData.append('email', formData.email);
        submitData.append('phone_country_code', formData.phone_country_code);
        submitData.append('phone_number', formData.phone_number);
        submitData.append('subject', formData.subject);
        submitData.append('category', formData.category);
        submitData.append('message', formData.message);
        // Append files
        formData.attachments.forEach((file) => {
            submitData.append('attachments[]', file);
        });
        // Add CSRF token
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            submitData.append('_token', token);
        }
        router.post('/contact', submitData, {
            onSuccess: () => {
                // Reset form on success
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_country_code: '+966',
                    phone_number: '',
                    subject: '',
                    category: '',
                    message: '',
                    attachments: []
                });
                setIsSubmitting(false);
                showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
                showToast('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
            },
            preserveScroll: true,
            forceFormData: true
        });
    };
    return (_jsxs("section", { className: "py-8 md:py-12 lg:py-16", children: [_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 md:p-8", children: [_jsxs("div", { className: "text-center mb-6 md:mb-8", children: [_jsx("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold text-primary-black mb-2 md:mb-4", children: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627" }), _jsx("p", { className: "text-gray-600 text-sm md:text-base", children: "\u0646\u062D\u0646 \u0647\u0646\u0627 \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643. \u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0631\u0633\u0627\u0644\u0629 \u0648\u0633\u0646\u0631\u062F \u0639\u0644\u064A\u0643 \u0641\u064A \u0623\u0642\u0631\u0628 \u0648\u0642\u062A \u0645\u0645\u0643\u0646." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 md:space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "first_name", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644" }), _jsx("input", { type: "text", id: "first_name", name: "first_name", value: formData.first_name, onChange: handleChange, className: `bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`, required: true }), errors.first_name && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.first_name }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "last_name", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629" }), _jsx("input", { type: "text", id: "last_name", name: "last_name", value: formData.last_name, onChange: handleChange, className: `bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`, required: true }), errors.last_name && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.last_name }))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: `bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`, required: true }), errors.email && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.email }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone_number", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), _jsxs("div", { className: "flex", children: [_jsxs("select", { name: "phone_country_code", value: formData.phone_country_code, onChange: handleChange, className: "bg-primary-gray p-2.5 md:p-3 border rounded-l-none rounded-r-md focus:outline-none text-sm md:text-base", dir: "ltr", title: "\u0627\u062E\u062A\u0631 \u0631\u0645\u0632 \u0627\u0644\u062F\u0648\u0644\u0629", children: [_jsx("option", { value: "+966", children: "+966" }), _jsx("option", { value: "+970", children: "+970" }), _jsx("option", { value: "+971", children: "+971" }), _jsx("option", { value: "+20", children: "+20" })] }), _jsx("input", { type: "tel", id: "phone_number", name: "phone_number", value: formData.phone_number, onChange: handleChange, className: `bg-primary-gray flex-1 p-2.5 md:p-3 border border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`, required: true })] }), errors.phone_number && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.phone_number }))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "subject", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0645\u0648\u0636\u0648\u0639" }), _jsx("input", { type: "text", id: "subject", name: "subject", value: formData.subject, onChange: handleChange, className: `bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.subject ? 'border-red-500' : 'border-gray-300'}`, required: true }), errors.subject && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.subject }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0627\u0644\u0641\u0626\u0629" }), _jsxs("select", { id: "category", name: "category", value: formData.category, onChange: handleChange, className: `bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.category ? 'border-red-500' : 'border-gray-300'}`, required: true, children: [_jsx("option", { value: "", children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629" }), _jsx("option", { value: "\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A", children: "\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A" }), _jsx("option", { value: "\u0627\u0633\u062A\u0641\u0633\u0627\u0631", children: "\u0627\u0633\u062A\u0641\u0633\u0627\u0631" }), _jsx("option", { value: "\u062F\u0639\u0645 \u0641\u0646\u064A", children: "\u062F\u0639\u0645 \u0641\u0646\u064A" })] }), errors.category && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.category }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-right text-primary-black mb-2 text-sm md:text-base", children: "\u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u0627 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629\u061F" }), _jsx("textarea", { id: "message", name: "message", value: formData.message, onChange: handleChange, rows: 4, className: `bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.message ? 'border-red-500' : 'border-gray-300'}`, required: true }), errors.message && (_jsx("p", { className: "text-red-500 text-xs md:text-sm mt-1 text-right", children: errors.message }))] }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center", children: [_jsx("div", { className: "mb-3 md:mb-4", children: _jsx("svg", { className: "mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", "aria-hidden": "true", children: _jsx("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsxs("div", { className: "text-sm md:text-base", children: [_jsxs("label", { htmlFor: "file-upload", className: "cursor-pointer bg-white rounded-md font-medium text-primary-yellow hover:text-primary-yellow focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-yellow", children: [_jsx("span", { children: "\u0627\u0631\u0641\u0639 \u0645\u0644\u0641" }), _jsx("input", { id: "file-upload", name: "file-upload", type: "file", className: "sr-only", multiple: true, onChange: handleFileChange })] }), _jsx("p", { className: "text-xs md:text-sm text-gray-500 mt-1", children: "PNG, JPG, PDF \u062D\u062A\u0649 10MB" })] }), formData.attachments.length > 0 && (_jsxs("div", { className: "mt-3 md:mt-4", children: [_jsx("p", { className: "text-xs md:text-sm text-gray-600", children: "\u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0642\u0629:" }), _jsx("ul", { className: "text-xs md:text-sm text-gray-500 mt-1", children: formData.attachments.map((file, index) => (_jsx("li", { children: file.name }, index))) })] }))] }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { type: "submit", disabled: isSubmitting, className: "bg-primary-yellow text-primary-black px-6 md:px-8 py-2.5 md:py-3 rounded-md font-medium hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة' }) })] })] }) }), toast.isVisible && (_jsx(Toast, { message: toast.message, type: toast.type, isVisible: toast.isVisible, onClose: hideToast }))] }));
};
export default ContactForm;
