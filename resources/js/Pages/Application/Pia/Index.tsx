import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { AttachmentSheet } from "./attachment";
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
    title: 'Application Privacy Impact Assessment',
    route: 'application'
}

export default function Index({ auth }: any) {
  const { results, message, roles, filters, lib_deployment_req } = usePage<any>().props;
  const hasRole = (role: string) => auth.roles.includes(role);
  
  const [isAttachmentSheetOpen, setIsAttachmentSheetOpen] = useState(false);
  const [editData, setEditData]  = useState();



  const columns = [
    {
        key: "is_pia",
        label: "Is PIA?",
        className: "hidden sm:table-cell text-center",
        render: (value: { is_pia: any }) => {
          const isYes = value.is_pia == 1;
      
          return (
            <div className="flex items-center justify-center gap-2 ml-5 mr-5">
              {isYes ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className={`font-medium ${isYes ? "text-green-600" : "text-red-600"}`}>
                {isYes ? "Yes" : "No"}
              </span>
            </div>
          );
        },
      },
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
      key: "system_owner",
      label: "System Owner",
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
                <a href={`/storage/deployment-files/${val.path}`} target="_blank" key={index}>
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
              label: "View More",
              href: route(`${config.route}.show`,{id:value.id})
            },
            // {
            //   label: "Edit Status",
            //   onClick: () => handleEdit(value),
            //   visible: !hasRole('user')
            // },
            {
              label: "Add PIA Attachment",
              onClick: () => handleEditAttachment(value),
              visible: !hasRole('user')
            },
          ]}
        />
      ),
    },
  ];




  const handleEditAttachment = (item: any) => {
    setIsAttachmentSheetOpen(true);
    setEditData(item);
  }
  

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
        onBulkDelete={(ids:any) => false}
        createButton={{
          label: `Add ${config.title}`,
          sheet: <></>,
          hasButton: false
        }}
      />

        { editData && (
        <Sheet open={isAttachmentSheetOpen} onOpenChange={setIsAttachmentSheetOpen}>
          <AttachmentSheet config={config} editData={editData} setIsSheetOpen={setIsAttachmentSheetOpen} LibDeploymentReq={lib_deployment_req}/>
        </Sheet>
         )}


         


    </AuthenticatedLayout>
  );
}
