export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  price: number;
  priceType?: 'fixed' | 'ask_cashier';
  description: string;
  image?: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  temperature?: 'hot' | 'iced' | 'both';
  availableAddOns?: {
    syrups?: boolean;
    milkChoice?: boolean;
    sugarLevel?: boolean;
    iceLevel?: boolean;
  };
}

export interface CartItemOption {
  syrup?: string;
  milk?: string;
  notes?: string;
}

export interface CartItem {
  id: string; // unique cart line id
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  options: CartItemOption;
  totalPrice: number;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  orderType: 'dine_in' | 'takeaway';
  tableNumber?: string;
  notes?: string;
}

export interface Order {
  orderId: string;
  date: string;
  time: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  total: number;
  currency: string;
}
