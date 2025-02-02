import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { clearCart } from "../store/features/shoppingCart/shoppingCartSlice";

const ShoppingCart = ({ setIsOpen, isCheckoutPage, setOrderSuccess }) => {
  const { cart, totalPrice } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState(false); // Tracks login error

  const handleOrder = async () => {
    if (cart.length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setAuthError(true); // Show login error message
      return;
    }

    try {
      const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) throw new Error("Kunde inte genomföra beställningen.");

      dispatch(clearCart()); // Clear cart after order success
      if (setOrderSuccess) setOrderSuccess(true);
    } catch (error) {
      console.error("Fel vid beställning:", error.message);
    }
  };

  return (
    <div className="text-black">
      <div>
        {cart.length === 0 ? (
          <div className="p-2 text-center">
            <p>Din kundvagn är tom</p>
          </div>
        ) : (
          cart.map((item) => <CartItem key={`cart_${item.product._id}`} item={item} />)
        )}
      </div>

      <div className="flex justify-between items-center p-2">
        <div>
          <p>Total: {totalPrice}:-</p>
          <p className="text-gray-600 text-sm">ink skatt</p>
        </div>
        {isCheckoutPage ? (
          <>
            <button
              onClick={handleOrder}
              className={`py-1.5 px-6 rounded-lg cursor-pointer ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-800 text-white"
              }`}
              disabled={cart.length === 0}
            >
              Beställ
            </button>
            {authError && (
              <p className="text-red-500 text-sm mt-2">
                Du måste vara inloggad för att göra en beställning.
              </p>
            )}
          </>
        ) : (
          <Link
            onClick={() => setIsOpen(false)}
            to="/checkout"
            className="bg-slate-800 text-white py-1.5 px-6 rounded-lg"
          >
            Gå till kassan
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
