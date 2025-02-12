import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogHeader } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { RowActions } from "@/Components/DataTable/RowActions";
import Swal from 'sweetalert2';
import {  useForm  } from "@inertiajs/react";
import { toast } from "sonner";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const config = {
  title: 'Application',
  route: 'application'
}

export default function Index({ auth, results, security }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   const { delete: destroy } = useForm();


  function handleDelete(val:any){
      Swal.fire({
        title: 'Are you sure?',
        text: `Delete ${val.lib_deployment_attachment.name}. This action cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        customClass: {
          popup: 'small-swal-popup',
          confirmButton: 'small-swal-button',
          cancelButton: 'small-swal-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          confirmDelete(val.id);
        }
      });
  }

  function confirmDelete(id:any){
      destroy(route(`${config.route}-attachment.delete`, id), {
        preserveScroll: true,
        onSuccess: () => {
          // toast.success(`${config.title} ${item.name} deleted successfully`);
          toast.success(`Success!`, {
            description: `${config.title} Attachment deleted successfully`,
            position: "top-center",
          });
        },
      });
  }

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Application Details">
      <Head title="Application Details" />

      <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Basic details about the application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-bold">Name:</span> {results.name}
              </div>
              <div>
                <span className="font-bold">Description:</span> {results.description}
              </div>
              <div>
                <span className="font-bold">Version:</span> {results.version}
              </div>
              <div>
                <span className="font-bold">Author:</span> {results.author}
              </div>
              <div>
                <span className="font-bold">Developer:</span> {results.developer}
              </div>
              <div>
                <span className="font-bold">Section:</span> {results.section}
              </div>
              <div>
                <span className="font-bold">Division:</span> {results.division}
              </div>
              <div>
                <span className="font-bold">Region:</span> {results.region}
              </div>
              <div>
                <span className="font-bold">System Owner:</span> {results.system_owner}
              </div>
              <div>
                <span className="font-bold">Location of Deployment:</span> {results.location_of_deployment}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Information */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Information</CardTitle>
            <CardDescription>Details about the application's technology stack</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-bold">Tech Stack</span> {results.tech_stack}
              </div>
              <div>
                <span className="font-bold">Repository:</span> <a href={results.repository} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{results.repository}</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment Information</CardTitle>
            <CardDescription>Information regarding deployment and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-bold">Deployment Date:</span> {new Date(results.deployment_date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-bold">Status:</span> {results.status}
              </div>
              <div>
                <span className="font-bold">URL:</span> <a href={results.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{results.url}</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Information */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Information</CardTitle>
            <CardDescription>Details about the application's compliance and SQA status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-bold">SQA Status:</span>
                <Badge
                  variant={results.sqa_tested === "Yes" ? "default" : "secondary"}
                  className="ml-2"
                >
                  {results.sqa_tested}
                </Badge>
              </div>
              <div>
                <span className="font-bold">PIA Compliance:</span> {results.is_pia}
              </div>
              <div>
                <span className="font-bold">KM Compliance:</span> {results.is_km}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Further details on the system and its usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-bold">Internal Users:</span> {results.internal_users}
              </div>
              <div>
                <span className="font-bold">Number of Internal Users:</span> {results.no_of_internal_users}
              </div>
              <div>
                <span className="font-bold">External Users:</span> {results.external_users}
              </div>
              <div>
                <span className="font-bold">Number of External Users:</span> {results.no_of_external_users}
              </div>
              <div>
                <span className="font-bold">Data Archiving:</span> {results.data_archiving}
              </div>q
              <div>
                <span className="font-bold">Computing Scheme:</span> {results.computing_scheme}
              </div>
              <div>
                <span className="font-bold">Description (General Contents):</span> {results.description_general_contents}
              </div>
              <div>
                <span className="font-bold">Information Systems Served:</span> {results.information_systems_served}
              </div>
            </div>
          </CardContent>
        </Card>

         {/* Additional Information */}
         <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Deployment Attachments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

           
            {results.attachments && results.attachments.length > 0 ? (
                results.attachments.map((val: any, index: any) => (
                  <div key={index}>
                    <span className="font-bold btn-primary btn text-decoration-underline">
                          <button
                            onClick={() => handleDelete(val)}
                            className="text-red-500 mr-1 text-xs"
                            aria-label="Delete"
                          >
                            <XCircleIcon className="w-4 h-4" />
                          </button>
                      {val.lib_deployment_attachment.name} :
                    </span>
                    <a
                      href={`/storage/deployment-files/${val.path}`}
                      className="text-blue-500 underline ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {val.path}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-xs">No attachments available</p>
              )} 

            </div>
          </CardContent>
        </Card>


        <Card>
      <CardHeader>
        <CardTitle>Features</CardTitle>
        <CardDescription>List of features for this application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.features ? (
            // Parse the JSON string into an array
            JSON.parse(results.features).length > 0 ? (
              JSON.parse(results.features).map((feature: any, index: any) => (
                <div key={index}>
                  <span className="font-bold">{index+1}. {feature}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No features available</p>
            )
          ) : (
            <p className="text-gray-500 text-xs">Features data not available</p>
          )}
        </div>
      </CardContent>
    </Card>



    



      </div>
      
      <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-1 gap-6">
      <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Vulnerability Assessment (Initial Review)
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          <strong>Disclaimer:</strong> The Initial Assessment does not represent the final Vulnerability Results. It serves as a preliminary evaluation and should not be interpreted as a confirmed security finding. The final results must be thoroughly analyzed and validated by the DSWD Cybersecurity and Vulnerability Assessment Team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {security.map((check:any, index:any) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                check.isSecure ? "border-green-500 bg-green-50 dark:bg-green-900" : "border-red-500 bg-red-50 dark:bg-red-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{check.name}</h3>
                {check.isSecure ? (
                  <ShieldCheck className="text-green-600 dark:text-green-400" size={20} />
                ) : (
                  <ShieldAlert className="text-red-600 dark:text-red-400" size={20} />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{check.description}</p>
              {!check.isSecure && (
                <p className="text-sm mt-2 text-red-600 dark:text-red-300 font-medium">
                  🔹 Recommendation: {check.recommendation}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>

      
    </AuthenticatedLayout>
  );
}
