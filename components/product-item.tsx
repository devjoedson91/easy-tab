import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();

  function navigateToOpenOrder(product_id: string) {
    if (!product_id) return;

    router.push(`/order/${product_id}`);
  }

  return (
    <Button
      className="w-full min-h-40 flex justify-between py-1 px-4 bg-secondary hover:bg-bgPages"
      onClick={() => navigateToOpenOrder(product.id)}
    >
      <div className="flex flex-col gap-2 max-w-[60%]">
        <h1 className="overflow-hidden text-start text-ellipsis whitespace-nowrap text-base font-semibold">
          {product.name}
        </h1>
        <p className="text-zinc800 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.description}
        </p>
        <p className="text-start text-base text-yelowDescription font-semibold">
          {formatPrice(Number(product.price))}
        </p>
      </div>
      <div className="relative h-[140px] w-[100px]">
        <Image
          src={product.banner}
          alt={product.name}
          fill
          className="rounded-md object-cover"
        />
      </div>
    </Button>
  );
}
