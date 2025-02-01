import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeOne, removeItem, clearCart } from "../store/features/shoppingCart/shoppingCartSlice";

const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    const addOneToCart = () => {
        dispatch(addToCart(item.product))
    }

    const removeOneFromCart = () => {
        dispatch(removeOne(item.product._id))
    }

    const deleteItem = () => {
        dispatch(removeItem(item.product._id))
    }



  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center gap-1">
        <div className="w-[60px] aspect-square">
          <img src={item.product.images[0]} className="w-[70px]" alt={item.product.name} />
        </div>
        <div className="max-w-[150px] sm:max-w-[200px]">
          <p className="font-semibold truncate max-w-[25ch]">{item.product.name}</p>
          <p className="text-sm">{item.quantity} * {item.product.price}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div>
          <button onClick={removeOneFromCart} className="bg-slate-800 text-white px-2 py-2 rounded-s-md border-r cursor-pointer"><FaMinus className="size-3" /></button>
          <button onClick={addOneToCart} className="bg-slate-800 text-white px-2 py-2 rounded-e-md cursor-pointer"><FaPlus className="size-3" /></button>
        </div>
        <button onClick={deleteItem} className="p-1 cursor-pointer"><FaTrash className="text-red-800" /></button>
      </div>
    </div>
  );
};

export default CartItem;