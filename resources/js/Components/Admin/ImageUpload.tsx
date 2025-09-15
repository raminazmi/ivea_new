import React, { useState, useRef } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    onMainImageChange?: (image: string) => void;
    mainImage?: string;
    error?: string;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    images,
    onImagesChange,
    onMainImageChange,
    mainImage,
    error,
    label = "صور المنتج"
}) => {
    const [uploading, setUploading] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('images[]', files[i]);
        }

        try {
            const response = await fetch(route('admin.upload.images'), {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                const newImages = result.images.map((img: any) => img.url);
                const updatedImages = [...images, ...newImages];
                onImagesChange(updatedImages);
                if (!mainImage && newImages.length > 0 && onMainImageChange) {
                    onMainImageChange(newImages[0]);
                }
            } else {
                alert('فشل في رفع الصور: ' + result.message);
            }
        } catch (error) {
            alert('حدث خطأ أثناء رفع الصور');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const addImageUrl = () => {
        if (newImageUrl.trim()) {
            const updatedImages = [...images, newImageUrl.trim()];
            onImagesChange(updatedImages);
            if (!mainImage && onMainImageChange) {
                onMainImageChange(newImageUrl.trim());
            }
            setNewImageUrl('');
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
        if (mainImage === images[index] && onMainImageChange) {
            if (updatedImages.length > 0) {
                onMainImageChange(updatedImages[0]);
            } else {
                onMainImageChange('');
            }
        }
    };

    const setMainImage = (image: string) => {
        if (onMainImageChange) {
            onMainImageChange(image);
        }
    };

    return (
        <div>
            <InputLabel value={label} />
            <div className="mt-2 space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                        title="اختر الصور"
                        aria-label="اختر الصور"
                    />
                    <div className="space-y-2">
                        <div className="text-gray-600">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="text-sm text-gray-600">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                {uploading ? 'جاري الرفع...' : 'اختر الصور'}
                            </button>
                            <span className="text-gray-500">رفع مخطط أو صورة للتصميم والمكان المطلوب</span>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF حتى 2MB
                        </p>
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image}
                                    alt={`صورة ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                    onClick={() => setMainImage(image)}
                                    title="انقر لتعيين كصورة رئيسية"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-all duration-200"
                                        title={`حذف الصورة ${index + 1}`}
                                    >
                                        ×
                                    </button>
                                </div>
                                {mainImage === image && (
                                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        رئيسية
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <InputError message={error} className="mt-2" />
        </div>
    );
};

export default ImageUpload; 