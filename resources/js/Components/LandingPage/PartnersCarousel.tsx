import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

interface Partner {
    name: string;
    logo: string;
}

const partners: Partner[] = [
    { name: 'شركة أساس مكين', logo: '/images/partner/شركة-أساس-مكين.png' },
    { name: 'شركة أوسوس', logo: '/images/partner/osus_500.png' },
    { name: 'شركة زد 2', logo: '/images/partner/Z2wlW3f358eit8itwxgNsroylbFQV37DE2fvKjz4.webp' },
    { name: 'شركة 3D', logo: '/images/partner/3dbbf16f1c6b1b278d40b57eafb8eba6.jpg' },
    { name: 'شركة 2065456', logo: '/images/partner/2065456-373804325.webp' },
    { name: 'شركة 3511', logo: '/images/partner/3511b2f27f4de.jpg' },
    { name: 'شركة تنزيل', logo: '/images/partner/تنزيل.png' },
    { name: 'شركة صور 25', logo: '/images/partner/images (25).png' },
    { name: 'شركة صور 26', logo: '/images/partner/images (26).png' },
    { name: 'شركة صور 6', logo: '/images/partner/images (6).jpg' },
    { name: 'شركة صور 7', logo: '/images/partner/images (7).jpg' },
];

const PartnersCarousel: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">شركاؤنا</h2>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={24}
                    breakpoints={{
                        640: { slidesPerView: 3, spaceBetween: 28 },
                        768: { slidesPerView: 4, spaceBetween: 32 },
                        1024: { slidesPerView: 5, spaceBetween: 36 },
                        1280: { slidesPerView: 6, spaceBetween: 40 },
                    }}
                    loop
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    modules={[Autoplay]}
                >
                    {partners.map((partner, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-6 my-4 h-40 justify-center transition-all duration-300 hover:scale-105 hover:shadow-md">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-20 w-auto object-contain max-w-full max-h-24"
                                    loading="lazy"
                                    style={{ 
                                        maxWidth: '100%',
                                        maxHeight: '96px',
                                        width: 'auto',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PartnersCarousel;
