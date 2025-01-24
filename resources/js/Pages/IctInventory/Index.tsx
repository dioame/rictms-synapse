import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { CreateSheet} from "./Create";
import { EditSheet } from "./Edit";
import { RowActions } from "@/Components/DataTable/RowActions";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { Button } from "@/Components/ui/button";

const config = {
    title: 'ICT Inventory',
    route: 'ict-inventory'
}

export default function Index({ auth }: any) {
  const { results, message, roles, filters } = usePage<any>().props;
  const { delete: destroy } = useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editData, setEditData]  = useState();


  const columns = [
    {
      key: "equipment_name",
      label: "Equipment Name",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "serial_number",
      label: "Serial Number",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "model",
      label: "Model",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "manufacturer",
      label: "Manufacturer",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "location",
      label: "Location",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "status",
      label: "Status",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "purchase_date",
      label: "Purchase Date",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "purchase_price",
      label: "Purchase Price",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "warranty_expiry",
      label: "Warranty Expiry",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "remarks",
      label: "Remarks",
      className: "hidden sm:table-cell text-left",
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (value: any) => (
        <RowActions
          item={value}
          actions={[
            {
              label: "View More",
              href: route(`${config.route}.show`,{id:value.id})
            },
            {
              label: "Edit",
              onClick: () => handleEdit(value),
            },
            {
              label: "Delete",
              onClick: () => handleDelete(value),
              variant: "destructive",
              requiresConfirmation: true,
              confirmationMessage: `Are you sure you want to delete ${value.equipment_name}?`,
            },
          ]}
        />
      ),
    },
  ];


  const handleDelete = (item: any) => {
    destroy(route(`${config.route}.destroy`, item.id), {
      preserveScroll: true,
      onSuccess: () => {
        // toast.success(`${config.title} ${item.name} deleted successfully`);
        toast.success(`Success!`, {
          description: `${config.title} deleted successfully`,
          position: "top-center",
        });
      },
    });
  };

  const handleEdit = (item: any) => {
    setIsSheetOpen(true);
    setEditData(item);
  };

  const handleSelectionChange = (ids: number[]) => {
    setSelectedIds(ids);
  };

  const handleBulkDelete = () => {
    console.log(selectedIds);

    destroy(route(`${config.route}.bulk-destroy`, { ids: selectedIds }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`Success!`, {
          description: `${selectedIds.length} ${config.title} deleted successfully`,
          position: "top-center",
        });
        setSelectedIds([]);
        setShowDeleteDialog(false);
      },
      onError: () => {
        toast.error(`Failed to delete ${config.title}`, {
          description: `Failed to delete ${config.title}`,
          position: "top-center",
        });
        setShowDeleteDialog(false);
      },
    });
  };

  

  return (
    <AuthenticatedLayout auth_user={auth.user} header={config.title}>
      <Head title={config.title} />
      <CustomDataTableWrapper
        data={results}
        columns={columns}
        searchPlaceholder={`Search ${config.title}...`}
        routePrefix={config.route}
        filters={filters}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        onBulkDelete={(ids:any) => setShowDeleteDialog(true)}
        createButton={{
          label: `Add ${config.title}`,
          sheet: <CreateSheet config={config}/>,
        }}
      />

        { editData && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <EditSheet config={config} editData={editData} setIsSheetOpen={setIsSheetOpen}/>
        </Sheet>
        )}
 

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected {config.title}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.length} {config.title}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete {config.title}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
