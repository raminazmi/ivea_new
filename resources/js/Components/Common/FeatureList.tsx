import React from 'react';
import { HiCheck } from 'react-icons/hi';

interface FeatureListProps {
    features: string[];
    title?: string;
    className?: string;
}

const FeatureList: React.FC<FeatureListProps> = ({
    features,
    title = "المميزات والفوائد:",
    className = ""
}) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {title && (
                <div className="text-sm font-medium text-gray-900">{title}</div>
            )}
            <ul className="space-y-2 grid grid-cols-2 gap-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                        <HiCheck className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatureList; 