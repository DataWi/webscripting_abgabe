import { Course } from "@/pages/courses";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  price: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  price: 0,
});

import { ReactNode } from "react";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState([] as Course[]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    const price = localStorage.getItem("price");
    if (items && price) {
      setCartItems(JSON.parse(items));
      setPrice(JSON.parse(price));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearCart = () => {
    setCartItems([]);
    setPrice(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("price");
  };

  const priceToDecimals = (price: number) => Math.round(price * 100) / 100;
  const writeToLocalStorage = () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("price");
    console.log(price);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("price", JSON.stringify(priceToDecimals(price)));
  };
  const addToCart = (course: Course) => {
    const item = cartItems.find((itemn: Course) => itemn.id === course.id);
    if (item) return;
    setCartItems([...cartItems, course]);
    const newPrice = price + course.price;
    setPrice(priceToDecimals(newPrice));
    writeToLocalStorage();
  };

  const removeFromCart = (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    const newPrice = price - cartItems.find((item) => item.id === id)!.price;
    setPrice(priceToDecimals(newPrice));
    setCartItems(newCartItems);
    writeToLocalStorage();
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, price, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
