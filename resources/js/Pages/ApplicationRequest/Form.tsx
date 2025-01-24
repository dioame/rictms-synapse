import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';

const DeploymentRequestForm = () => {
  // Static form data based on the structure provided
  const formData = {
    id: 1,
    name: "Project Management System",
    description: "A tool to manage and monitor project progress effectively.",
    version: "v2.0.1",
    application_type: "Web Application",
    frontend_language: "JavaScript",
    frontend_framework: "React",
    backend_language: "PHP",
    backend_framework: "Laravel",
    sqa_status: "Approved",
    repository: "https://github.com/example/project-management-system",
    is_pia: true,
    is_km: false,
    author: "Jane Doe",
    developer: "John Smith",
    division: "IT Division",
    section: "Development",
    region: "Region 5",
    url: "https://example.com/project-management",
    deployment_date: "2025-01-25",
    request_status: "Pending",
    status: "Active",
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-6 text-center">Deployment Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Information */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Basic Information:</h3>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Description:</strong> {formData.description}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Version:</strong> {formData.version}</div>
                <div><strong>Application Type:</strong> {formData.application_type}</div>
              </div>
            </section>

            {/* Technical Information */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Technical Information:</h3>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Frontend Language:</strong> {formData.frontend_language}</div>
                <div><strong>Frontend Framework:</strong> {formData.frontend_framework}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Backend Language:</strong> {formData.backend_language}</div>
                <div><strong>Backend Framework:</strong> {formData.backend_framework}</div>
              </div>
            </section>

            {/* Deployment Details */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Deployment Details:</h3>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>SQA Status:</strong> {formData.sqa_status}</div>
                <div>
                  <strong>Repository:</strong>
                  <a href={formData.repository} className="text-blue-600 underline">{formData.repository}</a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Deployment Date:</strong> {formData.deployment_date}</div>
                <div><strong>Status:</strong> {formData.status}</div>
              </div>
            </section>

            {/* Administrative Details */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Administrative Details:</h3>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Author:</strong> {formData.author}</div>
                <div><strong>Developer:</strong> {formData.developer}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Division:</strong> {formData.division}</div>
                <div><strong>Section:</strong> {formData.section}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Region:</strong> {formData.region}</div>
                <div><strong>PIA Compliance:</strong> {formData.is_pia ? "Yes" : "No"}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>KM Compliance:</strong> {formData.is_km ? "Yes" : "No"}</div>
                <div><strong>Request Status:</strong> {formData.request_status}</div>
              </div>
            </section>

            {/* Signatures Section */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Signatures:</h3>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Requestor:</strong> __________________________</div>
                <div><strong>Supervisor Approval:</strong> __________________________</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 mb-4">
                <div><strong>Department Head:</strong> __________________________</div>
                <div><strong>Date:</strong> __________________________</div>
              </div>
            </section>

            {/* Print Instructions */}
            <div className="text-center mt-8">
              <p className="italic text-sm">Please print this form and submit it for approval.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Styles */}
      <style scoped>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 100%;
            padding: 0;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DeploymentRequestForm;