import React from 'react';
import { Product } from '../types';
import { Plus, Flame, Coffee, CupSoda, Zap, Citrus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  currencyLabel?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  currencyLabel = 'د.ع',
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ar-IQ') + ' ' + currencyLabel;
  };

  const getFallbackIcon = () => {
    switch (product.category) {
      case 'coffee':
      case 'special_gav':
        return <Coffee className="w-10 h-10 text-[#8A5D3B]" />;
      case 'summer':
        return <CupSoda className="w-10 h-10 text-[#D97706]" />;
      case 'juices':
        return <Citrus className="w-10 h-10 text-[#059669]" />;
      case 'energy':
        return <Zap className="w-10 h-10 text-[#2563EB]" />;
      case 'hot_drinks':
        return <Coffee className="w-10 h-10 text-[#9333EA]" />;
      default:
        return <Coffee className="w-10 h-10 text-[#8A5D3B]" />;
    }
  };

  const handleCardClick = () => {
    onSelect(product);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If the product has customizable add-ons (milk, syrup), open details modal so customer can choose
    if (product.availableAddOns?.milkChoice || product.availableAddOns?.syrups) {
      onSelect(product);
    } else {
      onQuickAdd(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#FAF7F2] hover:bg-white rounded-2xl p-3 sm:p-4 border border-[#E9DFD1] hover:border-[#CDB9A4] shadow-[0_2px_8px_rgba(78,54,41,0.04)] hover:shadow-[0_8px_20px_rgba(78,54,41,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Top Media / Thumbnail */}
      <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-[#F0E9DF] flex items-center justify-center mb-3">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-radial from-[#F5EFE6] to-[#EBE2D5]">
            <div className="p-3 rounded-full bg-white/70 shadow-sm mb-1.5 transition-transform duration-300 group-hover:scale-110">
              {getFallbackIcon()}
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C7662]">
              GAV CAFE
            </span>
          </div>
        )}

        {/* Temperature / Category Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {product.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8A5D3B] text-white shadow-sm">
              <Flame className="w-2.5 h-2.5 text-amber-300" />
              <span>خاص جاف</span>
            </span>
          )}
          {product.isPopular && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D97706] text-white shadow-sm">
              <Coffee className="w-2.5 h-2.5 text-amber-100" />
              <span>الأكثر طلباً</span>
            </span>
          )}
        </div>

        {/* Quick View Hover Cue */}
        <div className="absolute inset-0 bg-[#2D211A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm text-[#4E3629] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>عرض التفاصيل</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="space-y-1.5 text-right flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-[#32231A] group-hover:text-[#8A5D3B] transition-colors leading-snug">
              {product.name}
            </h3>
            {product.nameEn && (
              <span className="text-[11px] font-mono text-[#9D8876] hidden sm:inline-block">
                {product.nameEn}
              </span>
            )}
          </div>

          <p className="text-xs text-[#756150] line-clamp-2 leading-relaxed mt-1 font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-3 mt-2 border-t border-[#EFE7DE] flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col text-right">
            {product.priceType === 'ask_cashier' ? (
              <span className="text-xs font-bold text-[#8A5D3B] bg-[#F1EAE0] px-2 py-0.5 rounded-md">
                إسأل الكاشير
              </span>
            ) : (
              <div className="text-base sm:text-lg font-black font-mono text-[#3A271C] flex items-baseline gap-1">
                <span>{product.price.toLocaleString()}</span>
                <span className="text-xs font-sans text-[#7C6654]">{currencyLabel}</span>
              </div>
            )}
          </div>

          {/* Add / Select Button */}
          <button
            onClick={handleAddClick}
            className="h-9 px-3 sm:px-4 rounded-xl bg-[#523A2A] hover:bg-[#3D291D] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label={`إضافة ${product.name} إلى السلة`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
