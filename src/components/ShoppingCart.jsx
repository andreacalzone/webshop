import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { clearCart } from "../store/features/shoppingCart/shoppingCartSlice";

const ShoppingCart = ({ setIsOpen, isCheckoutPage, setOrderSuccess }) => {
  const { cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.shoppingCart
  )

  const dispatch = useDispatch();

  const handleOrder = () => {
    dispatch(clearCart());

    if (setOrderSuccess) {
      setOrderSuccess(true);
    }
  }

  return (
    <div className="text-black">
      <div>
        {cart.length <= 0 && (
          <div className="p-2 text-center">
            <p>Din kundvagn är tom</p>
          </div>
        )}
        {cart.map((item) => (
          <CartItem key={`cart_${item.product._id}`} item={item} />
        ))}
      </div>
      <div className="flex justify-between items-center p-2">
        <div>
          <p>Total: {totalPrice}</p>
          <p className="text-gray-600 text-sm">ink skatt</p>
        </div>
        {isCheckoutPage ? (
          <button onClick={handleOrder} className="bg-slate-800 text-white py-1.5 px-6 rounded-lg cursor-pointer">
            Beställ
          </button>
        ) : (
          <Link onClick={() => setIsOpen(false)} to="/checkout" className="bg-slate-800 text-white py-1.5 px-6 rounded-lg">
            Gå till kassan
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;