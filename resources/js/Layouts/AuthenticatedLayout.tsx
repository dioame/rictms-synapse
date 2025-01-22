import { PropsWithChildren } from "react";
import { Head } from "@inertiajs/react";
import { User } from "@/types";
import { AppSidebar } from "@/Components/app-sidebar";
import { Breadcrumbs } from "@/Components/Breadcrumb";
import { Separator } from "@/Components/ui/separator";
import { ModeToggle } from "@/Components/ThemeToggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/sonner";
export default function Authenticated({
  auth_user,
  header,
  children,
}: PropsWithChildren<{ auth_user: User; header?: string }>) {
  return (
    <SidebarProvider>
    <Head title={header} />
    <AppSidebar user={auth_user} />
    <SidebarInset className="!mt-0 flex flex-col h-full">
      <header className="flex sticky top-0 z-10 gap-2 items-center h-16 border-b shrink-0 bg-background">
        <div className="flex gap-2 items-center px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs user={auth_user} />
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 pt-8">
        {children}
      </div>
      <Toaster />
    </SidebarInset>
  </SidebarProvider>
  );
}
