import { InertiaLinkProps, Link, router } from '@inertiajs/react';
import { isCsrfError, handleCsrfError } from '@/Utils/csrfHelper';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    method = 'get',
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    const handleClick = (e: React.MouseEvent) => {
        if (method === 'post' || method === 'put' || method === 'patch' || method === 'delete') {
            e.preventDefault();
            router.visit(props.href as string, {
                method,
                onError: (errors) => {
                    if (isCsrfError(errors)) {
                        handleCsrfError(errors);
                    }
                }
            });
        }
    };

    return (
        <Link
            {...props}
            method={method}
            onClick={handleClick}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
