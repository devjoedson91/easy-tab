import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "@/store";
import {
  addItemCart,
  remove,
  removeItemCart,
} from "@/store/reducers/cartReducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/useAppSelector";
import { Product } from "@prisma/client";

export const useCartReducer = () => {
  const dispatch: AppDispatch = useDispatch();

  const cart = useAppSelector((state: RootState) => state.cartReducer.cart);

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem("@easytab:cart", JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  function addToCart(item: Product) {
    dispatch(addItemCart(item));
  }

  function removeFromCart(product_id: string) {
    dispatch(removeItemCart(product_id));
  }

  function removeCart() {
    dispatch(remove());
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    removeCart,
  };
};
