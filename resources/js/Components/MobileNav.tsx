import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import { Menu, Package2 } from "lucide-react";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex gap-2 items-center text-lg font-semibold"
          >
            <Package2 className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link href="#" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Users
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
