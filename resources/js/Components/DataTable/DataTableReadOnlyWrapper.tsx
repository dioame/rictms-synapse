import React, { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { Plus, Trash2 } from "lucide-react";
import Paginations from "@/Components/Pagination";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";
import { Checkbox } from "@/Components/ui/checkbox";

interface Column<T> {
  key: string;
  label: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: {
    data: T[];
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
      path: string;
      links: { url: string | null; label: string; active: boolean }[];
    };
  };
  columns: Column<T>[];
  searchPlaceholder?: string;
  routePrefix: string;
  filters?: Record<string, any>;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: number[]) => void;
  onBulkDelete?: (selectedIds: number[]) => void;
}


export function DataTableReadOnlyWrapper({
  data,
  columns,
  searchPlaceholder = "Search...",
  routePrefix,
  filters,
  selectable = false,
  onSelectionChange,
  onBulkDelete,
}: DataTableProps<any>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);



  const handleSearch = useDebouncedCallback((term: string) => {
    router.get(window.location.href,
      { search: term },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  }, 300);

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? data.data.map((item:any) => item.id) : [];
    setSelectedRows(newSelectedRows);
    onSelectionChange?.(newSelectedRows);
  };

  const handleSelectRow = (checked: boolean, id: number) => {
    const newSelectedRows = checked
      ? [...selectedRows, id]
      : selectedRows.filter((rowId) => rowId !== id);
    setSelectedRows(newSelectedRows);
    onSelectionChange?.(newSelectedRows);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
              {data.meta.total} Results Found
            </p>
          </div>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full md:w-[300px]"
            defaultValue={filters?.search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          
        </div>
        
      </div>

      <Table>
        <TableHeader style={{ backgroundColor: "black"}}>
          <TableRow>
         
         
            {columns.map((column:any) => (
              <TableHead key={column.key} className={column.className} style={{color:"white",padding:"4px",textAlign: "center"}}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item:any) => (
            <TableRow key={item.id}>


              {columns.map((column:any) => (
                <TableCell
                  key={`${item.id}-${column.key}`}
                  className={column.className}
                  style={{padding:"0px"}}
                >
                  {column.render ? column.render(item) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data.meta.last_page > 1 && <Paginations pagination={data.meta} />}
    </div>
  );
}