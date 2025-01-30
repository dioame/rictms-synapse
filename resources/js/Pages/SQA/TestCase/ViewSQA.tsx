import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { CustomDataTableWrapper } from "@/Components/DataTable/CustomDataTableWrapper";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { CreateSheet} from "./SQACreate";
import { EditSheet } from "./SQAEdit";
import { RowActions } from "@/Components/DataTable/RowActions";
import { toast } from "sonner";
import { useState } from "react";




const config = {
  title: 'SQA View Test Case',
  route: 'application'
}

export default function Index({ auth }: any) {
      const { results, message, roles, filters, lib_deployment_req, appId, appName } = usePage<any>().props;
      const { delete: destroy } = useForm();
      const [selectedIds, setSelectedIds] = useState<number[]>([]);
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);
      const [isSheetOpen, setIsSheetOpen] = useState(false);
      const [isAttachmentSheetOpen, setIsAttachmentSheetOpen] = useState(false);
      const [editData, setEditData]  = useState();

    const columns = [
        {
          key: "module",
          label: "Module",
          className: "hidden sm:table-cell text-center",
        },
        {
            key: "test_procedure",
            label: "Test Procedure",
            className: "hidden sm:table-cell text-center",
            render: (value: any) => {

                if (!value.test_procedure) {
                    return "";
                }

              return (
                <ul className="text-left list-inside">
                  {Object.entries(value.test_procedure).map(([key, step], index) => (
                    <li key={key} className="">
                      <strong>Step {index + 1}:</strong> {String(step)}
                    </li>
                  ))}
                </ul>
              );
            },
          },
          {
            key: "expected_result",
            label: "Expected Result",
            className: "hidden sm:table-cell text-center",
            render: (value: any) => {

                if (!value.expected_result) {
                    return "";
                }

              return (
                <ul className="text-left list-inside">
                  {Object.entries(value.expected_result).map(([key, step], index) => (
                    <li key={key} className="">
                      <strong>Step {index + 1}:</strong> {step ? String(step) : 'N/A'}
                    </li>
                  ))}
                </ul>
              );
            },
          },
          
        {
            key: "test_status",
            label: "Test Status",
            className: "hidden sm:table-cell text-center",
        },
        {
            key: "remarks",
            label: "Remarks",
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
                  label: "Edit",
                  onClick: () => handleEdit(value),
                },
                {
                  label: "Delete",
                  onClick: () => handleDelete(value),
                  variant: "destructive",
                  requiresConfirmation: true,
                  confirmationMessage: `Are you sure you want to delete Module ${value.module}?`,
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

    const handleDelete = (item: any) => {
        destroy(route(`${config.route}.sqa.test-case.destroy`, item.id), {
        preserveScroll: true,
        onSuccess: () => {
            // toast.success(`${config.title} ${item.name} deleted successfully`);
            toast.success(`Success!`, {
            description: `${config.title} Test Case deleted successfully`,
            position: "top-center",
            });
        },
        });
    };

    const handleSelectionChange = (ids: number[]) => {
        setSelectedIds(ids);
      };

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Application Details">
      <Head title="Application Details" />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white border-b-4 border-blue-500 pb-3 px-6 mb-6 shadow-md">
        {config.title}
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Application Name
        </h2>
        <p className="text-lg text-blue-700 dark:text-blue-300 font-bold">
          {appName}
        </p>
        </div>

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
            sheet: <CreateSheet config={config} appId={appId}/>,
        }}
        />

          { editData && (
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <EditSheet config={config} editData={editData} setIsSheetOpen={setIsSheetOpen} appId={appId}/>
                </Sheet>
                )}

    </AuthenticatedLayout>
  );
}
