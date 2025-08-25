'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { Product } from '../products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

type CartAction =
  | { type: 'LOAD_FROM_STORAGE'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

// localStorage helper functions
const saveToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }
};

const loadFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  }
  return [];
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'LOAD_FROM_STORAGE':
      newState = {
        ...state,
        items: action.payload
      };
      break;
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      saveToLocalStorage(newState.items);
      break;
    }
    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      saveToLocalStorage(newState.items);
      break;
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        newState = {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      } else {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        };
      }
      saveToLocalStorage(newState.items);
      break;
    case 'CLEAR_CART':
      console.log('CLEAR_CART action received');
      newState = {
        ...state,
        items: []
      };
      saveToLocalStorage(newState.items);
      console.log('Cart cleared and localStorage updated');
      break;
    case 'TOGGLE_CART':
      newState = {
        ...state,
        isOpen: !state.isOpen
      };
      break;
    default:
      newState = state;
  }
  
  return newState;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  isOpen: false
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const savedItems = loadFromLocalStorage();
    if (savedItems.length > 0) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedItems });
    }
  }, []);

  // Listen for localStorage changes (for cross-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart' && e.newValue !== null) {
        const newItems = JSON.parse(e.newValue);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: newItems });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    console.log('clearCart function called');
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const getTotalPrice = useCallback(() => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [state.items]);

  const getTotalItems = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
