import React, { useMemo, useState } from 'react';

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
    const [showFullGallery, setShowFullGallery] = useState(false);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

    const validImages = useMemo(() => {
        return images.filter(image => image && image.trim() !== '');
    }, [images]);

    const currentImage = useMemo(() => {
        return validImages[selectedImage] || validImages[0];
    }, [validImages, selectedImage]);

    const displayImages = useMemo(() => {
        return validImages.slice(0, 8);
    }, [validImages]);

    const remainingCount = useMemo(() => {
        return Math.max(0, validImages.length - 8);
    }, [validImages]);

    const openFullGallery = (startIndex: number) => {
        setCurrentGalleryIndex(startIndex);
        setShowFullGallery(true);
    };

    const closeFullGallery = () => {
        setShowFullGallery(false);
    };

    const nextImage = () => {
        setCurrentGalleryIndex((prev) => 
            prev === validImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentGalleryIndex((prev) => 
            prev === 0 ? validImages.length - 1 : prev - 1
        );
    };

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

    const thumbnailImages = useMemo(() => {
        return displayImages.map((image, index) => (
            <button
                key={`${image}-${index}`}
                onClick={() => onImageSelect(index)}
                title={`عرض صورة ${index + 1}`}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all relative ${selectedImage === index
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
                {/* إظهار عدد الصور المتبقية على الصورة الأخيرة */}
                {index === 7 && remainingCount > 0 && (
                    <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            openFullGallery(8);
                        }}
                    >
                        <div className="text-white text-center">
                            <div className="text-2xl font-bold">+{remainingCount}</div>
                            <div className="text-sm">صورة</div>
                        </div>
                    </div>
                )}
            </button>
        ));
    }, [displayImages, selectedImage, onImageSelect, productName, remainingCount]);

    return (
        <>
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

            {/* معرض الصور الكامل */}
            {showFullGallery && (
                <div onClick={closeFullGallery}  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="relative pt-2 w-full h-full flex items-start justify-center">
                        {/* زر الإغلاق */}
                        <button
                            onClick={closeFullGallery}
                            className="absolute top-4 right-4 text-black text-2xl z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center hover:text-white hover:bg-black/70 transition-colors"
                        >
                            ×
                        </button>

                        {/* الصورة الحالية */}
                        <img
                            src={validImages[currentGalleryIndex]}
                            alt={`${productName} ${currentGalleryIndex + 1}`}
                            className="max-w-[100%] max-h-[85%] object-contain"
                        />

                        {/* أسهم التنقل */}
                        {validImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    ›
                                </button>
                            </>
                        )}

                        {/* عداد الصور */}
                        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                            {currentGalleryIndex + 1} / {validImages.length}
                        </div>

                        {/* الصور المصغرة في الأسفل */}
                        <div onClick={(e) => e.stopPropagation()} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80%] pb-2">
                            {validImages.map((image, index) => (
                                <button
                                    key={`gallery-${image}-${index}`}
                                    onClick={() => setCurrentGalleryIndex(index)}
                                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                                        currentGalleryIndex === index
                                            ? 'border-blue-400'
                                            : 'border-gray-400 hover:border-gray-300'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${productName} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery; 