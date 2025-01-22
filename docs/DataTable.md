# DataTable Component Documentation

The DataTable component provides a reusable table interface with built-in search, pagination, and action handling capabilities.

## Prerequisites

- Laravel with Inertia.js
- React + TypeScript
- Shadcn UI components

## Installation

1. Create the following folder structure:

  ```bash
  resources/js/Components/DataTable/
  ├── DataTableWrapper.tsx
  └── RowActions.tsx
  ```

2. Install required dependencies:

  ```bash
  npm install use-debounce lucide-react sonner
  ```

## Basic Usage

Here's a complete example of how to implement the DataTable:

  ```tsx
  import { DataTableWrapper } from "@/Components/DataTable/DataTableWrapper";
  import { RowActions } from "@/Components/DataTable/RowActions";
  import { router } from "@inertiajs/react";
  import { toast } from "sonner";

  interface YourDataType {
    id: number;
    name: string;
    email: string;
  }

  export default function YourComponent({ data, filters }) {
    const handleDelete = async (item: YourDataType) => {
      try {
        await router.delete(`/items/${item.id}`);
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error("Failed to delete item");
      }
    };

    const columns = [
      {
        key: "name",
        label: "Name",
      },
      {
        key: "email",
        label: "Email",
        className: "hidden sm:table-cell",
      },
      {
        key: "actions",
        label: "Actions",
        className: "text-right",
        render: (item: YourDataType) => (
          <RowActions
            item={item}
            actions={[
              {
                label: "Edit",
                href: `/items/${item.id}/edit`,
              },
              {
                label: "Delete",
                onClick: () => handleDelete(item),
                requiresConfirmation: true,
                confirmationMessage: `Are you sure you want to delete ${item.name}?`,
                variant: "destructive"
              }
            ]}
          />
        ),
      },
    ];

    return (
      <DataTableWrapper<YourDataType>
        data={data}
        columns={columns}
        searchPlaceholder="Search by name or email..."
        routePrefix="items"
        filters={filters}
        createButton={{
          label: "Create Item",
          sheet: <CreateItemSheet />,
        }}
      />
    );
  }
  ```

## Backend Integration

Your Laravel controller should implement the following structure:

  ```php
  declare(strict_types=1);

  namespace App\Http\Controllers;

  use App\Models\Item;
  use App\Http\Resources\ItemResource;
  use Illuminate\Http\Request;
  use Inertia\Response;

  class ItemController extends Controller
  {
      public function index(Request $request): Response
      {
          $search = $request->input('search');

          $items = Item::query()
              ->when($search, function ($query, $search) {
                  $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
              })
              ->latest()
              ->paginate(10);

          return Inertia::render('Items/Index', [
              'items' => ItemResource::collection($items),
              'filters' => [
                  'search' => $search
              ]
          ]);
      }

      public function destroy(Item $item)
      {
          $item->delete();

          return redirect()->back()->with('success', 'Item deleted successfully');
      }
  }
  ```

## Component Props

### DataTableWrapper Props

  ```typescript
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
    createButton?: {
      label: string;
      sheet: React.ReactNode;
    };
  }
  ```

### Column Definition

  ```typescript
  interface Column<T> {
    key: string;
    label: string;
    className?: string;
    render?: (item: T) => React.ReactNode;
  }
  ```

### RowActions Props

  ```typescript
  interface Action {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "destructive";
    requiresConfirmation?: boolean;
    confirmationMessage?: string;
  }

  interface RowActionsProps {
    item: any;
    actions: Action[];
  }
  ```

## Features

- Type-safe with TypeScript generics
- Built-in search with debouncing
- Automatic pagination
- Customizable columns with render functions
- Row actions with confirmation dialogs
- Optional create button with sheet/modal
- Responsive design

> **Note:** Make sure you have all the required Shadcn UI components installed and properly configured in your project.
