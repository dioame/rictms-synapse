import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  path: string;
  links: { url: string | null; label: string; active: boolean }[];
}

interface PaginationProps {
  pagination: PaginationMeta;
}

export default function Paginations({ pagination }: PaginationProps) {
  const { current_page, last_page } = pagination;
  const maxVisiblePages = 10;

  // Generate page numbers
  let pages: (number | string)[] = [];
  
  if (last_page <= maxVisiblePages) {
    pages = Array.from({ length: last_page }, (_, i) => i + 1);
  } else {
    const startPage = Math.max(2, current_page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(last_page - 1, startPage + maxVisiblePages - 2);

    pages = [1];

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < last_page - 1) {
      pages.push("...");
    }

    pages.push(last_page);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${Math.max(current_page - 1, 1)}`}
            className={current_page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <PaginationLink
                href={`?page=${page}`}
                className={`inline-flex justify-center items-center w-10 h-10 text-sm font-medium whitespace-nowrap rounded-md transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  page === current_page ? "border border-muted" : "hover:bg-muted"
                }`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${Math.min(current_page + 1, last_page)}`}
            className={current_page === last_page ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
