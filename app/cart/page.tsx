"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import { formatPrice } from "@/lib/utils";
import Header from "@/components/header";
import CartItem from "@/components/cart-item";
import { createOrder, createOrderItems } from "@/actions";
import { toast } from "sonner";

export default function Cart() {
  const { cart } = useCartReducer();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return (sumTotal += product.amount * Number(product.price));
    }, 0)
  );

  const router = useRouter();

  function handleReturnToMenu() {
    router.push("/");
  }

  async function handleOpenOrder() {
    setLoading(true);

    const order = await createOrder(name);

    Promise.all(
      cart.map(async (item) => {
        await createOrderItems(order.id, item.id, Number(item.amount));
      })
    )
      .then(() => {
        router.push(`/print/${order.id}`);
      })
      .catch((error) => {
        toast.error(
          "Houve um problema ao criar pedido, tente novamente ou contate o suporte"
        );

        setLoading(false);
      });

    setLoading(false);
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
          <Dialog>
            <DialogTrigger className="bg-mainGreen p-2 font-medium rounded-md text-lg w-full hover:bg-mainGreen/60">
              <h1>Finalizar</h1>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-10">
              <DialogHeader>
                <DialogTitle className="text-defaultText text-center">
                  Se desejar, informe o nome do cliente abaixo
                </DialogTitle>
              </DialogHeader>
              <div className="w-full flex-col flex gap-8 items-center">
                <Input
                  className="w-full font-semibold text-defaultText"
                  placeholder="Nome do cliente"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />

                <Button
                  className="bg-mainGreen hover:bg-mainGreen/60 rounded-md text-white font-medium text-base"
                  onClick={handleOpenOrder}
                  disabled={loading}
                >
                  Gerar comanda
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
