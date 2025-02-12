import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { DataTableReadOnlyWrapper } from "@/Components/DataTable/DataTableReadOnlyWrapper";
import { RowActions } from "@/Components/DataTable/RowActions";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/Components/ui/dialog"
import { useState } from "react";
import { getInitials } from "@/hooks/helpers";

const config = {
    title: 'SQA UAT',
    route: 'application'
}

export default function Index({ auth }: any) {
  const { results, message, roles, filters, lib_deployment_req } = usePage<any>().props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>([]);

  const toggleDialog = (value:any) => {
    setSelectedData(value)
    setIsOpen(!isOpen);
  };


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
      key: "status",
      label: "Status",
      className: "hidden sm:table-cell text-center",
    },
    {
      key: "sqa_uat",
      label: "# UATs",
      className: "text-center",
      render: (value: any) => (
        <p className="bg-teal-500 text-white font-semibold text-xs w-7 h-7 flex items-center justify-center rounded-full">{value.sqa_uat.length}</p>
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
              label: "View UAT",
              href: route(`${config.route}.sqa.uat.view`,{id:value.id})
            },
            {
              label: "Generate QR",
              onClick: () => toggleDialog(value),
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
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generated QR</DialogTitle>
          <DialogDescription>
            Please scan the QR code or download the image.
          </DialogDescription>
        </DialogHeader>
        {selectedData?.id ? (
          <div className="grid gap-4 py-4 justify-center items-center">
            <h1 className="flex justify-center items-center gap-2 text-center text-teal-500">
              <b>{selectedData.name}</b>
            </h1>
            <div className="flex justify-center">
              <QRCode value={route('client-uat', { id: selectedData.id })} size={256} />
            </div>
            <a
              href={route('client-uat', { id: selectedData.id })}
              className="flex justify-center items-center gap-2 text-center text-blue-500"
              target="_blank"
            >
              {route('client-uat', { id: selectedData.id })}
            </a>
          </div>
        ) : (
          <p className="text-red-500">ID is missing</p>
        )}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </AuthenticatedLayout>
  );
}
