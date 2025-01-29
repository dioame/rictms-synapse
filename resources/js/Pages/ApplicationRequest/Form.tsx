import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

const DeploymentRequestForm = ({ results } : any) => {
  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg border-2 border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-6 text-center text-gray-800">Deployment Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Information */}
            <section className="border-b-2 border-gray-300 pb-6 mb-6">
              <h3 className="font-semibold text-xl mb-4 text-gray-700">Basic Information:</h3>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Name:</strong> {results.name}</div>
                <div><strong className="text-gray-600">Description:</strong> {results.description}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Version:</strong> {results.version}</div>
                <div><strong className="text-gray-600">Tech Stack:</strong> {results.tech_stack}</div>
              </div>
            </section>

            {/* Technical Information */}
            <section className="border-b-2 border-gray-300 pb-6 mb-6">
              <h3 className="font-semibold text-xl mb-4 text-gray-700">Technical Information:</h3>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Repository:</strong>
                  <a href={results.repository} className="text-blue-600 underline">{results.repository}</a>
                </div>
                <div><strong className="text-gray-600">SQA Tested:</strong> {results.sqa_tested}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Deployment Date:</strong> {results.deployment_date}</div>
                <div><strong className="text-gray-600">Status:</strong> {results.status}</div>
              </div>
            </section>

            {/* Administrative Details */}
            <section className="border-b-2 border-gray-300 pb-6 mb-6">
              <h3 className="font-semibold text-xl mb-4 text-gray-700">Administrative Details:</h3>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Author:</strong> {results.author}</div>
                <div><strong className="text-gray-600">Developer:</strong> {results.developer}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Division:</strong> {results.division}</div>
                <div><strong className="text-gray-600">Section:</strong> {results.section}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Region:</strong> {results.region}</div>
                <div><strong className="text-gray-600">PIA Compliance:</strong> {results.is_pia ? "Yes" : "No"}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">KM Compliance:</strong> {results.is_km ? "Yes" : "No"}</div>
                <div><strong className="text-gray-600">Request Status:</strong> {results.request_status}</div>
              </div>
            </section>

            {/* Deployment Information */}
            <section className="border-b-2 border-gray-300 pb-6 mb-6">
              <h3 className="font-semibold text-xl mb-4 text-gray-700">Deployment Information:</h3>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Platform:</strong> {results.platform}</div>
                <div><strong className="text-gray-600">Computing Scheme:</strong> {results.computing_scheme}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Internal Users:</strong> {results.no_of_internal_users}</div>
                <div><strong className="text-gray-600">External Users:</strong> {results.no_of_external_users}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">System Owner:</strong> {results.system_owner}</div>
                <div><strong className="text-gray-600">Location of Deployment:</strong> {results.location_of_deployment}</div>
              </div>
            </section>

            {/* Signatures Section */}
            <section className="border-t-2 border-gray-300 pt-6">
              <h3 className="font-semibold text-xl mb-4 text-gray-700">Signatures:</h3>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Requestor:</strong> __________________________</div>
                <div><strong className="text-gray-600">Supervisor Approval:</strong> __________________________</div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 mb-4">
                <div><strong className="text-gray-600">Department Head:</strong> __________________________</div>
                <div><strong className="text-gray-600">Date:</strong> __________________________</div>
              </div>
            </section>

            {/* Print Instructions */}
            <div className="text-center mt-8">
              <p className="italic text-sm text-gray-600">Please print this form and submit it for approval.</p>
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
