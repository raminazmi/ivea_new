import React from 'react';

interface ImageGalleryProps {
    images: string[];
    selectedImage: number;
    onImageSelect: (index: number) => void;
    productName: string;
    className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    selectedImage,
    onImageSelect,
    productName,
    className = ""
}) => {
    return (
        <div className={`space-y-4 flex flex-col items-center justify-start ${className}`}>
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-96 md:h-[500px] object-cover"
                />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => onImageSelect(index)}
                        title={`عرض صورة ${index + 1}`}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                            ? 'border-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`${productName} ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery; 