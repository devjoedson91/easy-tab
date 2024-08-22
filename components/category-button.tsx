import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  title: string;
  selected: boolean;
  action: () => void;
}

export default function CategoryButton({
  action,
  selected,
  title,
}: ButtonProps) {
  return (
    <Button
      className={twMerge(
        "border border-gray-100 hover:bg-bgPages bg-bgPages p-3 hover:text-white rounded-lg justify-center items-center",
        selected ? "border-mainGreen bg-secondary border-[3px]" : null
      )}
      onClick={action}
    >
      <h1 className="font-medium text-base w-28">{title}</h1>
    </Button>
  );
}
