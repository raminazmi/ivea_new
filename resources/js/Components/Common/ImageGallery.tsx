import React, { useMemo } from 'react';

interface ImageGalleryProps {
    images: string[];
    selectedImage: number;
    onImageSelect: (index: number) => void;
    productName: string;
    className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = React.memo(({
    images,
    selectedImage,
    onImageSelect,
    productName,
    className = ""
}) => {
    // استخدام useMemo لتجنب إعادة حساب validImages في كل render
    const validImages = useMemo(() => {
        return images.filter(image => image && image.trim() !== '');
    }, [images]);

    // استخدام useMemo لحفظ الصورة المحددة
    const currentImage = useMemo(() => {
        return validImages[selectedImage] || validImages[0];
    }, [validImages, selectedImage]);

    if (validImages.length === 0) {
        return (
            <div className={`space-y-4 flex flex-col items-center justify-start ${className}`}>
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm w-full h-96 md:h-[500px] flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2">لا توجد صور متاحة</p>
                    </div>
                </div>
            </div>
        );
    }

    // استخدام useMemo لحفظ thumbnail images
    const thumbnailImages = useMemo(() => {
        return validImages.map((image, index) => (
            <button
                key={`${image}-${index}`}
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
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                        target.onerror = null;
                    }}
                />
            </button>
        ));
    }, [validImages, selectedImage, onImageSelect, productName]);

    return (
        <div className={`space-y-4 flex flex-col items-center justify-start ${className}`}>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <img
                    src={currentImage}
                    alt={productName}
                    className="w-full h-96 md:h-[500px] object-cover"
                    loading="eager"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                        target.onerror = null;
                    }}
                />
            </div>

            {validImages.length > 1 && (
                <div className="flex gap-3 flex-wrap justify-center">
                    {thumbnailImages}
                </div>
            )}
        </div>
    );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery; 