import React, { useEffect, useState } from 'react';
import { HiX, HiExclamation } from 'react-icons/hi';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: () => void;
    show: boolean;
}

const Toast: React.FC<ToastProps> = ({ 
    message, 
    type = 'warning', 
    duration = 5000, 
    onClose, 
    show 
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // انتظار انتهاء animation
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            default:
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
            case 'warning':
                return 'text-yellow-600';
            case 'info':
                return 'text-blue-600';
            default:
                return 'text-yellow-600';
        }
    };

    if (!show) return null;

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-md w-full mx-auto transform transition-all duration-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
            <div className={`border rounded-xl shadow-xl p-4 backdrop-blur-sm ${getToastStyles()}`}>
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <HiExclamation className={`w-6 h-6 ${getIconColor()}`} />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium leading-6 whitespace-pre-line">
                            {message}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(onClose, 300);
                        }}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
                        title="إغلاق"
                        aria-label="إغلاق الإشعار"
                    >
                        <HiX className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;