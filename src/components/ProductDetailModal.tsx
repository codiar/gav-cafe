import React from 'react';
import { Product, CartItemOption } from '../types';
import { X, Plus, Minus, Coffee, Check, ChevronRight } from 'lucide-react';
import { SYRUP_OPTIONS, MILK_OPTIONS, BUSINESS_INFO } from '../data/projectData';
import { GAVLogo } from './GAVLogo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, options: CartItemOption) => void;
  onInstantCheckout?: (product: Product, quantity: number, options: CartItemOption) => void;
  currencyLabel?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantCheckout,
  currencyLabel = 'د.ع',
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = React.useState<number>(1);
  const [selectedSyrup, setSelectedSyrup] = React.useState<string>('none');
  const [selectedMilk, setSelectedMilk] = React.useState<string>('regular');
  const [notes, setNotes] = React.useState<string>('');

  // Calculate dynamic price per unit based on customizations
  const syrupCost = React.useMemo(() => {
    const s = SYRUP_OPTIONS.find((item) => item.id === selectedSyrup);
    return s ? s.price : 0;
  }, [selectedSyrup]);

  const milkCost = React.useMemo(() => {
    const m = MILK_OPTIONS.find((item) => item.id === selectedMilk);
    return m ? m.price : 0;
  }, [selectedMilk]);

  const unitTotal = (product.price || 0) + syrupCost + milkCost;
  const grandTotal = unitTotal * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    const syrupObj = SYRUP_OPTIONS.find((s) => s.id === selectedSyrup);
    const milkObj = MILK_OPTIONS.find((m) => m.id === selectedMilk);

    onAddToCart(product, quantity, {
      syrup: selectedSyrup !== 'none' ? syrupObj?.name : undefined,
      milk: selectedMilk !== 'regular' ? milkObj?.name : undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  const handleCheckoutNow = () => {
    const syrupObj = SYRUP_OPTIONS.find((s) => s.id === selectedSyrup);
    const milkObj = MILK_OPTIONS.find((m) => m.id === selectedMilk);

    if (onInstantCheckout) {
      onInstantCheckout(product, quantity, {
        syrup: selectedSyrup !== 'none' ? syrupObj?.name : undefined,
        milk: selectedMilk !== 'regular' ? milkObj?.name : undefined,
        notes: notes.trim() || undefined,
      });
    } else {
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E3D6C4] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-[#EADFCF] bg-[#FAF6F0]/90 backdrop-blur-md">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EFE6DA] hover:bg-[#E5DACD] flex items-center justify-center text-[#5C4231] transition-colors cursor-pointer"
            aria-label="إغلاق تفاصيل المنتج"
          >
            <X className="w-5 h-5" />
          </button>

          <GAVLogo size="sm" showSubtitle={false} variant="gold" />

          <span className="text-[11px] font-mono text-[#8C7663] bg-[#EFE6DA] px-2.5 py-1 rounded-full">
            {BUSINESS_INFO.openingHoursText}
          </span>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6 text-right">
          {/* Main Visual Image Banner */}
          <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-[#ECE3D6] shadow-sm flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-radial from-[#F5EFE6] to-[#E5DACD]">
                <Coffee className="w-16 h-16 text-[#8A5D3B] mb-2" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#8C7663]">
                  GAV COFFEE HOUSE
                </span>
              </div>
            )}

            {/* Subtle logo stamp */}
            <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1">
              <span>GAV</span>
              <span>•</span>
              <span>Coffee House</span>
            </div>
          </div>

          {/* Product Title & Basic Pricing */}
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-black text-[#32231A] leading-tight">
                {product.name}
              </h2>
              <div className="text-xl font-black font-mono text-[#4A3222] shrink-0">
                {product.priceType === 'ask_cashier'
                  ? 'الرجاء السؤال'
                  : `${product.price.toLocaleString()} ${currencyLabel}`}
              </div>
            </div>

            {product.nameEn && (
              <p className="text-xs font-mono text-[#9B8573]">{product.nameEn}</p>
            )}

            <p className="text-sm text-[#6C5847] leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Quantity Stepper */}
          <div className="p-3.5 rounded-2xl bg-[#F0E8DC] border border-[#E2D5C3] flex items-center justify-between">
            <span className="text-sm font-bold text-[#4A3222]">الكمية المطلوبة:</span>
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-[#DCCDBA] shadow-xs">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-lg bg-[#F3ECE0] hover:bg-[#E8DCCB] disabled:opacity-40 flex items-center justify-center text-[#4A3222] transition-colors cursor-pointer"
                aria-label="تقليل الكمية"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono font-black text-lg text-[#32231A] w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-lg bg-[#523A2A] hover:bg-[#3D291D] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Customization: Add-ons (Syrup & Milk) as in Reference Screen */}
          {product.availableAddOns?.syrups && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#3E2C20]">شراب إضافي (Syrup):</span>
                <span className="text-[11px] font-mono text-[#8A5D3B]">+1,000 {currencyLabel}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SYRUP_OPTIONS.map((syrup) => {
                  const isChecked = selectedSyrup === syrup.id;
                  return (
                    <button
                      key={syrup.id}
                      type="button"
                      onClick={() => setSelectedSyrup(syrup.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#523A2A] text-white border-[#523A2A] shadow-sm'
                          : 'bg-white text-[#523A2A] border-[#DFD3C2] hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isChecked
                              ? 'border-white bg-white text-[#523A2A]'
                              : 'border-[#BAA692]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>{syrup.name}</span>
                      </div>
                      {syrup.price > 0 && (
                        <span className="text-[10px] font-mono opacity-80">
                          +{syrup.price.toLocaleString()}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.availableAddOns?.milkChoice && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#3E2C20]">تغيير نوع الحليب (Milk):</span>
                <span className="text-[11px] font-mono text-[#8A5D3B]">+1,500 {currencyLabel}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {MILK_OPTIONS.map((milk) => {
                  const isChecked = selectedMilk === milk.id;
                  return (
                    <button
                      key={milk.id}
                      type="button"
                      onClick={() => setSelectedMilk(milk.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#523A2A] text-white border-[#523A2A] shadow-sm'
                          : 'bg-white text-[#523A2A] border-[#DFD3C2] hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isChecked
                              ? 'border-white bg-white text-[#523A2A]'
                              : 'border-[#BAA692]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>{milk.name}</span>
                      </div>
                      {milk.price > 0 && (
                        <span className="text-[10px] font-mono opacity-80">
                          +{milk.price.toLocaleString()}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-[#553E2E] block">
              ملاحظات خاصة للباريستا أو الكاشير:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: سكر خفيف، ثلج إضافي، دبل شوت..."
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#DDCFBE] text-xs text-[#32231A] placeholder-[#9D8876] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B]"
            />
          </div>
        </div>

        {/* Sticky Purchase Bar matching the Reference PDP */}
        <div className="p-4 bg-[#F2EAE0] border-t border-[#E2D5C3] flex items-center justify-between gap-3 shadow-lg">
          <div className="flex flex-col text-right">
            <span className="text-[11px] text-[#7C6654] font-medium">الإجمالي الصافي:</span>
            <div className="text-xl font-black font-mono text-[#32231A] flex items-baseline gap-1">
              <span>{product.priceType === 'ask_cashier' ? 'حسب المحصول' : grandTotal.toLocaleString()}</span>
              {product.priceType !== 'ask_cashier' && (
                <span className="text-xs font-sans text-[#7C6654]">{currencyLabel}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              className="h-12 px-6 rounded-xl bg-[#523A2A] hover:bg-[#3E291D] text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-[#523A2A]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة إلى السلة</span>
            </button>

            <button
              onClick={handleCheckoutNow}
              className="h-12 px-4 rounded-xl bg-[#C69255] hover:bg-[#B37E43] text-white font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              title="إصدار فاتورة فوري"
            >
              <span>دفع وفاتورة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
