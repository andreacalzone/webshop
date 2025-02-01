import React, { useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

const CheckoutPage = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);

  return (
    <div className="mt-10">
      <div className="bg-white rounded-lg">
        <ShoppingCart isCheckoutPage setOrderSuccess={setOrderSuccess} />
      </div>

      {orderSuccess && (
        <p className="mt-4 text-center text-green-500">Din order är beställd!</p>
      )}
    </div>
  );
};

export default CheckoutPage;