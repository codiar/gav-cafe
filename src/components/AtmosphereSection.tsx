import React from 'react';
import { MapPin, Coffee, Flower2, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';

interface AtmosphereSectionProps {
  onOpenLocation: () => void;
}

export const AtmosphereSection: React.FC<AtmosphereSectionProps> = ({ onOpenLocation }) => {
  return (
    <section id="atmosphere-section" className="w-full py-16 sm:py-20 bg-[#F3EDE3] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DACB] text-[#694D38] text-xs font-bold">
            <Coffee className="w-3.5 h-3.5 text-[#8A5D3B]" />
            <span>تجربة وأجواء كافيه جاف</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#32231A]">
            هدوء الطبيعة ودفء القهوة المختصة
          </h2>

          <p className="text-sm sm:text-base text-[#6C5847] leading-relaxed">
            صُمم المكان ليمنحك لحظة استرخاء متجددة؛ شجرة الكرز التشكيلية البيضاء، أحواض الحصى
            الطبيعي، والإضاءة الدافئة الخافتة التي ترافق كل رشفة من قهوتك.
          </p>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Decor & Tree */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DACB] shadow-sm space-y-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE6DA] flex items-center justify-center text-[#8A5D3B]">
              <Flower2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#32231A]">شجرة الكرز البيضاء وأحواض الحصى</h3>
            <p className="text-xs sm:text-sm text-[#735F4E] leading-relaxed">
              جلسات أرضية مرتفعة مستوحاة من الطراز الياباني البسيط المزدان بأزهار الساكورا الوردية
              وحصى الأنهار الناعم لتوفير الراحة والسكينة أثناء شرب القهوة.
            </p>
          </div>

          {/* Card 2: Specialty Craft */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DACB] shadow-sm space-y-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE6DA] flex items-center justify-center text-[#8A5D3B]">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#32231A]">محاصيل قهوة مختصة فردية المصدر</h3>
            <p className="text-xs sm:text-sm text-[#735F4E] leading-relaxed">
              نختار بعناية أجود حبوب القهوة من كولومبيا وإثيوبيا والبرازيل ليتم تحضيرها بأدوات
              التقطير الكلاسيكية V60 والكيمكس والأيروبرس.
            </p>
          </div>

          {/* Card 3: Location inside Mall */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DACB] shadow-sm space-y-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE6DA] flex items-center justify-center text-[#8A5D3B]">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#32231A]">في قلب بابل مول (شارع 40)</h3>
            <p className="text-xs sm:text-sm text-[#735F4E] leading-relaxed">
              موقع حيوي وسهل الوصول في الطابق الأرضي لبابل مول، مع مواقف سيارات مريحة وأجواء
              عائلية وشبابية مرحبة.
            </p>
            <button
              onClick={onOpenLocation}
              className="text-xs font-bold text-[#8A5D3B] hover:text-[#523A2A] underline flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>عرض الخريطة وتفاصيل الوصول</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
