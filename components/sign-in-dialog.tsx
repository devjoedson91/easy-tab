import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import LogoGoogle from "@/assets/google.svg";

export default function SignInDialog() {
  function handleLoginWithGoogleClick() {
    signIn("google");
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-defaultText text-center">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription className="text-center">
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-1 font-bold text-defaultText"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src={LogoGoogle}
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  );
}
