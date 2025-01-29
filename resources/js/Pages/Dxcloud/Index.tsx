import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select";
import { useForm } from "@inertiajs/react";  // Import useForm from Inertia

const config = {
  title: "DxCloud API",
  route: "dxcloud"
};

export default function Index({ auth, dxcloud_url, regions }) {
  // Initialize useForm
  const { data, setData, post, processing, errors } = useForm({
    region_code: "",  // Default form data for region_code
  });

  const handleRegionChange = (value) => {
    setData("region_code", value);  // Update the region_code value when a region is selected
  };

  const downloadRegions = async () => {
    if (!data.region_code) {
      alert("Please select a region first.");
      return;
    }
  
    try {
      // Construct the URL with the region_code parameter
      const url = route('dxcloud-download-psgc', { region_code: data.region_code });
      
      // Open the URL in a new window
      window.open(url, '_blank'); // '_blank' opens the URL in a new tab/window
  
      // Optionally, show a loading spinner or feedback while the download happens
      // You can remove this if you don't need it
      console.log('Download started...');
  
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download data.");
    }
  };

  return (
    <AuthenticatedLayout auth_user={auth.user} header={config.title}>
      <Head title={config.title} />
      <p>DXCLOUD URL: {dxcloud_url}</p>

      <div className="mt-4 space-y-4 max-w-sm mx-auto border border-gray-300 rounded-lg p-10">
        {/* ShadCN Select Dropdown for selecting a region */}
        <Select value={data.region_code} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.reg_id} value={region.code.toString()}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Download Button */}
        <Button onClick={downloadRegions} className="w-full" disabled={processing}>
          {processing ? "Downloading..." : "Download PSGC"}
        </Button>

        {/* Error handling */}
        {errors.region_code && (
          <div className="text-red-500 text-sm mt-2">{errors.region_code}</div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
