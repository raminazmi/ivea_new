import React, { useState } from 'react';
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
    attachments: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const submitData = new FormData();
    submitData.append('first_name', formData.first_name);
    submitData.append('last_name', formData.last_name);
    submitData.append('email', formData.email);
    submitData.append('phone_country_code', formData.phone_country_code);
    submitData.append('phone_number', formData.phone_number);
    submitData.append('subject', formData.subject);
    submitData.append('category', formData.category);
    submitData.append('message', formData.message);

    formData.attachments.forEach((file) => {
      submitData.append('attachments[]', file);
    });

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
      submitData.append('_token', token);
    }

    router.post('/contact', submitData, {
      onSuccess: () => {
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

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-black mb-2 md:mb-4">
              تواصل معنا
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="first_name" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.first_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                  اسم العائلة
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.last_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.last_name}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="email" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone_number" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                  رقم الهاتف
                </label>
                <div className="flex">
                  <select
                    name="phone_country_code"
                    value={formData.phone_country_code}
                    onChange={handleChange}
                    className="bg-primary-gray p-2.5 md:p-3 border rounded-l-none rounded-r-md focus:outline-none text-sm md:text-base"
                    dir="ltr"
                    title="اختر رمز الدولة"
                  >
                    <option value="+966">+966</option>
                    <option value="+970">+970</option>
                    <option value="+971">+971</option>
                    <option value="+20">+20</option>
                  </select>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className={`bg-primary-gray flex-1 p-2.5 md:p-3 border border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.phone_number ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.phone_number}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="subject" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                  موضوع
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                  الفئة
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                >
                  <option value="">اختر الفئة</option>
                  <option value="اقتراحات">اقتراحات</option>
                  <option value="استفسار">استفسار</option>
                  <option value="دعم فني">دعم فني</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.category}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-right text-primary-black mb-2 text-sm md:text-base">
                كيف يمكننا المساعدة؟
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`bg-primary-gray w-full p-2.5 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-sm md:text-base ${errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                required
              />
              {errors.message && (
                <p className="text-red-500 text-xs md:text-sm mt-1 text-right">{errors.message}</p>
              )}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
              <div className="mb-3 md:mb-4">
                <svg
                  className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm md:text-base">
                <label htmlFor="file-upload" className="cursor-pointer bg-white rounded-md font-medium text-primary-yellow hover:text-primary-yellow focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-yellow">
                  <span>ارفع ملف</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                </label>
                <p className="text-xs md:text-sm text-gray-500 mt-1">PNG, JPG, PDF حتى 10MB</p>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-3 md:mt-4">
                  <p className="text-xs md:text-sm text-gray-600">الملفات المرفقة:</p>
                  <ul className="text-xs md:text-sm text-gray-500 mt-1">
                    {formData.attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-yellow text-primary-black px-6 md:px-8 py-2.5 md:py-3 rounded-md font-medium hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      )}
    </section>
  );
};

export default ContactForm;
