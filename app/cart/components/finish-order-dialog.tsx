import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import { createOrder, createOrderItems } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SheetDescription } from "@/components/ui/sheet";

export default function FinishOrderDialog() {
  const router = useRouter();

  const { cart } = useCartReducer();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

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
      });

    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-mainGreen p-2 font-medium rounded-md text-lg w-fit hover:bg-mainGreen/60">
        <h1>Finalizar</h1>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10">
        <DialogHeader>
          <DialogTitle className="text-defaultText text-center">
            Se desejar, informe o nome do cliente abaixo
          </DialogTitle>
          <SheetDescription />
        </DialogHeader>
        <div className="w-full flex-col flex gap-8 items-center">
          <Input
            className="w-full font-semibold text-defaultText"
            placeholder="Cliente"
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
  );
}
