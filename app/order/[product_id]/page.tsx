"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Product } from "@prisma/client";
import Loading from "@/components/loading";
import Header from "@/components/header";
import { getProductsById } from "@/actions";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";

type OrderProps = {
  params: {
    product_id: string;
  };
};

export default function Order({ params }: OrderProps) {
  // const searchParams = useSearchParams();

  const { cart, addToCart, removeFromCart } = useCartReducer();

  // const product_id = searchParams.get("product_id") as string;

  const [product, setProduct] = useState({} as Product);

  const productExists = cart.find(
    (product) => product.id === params.product_id
  );

  useEffect(() => {
    async function loadProduct() {
      const product = await getProductsById(params.product_id);

      setProduct(product as Product);
    }

    loadProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddItemCart() {
    addToCart(product as Product);
  }

  function handleRemoveItemCart(product: Product) {
    removeFromCart(product.id);
  }

  if (!product.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 flex flex-col gap-4">
        <div className="relative w-full h-44">
          <Image
            src={product.banner}
            alt={product.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <h1 className="font-bold text-xl">{product.name}</h1>
        <p className="font-medium text-zinc800 text-base">
          {product.description}
        </p>

        <div className="w-full h-24 border-t border-t-secondary flex justify-around items-center">
          <div className="flex items-center justify-evenly rounded-lg border border-secondary w-40 h-12">
            <button
              onClick={() => handleRemoveItemCart(productExists as Product)}
              disabled={
                (productExists?.amount as number) === 0 || !productExists
              }
            >
              <Minus size={22} color="#979797" />
            </button>
            <h1 className="text-base text-yelowDescription font-bold">
              {productExists ? productExists.amount : 0}
            </h1>
            <button onClick={handleAddItemCart}>
              <Plus size={22} color="#979797" />
            </button>
          </div>
          <Button
            className="rounded-md bg-bgButton hover:bg-bgButton/60 flex justify-center px-3 items-center w-40 h-12"
            onClick={handleAddItemCart}
          >
            <h1 className="font-bold text-base">Adicionar</h1>
          </Button>
        </div>
      </div>
    </>
  );
}
