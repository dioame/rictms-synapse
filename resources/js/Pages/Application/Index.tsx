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
    title: 'Application',
    route: 'application'
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
      key: "name",
      label: "Name",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "description",
      label: "Description",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "version",
      label: "Version",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "application_type",
      label: "Type",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "frontend_framework",
      label: "Frontend Framework",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "backend_framework",
      label: "Backend Framework",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "sqa_status",
      label: "SQA Status",
      className: "hidden sm:table-cell text-right",
    },
    // {
    //   key: "repository",
    //   label: "Repository",
    //   className: "hidden sm:table-cell text-right",
    // },
    {
      key: "is_pia",
      label: "Is PIA?",
      className: "hidden sm:table-cell text-right",
    },
    // {
    //   key: "author",
    //   label: "Author?",
    //   className: "hidden sm:table-cell text-right",
    // },
    // {
    //   key: "developer",
    //   label: "Developer",
    //   className: "hidden sm:table-cell text-right",
    // },
    {
      key: "division",
      label: "Division",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "section",
      label: "Section",
      className: "hidden sm:table-cell text-right",
    },
    // {
    //   key: "region",
    //   label: "Region",
    //   className: "hidden sm:table-cell text-right",
    // },
    // {
    //   key: "url",
    //   label: "Url",
    //   className: "hidden sm:table-cell text-right",
    // },
    // {
    //   key: "deployment_date",
    //   label: "Deployment Date",
    //   className: "hidden sm:table-cell text-right",
    // },
    {
      key: "request_status",
      label: "Request Status",
      className: "hidden sm:table-cell text-right",
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
              href: route('application.show',{id:value.id})
            },
            {
              label: "Print Request",
              href: route('application-request',{id:value.id})
            },
            {
              label: "",
              separator: true
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
              confirmationMessage: `Are you sure you want to delete ${value.name}?`,
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
