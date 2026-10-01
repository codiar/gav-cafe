import React from 'react';
import { GAVLogo } from './GAVLogo';
import { CodiarTechLogo } from './CodiarTechLogo';
import { BUSINESS_INFO } from '../data/projectData';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  ExternalLink,
  MessageCircle,
  Receipt,
  Heart,
} from 'lucide-react';

interface FooterProps {
  onOpenLocation: () => void;
  onOpenInvoice: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLocation, onOpenInvoice }) => {
  return (
    <footer className="w-full bg-[#241A13] text-[#E0D2C3] border-t border-[#3B2C21] pt-14 pb-24 md:pb-12 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <GAVLogo size="lg" variant="light" />
            <p className="text-sm text-[#BFAEA0] leading-relaxed">
              {BUSINESS_INFO.slogan}
            </p>
            <p className="text-xs text-[#9E8B7C] leading-relaxed">
              وجهتكم الأولى في بابل مول للقهوة المختصة والتحضير اليدوي الفاخر والمشروبات المنعشة في أجواء هادئة وأنيقة.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8A5D3B] text-white flex items-center justify-center transition-colors"
                aria-label="حساب جاف كافيه على إنستغرام"
                title="Instagram @gavcaffee"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8A5D3B] text-white flex items-center justify-center transition-colors"
                aria-label="حساب جاف كافيه على تيك توك"
                title="TikTok @gav.caffee"
              >
                {/* TikTok custom icon mark */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.48 2.73 1.14-.07 2.19-.77 2.67-1.79.23-.46.33-.98.33-1.5.06-4.5.02-9.01.03-13.51.01-.29.07-.58.11-.87h.03z"/>
                </svg>
              </a>

              <a
                href={`https://wa.me/964${BUSINESS_INFO.whatsapp.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="محادثة واتساب كافيه جاف"
                title="WhatsApp 07873779988"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs text-[#BAA797]">
              <li>
                <a href="#hero" className="hover:text-amber-300 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-amber-300 transition-colors">
                  المنيو الرقمي والأسعار
                </a>
              </li>
              <li>
                <a href="#special-gav-section" className="hover:text-amber-300 transition-colors">
                  مشروبات خاص جاف (SPECIAL GAV)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenInvoice}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>إصدار فاتورة الكاشير</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLocation}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>خريطة الوصول (Google Maps)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timing */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>أوقات العمل</span>
            </h4>
            <div className="space-y-2 text-xs text-[#BAA797]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-[#A69383] block">يومياً من السبت إلى الجمعة:</span>
                <span className="font-mono text-base font-bold text-amber-200 block">
                  {BUSINESS_INFO.openingHoursText}
                </span>
                <span className="text-[11px] text-[#A69383] block">
                  {BUSINESS_INFO.openingHoursArabic}
                </span>
              </div>
              <p className="text-[11px] text-[#8C7A6C]">
                * يتم إعداد الطلبات طازجة فور طلبها في الكافيه.
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>العنوان والتواصل</span>
            </h4>
            <div className="space-y-2.5 text-xs text-[#BAA797]">
              <p className="text-white/90 font-medium">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-[#A69383]">
                أقرب نقطة دالة: <span className="text-amber-200">{BUSINESS_INFO.nearestLandmark}</span>
              </p>
              <div className="pt-1 space-y-1 font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white" dir="ltr">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors"
                >
                  <span>فتح في خرائط Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Codiar Tech Attribution Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9B897B]">
          {/* Cafe Copyright */}
          <div className="text-center sm:text-right">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>{' '}
            <span className="font-bold text-white/90">گاف كافيه (GAV Coffee House)</span>.
          </div>

          {/* Codiar Tech Logo & Credit - MANDATORY Sections 28, 29, 30 */}
          <div className="flex items-center justify-center">
            <CodiarTechLogo size="sm" showLink={true} className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
};
