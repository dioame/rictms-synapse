import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { EditSheet } from "./Edit";
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
    title: 'Server Details',
    route: 'application'
}

export default function Index({ auth }: any) {
  const { results, message, roles, filters, lib_deployment_req } = usePage<any>().props;
  const hasRole = (role: string) => auth.roles.includes(role);
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editData, setEditData]  = useState();



  const columns = [
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
      key: "url",
      label: "URL",
      className: "hidden sm:table-cell text-left",
      render: (value: any) => (
        <div className="flex gap-4 items-center">
          <a className="hover:underline" href={value.url} target="_blank">
                {value.url}
              </a>
        </div>
      ),
    },

    {
      key: "hostname_of_database",
      label: "DB Host",
      className: "hidden sm:table-cell text-center",
    },

    {
      key: "database_ip_address",
      label: "DB IP",
      className: "hidden sm:table-cell text-center",
    },
   
    {
      key: "requirement_remarks",
      label: "Requirement Remarks",
      className: "hidden sm:table-cell text-center",
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
            {
              label: "Edit Details",
              onClick: () => handleEdit(value),
              visible: !hasRole('user')
            },
          ]}
        />
      ),
    },
  ];


  const handleEdit = (item: any) => {
    setIsSheetOpen(true);
    setEditData(item);
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
        onBulkDelete={(ids:any) => false}
        createButton={{
          label: `Add ${config.title}`,
          sheet: <></>,
          hasButton: false
        }}
      />

               { editData && (
                 <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                   <EditSheet config={config} editData={editData} setIsSheetOpen={setIsSheetOpen}/>
                 </Sheet>
                 )}
         

    </AuthenticatedLayout>
  );
}
