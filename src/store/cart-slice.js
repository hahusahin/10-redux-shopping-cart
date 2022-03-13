import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  cartQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "editItems",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.cartQuantity++;
      state.changed = true;
    },
    removeItem(state, action) {
      const selectedItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (selectedItem.quantity > 1) {
        selectedItem.quantity--;
        selectedItem.totalPrice -= selectedItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      state.cartQuantity--;
      state.changed = true;
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.cartQuantity = action.payload.cartQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
