import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge"
import { ServerCog } from "lucide-react";

export default function Dashboard({
  auth,
  totalApplications,
  applicationsByStatus,
  applicationsByRegion,
  piaCompliance,
  recentDeployments,
  pendingSQA,
  applicationsByFramework, // Added
  equipment,
  consolidatedEquipment, // Added
  app_up,
  app_down,
  http_uptime_timeouts,
  applicationsByComputingScheme,
  applicationsByDevelopmentStrategy
}: any) {

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <AuthenticatedLayout auth_user={auth.user}>
      <div className="p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="text-left mb-8">
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
        
        {/* Main Section */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Total Applications */}
          <div className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-20 rounded-lg">
            <p className="text-4xl font-extrabold">{totalApplications}</p>
            <p className="text-sm text-white">Total</p>
          </div>
          
          {/* App Up */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-300 bg-opacity-20 rounded-lg">
            <p className="text-4xl font-extrabold text-green-400">{app_up}</p>
            <p className="text-sm text-white">Up</p>
          </div>
          
          {/* App Down */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-500  bg-opacity-20 rounded-lg">
            <p className="text-4xl font-extrabold text-red-400">{app_down}</p>
            <p className="text-sm text-white">Down</p>
          </div>
          
        </div>
        <Badge variant="secondary" className="mt-5 float-end">{http_uptime_timeouts} Seconds HTTP Request Timeout</Badge>

      </div>


     {/* Applications by Status */}
      <div className="bg-gray-50 rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Applications by Status</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {applicationsByStatus.map((status: any, index: number) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 hover:bg-indigo-50 rounded-md transition-all border-l-4 border-transparent hover:border-indigo-500 text-sm"
            >
              <span className="text-gray-700 uppercase">{status.status}</span>
              <span className="font-semibold text-indigo-600">{status.count}</span>
            </li>
          ))}
        </ul>
      </div>


      {/* Applications per Division */}
      <div className="bg-teal-100 rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Applications per Division</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {applicationsByRegion.map((region: any, index: number) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 hover:bg-teal-50 p-3 rounded-md transition-all text-sm"
            >
              <span className="text-gray-700 font-medium truncate">{region.division || "Unknown"}</span>
              <span className="bg-teal-500 text-white font-semibold text-xs w-7 h-7 flex items-center justify-center rounded-full">
                {region.count}
              </span>
            </li>
          ))}
        </ul>
      </div>


    {/* Applications by Computing Scheme */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Applications by Computing Scheme</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-4">
        {applicationsByComputingScheme.map((val: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center p-4 bg-gray-100 hover:bg-indigo-50 rounded-lg transition-all shadow-sm border border-gray-200 hover:border-indigo-400"
          >
            <span className="text-gray-600 text-sm font-medium tracking-wide">{val.computing_scheme}</span>
            <span className="text-lg font-semibold text-indigo-600">{val.count}</span>
          </div>
        ))}
      </div>
    </div>


         {/* Applications by Development */}
      <div className="bg-gray-50 rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Applications by Development</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3">
          {applicationsByDevelopmentStrategy.map((val: any, index: number) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 hover:bg-indigo-50 rounded-md transition-all border-l-4 border-transparent hover:border-indigo-500 text-sm"
            >
              <span className="text-gray-700 uppercase">{val.development_strategy}</span>
              <span className="font-semibold text-indigo-600">{val.count}</span>
            </li>
          ))}
        </ul>
      </div>

            {/* Applications by Framework */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Applications by Framework</h2>
          <ul className="mt-4 grid grid-cols-3 gap-3">
            {applicationsByFramework.map((framework: any, index: number) => (
              <li 
                key={index} 
                className="flex items-center gap-3 bg-gray-50 hover:bg-purple-50 p-3 rounded-md transition-all text-sm"
              >
                {/* Avatar with Hover Tooltip */}
                <div className="relative group">
                  <div 
                    className="w-8 h-8 bg-purple-500 text-white font-bold flex items-center justify-center rounded-full uppercase"
                    title={framework.tech_stack || "Unknown Framework"} // Tooltip on hover
                  >
                    {framework.tech_stack ? framework.tech_stack[0] : "?"}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-9 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {framework.tech_stack || "Unknown Framework"}
                  </div>
                </div>
                {/* Framework Name and Count */}
                <span className="text-gray-700 font-medium truncate">{framework.tech_stack || "Unknown"}</span>
                <span className="text-teal-800 font-bold">
                  {framework.count}
                </span>
              </li>
            ))}
          </ul>
        </div>


          {/* Recent Deployments */}
          <div className="bg-white rounded-2xl shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">Recent Deployments</h2>
            <ul className="divide-y divide-gray-200">
              {recentDeployments.map((deployment:any, index:any) => (
                <li key={index} className="flex justify-between items-center py-3">
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:text-blue-800 transition duration-200"
                  >
                    {deployment.name}
                  </a>
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
                    {deployment.deployment_date}
                  </span>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Equipment Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded">
            <h2>Total Equipment</h2>
            <p>{equipment.length}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded">
            <h2>Total Value</h2>
            <p>
              ₱
              {equipment
                .reduce(
                  (total: any, item: any) =>
                    total + parseFloat(item.purchase_price || 0),
                  0
                )
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded">
            <h2>Warranty Expired</h2>
            <p>
              {
                equipment.filter(
                  (item: any) => new Date(item.warranty_expiry) < new Date()
                ).length
              }
            </p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded">
            <h2>Locations</h2>
            <p>{[...new Set(equipment.map((item: any) => item.location))].length}</p>
          </div>
        </div>

        {/* Consolidated ICT Inventory Table */}
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Consolidated ICT Inventory</h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Total Equipment</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Total Purchase Price</th>
              </tr>
            </thead>
            <tbody>
              {consolidatedEquipment.map((item: any, index: any) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.total_equipment}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{formatCurrency(item.total_purchase_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
