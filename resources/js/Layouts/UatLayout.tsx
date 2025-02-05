import { Toaster } from "@/Components/ui/sonner";
export default function UatLayout({
  children,
}:any) {
  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4 pt-8">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
