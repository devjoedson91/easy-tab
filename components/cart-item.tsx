import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import { Product } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export interface CartProps extends Product {
  amount: number;
  total: number;
}

interface CartItemProps {
  item: CartProps;
}

export default function CartItem({ item }: CartItemProps) {
  const { addToCart, removeFromCart } = useCartReducer();

  function handleRemoveItemCart() {
    removeFromCart(item.id);
  }

  function handleAddItemCart() {
    addToCart(item);
  }

  return (
    <Card className="bg-secondary border-none">
      <CardContent className="py-3 px-4 w-full flex items-center justify-between">
        <div className="relative h-32 w-32">
          <Image
            src={item.banner}
            alt={item.name}
            fill
            className="rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col w-36 gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-base text-white font-medium">{item.name}</h1>
            <p className="text-yelowDescription text-base font-medium">
              {formatPrice(item.total)}
            </p>
          </div>
          <div className="border p-2 border-zinc800 rounded-md flex items-center justify-between">
            <button
              onClick={handleRemoveItemCart}
              disabled={(item.amount as number) === 0 || !item}
              data-testid="remove-item"
            >
              <Minus size={22} color="#979797" />
            </button>
            <h1 className="font-bold text-base text-yelowDescription">
              {item.amount}
            </h1>
            <button onClick={handleAddItemCart}>
              <Plus size={22} color="#979797" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
