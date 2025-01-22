import { Link } from "@inertiajs/react";

export function Nav() {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex gap-2 items-center text-lg font-semibold md:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 w-6 h-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
      </Link>
      <Link
        href={route("dashboard")}
        className="transition-colors text-foreground hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href={route("users.index")}
        className="transition-colors text-muted-foreground hover:text-foreground"
      >
        Users
      </Link>
    </nav>
  );
}
