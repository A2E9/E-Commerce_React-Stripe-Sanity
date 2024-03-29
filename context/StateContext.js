import React, { createContext, useContext, useState, useEffect } from "react";
// import {toast} from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQty, setTotalQuantity] = useState(0);

  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const incQty = () => {
    setQty(qty + 1);
  };
  const decQty = () => {
    setQty((prev) => (prev == 1 ? prev : prev - 1));
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice + product.price * quantity) * 100) / 100);
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const toggleCartItemQty = (id, type) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (type === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevPrice) => Math.round((prevPrice + foundProduct.price) * 100) / 100);
      setTotalQuantity((prevQty) => prevQty + 1);
    } else if (type === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity--;
        setTotalQuantity((prevQty) => prevQty - 1);
        setTotalPrice((prevPrice) => Math.round((prevPrice - foundProduct.price) * 100) / 100);
      }
    }
  };

  const removeItem = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1)]);
    setTotalPrice(
      (prevPrice) => Math.round((prevPrice - foundProduct.price * foundProduct.quantity) * 100) / 100);
    setTotalQuantity((prevQty) => prevQty - foundProduct.quantity);
    toast.error(`${foundProduct.quantity} ${foundProduct.name}´s removed from cart.`);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
        toggleCartItemQty,
        removeItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
