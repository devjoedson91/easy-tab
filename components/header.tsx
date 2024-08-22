"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ClipboardList, MenuIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import Logo from "@/assets/logo.png";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();

  const { cart, removeCart } = useCartReducer();

  const [clientCart, setClientCart] = useState<any[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    setClientCart(cart);
  }, [cart]);

  function handleNavigateToCart() {
    router.push("/cart");
  }

  function handleRemoveCart() {
    removeCart();
  }

  function handleBackNavigation() {
    router.back();
  }

  return (
    <div
      className="flex items-center px-4 justify-between border-b w-full h-24 border-gray100"
      suppressHydrationWarning
    >
      {pathname === "/" ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon size={30} />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      ) : (
        <Button size="icon" variant="outline" onClick={handleBackNavigation}>
          <ChevronLeft size={30} />
        </Button>
      )}

      {pathname === "/cart" ? (
        <h1 className="text-xl font-bold">Easy Tab</h1>
      ) : (
        <Image
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          className="drop-shadow-3xl"
        />
      )}

      {pathname === "/cart" && cart.length ? (
        <Dialog>
          <DialogTrigger className="bg-transparent hover:bg-transparent relative">
            <Trash2 size={30} color="#D73A21" />
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle className="text-defaultText text-center">
                Deseja realmente excluir sua comanda?
              </DialogTitle>
            </DialogHeader>
            <div className="w-full flex justify-around items-center">
              <DialogClose asChild>
                <Button
                  className="bg-mainGreen hover:bg-mainGreen/60 text-white font-medium text-base"
                  onClick={handleRemoveCart}
                >
                  Sim
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-red500 hover:bg-red500/60 text-white font-medium text-base">
                  Voltar
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="relative" suppressHydrationWarning>
          <Button size="icon" variant="outline" onClick={handleNavigateToCart}>
            <ClipboardList size={30} />
          </Button>
          {clientCart.length > 0 && (
            <div className="flex items-center justify-center bg-red500 w-5 h-5 rounded-xl absolute -bottom-[2px] -left-1">
              <p className="text-xs text-white font-bold">
                {clientCart.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
