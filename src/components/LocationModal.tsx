import React from 'react';
import { X, MapPin, Navigation, Clock, Phone, ExternalLink, Copy, Check, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = React.useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${BUSINESS_INFO.address} - ${BUSINESS_INFO.nearestLandmark}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFD3C2] overflow-hidden my-auto flex flex-col text-right">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#F2EAE0] border-b border-[#E3D6C4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#8A5D3B]" />
            <div>
              <h3 className="font-black text-lg text-[#32231A]">موقع كافيه جاف (GAV CAFE)</h3>
              <p className="text-[11px] text-[#7A6453]">شارع 40 - الحلة - محافظة بابل</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E5DACD] hover:bg-[#D8CABE] flex items-center justify-center text-[#553E2E] cursor-pointer"
            aria-label="إغلاق نافذة الموقع"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Visual Map Card / Interactive preview */}
          <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#E8E1D5] border border-[#D9CDBE] shadow-inner group">
            {/* Google Maps preview for the verified street address */}
            <iframe
              title="موقع GAV Cafe في شارع 40 - الحلة"
              src="https://www.google.com/maps?q=GAV%20Cafe%2C%20شارع%2040%2C%20الحلة%2C%20محافظة%20بابل%2C%20العراق&output=embed"
              className="w-full h-full border-0 grayscale-[25%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Quick Action Overlay */}
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 left-3 bg-[#523A2A]/90 hover:bg-[#3D291D] backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>فتح في تطبيق الخرائط</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Details Grid */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E9DFD1]">
            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#F2ECE4]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#8C7662]">العنوان الرسمي:</span>
                <p className="text-xs sm:text-sm font-bold text-[#32231A]">
                  {BUSINESS_INFO.address}
                </p>
                <p className="text-xs text-[#7A6453]">
                  أقرب نقطة دالة: <span className="font-semibold text-[#8A5D3B]">{BUSINESS_INFO.nearestLandmark}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="shrink-0 p-2 rounded-lg bg-[#F5EDE3] hover:bg-[#EADBCC] text-[#523A2A] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="نسخ العنوان"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>

            {/* Opening hours & contact row */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8C7662] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#8A5D3B]" />
                  <span>أوقات العمل اليومية:</span>
                </span>
                <p className="font-bold font-mono text-[#32231A]">
                  {BUSINESS_INFO.openingHoursText}
                </p>
                <p className="text-[10px] text-[#7A6453]">{BUSINESS_INFO.openingHoursArabic}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8C7662] flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#8A5D3B]" />
                  <span>الاتصال والحجز:</span>
                </span>
                <p className="font-bold font-mono text-[#32231A] text-left" dir="ltr">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </p>
                <p className="text-[10px] text-[#7A6453]">متاح طيلة ساعات الدوام</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl bg-[#523A2A] hover:bg-[#3D291D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>الاتجاهات عبر Google Maps</span>
            </a>

            <a
              href={`https://wa.me/964${BUSINESS_INFO.whatsapp.replace(/^0/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl bg-[#25D366] hover:bg-[#1EBE5A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
