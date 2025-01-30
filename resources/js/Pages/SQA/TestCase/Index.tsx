import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { DataTableReadOnlyWrapper } from "@/Components/DataTable/DataTableReadOnlyWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
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
    title: 'SQA Test Case',
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
      key: "actions",
      label: "Actions",
      className: "text-center",
      render: (value: any) => (
        <RowActions
          item={value}
          actions={[
            {
              label: "View Test Case",
              href: route(`${config.route}.sqa.test-case.view`,{id:value.id})
            },
          ]}
        />
      ),
    },
  ];


  return (
    <AuthenticatedLayout auth_user={auth.user} header={config.title}>
      <Head title={config.title} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white border-b-4 border-blue-500 pb-2 pl-5 mb-5">
        { config.title }
      </h1>
      <DataTableReadOnlyWrapper
        data={results}
        columns={columns}
        searchPlaceholder={`Search ${config.title}...`}
        routePrefix={config.route}
        filters={filters}
        selectable={true}
        onSelectionChange={()=>{}}
        onBulkDelete={()=>{}}
      />
    </AuthenticatedLayout>
  );
}
