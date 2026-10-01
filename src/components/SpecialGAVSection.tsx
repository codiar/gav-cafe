import React from 'react';
import { Product } from '../types';
import { Flame, Coffee, ChevronLeft } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface SpecialGAVSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  currencyLabel?: string;
}

export const SpecialGAVSection: React.FC<SpecialGAVSectionProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  currencyLabel = 'د.ع',
}) => {
  const specialItems = products.filter((p) => p.category === 'special_gav');

  if (specialItems.length === 0) return null;

  return (
    <section id="special-gav-section" className="w-full py-16 bg-[#EDE5D8] border-t border-[#DECFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#523A2A] text-amber-200 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>ركن التحضير اليدوي والمختص</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#32231A]">
              خاص جاف — SPECIAL GAV
            </h2>
            <p className="text-xs sm:text-sm text-[#6C5847] max-w-xl leading-relaxed">
              محاصيل قهوة مختصة متجددة أسبوعياً تُحضَّر يدويًا بأدوات التقطير الأكثر دقة لتبرز
              الإيحاءات الفاكهية والزهرية الكامنة في كل حبة بن.
            </p>
          </div>

          <div className="text-xs font-bold text-[#7A6453] bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-[#D9CABE] self-start md:self-auto">
            <span>☕ إسأل باريستا وكاشير جاف عن محصول اليوم</span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {specialItems.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              currencyLabel={currencyLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
