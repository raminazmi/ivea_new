import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

interface CoverSectionProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const CoverSection: React.FC<CoverSectionProps> = ({
  imageUrl = '',
  title = '',
  subtitle = '',
  description = '',
  socialLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
  },
}) => {
  return (
    <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(4, 21, 28, 0.5)' }}
        >
          <div className="w-full text-white px-4 lg:px-24 pb-8 flex justify-between items-end">
            <div className="max-w-xl">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 md:mb-2 leading-tight">{title}</h1>
              {subtitle && (
                <p className="text-xs md:text-sm lg:text-lg text-gray-200 mb-1">{subtitle}</p>
              )}
              {description && (
                <p className="text-xs md:text-sm lg:text-lg text-gray-300 leading-relaxed">{description}</p>
              )}
            </div>
            <div className="flex flex-col justify-end items-center gap-2 md:gap-3 pb-6">
              <span className="font-bold text-sm md:text-md">شارك</span>
              <div className="flex space-x-2 md:space-x-3 rtl:space-x-reverse">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaLinkedinIn className="w-3 h-3 md:w-6 md:h-6" />
                </a>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaFacebookF className="w-3 h-3 md:w-6 md:h-6" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaInstagram className="w-3 h-3 md:w-6 md:h-6" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaTwitter className="w-3 h-3 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverSection;
