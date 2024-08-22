"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import { formatPrice } from "@/lib/utils";
import Loading from "@/components/loading";
import { deleteOrder, getOrderDetails } from "@/actions";
import { toast } from "sonner";
import { Order, Product } from "@prisma/client";
import { useSession } from "next-auth/react";

type PrintProps = {
  params: {
    order_id: string;
  };
};

interface OrderDetailsProps {
  id: string;
  amount: number;
  product: Product;
  order: Order;
  created_at: Date | null;
}

export default function Print({ params }: PrintProps) {
  const { data } = useSession();

  const { cart, removeCart } = useCartReducer();

  const [items, setItems] = useState<OrderDetailsProps[]>([]);

  const [loading, setLoading] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const [name, setName] = useState<string | null>("");

  const [createdAt, setCreatedAt] = useState<Date | null>(new Date());

  const comandaRef = useRef(null);

  const router = useRouter();

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return (sumTotal += product.amount * Number(product.price));
    }, 0)
  );

  useEffect(() => {
    async function orderDetails() {
      setLoading(true);

      const orderItems = await getOrderDetails(params.order_id);

      setItems(orderItems);

      setName(orderItems[0].order.name);

      setCreatedAt(orderItems[0].created_at);

      setLoading(false);
    }

    params.order_id && orderDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleRemoveOrder() {
    setLoading(true);

    await deleteOrder(params.order_id);

    localStorage.removeItem("@easytab:cart");

    removeCart();

    toast.success("Comanda cancelada com sucesso!");

    router.push("/");
  }

  const handlePrint = useReactToPrint({
    content: () => comandaRef.current,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative">
      <Card
        ref={comandaRef}
        className="bg-yellow-100 rounded-none min-h-screen"
      >
        <CardHeader className="flex flex-col items-center">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex justify-between">
              <p>{createdAt?.toLocaleDateString()}</p>
              <p>{createdAt?.toLocaleTimeString()}</p>
            </div>
            <CardTitle className="text-center text-lg uppercase">
              comprovante de venda
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {isClient ? (
            <>
              <p>
                <strong>Informações do cliente:&nbsp;</strong>
                &nbsp;
                {!name ? "Não informado" : name}
              </p>

              <p>
                <strong>Vendedor:&nbsp;</strong>&nbsp;
                {data?.user ? data.user.name : "Não informado"}
              </p>

              <div className="w-full flex justify-between items-center">
                <p className="font-bold">Itens</p>
                <p className="font-bold">Preço</p>
              </div>
              <div className="flex flex-col gap-1">
                {items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="w-full items-center justify-between flex"
                    >
                      <p>{`${item.amount}x ${item.product.name}`}</p>
                      <p>
                        {formatPrice(item.amount * Number(item.product.price))}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="font-bold">Total:</p>
                <p className="font-bold">{total}</p>
              </div>
              <h1 className="text-center">Obrigado, volte sempre!</h1>
            </>
          ) : null}
        </CardContent>
      </Card>

      <div className="absolute bottom-0 left-0 p-6 flex items-center w-full justify-between">
        <Button
          className="w-32 bg-mainGreen hover:bg-mainGreen rounded-md"
          onClick={handlePrint}
        >
          Imprimir
        </Button>
        <Button
          className="w-32 bg-red500 hover:bg-red500/60 rounded-md"
          onClick={handleRemoveOrder}
          disabled={loading}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
