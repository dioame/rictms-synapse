import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from 'axios';
import { ShieldCheck, ShieldAlert, ShieldX, HelpCircle } from "lucide-react";

const VirusTotalPage = ({auth}:any) => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('url', url);

    try {
      const response = await axios.post(route('virus-total.check'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data.result.data);
    } catch (error) {
      console.error('Error during request:', error);
      alert('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedLayout auth_user={auth.user}>
    <div className="container mx-auto p-4 bg-gray-50 rounded">
      <h1 className="text-3xl font-bold text-center mb-6">URL Scanner powered by VirusTotal Scan</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="url" className="font-semibold text-lg">URL</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter URL"
            className="border rounded p-2 mt-1"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Check'}
          </button>
        </div>
      </form>

      {/* Display Results */}

      {!result && ( 
       <div className="mt-6 p-4 border border-gray-200 rounded text-center text-red-500">
        <p>There Seems to be a problem.</p>
       </div>
      ) }
      {result && (
        <div className="mt-6 p-4 border border-gray-200 rounded">
          <h2 className="font-semibold text-lg">Scan Result</h2>

          {/* Summary Section */}
          <div className="bg-gray-100 p-4 rounded mt-4">
            <p><strong>Scanned URL:</strong> <a href={result.attributes.url} className="text-blue-500 underline">{result.attributes.url}</a></p>
            <p><strong>Reputation:</strong> 
              <span className={`ml-2 px-2 py-1 text-white rounded ${result.attributes.reputation < 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                {result.attributes.reputation}
              </span>
            </p>
            <p><strong>Total Votes:</strong> Harmless: {result.attributes.total_votes.harmless}, Malicious: {result.attributes.total_votes.malicious}</p>
            <p><strong>Last Analysis Date:</strong> {new Date(result.attributes.last_analysis_date * 1000).toLocaleString()}</p>
          </div>

        {/* Threat Analysis */}
        <div className="mt-6">
        <h3 className="font-semibold text-lg">Threat Analysis</h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
            {Object.entries(result.attributes.last_analysis_stats).map(([key, value]: any) => {
            // Determine color and icon based on threat level
            let bgColor = "bg-gray-300 text-black"; // Default (Undetected)
            let Icon = HelpCircle;
            
            if (key.includes("malicious")) {
                bgColor = "bg-red-500 text-white";
                Icon = ShieldX;
            } else if (key.includes("suspicious")) {
                bgColor = "bg-yellow-500 text-black";
                Icon = ShieldAlert;
            } else if (key.includes("harmless")) {
                bgColor = "bg-green-500 text-white";
                Icon = ShieldCheck;
            }

            return (
                <p
                key={key}
                className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg font-semibold ${bgColor}`}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                >
                <Icon size={18} />
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </p>
            );
            })}
        </div>

        {/* Detailed Breakdown */}
        {selectedCategory && (
            <div className="mt-5 p-4 border rounded bg-gray-50">
            <h4 className="font-semibold text-lg mb-2">
                Breakdown of {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h4>
            <ul className="list-disc pl-5 space-y-2">
                {Object.entries(result.attributes.last_analysis_results).map(([engine, data]: any) => {
                if (data.category === selectedCategory) {
                    // Determine icon and color for breakdown
                    let textColor = "text-gray-700"; // Default (Undetected)
                    let Icon = HelpCircle;
                    
                    if (data.result?.toLowerCase().includes("malicious")) {
                    textColor = "text-red-500";
                    Icon = ShieldX;
                    } else if (data.result?.toLowerCase().includes("suspicious")) {
                    textColor = "text-yellow-500";
                    Icon = ShieldAlert;
                    } else if (data.result?.toLowerCase().includes("harmless")) {
                    textColor = "text-green-500";
                    Icon = ShieldCheck;
                    }

                    return (
                    <li key={engine} className={`font-medium flex items-center gap-2 ${textColor}`}>
                        <Icon size={16} />
                        <strong>{engine}:</strong> {data.result || 'No specific result'}
                    </li>
                    );
                }
                })}
            </ul>
            </div>
        )}
        </div>


          {/* Categories */}
          {result.attributes.categories && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Category Classification</h3>
              <ul className="list-decimal pl-5">
                {Object.entries(result.attributes.categories).map(([source, category] : any, index) => (
                  <li key={index}>
                    <strong>{source}:</strong> {category}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last HTTP Response Code */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg">HTTP Response</h3>
            <p><strong>Last HTTP Response Code:</strong> {result.attributes.last_http_response_code}</p>
          </div>
        </div>
      )}
    </div>
    </AuthenticatedLayout>
  );
};

export default VirusTotalPage;
