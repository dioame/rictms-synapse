import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { CreateSheet} from "./Create";
import { EditSheet } from "./Edit";
import { AttachmentSheet } from "./attachment";
import { FeatureSheet } from "./feature";
import { RowActions } from "@/Components/DataTable/RowActions";
import { CheckCircle, XCircle, FileArchiveIcon, Laptop, Smartphone, Globe ,ChevronsUp,ChevronsDown, BadgeCheck, FlaskConical, Bug, Wrench, Rocket} from "lucide-react";

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
    title: 'Application Request',
    route: 'application'
}

export default function Index({ auth }: any) {
  const { results, message, roles, filters, lib_deployment_req } = usePage<any>().props;
  const { delete: destroy } = useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAttachmentSheetOpen, setIsAttachmentSheetOpen] = useState(false);
  const [isFeatureSheetOpen, setIsFeatureSheetOpen] = useState(false);
  const [editData, setEditData]  = useState();

  console.log(results)

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value: any) => (
        <div className="flex gap-4 items-center">
          {value.uptime?.is_up ?  <ChevronsUp size={20} className="text-green-500"/> : <ChevronsDown size={20} className="text-red-500"/>}       
          <div className="flex overflow-hidden justify-center items-center font-semibold rounded-full size-10 bg-muted text-primary/80">
            { getInitials(value.name)}
          </div>
          <div>
            <div className="font-medium">
              
              <a className="hover:underline" href={value.url} target="_blank">
                {value.name} ({value.abbr}) 
              </a>
            </div>
            <div className="hidden text-sm text-muted-foreground md:inline">
            Ver. {value.version} 
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "platform",
      label: "Platform",
      className: "hidden sm:table-cell text-left",
      render: (value: { platform: "web" | "desktop" | "mobile" }) => {
        const platformIcons: Record<"web" | "desktop" | "mobile", JSX.Element> = {
          web: <Globe className="w-5 h-5 text-blue-500" />,
          desktop: <Laptop className="w-5 h-5 text-gray-500" />,
          mobile: <Smartphone className="w-5 h-5 text-green-500" />,
        };
    
        return (
          <div className="flex items-left justify-left gap-2">
            {platformIcons[value.platform] ?? <span className="text-gray-500">Unknown</span>}
            <span className="font-medium capitalize">{value.platform}</span>
          </div>
        );
      },
    },
    {
      key: "tech_stack",
      label: "Tech Stack",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "status",
      label: "Status",
      className: "hidden sm:table-cell text-center",
      render: (params: { status: "staging" | "testing" | "uat" | "development" | "production" }) => {
        const statusConfig: Record<typeof params.status, { label: string; color: string; icon: JSX.Element }> = {
          staging: { label: "Staging", color: "bg-yellow-500 text-white", icon: <FlaskConical className="w-3 h-3" /> },
          testing: { label: "Testing", color: "bg-blue-500 text-white", icon: <Bug className="w-3 h-3" /> },
          uat: { label: "UAT", color: "bg-purple-500 text-white", icon: <Wrench className="w-3 h-3" /> },
          development: { label: "Development", color: "bg-gray-500 text-white", icon: <FlaskConical className="w-3 h-3" /> },
          production: { label: "Production", color: "bg-green-500 text-white", icon: <Rocket className="w-3 h-3" /> },
        };
    
        const { label, color, icon } = statusConfig[params.status] || {
          label: "Unknown",
          color: "bg-gray-300 text-gray-700",
          icon: null,
        };
    
        return (
          <div className="flex items-left justify-left">
            <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${color}`}>
              {icon}
              <span className="font-medium">{label}</span>
            </span>
          </div>
        );
      },
    },
    {
      key: "request_status",
      label: "Request Status",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "requirement_remarks",
      label: "Requirement Remarks",
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
              {value.attachments && <FileArchiveIcon />} {value.attachments.length ? value.attachments.length : ''}

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
      key: "features",
      label: "Features",
      className: "text-center",
      render: (value: any) => (
        <p className="bg-teal-500 text-white font-semibold text-xs w-7 h-7 flex items-center justify-center rounded-full">{value.features_count}</p>
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
              label: "Print Request",
              href: route(`${config.route}-request-form`,{id:value.id})
            },
            {
              label: "Edit Details",
              onClick: () => handleEdit(value),
            },
            {
              label: "Add Attachment",
              onClick: () => handleEditAttachment(value),
            },
            {
              label: "Add Features",
              onClick: () => handleFeatures(value),
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

  const handleFeatures = (item: any) => {
    setIsFeatureSheetOpen(true);
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
          hasButton: true
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

        { editData && (
        <Sheet open={isFeatureSheetOpen} onOpenChange={setIsFeatureSheetOpen}>
          <FeatureSheet config={config} editData={editData} setIsSheetOpen={setIsFeatureSheetOpen}/>
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
