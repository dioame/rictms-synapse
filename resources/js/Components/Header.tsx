import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import { Package } from "lucide-react";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/Components/ThemeToggle";
import { Breadcrumbs } from "@/Components/Breadcrumb";
import { User } from "@/types";

export function Header({ user }: { user: User }) {
  return (
    <header className="flex w-full h-14 items-center gap-4 border-b bg-muted/40 backdrop-blur-md px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
      <Breadcrumbs user={user} />
      <div className="flex gap-4 justify-end items-center mx-auto w-full max-w-[1440px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex gap-2 items-center text-lg font-semibold" // Added hover effect
              >
                <Package className="w-6 h-6" />
                <span className="sr-only">SyNAPSE</span>
              </Link>
              {/* Repeat Links for Dashboard, Orders, etc. */}
            </nav>
          </SheetContent>
        </Sheet>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="w-5 h-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={route("profile.edit")} className="">
                Settings
              </Link>{" "}
              {/* Added hover effect */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={route("logout")} method="post" className="">
                Log Out
              </Link>{" "}
              {/* Added hover effect */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
