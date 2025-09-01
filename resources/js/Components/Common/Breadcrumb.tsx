import React from 'react';
import { Link } from '@inertiajs/react';
import { HiChevronLeft } from 'react-icons/hi';

interface BreadcrumbItem {
    name: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2 sm:px-0">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <HiChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-gray-900 transition-colors text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-none"
                            title={item.name}
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium text-xs sm:text-sm" title={item.name}>
                            {item.name}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
