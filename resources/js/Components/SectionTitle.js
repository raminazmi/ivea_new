import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SectionTitle = ({ text, size = '2xl', align = 'center', className = '' }) => {
    // تحديد حجم النص
    const getSizeClasses = (size) => {
        switch (size) {
            case 'sm':
                return 'text-sm md:text-base';
            case 'md':
                return 'text-base md:text-lg';
            case 'lg':
                return 'text-lg md:text-xl';
            case 'xl':
                return 'text-xl md:text-2xl';
            case '2xl':
                return 'text-2xl md:text-3xl';
            case '3xl':
                return 'text-3xl md:text-4xl';
            case '4xl':
                return 'text-4xl md:text-5xl';
            default:
                return 'text-2xl md:text-3xl';
        }
    };
    // تحديد ارتفاع الخط الأصفر حسب حجم النص
    const getLineHeight = (size) => {
        switch (size) {
            case 'sm':
                return 'h-1'; // 4px
            case 'md':
                return 'h-1.5'; // 6px
            case 'lg':
                return 'h-2'; // 8px
            case 'xl':
                return 'h-2.5'; // 10px
            case '2xl':
                return 'h-3'; // 12px
            case '3xl':
                return 'h-3'; // 12px (كما هو عليه)
            case '4xl':
                return 'h-4'; // 16px
            default:
                return 'h-3'; // 12px
        }
    };
    // تحديد عرض الخط الأصفر حسب حجم النص (أقل من w-full قليلاً)
    const getLineWidth = (size) => {
        switch (size) {
            case 'sm':
                return 'w-4/5'; // 80%
            case 'md':
                return 'w-5/6'; // 83.33%
            case 'lg':
                return 'w-11/12'; // 91.67%
            case 'xl':
                return 'w-11/12'; // 91.67%
            case '2xl':
                return 'w-full'; // 100%
            case '3xl':
                return 'w-full'; // 100% (كما هو عليه)
            case '4xl':
                return 'w-full'; // 100%
            default:
                return 'w-full'; // 100%
        }
    };
    // تحديد المسافة العلوية للخط حسب حجم النص
    const getLineTopMargin = (size) => {
        switch (size) {
            case 'sm':
                return 'mt-[8px]'; // أقل مسافة
            case 'md':
                return 'mt-[10px]';
            case 'lg':
                return 'mt-[12px]';
            case 'xl':
                return 'mt-[14px]';
            case '2xl':
                return 'mt-[16px]';
            case '3xl':
                return 'mt-[17px]'; // كما هو عليه
            case '4xl':
                return 'mt-[20px]'; // أكبر مسافة
            default:
                return 'mt-[16px]';
        }
    };
    // تحديد المحاذاة
    const getAlignClasses = (align) => {
        switch (align) {
            case 'start':
                return 'justify-start text-right';
            case 'center':
                return 'justify-center text-center';
            case 'end':
                return 'justify-end text-left';
            default:
                return 'justify-center text-center';
        }
    };
    return (_jsx("div", { className: `py-8 flex items-center ${getAlignClasses(align)} ${className}`, children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx("div", { className: `bg-primary-yellow rounded-full ${getLineHeight(size)} ${getLineTopMargin(size)} ${getLineWidth(size)}` }) }), _jsx("div", { className: `relative flex ${getAlignClasses(align)}`, children: _jsx("span", { className: `px-4 font-bold text-gray-800 ${getSizeClasses(size)}`, children: text }) })] }) }));
};
export default SectionTitle;
