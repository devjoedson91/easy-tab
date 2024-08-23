import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartProduct extends Product {
  amount: number;
  total: number;
}

interface CartStateData {
  cart: CartProduct[];
}

const storagedCart =
  typeof window !== "undefined"
    ? window.localStorage.getItem("@easytab:cart")
    : false;

const initialState: CartStateData = {
  cart: storagedCart ? JSON.parse(storagedCart) : [],
};

export const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addItemCart(state, action: PayloadAction<CartProduct>) {
      const newProduct = action.payload;

      const productExists = state.cart.find(
        (item) => item.id === newProduct.id
      );

      if (productExists) {
        productExists.amount++;

        productExists.total += Number(newProduct.price);

        return;
      }

      state.cart.push({
        ...newProduct,
        amount: 1,
        total: Number(newProduct.price),
      });
    },
    removeItemCart(state, action: PayloadAction<string>) {
      const product_id = action.payload;

      const productExists = state.cart.find((item) => item.id === product_id);

      if (productExists) {
        if (productExists.amount === 1) {
          state.cart = state.cart.filter((item) => item.id !== product_id);
        } else {
          productExists.amount--;
          productExists.total -= Number(productExists.price);
        }
      }
    },
    remove(state) {
      state.cart = [];
    },
  },
});

export const { addItemCart, removeItemCart, remove } = cartSlice.actions;

export default cartSlice.reducer;
