// src/Components/PromoBoxes.tsx
import React from 'react';

const PromoBoxes: React.FC = () => {
    const boxes = [
        {
            title: 'عرض اليوم',
            bgColor: 'bg-primary-yellow'
        },
        {
            title: 'استعد فصل الصيف',
            bgColor: 'bg-light-blue'
        },
        {
            title: 'تضميمنا الجديدة',
            bgColor: 'bg-peach'
        },
        {
            title: 'قائمة الشاريع',
            bgColor: 'bg-primary-yellow'
        },
    ];

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {boxes.map((box, index) => (
                        <div
                            key={index}
                            className={`${box.bgColor} rounded-xl p-4 sm:p-6 md:p-8 text-center h-32 sm:h-36 md:h-40 flex items-center justify-center`}
                        >
                            <h3 className="text-lg sm:text-xl font-bold text-primary-black">{box.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoBoxes;