import React from 'react';
import { CartItem, OrderCustomerInfo } from '../types';
import { X, Printer, Share2, MessageCircle, CheckCircle2, Copy, Download, Coffee, QrCode } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';
import { GAVLogo } from './GAVLogo';

interface CashierInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  items: CartItem[];
  customerInfo: OrderCustomerInfo;
  totalAmount: number;
  onResetOrder: () => void;
  currencyLabel?: string;
}

export const CashierInvoiceModal: React.FC<CashierInvoiceModalProps> = ({
  isOpen,
  onClose,
  orderId,
  items,
  customerInfo,
  totalAmount,
  onResetOrder,
  currencyLabel = 'د.ع',
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = React.useState(false);

  const formattedDate = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('ar-IQ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const formattedTime = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString('ar-IQ', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, []);

  const handleSendToWhatsApp = () => {
    const lines = [
      `*طلب كافيه جديد #${orderId}*`,
      `كافيه: ${BUSINESS_INFO.fullName}`,
      `---------------------------------`,
      `*العميل:* ${customerInfo.name || 'زبون الكافيه'}`,
      `*الهاتف:* ${customerInfo.phone || 'غير مسجل'}`,
      `*نوع الطلب:* ${customerInfo.orderType === 'dine_in' ? 'محلي داخل الكافيه' : 'سفري (Takeaway)'}`,
      customerInfo.tableNumber ? `*رقم الطاولة:* ${customerInfo.tableNumber}` : '',
      `*العنوان:* ${BUSINESS_INFO.address}`,
      customerInfo.notes ? `*ملاحظات:* ${customerInfo.notes}` : '',
      `---------------------------------`,
      `*تفاصيل الطلب:*`,
      ...items.map(
        (item) =>
          `• ${item.quantity} × ${item.product.name} ${
            item.options.syrup ? `(+سيرب ${item.options.syrup})` : ''
          } ${item.options.milk ? `(+حليب ${item.options.milk})` : ''} - ${item.totalPrice.toLocaleString()} ${currencyLabel}`
      ),
      `---------------------------------`,
      `*الإجمالي:* ${totalAmount.toLocaleString()} ${currencyLabel}`,
      `*الوقت:* ${formattedDate} - ${formattedTime}`,
      `شكراً لزيارتكم گاف كافيه! ☕`
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/964${BUSINESS_INFO.whatsapp.replace(/^0/, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#DFD3C2] overflow-hidden my-auto flex flex-col text-right">
        {/* Top Dismiss & Notification Bar (hidden on print) */}
        <div className="no-print bg-[#523A2A] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تم إصدار فاتورة الكاشير بنجاح</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            aria-label="إغلاق الفاتورة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action instruction banner (hidden on print) */}
        <div className="no-print bg-[#FAF5EE] border-b border-[#EBDDCB] px-5 py-2.5 text-center text-xs font-semibold text-[#6E4F39]">
          📸 احفظ الفاتورة كـ <span className="underline font-bold text-[#8A5D3B]">لقطة شاشة</span> واعرضها للكاشير للمحاسبة الفورية
        </div>

        {/* The Printable receipt container */}
        <div id="cashier-receipt" className="p-6 bg-white space-y-5 text-[#2B1F17]">
          {/* Receipt Header */}
          <div className="text-center space-y-2 border-b-2 border-dashed border-[#DDD0C0] pb-4">
            <div className="flex justify-center">
              <GAVLogo size="lg" variant="dark" />
            </div>
            <p className="text-xs text-[#7A6453] font-medium">
              {BUSINESS_INFO.slogan}
            </p>
            <div className="text-[11px] text-[#8C7663] space-y-0.5 font-sans">
              <p>{BUSINESS_INFO.address}</p>
              <p>أقرب نقطة: {BUSINESS_INFO.nearestLandmark}</p>
              <p className="font-mono">{BUSINESS_INFO.phone}</p>
            </div>
          </div>

          {/* Receipt Metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE1D4]">
            <div className="space-y-0.5">
              <span className="text-[#8C7662] block text-[10px]">رقم الطلب (Order ID):</span>
              <div className="flex items-center gap-1 font-mono font-bold text-[#32231A] text-sm">
                <span>{orderId}</span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="no-print text-[#8A5D3B] hover:text-[#523A2A] cursor-pointer"
                  title="نسخ رقم الطلب"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              {copied && <span className="no-print text-[9px] text-emerald-600 font-bold">تم النسخ!</span>}
            </div>

            <div className="space-y-0.5 text-left font-mono">
              <span className="text-[#8C7662] block text-[10px]">التاريخ والوقت:</span>
              <span className="font-semibold text-xs text-[#32231A] block">{formattedTime}</span>
              <span className="text-[10px] text-[#7C6654]">{formattedDate}</span>
            </div>

            {/* Customer Details */}
            <div className="col-span-2 pt-2 border-t border-[#E8DEC8] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[#8C7662] text-[10px] block">اسم الزبون:</span>
                <span className="font-bold text-[#32231A]">
                  {customerInfo.name || 'زبون گاف كافيه'}
                </span>
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-[#8C7662] text-[10px] block">النوع / المكان:</span>
                <span className="font-bold text-[#8A5D3B] bg-[#EFE7DE] px-2 py-0.5 rounded-md">
                  {customerInfo.orderType === 'dine_in'
                    ? customerInfo.tableNumber
                      ? `محلي - طاولة ${customerInfo.tableNumber}`
                      : 'محلي (داخل الصالة)'
                    : 'سفري (Takeaway)'}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#553E2E] pb-1 border-b border-[#E5DACB] flex justify-between">
              <span>الصنف والكمية</span>
              <span>المجموع</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs text-[#2E2017]">
                  <div className="space-y-0.5 flex-1 pr-2">
                    <div className="font-bold flex items-baseline gap-1.5">
                      <span className="font-mono text-[#8A5D3B] bg-[#F1EAE0] px-1.5 rounded">
                        {item.quantity}×
                      </span>
                      <span>{item.product.name}</span>
                    </div>
                    {(item.options.syrup || item.options.milk || item.options.notes) && (
                      <div className="text-[11px] text-[#786453] pr-4 space-y-0.5">
                        {item.options.syrup && <div>+ سيرب: {item.options.syrup}</div>}
                        {item.options.milk && <div>+ حليب: {item.options.milk}</div>}
                        {item.options.notes && <div className="italic">ملاحظة: {item.options.notes}</div>}
                      </div>
                    )}
                  </div>
                  <div className="font-mono font-bold text-[#3A271C] whitespace-nowrap">
                    {item.totalPrice > 0 ? `${item.totalPrice.toLocaleString()} ${currencyLabel}` : 'حسب المحصول'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-3 border-t-2 border-dashed border-[#DDD0C0] space-y-1">
            <div className="flex justify-between items-center text-sm font-semibold text-[#6E5544]">
              <span>المجموع الصافي:</span>
              <span className="font-mono font-bold">{totalAmount.toLocaleString()} {currencyLabel}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-black text-[#2D1F17] pt-1">
              <span>المبلغ المطلوب للكاشير:</span>
              <div className="font-mono text-2xl text-[#523A2A] flex items-baseline gap-1">
                <span>{totalAmount.toLocaleString()}</span>
                <span className="text-xs font-sans text-[#7A6453]">{currencyLabel}</span>
              </div>
            </div>
          </div>

          {/* Barcode & Cashier Stamp Simulation */}
          <div className="pt-2 text-center space-y-2 border-t border-[#EDE4D8]">
            {/* Visual Simulated Barcode */}
            <div className="flex justify-center items-center gap-0.5 h-9 py-1 overflow-hidden opacity-80">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2].map((w, i) => (
                <div
                  key={i}
                  className="bg-[#2D1F17] h-full"
                  style={{ width: `${w * 1.5}px`, margin: '0 0.5px' }}
                />
              ))}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-[#8C7662]">
              *{orderId}*
            </div>
            <p className="text-[10px] text-[#7A6453] font-medium">
              الرجاء إظهار هذه الفاتورة للكاشير أو حفظها كصورة
            </p>
          </div>
        </div>

        {/* Modal Action Buttons (hidden on print) */}
        <div className="no-print p-4 bg-[#F5EFE7] border-t border-[#DFD3C2] space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="h-11 rounded-xl bg-white border border-[#D5C6B4] hover:bg-[#EAE0D2] text-[#4A3222] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#8A5D3B]" />
              <span>طباعة / حفظ PDF</span>
            </button>

            <button
              onClick={handleSendToWhatsApp}
              className="h-11 rounded-xl bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال واتساب</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onResetOrder();
                onClose();
              }}
              className="text-xs text-[#8A5D3B] hover:underline font-semibold cursor-pointer"
            >
              بدء طلب جديد
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#523A2A] text-white text-xs font-bold hover:bg-[#3D291D] transition-colors cursor-pointer"
            >
              تم الحفظ والمتابعة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
