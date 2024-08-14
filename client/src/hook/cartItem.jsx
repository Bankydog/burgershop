import { useContext, createContext, useState } from "react";

const CartItemContext = createContext();

function CartItemProvider({ children }) {
  ////////////////// set cart items //////////////////
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems, item];
      console.log("Updated Cart Items:", updatedCartItems);
      return updatedCartItems;
    });
  };

  ////////////////// check items of length //////////////////
  const checkLength = () => cartItems.length !== 0;

  return (
    <CartItemContext.Provider
      value={{ cartItems, setCartItems, handleAddToCart, checkLength }}
    >
      {children}
    </CartItemContext.Provider>
  );
}

const useCartItem = () => useContext(CartItemContext);

export { CartItemProvider, useCartItem };
