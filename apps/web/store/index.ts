import { create } from 'zustand';
import { User, Cart, CartItem } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  setItems: (items: CartItem[]) => void;
  setTotal: (total: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    })),
  clear: () => set({ items: [], total: 0 }),
  setItems: (items) => set({ items }),
  setTotal: (total) => set({ total }),
}));

interface UIStore {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  cartOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  cartOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  closeAll: () => ({
    sidebarOpen: false,
    mobileMenuOpen: false,
    cartOpen: false,
  }),
}));
