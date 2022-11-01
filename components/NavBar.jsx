import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const NavBar = () => {
  const { showCart, setShowCart, totalQty } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">VStore Headphones</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQty}</span>
      </button>
        

      {showCart && <Cart />}




        
      {/* <Cart /> */}{/* <Cart /> */}{/* <Cart /> */}{/* <Cart /> */}{/* <Cart /> */}{/* <Cart /> */}
    </div>
  );
};

export default NavBar;
