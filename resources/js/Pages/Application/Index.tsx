import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { CreateSheet} from "./Create";
import { EditSheet } from "./Edit";
import { AttachmentSheet } from "./attachment";
import { RowActions } from "@/Components/DataTable/RowActions";
import { Plus, Trash2, FileArchive, FileArchiveIcon, Files,CalendarIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/Components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card"

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
import { getInitials } from "@/hooks/helpers";

const config = {
    title: 'Application',
    route: 'application'
}

export default function Index({ auth }: any) {
  const { results, message, roles, filters, lib_deployment_req } = usePage<any>().props;
  const { delete: destroy } = useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAttachmentSheetOpen, setIsAttachmentSheetOpen] = useState(false);
  const [editData, setEditData]  = useState();

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value: any) => (
        <div className="flex gap-4 items-center">
          <div className="flex overflow-hidden justify-center items-center font-semibold rounded-full size-10 bg-muted text-primary/80">
            { getInitials(value.name)}
          </div>
          <div>
            <div className="font-medium">
              <Link className="hover:underline" href="#">
                {value.name}
              </Link>
            </div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {value.version}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "platform",
      label: "Platform",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "tech_stack",
      label: "Tech Stack",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "is_pia",
      label: "Is PIA?",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "division",
      label: "Division",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "section",
      label: "Section",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "request_status",
      label: "Request Status",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "attachment",
      label: "Attachment",
      className: "text-center",
      render: (value: any) => (
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger asChild>
            <Button variant="link" disabled={!value.attachments || value.attachments.length === 0}>
              {value.attachments && <FileArchiveIcon />}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
          <div className="space-y-1">
            {value.attachments && value.attachments.length > 0 ? (
              value.attachments.map((val:any, index:any) => (
                <a href={`storage/deployment-files/${val.path}`} target="_blank" key={index}>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-in-out">
                    <div className="flex flex-col">
                      <h6 className="text-xs font-semibold text-gray-800">{val.lib_deployment_attachment?.name}</h6>
                      <p className="text-xs text-gray-500 truncate">{val?.path}</p>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No attachments available</p>
            )}
          </div>
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-center",
      render: (value: any) => (
        <RowActions
          item={value}
          actions={[
            {
              label: "View More",
              href: route(`${config.route}.show`,{id:value.id})
            },
            {
              label: "Print Request",
              href: route(`${config.route}-request`,{id:value.id})
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
              label: "Attachment",
              onClick: () => handleEditAttachment(value),
            },
            {
              label: "",
              separator: true
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

  const handleEditAttachment = (item: any) => {
    setIsAttachmentSheetOpen(true);
    setEditData(item);
  }

  const handleSelectionChange = (ids: number[]) => {
    setSelectedIds(ids);
  };

  const handleBulkDelete = () => {

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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white border-b-4 border-blue-500 pb-2 pl-5 mb-5">
        { config.title }
      </h1>
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

        { editData && (
        <Sheet open={isAttachmentSheetOpen} onOpenChange={setIsAttachmentSheetOpen}>
          <AttachmentSheet config={config} editData={editData} setIsSheetOpen={setIsAttachmentSheetOpen} LibDeploymentReq={lib_deployment_req}/>
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
