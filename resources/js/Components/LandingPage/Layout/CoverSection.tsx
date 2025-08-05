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
    <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(4, 21, 28, 0.5)' }}
        >
          <div className="w-full text-white px-4 sm:px-6 lg:px-8 flex justify-between items-end">
            <div className="max-w-2xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 leading-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm md:text-base lg:text-lg text-gray-200 mb-2">{subtitle}</p>
              )}
              {description && (
                <p className="text-xs md:text-sm lg:text-base text-gray-300 leading-relaxed">{description}</p>
              )}
            </div>
            <div className="flex flex-col justify-end items-center gap-3 md:gap-4">
              <span className="font-bold text-sm md:text-base">شارك</span>
              <div className="flex space-x-3 md:space-x-4 rtl:space-x-reverse">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaTwitter className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-yellow-400"
                >
                  <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />
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
