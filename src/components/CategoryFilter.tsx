import React from 'react';
import { CATEGORIES, CategoryDef } from '../data/projectData';
import {
  Coffee,
  Flame,
  SunMedium,
  Citrus,
  Zap,
  CupSoda,
  PlusCircle,
  LayoutGrid,
} from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'SunMedium':
        return <SunMedium className="w-4 h-4" />;
      case 'Citrus':
        return <Citrus className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'CupSoda':
        return <CupSoda className="w-4 h-4" />;
      case 'PlusCircle':
        return <PlusCircle className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full bg-[#F8F5F0] sticky top-18 z-30 py-3 border-b border-[#E8DEC8]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {CATEGORIES.map((cat: CategoryDef) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 select-none ${
                  isActive
                    ? 'bg-[#4E3629] text-white shadow-md shadow-[#4E3629]/20 scale-[1.02]'
                    : 'bg-[#EDE4D8] text-[#5C4535] hover:bg-[#E2D5C3] hover:text-[#2C241D]'
                }`}
                aria-pressed={isActive}
              >
                <span className={isActive ? 'text-amber-300' : 'text-[#8A5D3B]'}>
                  {getIcon(cat.iconName)}
                </span>
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#3A261B] text-amber-200' : 'bg-[#DDD1C0] text-[#695140]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
