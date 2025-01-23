import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function Dashboard({
  auth,
  totalApplications,
  applicationsByStatus,
  applicationsByRegion,
  piaCompliance,
  recentDeployments,
  pendingSQA,
  applicationsByFramework, // Add this line
}:any) {
  return (
    <AuthenticatedLayout auth_user={auth.user}>
      <div className="p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of application statistics and key metrics
          </p>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Applications */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold">Total Applications</h2>
            <p className="text-4xl font-extrabold mt-2">{totalApplications}</p>
          </div>

          {/* Applications by Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800">Applications by Status</h2>
            <ul className="mt-4 space-y-2">
              {applicationsByStatus.map((status:any, index:any) => (
                <li
                  key={index}
                  className="flex justify-between text-gray-600 hover:text-indigo-500"
                >
                  <span>{status.status}</span>
                  <span className="font-semibold">{status.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications by Region */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800">Applications by Region</h2>
            <ul className="mt-4 space-y-2">
              {applicationsByRegion.map((region:any, index:any) => (
                <li
                  key={index}
                  className="flex justify-between text-gray-600 hover:text-teal-500"
                >
                  <span>{region.division || "Unknown Region"}</span>
                  <span className="font-semibold">{region.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PIA Compliance */}
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold">PIA Compliance</h2>
            <p className="text-4xl font-extrabold mt-2">{piaCompliance}</p>
          </div>

          {/* Pending SQA */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold">Pending SQA Approvals</h2>
            <p className="text-4xl font-extrabold mt-2">{pendingSQA}</p>
          </div>

         

          {/* Applications by Framework */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800">Applications by Framework</h2>
            <ul className="mt-4 space-y-2">
              {applicationsByFramework.map((framework:any, index:any) => (
                <li
                  key={index}
                  className="flex justify-between text-gray-600 hover:text-purple-500"
                >
                  <span>{framework.frontend_framework || "Unknown Framework"}</span>
                  <span className="font-semibold">{framework.count}</span>
                </li>
              ))}
            </ul>
          </div>

           {/* Recent Deployments */}
           <div className="bg-white rounded-lg shadow-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-lg font-bold text-gray-800">Recent Deployments</h2>
            <ul className="mt-4 space-y-3">
              {recentDeployments.map((deployment:any, index:any) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-600 hover:text-blue-500"
                >
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    {deployment.name}
                  </a>
                  <span className="text-sm text-gray-500">{deployment.deployment_date}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}