import { useContext, createContext, useState } from "react";

const CartItemContext = createContext();

function CartItemProvider({ children }) {
  ////////////////// set cart items //////////////////
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.catalog_id === newItem.catalog_id
      );
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].amount += newItem.amount;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  ////////////////// check items of length //////////////////
  const hasItemCart = () => cartItems.length !== 0;

  return (
    <CartItemContext.Provider
      value={{ cartItems, setCartItems, handleAddToCart, hasItemCart }}
    >
      {children}
    </CartItemContext.Provider>
  );
}

const useCartItem = () => useContext(CartItemContext);

export { CartItemProvider, useCartItem };
