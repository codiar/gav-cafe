import React from 'react';
import codiarLogo from '../assets/codiar-tech-original.jpg';

interface CodiarTechLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLink?: boolean;
}

export const CodiarTechLogo: React.FC<CodiarTechLogoProps> = ({
  className = '',
  size = 'md',
  showLink = true,
}) => {
  const sizeMap = {
    sm: 42,
    md: 54,
    lg: 72,
  };

  const logo = (
    <img
      src={codiarLogo}
      alt="شعار شركة كوديار تك"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className="w-full h-full object-cover object-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105"
    />
  );

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="block shrink-0 overflow-hidden rounded-xl shadow-md" style={{ width: sizeMap[size], height: sizeMap[size] }}>
        {logo}
      </span>
      <div className="flex flex-col text-right">
        <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
          تم تطوير الموقع من قبل
        </span>
        <span className="text-xs font-bold text-white group-hover:text-[#FF7700] transition-colors">
          شركة كوديار تك
        </span>
      </div>
    </div>
  );

  if (!showLink) return content;

  return (
    <a
      href="https://www.instagram.com/codiar_tech"
      target="_blank"
      rel="noopener noreferrer"
      title="حساب كوديار تك على إنستغرام"
      aria-label="شركة كوديار تك"
      className="group inline-flex hover:opacity-95 transition-opacity"
    >
      {content}
    </a>
  );
};
