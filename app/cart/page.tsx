"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import { formatPrice } from "@/lib/utils";
import Header from "@/components/header";
import CartItem from "@/components/cart-item";
import FinishOrderDialog from "./components/finish-order-dialog";

export default function Cart() {
  const { cart } = useCartReducer();

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return (sumTotal += product.amount * Number(product.price));
    }, 0)
  );

  const router = useRouter();

  function handleReturnToMenu() {
    router.push("/");
  }

  return (
    <>
      <Header />
      {cart.length ? (
        <div className="p-5 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <div className="w-full flex items-center justify-between">
            <h1 className="font-bold">Total:</h1>
            <h1 className="text-lg font-bold">{total}</h1>
          </div>
          <FinishOrderDialog />
        </div>
      ) : (
        <div className="flex items-center flex-col p-5 gap-8 justify-center h-[500px]">
          <h1 className="text-center font-medium">
            Sua comanda está vazia, retorne ao menu para adicionar seus itens
          </h1>
          <Button
            className="bg-mainGreen font-medium rounded-md text-lg w-full hover:bg-mainGreen/60"
            onClick={handleReturnToMenu}
          >
            Ir para o menu
          </Button>
        </div>
      )}
    </>
  );
}
