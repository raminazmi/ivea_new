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
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-4">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <HiChevronLeft className="w-4 h-4 text-gray-400" />
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-gray-900 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">
                            {item.name}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
