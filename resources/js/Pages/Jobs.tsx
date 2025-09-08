import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import JobCard from '@/Components/Jobs/JobCard';
import JobCardSkeleton from '@/Components/Jobs/JobCardSkeleton';
import CategoryTabs from '@/Components/Jobs/CategoryTabs';
import Toast from '@/Components/Common/Toast';
import ContactUs from '@/Components/LandingPage/ContactUs';

interface Job {
  id: number;
  title: string;
  description: string;
  type: 'full-time' | 'part-time' | 'contract';
  category: string;
  location?: string;
  salary_range?: string;
  status: 'active' | 'inactive' | 'closed';
  created_at: string;
  updated_at: string;
}

interface JobsProps {
  jobs: Job[];
  categories: string[];
}

const Jobs: React.FC<JobsProps> = ({ jobs, categories }) => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const allCategories = ['الكل', ...categories];
  const filteredJobs = activeCategory === 'الكل'
    ? jobs
    : jobs.filter(job => job.category === activeCategory);

  const pageSize = 8;
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApply = (jobId: number) => {
    router.visit(route('jobs.apply.form', { id: jobId }), {
      onSuccess: () => {
        setToast({
          isVisible: true,
          message: 'تم فتح صفحة التقديم بنجاح',
          type: 'success',
        });
      },
      onError: () => {
        setToast({
          isVisible: true,
          message: 'حدث خطأ أثناء فتح صفحة التقديم',
          type: 'error',
        });
      },
    });
  };

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <CoverSection
        imageUrl="/images/pepole.png"
        title="اعمل معنا:"
        subtitle="نقدم لكم الدعم ونضع معاً خطة تنفيذ لتحقيق النجاح، لأن شراكتنا طريق للتميز"
        description=""
        socialLinks={{
          instagram: 'https://www.instagram.com/ivea.sa',
          snapchat: 'https://www.snapchat.com/add/ivea_sa?share_id=ws9Bef6xzOc&locale=ar-AE',
          tiktok: 'https://www.tiktok.com/@ivea_sa',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10">
        <Breadcrumb
          items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'التوظيف' }
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <CategoryTabs
          categories={allCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
          ) : paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                description={job.description}
                type={job.type}
                category={job.category}
                onApply={() => handleApply(job.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 md:py-12">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 md:h-16 md:w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">لا توجد وظائف متاحة</h3>
                <p className="text-sm md:text-base text-gray-500">لا توجد وظائف متاحة في هذه الفئة حالياً</p>
              </div>
            </div>
          )}
        </div>
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse mt-8 md:mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md transition-colors text-sm md:text-base ${currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-primary-yellow'
                }`}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-2 rounded-md text-sm md:text-base ${currentPage === i + 1
                  ? 'bg-primary-yellow text-gray-900 font-bold'
                  : 'text-gray-600 hover:bg-yellow-100'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md transition-colors text-sm md:text-base ${currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-primary-yellow'
                }`}
            >
              ›
            </button>
          </div>
        )}
        {toast.isVisible && (
          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
          />
        )}
      </div>
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <ContactUs />
      </div>
    </AppLayout>
  );
};

export default Jobs;
