import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Receipt, ArrowRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/projectData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToInvoice: () => void;
  onProceedToWhatsApp: () => void;
  currencyLabel?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToInvoice,
  onProceedToWhatsApp,
  currencyLabel = 'د.ع',
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E2D5C3] text-right animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F4EDE2]">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#E8DDD0] hover:bg-[#DDD0C1] flex items-center justify-center text-[#553E2E] transition-colors cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-5 h-5 text-[#8A5D3B]" />
              <h2 className="font-bold text-lg text-[#32231A]">سلة الطلبات</h2>
              <span className="text-xs font-mono font-bold bg-[#8A5D3B] text-white px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-[#9B4232] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>تفريغ السلة</span>
            </button>
          )}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#EFE7DE] flex items-center justify-center text-[#99816E]">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#3C2B1F]">السلة فارغة حالياً</h3>
                <p className="text-xs text-[#7C6654] max-w-xs leading-relaxed">
                  تصفح المنيو الرقمي وأضف مشروباتك المفضلة لإصدار فاتورة للكاشير فوراً.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#523A2A] text-white text-xs font-bold hover:bg-[#3D291D] transition-colors cursor-pointer"
              >
                تصفح منيو كافيه جاف
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-[#E9DFD1] shadow-xs flex flex-col gap-2 hover:border-[#D9CABB] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#32231A]">{item.product.name}</h4>
                      <span className="font-mono font-bold text-sm text-[#4E3629]">
                        {item.totalPrice > 0 ? `${item.totalPrice.toLocaleString()} ${currencyLabel}` : 'حسب المحصول'}
                      </span>
                    </div>

                    {/* Options list */}
                    {(item.options.syrup || item.options.milk || item.options.notes) && (
                      <div className="text-[11px] text-[#7C6755] space-y-0.5 pt-0.5">
                        {item.options.syrup && (
                          <div className="flex items-center gap-1">
                            <span className="text-amber-700">•</span>
                            <span>سيرب: {item.options.syrup}</span>
                          </div>
                        )}
                        {item.options.milk && (
                          <div className="flex items-center gap-1">
                            <span className="text-amber-700">•</span>
                            <span>حليب: {item.options.milk}</span>
                          </div>
                        )}
                        {item.options.notes && (
                          <div className="flex items-center gap-1 text-[#8C7663] italic">
                            <span className="text-amber-700">•</span>
                            <span>ملاحظة: {item.options.notes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Counter & Delete row */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4]">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    aria-label="حذف العنصر"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>حذف</span>
                  </button>

                  <div className="flex items-center gap-2 bg-[#F6F0E7] px-2 py-1 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white text-[#4A3222] hover:bg-[#EFE7DE] flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-xs w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-[#523A2A] text-white hover:bg-[#3D291D] flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#F3ECE1] border-t border-[#E2D5C3] space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#7C6654]">
                <span>عدد الأصناف:</span>
                <span className="font-mono font-bold">{totalItemsCount}</span>
              </div>
              <div className="flex items-center justify-between text-base font-black text-[#2D1F17] pt-1 border-t border-[#E8DEC8]">
                <span>المبلغ الإجمالي:</span>
                <div className="font-mono text-xl text-[#4E3629] flex items-baseline gap-1">
                  <span>{totalAmount.toLocaleString()}</span>
                  <span className="text-xs font-sans text-[#7C6654]">{currencyLabel}</span>
                </div>
              </div>
            </div>

            {/* Primary Action 1: Cashier Invoice (Requested as main flow) */}
            <button
              onClick={onProceedToInvoice}
              className="w-full h-12 rounded-xl bg-[#523A2A] hover:bg-[#3E291D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#523A2A]/20 transition-all active:scale-98 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>إصدار فاتورة لعرضها على الكاشير</span>
            </button>

            {/* Primary Action 2: WhatsApp Order */}
            <button
              onClick={onProceedToWhatsApp}
              className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال الطلب عبر واتساب ({BUSINESS_INFO.phone})</span>
            </button>

            <p className="text-[11px] text-center text-[#8C7662]">
              يمكنك التقاط لقطة شاشة للفاتورة وإبرازها مباشرة لكاشير جاف كافيه
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
