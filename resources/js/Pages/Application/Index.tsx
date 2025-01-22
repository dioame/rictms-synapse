import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { PageProps, User, UsersPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Badge } from "@/Components/ui/badge";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { CreateSheet } from "./Create";
import { EditSheet } from "./Edit";
import { getInitials } from "@/hooks/helpers";
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

export default function Index({ auth }: any) {
  const { results, message, roles, filters } = usePage().props;
  const { delete: destroy } = useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editData, setEditData]  = useState();

  const handleDelete = (item: any) => {
    destroy(route("users.destroy", item.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`User ${item.name} deleted successfully`);
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

    destroy(route("users.bulk-destroy", { ids: selectedIds }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("users deleted successfully", {
          description: `${selectedIds.length} users deleted successfully`,
          position: "top-center",
        });
        setSelectedIds([]);
        setShowDeleteDialog(false);
      },
      onError: () => {
        toast.error("Failed to delete users", {
          description: "Failed to delete users",
          position: "top-center",
        });
        setShowDeleteDialog(false);
      },
    });
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      className: "hidden sm:table-cell text-right",
    },
    // {
    //   key: "description",
    //   label: "Description",
    //   className: "hidden sm:table-cell text-right",
    // },
    {
      key: "version",
      label: "Version",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "frontend_language",
      label: "Frontend Language",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "frontend_framework",
      label: "Frontend Framework",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "backend_language",
      label: "Backend Language",
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
      key: "status",
      label: "Status",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (user: User) => (
        <RowActions
          item={user}
          actions={[
            {
              label: "View More",
              href: route('application.show',{id:user.id})
            },
            {
              label: "Edit",
              onClick: () => handleEdit(user),
            },
            {
              label: "Delete",
              onClick: () => handleDelete(user),
              variant: "destructive",
              requiresConfirmation: true,
              confirmationMessage: `Are you sure you want to delete ${user.name}?`,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Users">
      <Head title="Users" />
      <CustomDataTableWrapper
        data={results}
        columns={columns}
        searchPlaceholder="Search users..."
        routePrefix="users"
        filters={filters}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        onBulkDelete={(ids:any) => setShowDeleteDialog(true)}
        createButton={{
          label: "Add Applicaton",
          sheet: <CreateSheet />,
        }}
      />

      {isSheetOpen && (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className=""
            onClick={() => setIsSheetOpen(true)}
          >
            <Plus className="mr-2 size-4" />
            Edit User
          </Button>
        </SheetTrigger>
        <EditSheet roles={roles} editData={editData}/>
      </Sheet>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected Users</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.length} users? This
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
              Delete Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
