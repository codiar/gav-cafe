import React from 'react';
import {
  BUSINESS_INFO,
  CATEGORIES,
  PRODUCTS,
} from './data/projectData';
import { Product, CartItem, CartItemOption, OrderCustomerInfo } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CashierInvoiceModal } from './components/CashierInvoiceModal';
import { LocationModal } from './components/LocationModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { SpecialGAVSection } from './components/SpecialGAVSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import {
  Coffee,
  Search,
  ShoppingBag,
  Receipt,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Flame,
} from 'lucide-react';

const STORAGE_KEY_CART = 'gav_cafe_cart_v1';
const STORAGE_KEY_ORDER = 'gav_cafe_last_order_v1';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = React.useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState<boolean>(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Customer information state
  const [customerInfo, setCustomerInfo] = React.useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    orderType: 'dine_in',
    tableNumber: '',
    notes: '',
  });

  // Order ID state
  const [orderId, setOrderId] = React.useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDER);
      return saved || generateOrderId();
    } catch {
      return generateOrderId();
    }
  });

  // Save cart to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  function generateOrderId() {
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-2026-${randomSuffix}`;
  }

  // Toast handler
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filter products based on active category & search query
  const filteredProducts = React.useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      // Search match (name, description, nameEn, category)
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (product.nameEn && product.nameEn.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Calculate counts per category
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = PRODUCTS.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Total items count in cart
  const cartItemCount = React.useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Grand total amount in cart
  const cartTotalAmount = React.useMemo(() => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  }, [cart]);

  // Add item to cart with options
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    options: CartItemOption = {}
  ) => {
    const lineId = `${product.id}-${options.syrup || 'none'}-${options.milk || 'none'}-${options.notes || ''}`;

    // Base price + syrup + milk
    let unitPrice = product.price || 0;
    if (options.syrup) unitPrice += 1000;
    if (options.milk) unitPrice += 1500;

    const totalPrice = unitPrice * quantity;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === lineId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: unitPrice * newQty,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: lineId,
            productId: product.id,
            product,
            quantity,
            unitPrice,
            options,
            totalPrice,
          },
        ];
      }
    });

    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح`);
  };

  // Quick add (default options)
  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, 1, {});
  };

  // Instant checkout from product detail
  const handleInstantCheckout = (
    product: Product,
    quantity: number,
    options: CartItemOption
  ) => {
    handleAddToCart(product, quantity, options);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    showToast('تم حذف العنصر من السلة');
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    showToast('تم تفريغ السلة بالكامل');
  };

  // Flow: Cart -> Checkout Modal
  const handleProceedToInvoice = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Flow: Checkout confirmed -> Generate Invoice
  const handleConfirmInvoice = () => {
    const newId = generateOrderId();
    setOrderId(newId);
    try {
      localStorage.setItem(STORAGE_KEY_ORDER, newId);
    } catch {}
    setIsCheckoutOpen(false);
    setIsInvoiceOpen(true);
  };

  // Flow: Cart -> Direct WhatsApp order
  const handleProceedToWhatsApp = () => {
    setIsCartOpen(false);
    handleConfirmInvoice();
  };

  // Reset entire order to start a new one
  const handleResetOrder = () => {
    setCart([]);
    const newId = generateOrderId();
    setOrderId(newId);
    try {
      localStorage.setItem(STORAGE_KEY_ORDER, newId);
    } catch {}
    showToast('تم تجهيز طلب جديد');
  };

  // Scroll navigation helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'menu-section') {
      setActiveCategory('all');
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2C241D] flex flex-col antialiased selection:bg-[#785338] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#35251B] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-200 border border-amber-500/30">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenInvoiceHistory={() => {
          if (cart.length > 0) {
            setIsInvoiceOpen(true);
          } else {
            showToast('أضف أصنافاً إلى السلة أولاً لعرض الفاتورة');
            setIsCartOpen(true);
          }
        }}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Banner */}
      <Hero
        onExploreMenu={() => handleNavigateSection('menu-section')}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenCashierInvoice={() => {
          if (cart.length > 0) {
            setIsCheckoutOpen(true);
          } else {
            showToast('تفضل باختيار مشروبك أولاً لإصدار فاتورة الكاشير');
            handleNavigateSection('menu-section');
          }
        }}
      />

      {/* Sticky Category Tabs Bar */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          const menuEl = document.getElementById('menu-section');
          if (menuEl) {
            menuEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        categoryCounts={categoryCounts}
      />

      {/* Main Digital Menu Section */}
      <main id="menu-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Menu Section Header with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DEC8] pb-6">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#8A5D3B]" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#32231A]">
                {activeCategory === 'all'
                  ? 'قائمة المنيو الكاملة'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </h2>
            </div>
            <p className="text-xs text-[#7A6453]">
              استعرض الأصناف وأضفها إلى السلة لإصدار الفاتورة أو إرسالها للكاشير مباشرة
            </p>
          </div>

          {/* Search Trigger / Input */}
          <div className="flex items-center gap-2">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              popularKeywords={['لاتيه', 'بستاشيو', 'سبانش', 'V60', 'موهيتو', 'ماتشا']}
            />
          </div>
        </div>

        {/* Active Search / Filter Status Notice */}
        {searchQuery && (
          <div className="bg-[#FAF5EE] border border-[#E4D7C5] p-3 rounded-2xl flex items-center justify-between text-xs text-[#523A2A]">
            <span>
              نتائج البحث عن:{' '}
              <strong className="text-[#32231A]">"{searchQuery}"</strong> (
              <span className="font-mono font-bold">{filteredProducts.length}</span> صنف)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8A5D3B] hover:underline font-bold cursor-pointer"
            >
              مسح البحث
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white/50 rounded-3xl border border-[#E9DFD1] p-8">
            <div className="w-16 h-16 rounded-full bg-[#EFE7DE] flex items-center justify-center mx-auto text-[#8A5D3B]">
              <Search className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-[#32231A]">لا توجد نتائج مطابقة</h3>
              <p className="text-xs text-[#7A6453] max-w-sm mx-auto">
                لم نجد أي صنف يطابق "{searchQuery}". جرب البحث بكلمة أخرى مثل "لاتيه"، "قهوة"، أو اختر تصنيفاً آخر.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2 rounded-xl bg-[#523A2A] text-white text-xs font-bold hover:bg-[#3D291D] transition-colors cursor-pointer"
            >
              عرض جميع الأصناف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(prod) => setSelectedProduct(prod)}
                onQuickAdd={handleQuickAdd}
                currencyLabel={BUSINESS_INFO.currencyArabic}
              />
            ))}
          </div>
        )}
      </main>

      {/* SPECIAL GAV Feature Section */}
      <SpecialGAVSection
        products={PRODUCTS}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onQuickAdd={handleQuickAdd}
        currencyLabel={BUSINESS_INFO.currencyArabic}
      />

      {/* Cafe Atmosphere & Design Story */}
      <AtmosphereSection onOpenLocation={() => setIsLocationOpen(true)} />

      {/* Footer with Codiar Tech Attribution */}
      <Footer
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenInvoice={() => {
          if (cart.length > 0) {
            setIsCheckoutOpen(true);
          } else {
            showToast('أضف أصنافاً إلى السلة أولاً لإصدار الفاتورة');
            handleNavigateSection('menu-section');
          }
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeCategory === 'all' ? 'menu-section' : 'menu-section'}
        onTabChange={(tab) => handleNavigateSection(tab)}
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      {/* Modals & Drawers */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantCheckout={handleInstantCheckout}
        currencyLabel={BUSINESS_INFO.currencyArabic}
      />

      {/* 2. Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToInvoice={handleProceedToInvoice}
        onProceedToWhatsApp={handleProceedToWhatsApp}
        currencyLabel={BUSINESS_INFO.currencyArabic}
      />

      {/* 3. Checkout Information Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        customerInfo={customerInfo}
        onUpdateCustomerInfo={setCustomerInfo}
        onConfirmInvoice={handleConfirmInvoice}
        totalAmount={cartTotalAmount}
        itemCount={cartItemCount}
        currencyLabel={BUSINESS_INFO.currencyArabic}
      />

      {/* 4. Cashier Invoice Modal */}
      <CashierInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        orderId={orderId}
        items={cart}
        customerInfo={customerInfo}
        totalAmount={cartTotalAmount}
        onResetOrder={handleResetOrder}
        currencyLabel={BUSINESS_INFO.currencyArabic}
      />

      {/* 5. Google Maps Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      {/* 6. Modal Search View */}
      {isSearchOpen && (
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredProducts.length}
          isOpen={true}
          onClose={() => setIsSearchOpen(false)}
          onSelectKeyword={(kw) => {
            setSearchQuery(kw);
            setIsSearchOpen(false);
            handleNavigateSection('menu-section');
          }}
        />
      )}
    </div>
  );
}
