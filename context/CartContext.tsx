import { createContext, ReactNode, useContext, useState } from 'react';
import { Book } from '../data/books';

export const LOCALSHELF_FEE = 2.99;

type CartContextValue = {
  items: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setItems((current) => [...current, book]);
  };

  const removeFromCart = (bookId: string) => {
    setItems((current) => {
      const index = current.findIndex((item) => item.id === bookId);
      if (index === -1) return current;
      const next = [...current];
      next.splice(index, 1);
      return next;
    });
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
