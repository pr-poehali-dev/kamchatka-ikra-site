export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

const CART_KEY = 'caviar_cart';

export const getCart = (): CartState => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return { items: [], total: 0 };
  
  try {
    return JSON.parse(stored);
  } catch {
    return { items: [], total: 0 };
  }
};

export const saveCart = (cart: CartState): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item: Omit<CartItem, 'quantity'>): CartState => {
  const cart = getCart();
  const existingItem = cart.items.find(i => i.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }
  
  cart.total = calculateTotal(cart.items);
  saveCart(cart);
  
  return cart;
};

export const removeFromCart = (itemId: string): CartState => {
  const cart = getCart();
  cart.items = cart.items.filter(i => i.id !== itemId);
  cart.total = calculateTotal(cart.items);
  saveCart(cart);
  
  return cart;
};

export const updateQuantity = (itemId: string, quantity: number): CartState => {
  const cart = getCart();
  const item = cart.items.find(i => i.id === itemId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    item.quantity = quantity;
  }
  
  cart.total = calculateTotal(cart.items);
  saveCart(cart);
  
  return cart;
};

export const clearCart = (): CartState => {
  const cart: CartState = { items: [], total: 0 };
  saveCart(cart);
  return cart;
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};
