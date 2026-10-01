import React from 'react';
import { Home, Coffee, Search, ShoppingBag, MapPin, Receipt } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLocation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenLocation,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E5DACB] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe">
      <div className="grid grid-cols-5 items-center h-15 max-w-md mx-auto px-2">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('hero')}
          className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
            activeTab === 'hero' ? 'text-[#8A5D3B]' : 'text-[#7A6453] hover:text-[#32231A]'
          }`}
          aria-label="الرئيسية"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">الرئيسية</span>
        </button>

        {/* Tab 2: Menu */}
        <button
          onClick={() => onTabChange('menu-section')}
          className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
            activeTab === 'menu-section' ? 'text-[#8A5D3B]' : 'text-[#7A6453] hover:text-[#32231A]'
          }`}
          aria-label="المنيو"
        >
          <Coffee className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">المنيو</span>
        </button>

        {/* Tab 3: Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center h-full text-[#7A6453] hover:text-[#32231A] transition-colors cursor-pointer"
          aria-label="بحث"
        >
          <Search className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">البحث</span>
        </button>

        {/* Tab 4: Cart (with Badge) */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center h-full text-[#7A6453] hover:text-[#32231A] transition-colors cursor-pointer"
          aria-label={`السلة (${cartCount})`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#D97706] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1">السلة</span>
        </button>

        {/* Tab 5: Location */}
        <button
          onClick={onOpenLocation}
          className="flex flex-col items-center justify-center h-full text-[#7A6453] hover:text-[#32231A] transition-colors cursor-pointer"
          aria-label="الموقع"
        >
          <MapPin className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">الموقع</span>
        </button>
      </div>
    </div>
  );
};
