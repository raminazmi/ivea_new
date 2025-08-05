import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AppLayout from '@/Components/LandingPage/Layout/AppLayout';
import CoverSection from '@/Components/LandingPage/Layout/CoverSection';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import JobCard from '@/Components/Jobs/JobCard';
import CategoryTabs from '@/Components/Jobs/CategoryTabs';
const Jobs = ({ jobs, categories }) => {
    const [activeCategory, setActiveCategory] = useState('الكل');
    const [currentPage, setCurrentPage] = useState(1);
    const allCategories = ['الكل', ...categories];
    const filteredJobs = activeCategory === 'الكل'
        ? jobs
        : jobs.filter(job => job.category === activeCategory);
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleApply = (jobId) => {
        console.log('التقديم على الوظيفة:', jobId);
    };
    return (_jsxs(AppLayout, { children: [_jsx(CoverSection, { imageUrl: "/images/cv_cover.png", title: "\u0627\u0639\u0645\u0644 \u0645\u0639\u0646\u0627:", subtitle: "\u0646\u0642\u062F\u0645 \u0644\u0643\u0645 \u0627\u0644\u062F\u0639\u0645 \u0648\u0646\u0636\u0639 \u0645\u0639\u0627\u064B \u062E\u0637\u0629 \u062A\u0646\u0641\u064A\u0630 \u0644\u062A\u062D\u0642\u064A\u0642 \u0627\u0644\u0646\u062C\u0627\u062D\u060C \u0644\u0623\u0646 \u0634\u0631\u0627\u0643\u062A\u0646\u0627 \u0637\u0631\u064A\u0642 \u0644\u0644\u062A\u0645\u064A\u0632", description: "", socialLinks: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com',
                } }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10", children: _jsx(Breadcrumb, { items: [
                        { name: 'الرئيسية', href: '/' },
                        { name: 'التوظيف' }
                    ] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12", children: [_jsx(CategoryTabs, { categories: allCategories, activeCategory: activeCategory, onCategoryChange: handleCategoryChange }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12", children: filteredJobs.length > 0 ? (filteredJobs.map((job) => (_jsx(JobCard, { title: job.title, description: job.description, type: job.type, category: job.category, onApply: () => handleApply(job.id) }, job.id)))) : (_jsx("div", { className: "col-span-full text-center py-8 md:py-12", children: _jsxs("div", { className: "text-gray-500", children: [_jsx("svg", { className: "mx-auto h-12 w-12 md:h-16 md:w-16 mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" }) }), _jsx("h3", { className: "text-lg md:text-xl font-medium text-gray-900 mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u0638\u0627\u0626\u0641 \u0645\u062A\u0627\u062D\u0629" }), _jsx("p", { className: "text-sm md:text-base text-gray-500", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u0638\u0627\u0626\u0641 \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629 \u062D\u0627\u0644\u064A\u0627\u064B" })] }) })) }), filteredJobs.length > 0 && (_jsxs("div", { className: "flex justify-center items-center space-x-2 rtl:space-x-reverse mt-8 md:mt-12", children: [_jsx("button", { onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 1, className: `p-2 rounded-md transition-colors text-sm md:text-base ${currentPage === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-primary-yellow'}`, children: "\u2039" }), _jsx("span", { className: "px-3 py-2 text-gray-600 text-sm md:text-base", children: "12 ... 3 2 1" }), _jsx("button", { onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === 12, className: `p-2 rounded-md transition-colors text-sm md:text-base ${currentPage === 12
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-primary-yellow'}`, children: "\u203A" })] }))] })] }));
};
export default Jobs;
