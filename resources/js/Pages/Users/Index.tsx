import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { PageProps, User, UsersPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { DataTableWrapper } from "@/Components/DataTable/DataTableWrapper";
import { Badge } from "@/Components/ui/badge";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { CreateUserSheet } from "./Create";
import { EditUserSheet } from "./Edit";
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
export default function Users({ auth }: PageProps) {
  const { users, message, roles, filters } = usePage<UsersPageProps>().props;
  const { delete: destroy } = useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editData, setEditData]  = useState<User>();

  const handleDelete = (user: User) => {
    destroy(route("users.destroy", user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`User ${user.name} deleted successfully`);
      },
    });
  };

  const handleEdit = (user: User) => {
    setIsSheetOpen(true);
    setEditData(user);
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
      key: "user",
      label: "User",
      render: (user: User) => (
        <div className="flex gap-4 items-center">
          <div className="flex overflow-hidden justify-center items-center font-semibold rounded-full size-10 bg-muted text-primary/80">
            {user.avatar ? (
              <img
                src={`${user.avatar}`}
                alt="User Avatar"
                className="object-cover object-center size-full"
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div>
            <div className="font-medium">
              <Link className="hover:underline" href={`/users/${user.id}`}>
                {user.name}
              </Link>
            </div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "roles",
      label: "Role",
      className: "hidden sm:table-cell text-center",
      render: (user: User) => (
        <Badge className="text-xs" variant="outline">
          {user.roles.join(", ")}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Created",
      className: "hidden sm:table-cell text-right",
    },
    {
      key: "updated_at",
      label: "Last Updated",
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
      <DataTableWrapper<User>
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
        routePrefix="users"
        filters={filters}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        onBulkDelete={(ids) => setShowDeleteDialog(true)}
        createButton={{
          label: "Create User",
          sheet: <CreateUserSheet roles={roles} />,
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
        <EditUserSheet roles={roles} editData={editData}/>
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
