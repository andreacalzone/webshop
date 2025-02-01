import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(
        (cartItem) => cartItem.product._id === action.payload._id
      );

      if (item) {
        // If the item already exists, increment its quantity
        item.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart immutably
        state.cart.push({ product: action.payload, quantity: 1 });
      }

      // Update total quantity and total price
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeOne: (state, action) => {
      const item = state.cart.find(
        (cartItem) => cartItem.product._id === action.payload
      );

      if (item) {
        if (item.quantity <= 1) {
          // If the quantity is 1 or less, remove the item from the cart
          state.cart = state.cart.filter(
            (cartItem) => cartItem.product._id !== action.payload
          );
        } else {
          // If the quantity is greater than 1, decrement the quantity
          item.quantity -= 1;
        }

        // Update total quantity and total price
        state.totalQuantity -= 1;
        state.totalPrice -= item.product.price;
      }
    },
    removeItem: (state, action) => {
      const item = state.cart.find(
        (cartItem) => cartItem.product._id === action.payload
      );

      if (item) {
        // Remove the item from the cart
        state.cart = state.cart.filter(
          (cartItem) => cartItem.product._id !== action.payload
        );

        // Update total quantity and total price
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.product.price * item.quantity;
      }
    },
    clearCart: (state) => {
      // Reset the cart, totalPrice, and totalQuantity
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeOne, removeItem, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;