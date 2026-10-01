import React from 'react';
import { OrderCustomerInfo } from '../types';
import { X, User, Phone, MapPin, FileText, Receipt, MessageCircle, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerInfo: OrderCustomerInfo;
  onUpdateCustomerInfo: (info: OrderCustomerInfo) => void;
  onConfirmInvoice: () => void;
  totalAmount: number;
  itemCount: number;
  currencyLabel?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  customerInfo,
  onUpdateCustomerInfo,
  onConfirmInvoice,
  totalAmount,
  itemCount,
  currencyLabel = 'د.ع',
}) => {
  if (!isOpen) return null;

  const [name, setName] = React.useState(customerInfo.name || '');
  const [phone, setPhone] = React.useState(customerInfo.phone || '');
  const [orderType, setOrderType] = React.useState<'dine_in' | 'takeaway'>(customerInfo.orderType || 'dine_in');
  const [tableNumber, setTableNumber] = React.useState(customerInfo.tableNumber || '');
  const [notes, setNotes] = React.useState(customerInfo.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomerInfo({
      name: name.trim(),
      phone: phone.trim(),
      orderType,
      tableNumber: orderType === 'dine_in' ? tableNumber.trim() : undefined,
      notes: notes.trim() || undefined,
    });
    onConfirmInvoice();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#E1D4C3] overflow-hidden my-auto flex flex-col text-right">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#F2EAE0] border-b border-[#E4D7C5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#8A5D3B]" />
            <div>
              <h3 className="font-black text-lg text-[#32231A]">بيانات إصدار الفاتورة</h3>
              <p className="text-[11px] text-[#7A6453]">لعرضها على كاشير كافيه جاف</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E5DACD] hover:bg-[#D8CABE] flex items-center justify-center text-[#553E2E] cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Summary Header Badge */}
        <div className="bg-[#EFE5D8] px-5 py-2.5 flex items-center justify-between text-xs text-[#523A2A] font-semibold border-b border-[#E4D7C5]">
          <span>إجمالي الطلب ({itemCount} صنف):</span>
          <span className="font-mono font-bold text-sm text-[#38261B]">
            {totalAmount.toLocaleString()} {currencyLabel}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Order Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4E3629] block">نوع الطلب:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orderType === 'dine_in'
                    ? 'bg-[#523A2A] text-white shadow-sm'
                    : 'bg-white text-[#523A2A] border border-[#DDD0BF] hover:bg-[#F5EDE3]'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>محلي (داخل الكافيه)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[#523A2A] text-white shadow-sm'
                    : 'bg-white text-[#523A2A] border border-[#DDD0BF] hover:bg-[#F5EDE3]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>سفري (Takeaway)</span>
              </button>
            </div>
          </div>

          {/* Customer Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4E3629] flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#8A5D3B]" />
              <span>اسم العميل / الزبون:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك الكريم..."
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#D9CABE] text-xs text-[#32231A] placeholder-[#A4907E] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B]"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4E3629] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#8A5D3B]" />
              <span>رقم الهاتف:</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XXXXXXXXX"
              dir="ltr"
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#D9CABE] text-xs font-mono text-right text-[#32231A] placeholder-[#A4907E] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B]"
            />
          </div>

          {/* Table Number (if Dine In) */}
          {orderType === 'dine_in' && (
            <div className="space-y-1 animate-in fade-in duration-150">
              <label className="text-xs font-bold text-[#4E3629] flex items-center gap-1">
                <span>رقم الطاولة (اختياري):</span>
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="مثال: 5 أو جلسة الشجرة"
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#D9CABE] text-xs text-[#32231A] placeholder-[#A4907E] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B]"
              />
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4E3629] flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#8A5D3B]" />
              <span>ملاحظات إضافية للكاشير:</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي طلب خاص أو تفضيلات إضافية..."
              className="w-full p-3 rounded-xl bg-white border border-[#D9CABE] text-xs text-[#32231A] placeholder-[#A4907E] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B]"
            />
          </div>

          {/* Location note */}
          <div className="p-2.5 rounded-xl bg-[#F0E6D9] text-[11px] text-[#6E5544] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#8A5D3B] shrink-0" />
            <span>فرع بابل مول: {BUSINESS_INFO.address}</span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#523A2A] hover:bg-[#3E291D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#523A2A]/20 transition-all active:scale-98 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>إصدار الفاتورة وعرضها للكاشير</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
