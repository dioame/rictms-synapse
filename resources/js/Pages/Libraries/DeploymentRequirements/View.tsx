import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, results }: any) {
  return (
    <AuthenticatedLayout auth_user={auth.user} header="Deployment Requirement Details">
      <Head title="Deployment Requirement Details" />

      <div className="p-6">
        <div className="max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-center mb-6">Deployment Requirement Details</h1>

          <div className="space-y-4">
            {Object.entries(results).map(([key, item]: [string, any]) => (
              <div key={key} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-gray-900 text-lg">
                    {key.replace(/_/g, " ").toUpperCase()}:
                  </strong>
                </div>
                <p className="text-gray-700">{JSON.stringify(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style scoped>{`
        @media print {
          body {
            font-family: 'Arial', sans-serif;
            font-size: 12pt;
          }
          .no-print {
            display: none;
          }
          .container {
            width: 100%;
            padding: 0;
          }
          .p-6 {
            padding: 1.5rem;
          }
          .max-w-4xl {
            max-width: 100%;
          }
          .shadow-lg {
            box-shadow: none;
          }
          h1 {
            font-size: 20pt;
            margin-bottom: 20px;
          }
          .space-y-4 > * + * {
            margin-top: 1.25rem;
          }
          .border {
            border-width: 1px;
          }
        }
      `}</style>
    </AuthenticatedLayout>
  );
}
