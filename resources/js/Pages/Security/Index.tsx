import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import OverlayLoadingScreen from "@/Components/OverlayLoadingScreen";

const config = {
    title: "Security",
};

export default function ClickjackingChecker({ auth }: any) {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Advisory State
    const [advisories, setAdvisories] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    // Popular JS Libraries
    const popularPackages = [
        // JavaScript libraries
        "react", "vue", "angular", "lodash", "jquery",
        "axios", "express", "moment", "redux", "next",
        "webpack", "babel", "tailwindcss", "vite", "nuxt",
        "svelte", "pinia", "zustand", "react-router",
        "vue-router", "typescript", "prisma", "mongoose",
        "socket.io", "nestjs", "fastify", "graphql",
        "apollo-server", "eslint", "prettier", "jest",
        "vitest", "cypress", "playwright", "three",
        "d3", "chart.js", "highcharts", "leaflet",
        "mapbox-gl", "firebase", "supabase", "strapi",
        "sanity", "gsap", "framer-motion",
    
        // Vulnerable Python libraries (known for past security issues)
        "django", "flask", "numpy", "pandas", "requests",
        "urllib3", "pyyaml", "jinja2", "markupsafe",
        "paramiko", "pycryptodome", "setuptools",
        "cryptography", "tensorflow", "torch",
        "matplotlib", "pillow", "pyopenssl"
    ];
    

    useEffect(() => {
        const fetchAdvisories = async () => {
            const query = `
              {
                npmVulnerabilities: securityVulnerabilities(ecosystem: NPM, first: 50) {
                  nodes {
                    package {
                      name
                    }
                    advisory {
                      summary
                      permalink
                    }
                    vulnerableVersionRange
                    severity
                  }
                }
                pypiVulnerabilities: securityVulnerabilities(ecosystem: PIP, first: 50) {
                  nodes {
                    package {
                      name
                    }
                    advisory {
                      summary
                      permalink
                    }
                    vulnerableVersionRange
                    severity
                  }
                }
              }
            `;
        
            try {
                const response = await fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer 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`, // Use an environment variable instead of hardcoding
                    },
                    body: JSON.stringify({ query }),
                });
        
                if (!response.ok) throw new Error("Failed to fetch advisories");
                const jsonData = await response.json();
        
                if (!jsonData.data) {
                    throw new Error("Invalid response format");
                }
        
                // Extract vulnerabilities for NPM and PyPI
                const npmAdvisories = jsonData.data.npmVulnerabilities?.nodes ?? [];
                const pypiAdvisories = jsonData.data.pypiVulnerabilities?.nodes ?? [];
        
                // Filter advisories for popular packages
                const filteredNpmAdvisories = npmAdvisories.filter((adv:any) => popularPackages.includes(adv.package.name));
                const filteredPypiAdvisories = pypiAdvisories.filter((adv:any) => popularPackages.includes(adv.package.name));
        
                setAdvisories([...filteredNpmAdvisories, ...filteredPypiAdvisories]);
            } catch (error) {
                console.error("Error fetching advisories:", error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchAdvisories();
    }, []);

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
                onSuccess: (page: any) => {
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
            {isLoading && <OverlayLoadingScreen />}
            <div className="container p-6 bg-white shadow-lg rounded-lg">
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
                        
                        <div className="p-4 bg-white shadow-md rounded-md mt-5">
                            <hr />
                            <h2 className="text-xl font-bold mb-4 mt-2">Vulnerable Popular JavaScript Libraries</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul className="list-disc pl-5 space-y-2">
                                    {advisories.length > 0 ? (
                                        advisories.map((adv:any, index:any) => (
                                            <li key={index} className="text-gray-700">
                                                <strong className="text-red-600">{adv.package.name}</strong>
                                                {" "}({adv.vulnerableVersionRange}) - {adv.severity.toUpperCase()}
                                                <br />
                                                <span className="text-gray-600">{adv.advisory.summary}</span>
                                                <br />
                                                <a href={adv.advisory.permalink} className="text-blue-600 underline">
                                                    More Info
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No advisories found for popular JS libraries.</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Right: Results Section */}
                    <div className="col-span-2 space-y-4">
                        {result.length > 0 ? (
                            result.map((check: any, index: number) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border shadow-sm ${
                                        check.isSecure
                                            ? "border-green-500 bg-green-50 dark:bg-green-900"
                                            : "border-red-500 bg-red-50 dark:bg-red-900"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-lg">{check.name}</h3>
                                        {check.isSecure ? (
                                            <ShieldCheck className="text-green-600 dark:text-green-400" size={20} />
                                        ) : (
                                            <ShieldAlert className="text-red-600 dark:text-red-400" size={20} />
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{check.description}</p>

                                    {!check.isSecure && (
                                        <p className="text-sm mt-2 text-red-600 dark:text-red-300 font-medium">
                                            🔹 Recommendation: {check.recommendation}
                                        </p>
                                    )}

                                    {check.references && check.references.length > 0 && (
                                        <div className="mt-3 pt-2 border-t border-gray-300 dark:border-gray-700">
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">References:</h4>
                                            <ul className="mt-1 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                                                {check.references.map((ref: string, refIndex: number) => (
                                                    <li key={refIndex}>
                                                        🔗 <a href={ref} target="_blank" rel="noopener noreferrer" className="underline">
                                                            {ref}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
