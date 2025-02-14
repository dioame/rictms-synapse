import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/ui/table";

export default function DataTable({ data, excludedColumns = [] } : any ) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 }); // Static pagination count per page

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0])
      .filter((key) => !excludedColumns.includes(key))
      .map((key) => ({
        accessorKey: key,
        header: key.replace(/_/g, " ").toUpperCase(),
        cell: ({ getValue } : any) => {
          const value = getValue();
          try {
            const parsed = JSON.parse(value);
            if (typeof parsed === "object" && parsed !== null) {
              return <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(parsed, null, 2)}</pre>;
            }
          } catch (e) {}
          return value;
        },
      }));
  }, [data, excludedColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
