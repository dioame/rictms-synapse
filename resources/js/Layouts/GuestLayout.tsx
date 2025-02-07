import { PropsWithChildren } from "react";
import { Toaster } from "@/Components/ui/sonner";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center pt-6 min-h-screen sm:justify-center sm:pt-0">
      <div className="">{children}</div>
      <Toaster />
    </div>
  );
}
