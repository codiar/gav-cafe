import React from 'react';
import { GAVLogo } from './GAVLogo';
import { ShoppingBag, Search, MapPin, Receipt, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLocation: () => void;
  onOpenInvoiceHistory: () => void;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenLocation,
  onOpenInvoiceHistory,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5D3B] rounded-lg"
            aria-label="الرئيسية - گاف كافيه"
          >
            <GAVLogo size="md" variant="gold" />
          </a>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C4535]">
          <button
            onClick={() => handleNavClick('menu-section')}
            className="hover:text-[#8A5D3B] transition-colors py-1 cursor-pointer"
          >
            المنيو الرقمي
          </button>
          <button
            onClick={() => handleNavClick('special-gav-section')}
            className="hover:text-[#8A5D3B] transition-colors py-1 cursor-pointer flex items-center gap-1.5"
          >
            <span>خاص جاف</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5D3B]"></span>
          </button>
          <button
            onClick={() => handleNavClick('atmosphere-section')}
            className="hover:text-[#8A5D3B] transition-colors py-1 cursor-pointer"
          >
            أجواء المكان
          </button>
          <button
            onClick={onOpenLocation}
            className="hover:text-[#8A5D3B] transition-colors py-1 cursor-pointer flex items-center gap-1"
          >
            <MapPin className="w-4 h-4 text-[#8A5D3B]" />
            <span>الموقع والمواعيد</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#5C4535] hover:text-[#2C241D] hover:bg-[#EFE7DE] transition-colors cursor-pointer"
            aria-label="بحث في المنيو"
            title="بحث في المنيو"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Location button for mobile/quick access */}
          <button
            onClick={onOpenLocation}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold py-2 px-3 rounded-full text-[#6B4E3D] bg-[#F1EAE0] hover:bg-[#E7DDCF] transition-colors cursor-pointer"
            title="موقع الكافيه على الخريطة"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>بابل مول</span>
          </button>

          {/* Cashier Invoice quick lookup */}
          <button
            onClick={onOpenInvoiceHistory}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#5C4535] hover:text-[#2C241D] hover:bg-[#EFE7DE] transition-colors cursor-pointer relative"
            aria-label="فاتورة الكاشير"
            title="عرض فاتورة الطلب للكاشير"
          >
            <Receipt className="w-5 h-5" />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="h-10 px-3.5 sm:px-4 rounded-full bg-[#533B2C] text-[#FAF6F0] hover:bg-[#432F23] flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label={`سلة الطلبات (${cartCount} منتجات)`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D97706] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold hidden sm:inline">السلة</span>
            {cartCount > 0 && (
              <span className="text-xs font-mono font-bold bg-[#3E2C20] px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#5C4535] hover:bg-[#EFE7DE] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-[#E8DEC8] px-5 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2 text-sm font-semibold text-[#5C4535]">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-right py-2 px-3 rounded-lg hover:bg-[#EFE7DE] transition-colors"
            >
              الرئيسية
            </button>
            <button
              onClick={() => handleNavClick('menu-section')}
              className="text-right py-2 px-3 rounded-lg hover:bg-[#EFE7DE] transition-colors flex items-center justify-between"
            >
              <span>المنيو الرقمي بالكامل</span>
              <span className="text-xs text-[#8A5D3B] font-normal">٤٤ صنف</span>
            </button>
            <button
              onClick={() => handleNavClick('special-gav-section')}
              className="text-right py-2 px-3 rounded-lg hover:bg-[#EFE7DE] transition-colors flex items-center justify-between"
            >
              <span>مشروبات خاص جاف (SPECIAL GAV)</span>
              <span className="text-[10px] bg-[#8A5D3B] text-white px-2 py-0.5 rounded-full">مختص</span>
            </button>
            <button
              onClick={() => handleNavClick('atmosphere-section')}
              className="text-right py-2 px-3 rounded-lg hover:bg-[#EFE7DE] transition-colors"
            >
              عن كافيه جاف وديكور المكان
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocation();
              }}
              className="text-right py-2 px-3 rounded-lg hover:bg-[#EFE7DE] transition-colors flex items-center gap-2 text-[#8A5D3B]"
            >
              <MapPin className="w-4 h-4" />
              <span>موقع الكافيه (بابل مول) وساعات العمل</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8DEC8]/80 flex items-center justify-between text-xs text-[#7A6453]">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#8A5D3B]" />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:underline font-mono">
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <span>{BUSINESS_INFO.openingHoursText}</span>
          </div>
        </div>
      )}
    </header>
  );
};
