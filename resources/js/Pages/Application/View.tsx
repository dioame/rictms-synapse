import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

export default function Index({ auth, results }: any) {
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
      </div>
    </AuthenticatedLayout>
  );
}
