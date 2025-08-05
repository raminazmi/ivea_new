import React from 'react';
import SectionTitle from '../SectionTitle';

interface JobCardProps {
    title: string;
    description: string;
    type: 'full-time' | 'part-time' | 'contract';
    category: string;
    onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
    title,
    description,
    type,
    category,
    onApply
}) => {
    const getTypeText = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'دوام كامل';
            case 'part-time':
                return 'دوام جزئي';
            case 'contract':
                return 'عقد مؤقت';
            default:
                return 'دوام كامل';
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3 sm:mb-4">
                {/* Icon - Top Right */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <img
                        src="/images/sofa3.png"
                        alt="Sofa with lamp"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Job Type Tag - Top Left */}
                <span className="bg-primary-yellow text-primary-black text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {getTypeText(type)}
                </span>
            </div>

            {/* Middle Section - Job Title with Highlight */}
            <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-bold text-primary-black mb-2 relative">
                    <SectionTitle
                        text={title}
                        size="lg"
                        align="center"
                        className="mb-6 sm:mb-8 text-blue-600"
                    />
                </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {description}
            </p>

            {/* Apply Button */}
            <button
                onClick={onApply}
                className="w-full bg-primary-yellow hover:bg-yellow-500 text-primary-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300 text-sm sm:text-base"
            >
                التقديم الآن
            </button>
        </div>
    );
};

export default JobCard;
