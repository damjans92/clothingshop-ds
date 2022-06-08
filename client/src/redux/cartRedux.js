import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      const itemExists = state.products.find(
        (i) => i._id === action.payload._id
      );
      if (itemExists) {
        const itemIndex = state.products.findIndex(
          (i) => i._id === action.payload._id
        );
        state.products[itemIndex].quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
        state.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
        state.quantity += action.payload.quantity;
      }
    },
    addProductQty: (state, action) => {
      const itemExists = state.products.find(
        (i) => i._id === action.payload._id
      );
      if (itemExists) {
        const itemIndex = state.products.findIndex(
          (i) => i._id === action.payload._id
        );
        state.products[itemIndex].quantity += 1;
        state.total += action.payload.price;
        state.quantity += 1;
      } else {
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
        state.quantity += action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (i) => i._id === action.payload._id
      );
      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        state.quantity -= 1;
      } else {
        return;
      }

      state.total -= action.payload.price;
    },
    removeProductFromCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (i) => i._id === action.payload._id
      );

      state.products.splice(state.products[itemIndex], 1);

      state.total -= action.payload.price * action.payload.quantity;
      state.quantity -= action.payload.quantity;
    },
    emptyCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});
export const {
  addProduct,
  addProductQty,
  removeProduct,
  removeProductFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
