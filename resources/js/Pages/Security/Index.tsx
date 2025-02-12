import { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import OverlayLoadingScreen from "@/Components/OverlayLoadingScreen";

const config = {
    title: "Security",
};

export default function ClickjackingChecker({ auth }:any) {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const checkSecurity = () => {
        if (!url.trim()) {
            setError("Please enter a valid URL.");
            setResult([]);
            return;
        }

        setError("");
        setIsLoading(true);

        // Send request to Laravel backend using Inertia's router.post
        router.post(
            route('security.checks'),
            { url },
            {
                onSuccess: (page:any) => {
                    console.log(page.props.result)
                    console.log(123)
                    setResult(page.props.result);
                    setIsLoading(false);
                },
                onError: (errors) => {
                    setError(errors.url || "An error occurred.");
                },
            }
        );
    };

    return (
        <AuthenticatedLayout auth_user={auth.user} header={config.title}>
        {
            (isLoading && <OverlayLoadingScreen />)
        }
    <div className="container  p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-2">Vulnerability Checker</h2>
        <hr />
        <p className="mt-3 text-sm text-gray-600">
            <strong>Disclaimer:</strong> The Initial Assessment does not represent the final Vulnerability Results. 
            It serves as a preliminary evaluation and should not be interpreted as a confirmed security finding. 
            The final results must be thoroughly analyzed and validated by the DSWD Cybersecurity and Vulnerability Assessment Team.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Left: Input Section */}
            <div className="col-span-1">
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter URL (https://example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>

                <button
                    onClick={checkSecurity}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Check Security
                </button>

                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>

            {/* Right: Results Section */}
            <div className="col-span-2 space-y-4">
                {result.length > 0 ? (
                    result.map((check:any, index:any) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border ${
                                check.isSecure
                                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                                    : "border-red-500 bg-red-50 dark:bg-red-900"
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
                            <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                            {!check.isSecure && (
                                <p className="text-sm mt-2 text-red-600 dark:text-red-300 font-medium">
                                    🔹 Recommendation: {check.recommendation}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No results yet. Enter a URL and check security.</p>
                )}
            </div>
        </div>
    </div>
</AuthenticatedLayout>

    );
}
