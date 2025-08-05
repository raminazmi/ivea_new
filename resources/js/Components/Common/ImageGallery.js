import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ImageGallery = ({ images, selectedImage, onImageSelect, productName, className = "" }) => {
    return (_jsxs("div", { className: `space-y-4 flex flex-col items-center justify-start ${className}`, children: [_jsx("div", { className: "bg-gray-100 rounded-lg overflow-hidden shadow-sm", children: _jsx("img", { src: images[selectedImage], alt: productName, className: "w-full h-96 md:h-[500px] object-cover" }) }), _jsx("div", { className: "flex gap-3", children: images.map((image, index) => (_jsx("button", { onClick: () => onImageSelect(index), title: `عرض صورة ${index + 1}`, className: `w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-300'}`, children: _jsx("img", { src: image, alt: `${productName} ${index + 1}`, className: "w-full h-full object-cover" }) }, index))) })] }));
};
export default ImageGallery;
