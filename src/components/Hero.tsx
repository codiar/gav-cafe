import React from 'react';
import { Clock, MapPin, Coffee, ArrowDown, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';
import { GAVLogo } from './GAVLogo';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenLocation: () => void;
  onOpenCashierInvoice: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenLocation,
  onOpenCashierInvoice,
}) => {
  // Check if cafe is currently open (10:00 AM to 12:00 AM midnight)
  const isCurrentlyOpen = React.useMemo(() => {
    try {
      const now = new Date();
      const hours = now.getHours();
      // Open between 10:00 (10 AM) and 24:00 (12 AM midnight)
      return hours >= 10 && hours < 24;
    } catch {
      return true;
    }
  }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#2D211A] text-white">
      {/* Background Image with Warm Ambient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUSINESS_INFO.heroImage}
          alt="ديكور وأجواء كافيه جاف بابل مول"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient scrim for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#201610] via-[#201610]/75 to-[#201610]/50" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-[#201610]/40 to-[#170E08]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Top Trust & Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isCurrentlyOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="font-semibold text-white/95">
              {isCurrentlyOpen ? 'مفتوح الآن نرحب بكم' : 'يفتح الساعة 10:00 صباحاً'}
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80 font-mono text-[11px]">{BUSINESS_INFO.openingHoursText}</span>
          </div>

          <button
            onClick={onOpenLocation}
            className="inline-flex items-center gap-1.5 text-xs text-amber-200/90 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/20 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>بابل، شارع 40، بابل مول (الطابق الأرضي)</span>
          </button>
        </div>

        {/* Hero Central Content */}
        <div className="max-w-3xl space-y-6 text-right">
          {/* Main Visual Title Lockup inspired by the GAV Opening Poster */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono tracking-widest text-xs uppercase font-semibold">
                GAV COFFEE HOUSE · BABEL
              </span>
              <div className="h-px w-12 bg-amber-400/40" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              خذ المذاق الأصلي <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#E6B87D] via-[#F8DFC2] to-[#FFFFFF]">
                مع كل رشفة
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#E3D4C4] leading-relaxed max-w-2xl font-normal pt-1">
              تجربة قهوة مختصة فريدة في قلب بابل مول. استمتع بأجواء مريحة وعصرية مع أجود محاصيل
              القهوة المقطرة، اللاتيه المميز، ومشروبات الصيف المنعشة.
            </p>
          </div>

          {/* Opening Hours & Timing Box matching poster */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-xl">
            <div className="space-y-1">
              <span className="text-[11px] text-[#C4B2A1] block">من الساعة</span>
              <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-baseline gap-1">
                10:00 <span className="text-xs font-sans text-amber-400">AM</span>
              </div>
            </div>

            <div className="space-y-1 border-r border-white/10 pr-3">
              <span className="text-[11px] text-[#C4B2A1] block">إلى الساعة</span>
              <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-baseline gap-1">
                12:00 <span className="text-xs font-sans text-amber-400">AM</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-1 border-t sm:border-t-0 sm:border-r border-white/10 pt-2 sm:pt-0 sm:pr-3">
              <span className="text-[11px] text-[#C4B2A1] block">طريقة الطلب</span>
              <div className="text-xs font-bold text-amber-200">
                فاتورة مباشرة للكاشير أو عبر واتساب
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreMenu}
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#C28C58] to-[#A26D3C] hover:from-[#B5804D] hover:to-[#925F31] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#A26D3C]/30 hover:shadow-xl transition-all cursor-pointer active:scale-98"
            >
              <Coffee className="w-4 h-4" />
              <span>استعرض المنيو الرقمي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCashierInvoice}
              className="h-12 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/15 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>إصدار فاتورة للكاشير</span>
            </button>

            <button
              onClick={onOpenLocation}
              className="h-12 px-4 rounded-xl text-amber-300 hover:text-white hover:bg-white/5 font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>موقعنا في بابل مول</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
