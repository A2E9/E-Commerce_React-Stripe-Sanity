import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { fireConfetti } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    fireConfetti();
    }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>!Thank you!</h2>
        <p className="email-msg">
          We have sent you an email with your order details. Please check your
          inbox and spam folder.
        </p>
        <p className="description">
          If you have any questions, please contact us at{" "}
          <a href="mailto:val.repinskyi@gmail.com">val.repinskyi@gmail.com</a>
        </p>
        <Link href="/">
            <button type="button" width="300px" className="btn">
                Continue Shopping
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
