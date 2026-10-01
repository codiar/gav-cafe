import React from 'react';

interface GAVLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'dark' | 'light' | 'gold';
}

export const GAVLogo: React.FC<GAVLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'dark',
}) => {
  const colorMap = {
    dark: {
      primary: '#533B2C',
      secondary: '#7A5B45',
      text: '#3D2B20',
      badgeBg: '#F3EFE9',
    },
    light: {
      primary: '#FFFFFF',
      secondary: '#E6D7C8',
      text: '#FFFFFF',
      badgeBg: 'rgba(255,255,255,0.12)',
    },
    gold: {
      primary: '#8A5D3B',
      secondary: '#A87954',
      text: '#4A3222',
      badgeBg: '#FAF5EE',
    },
  };

  const colors = colorMap[variant];

  const sizeDimensions = {
    sm: { icon: 34, textScale: 'text-sm', subScale: 'text-[9px]' },
    md: { icon: 46, textScale: 'text-lg', subScale: 'text-[10px]' },
    lg: { icon: 60, textScale: 'text-2xl', subScale: 'text-xs' },
    xl: { icon: 84, textScale: 'text-3xl', subScale: 'text-sm' },
  };

  const currentSize = sizeDimensions[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Rhombus Logo Mark with Coffee Steam */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 hover:scale-105"
        style={{
          width: currentSize.icon,
          height: currentSize.icon,
          backgroundColor: colors.badgeBg,
          boxShadow: '0 2px 8px rgba(83, 59, 44, 0.08)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-4/5 h-4/5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer geometric diamond G */}
          <path
            d="M 50 14 L 84 50 L 50 86 L 16 50 L 50 14"
            stroke={colors.primary}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner G hook */}
          <path
            d="M 50 50 L 76 50"
            stroke={colors.primary}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Rising coffee steam plume */}
          <path
            d="M 50 38 Q 47 30 52 24 Q 57 18 50 12"
            stroke={colors.secondary}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Typography brand lockup */}
      <div className="flex flex-col text-right leading-none">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-wider ${currentSize.textScale}`}
            style={{ color: colors.text }}
          >
            GAV
          </span>
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded text-[#8A5D3B] bg-[#EFE7DE]/70"
          >
            كافيه
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-medium tracking-widest uppercase mt-0.5 text-[#8A715E] ${currentSize.subScale}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Coffee House
          </span>
        )}
      </div>
    </div>
  );
};
